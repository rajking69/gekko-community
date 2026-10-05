import { getDefaultRoleForUser, isWhitelistedAdmin } from '@/config/auth.config';
import { syncAuthenticatedMember } from '@/services/member.service';

export type UserSession = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  role: 'admin' | 'super_admin' | 'moderator' | 'developer' | 'member' | 'guest';
  token: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export const authService = {
  login: async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: UserSession; message?: string }> => {
    const safeEmail = (email || '').toLowerCase().trim();
    const fallbackUsername = safeEmail.split('@')[0] || 'user';

    try {
      // 1. Try connecting to the live NestJS backend API endpoint
      const response = await fetch(`${API_BASE_URL}/auth/sign-in/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: safeEmail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const user: UserSession = {
          id: data.data?.user?.id || data.user?.id || 'u_' + Date.now(),
          email: safeEmail,
          username: data.data?.user?.username || fallbackUsername,
          displayName: data.data?.user?.displayName || fallbackUsername,
          role: isWhitelistedAdmin(safeEmail) ? 'admin' : data.data?.user?.role || 'member',
          token: data.data?.accessToken || data.accessToken || data.token || 'token_' + Date.now(),
        };

        await syncAuthenticatedMember(user);
        authService.saveSession(user);
        return { success: true, user };
      }
      return { success: false, message: 'Login failed. Please check your credentials.' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Authentication service unavailable.',
      };
    }

    if (!safeEmail || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }
    return { success: false, message: 'Authentication service unavailable.' };
  },

  register: async (
    fullName: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: UserSession; message?: string }> => {
    const safeEmail = (email || '').toLowerCase().trim();
    const fallbackUsername = safeEmail.split('@')[0] || 'user';

    try {
      const response = await fetch(`${API_BASE_URL}/auth/sign-up/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: fullName, email: safeEmail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const user: UserSession = {
          id: data.data?.user?.id || data.user?.id || 'u_' + Date.now(),
          email: safeEmail,
          username: fallbackUsername,
          displayName: fullName || fallbackUsername,
          role: getDefaultRoleForUser(safeEmail),
          token: data.data?.accessToken || data.accessToken || data.token || 'token_' + Date.now(),
        };

        await syncAuthenticatedMember(user);
        authService.saveSession(user);
        return { success: true, user };
      }
      return { success: false, message: 'Registration failed. Please try again.' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Authentication service unavailable.',
      };
    }

    if (!safeEmail || !password) {
      return { success: false, message: 'Please provide full name, email, and password.' };
    }

    return { success: false, message: 'Authentication service unavailable.' };
  },

  googleLogin: async (): Promise<{ success: boolean; user?: UserSession; message?: string }> => {
    return {
      success: false,
      message: 'Google login is not configured for this application yet.',
    };
  },

  saveSession: (user: UserSession) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gekko_user', JSON.stringify(user));
      localStorage.setItem('gekko_token', user.token);
      document.cookie = `gekko_token=${user.token}; path=/; max-age=86400; SameSite=Lax`;
      window.dispatchEvent(new Event('gekko-auth-changed'));
    }
  },

  getCurrentUser: (): UserSession | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('gekko_user');
    if (!stored) return null;
    try {
      const user = JSON.parse(stored) as UserSession;
      const role = isWhitelistedAdmin(user.email) ? 'admin' : user.role;
      if (role !== user.role) {
        const updatedUser = { ...user, role };
        localStorage.setItem('gekko_user', JSON.stringify(updatedUser));
        return updatedUser;
      }
      return user;
    } catch {
      return null;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gekko_user');
      localStorage.removeItem('gekko_token');
      document.cookie = 'gekko_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      window.dispatchEvent(new Event('gekko-auth-changed'));
    }
  },
};
