import type { UserSession } from '@/services/auth.service';
import type { DirectoryMember } from '@/types/member';

export type ListMembersParams = {
  q?: string;
  game?: string;
  role?: string;
};

export type MemberQueryParams = {
  page?: number;
  limit?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  department?: string;
  batch?: string;
  search?: string;
};

export type MemberResponse = {
  data: DirectoryMember[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Use environment variable for API base, fallback to relative path
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

export async function syncAuthenticatedMember(user: UserSession): Promise<void> {
  const response = await fetch(`${API_BASE}/members`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authUserId: user.id,
      email: user.email,
      username: user.username,
      fullName: user.displayName,
      displayName: user.displayName,
      role: user.role,
      status: 'ACTIVE',
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to save authenticated member profile');
  }
}

export async function listMembers(params: ListMembersParams = {}): Promise<DirectoryMember[]> {
  const queryParams = new URLSearchParams();
  if (params.game) queryParams.append('game', params.game);
  if (params.role) queryParams.append('role', params.role);
  if (params.q) queryParams.append('q', params.q);

  try {
    const response = await fetch(`${API_BASE}/members?${queryParams.toString()}`, {
      credentials: 'include',
    });

    if (response.ok) {
      const result = (await response.json()) as {
        success?: boolean;
        data?: DirectoryMember[];
        meta?: unknown;
      };

      if (Array.isArray(result.data)) {
        return result.data;
      }
    }
  } catch {
    return [];
  }

  return [];
}

export async function allMembers(): Promise<DirectoryMember[]> {
  try {
    const response = await fetch(`${API_BASE}/members`, {
      credentials: 'include',
    });

    if (!response.ok) return [];

    const result = (await response.json()) as {
      success?: boolean;
      data?: DirectoryMember[] | { data?: DirectoryMember[] };
      meta?: unknown;
    };
    if (Array.isArray(result.data)) return result.data;
    return Array.isArray(result.data?.data) ? result.data.data : [];
  } catch {
    return [];
  }
}

export async function getMemberByUsername(username: string): Promise<DirectoryMember | null> {
  try {
    const response = await fetch(`${API_BASE}/members/${username}`, {
      credentials: 'include',
    });

    if (!response.ok) return null;

    const result = (await response.json()) as { success?: boolean; data?: DirectoryMember };
    return result.data || null;
  } catch {
    return null;
  }
}

export async function listMemberActivity(username: string, limit = 8): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE}/activity?username=${username}&limit=${limit}`, {
      credentials: 'include',
    });

    if (!response.ok) return [];

    return response.json();
  } catch {
    return [];
  }
}

/**
 * Default export - object matching the original memberService shape
 * for backward compatibility with existing imports.
 */
export const memberService = {
  list: async (params: ListMembersParams = {}): Promise<DirectoryMember[]> => {
    return listMembers(params);
  },

  all: async (): Promise<DirectoryMember[]> => {
    return allMembers();
  },

  get: async (username: string): Promise<DirectoryMember | null> => {
    return getMemberByUsername(username);
  },

  listActivity: async (username: string, limit = 8): Promise<any[]> => {
    return listMemberActivity(username, limit);
  },
};
