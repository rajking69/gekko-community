'use client';

import { Button } from '@/components/ui/button';
import { type UserSession, authService } from '@/services/auth.service';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useState } from 'react';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'idle' | 'success' | 'error' | 'google';
    text: string;
    user?: UserSession;
  }>({ type: 'idle', text: '' });

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setStatusMessage({ type: 'idle', text: '' });

    try {
      const result = await authService.login(email, password);

      if (result.success && result.user) {
        setStatusMessage({
          type: 'success',
          text: `Welcome back, ${result.user.displayName}! Logged in as [${result.user.role.toUpperCase()}]. Redirecting...`,
          user: result.user,
        });

        setTimeout(() => {
          const redirect = searchParams.get('redirect');
          const userRole = result.user?.role;
          const isPrivileged =
            userRole === 'admin' || userRole === 'super_admin' || userRole === 'moderator';
          router.push(
            isPrivileged ? '/admin' : redirect?.startsWith('/') ? redirect : '/dashboard',
          );
          router.refresh();
        }, 1000);
      } else {
        setStatusMessage({
          type: 'error',
          text: result.message || 'Login failed. Please check your credentials.',
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await authService.googleLogin();
      if (!result.success || !result.user) {
        setStatusMessage({
          type: 'error',
          text: result.message || 'Google login is unavailable.',
        });
        return;
      }
      setStatusMessage({
        type: 'success',
        text: `Logged in with Google as ${result.user.displayName}. Redirecting...`,
        user: result.user,
      });

      setTimeout(() => {
        const redirect = searchParams.get('redirect');
        router.push(redirect?.startsWith('/') ? redirect : '/dashboard');
        router.refresh();
      }, 1200);
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Google login failed.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-5" onSubmit={handleEmailLogin}>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full"
        disabled={isLoading}
        onClick={handleGoogleLogin}
      >
        <span className="grid size-5 place-items-center rounded-full bg-white font-semibold text-sm text-[#4285F4]">
          G
        </span>
        Continue with Google
      </Button>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-(--color-text-muted)">
        <span className="h-px flex-1 bg-(--glass-border)" />
        <span>or continue with email</span>
        <span className="h-px flex-1 bg-(--glass-border)" />
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-(--color-text-primary)">Email address</span>
        <span className="relative block">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="block h-11 w-full rounded-xl border border-(--glass-border) bg-(--color-bg-deep)/40 pl-10 pr-3 text-sm text-(--color-text-primary) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-gekko-500) focus:bg-(--color-bg-deep)/70"
          />
        </span>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-(--color-text-primary)">Password</span>
        <span className="relative block">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Your password"
            required
            className="block h-11 w-full rounded-xl border border-(--glass-border) bg-(--color-bg-deep)/40 px-10 text-sm text-(--color-text-primary) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-gekko-500) focus:bg-(--color-bg-deep)/70"
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) transition hover:text-(--color-text-primary)"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </span>
      </label>

      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
          <input type="checkbox" name="remember" className="size-4 accent-(--color-gekko-500)" />
          Remember me
        </label>
        <button
          type="button"
          onClick={() =>
            setStatusMessage({
              type: 'google',
              text: 'Password recovery instructions will be sent to your email.',
            })
          }
          className="text-sm text-(--color-gekko-400) transition hover:text-(--color-gekko-300) hover:underline"
        >
          Forgot password?
        </button>
      </div>

      {statusMessage.type !== 'idle' && (
        <div
          className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition ${
            statusMessage.type === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : statusMessage.type === 'error'
                ? 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                : 'border-(--color-gekko-500)/30 bg-(--color-gekko-500)/10 text-(--color-text-secondary)'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
          ) : statusMessage.type === 'error' ? (
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-400" />
          ) : (
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-(--color-gekko-400)" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" /> Logging in...
          </span>
        ) : (
          'Log in'
        )}
      </Button>

      <p className="text-center text-sm text-(--color-text-secondary)">
        New to Team Gekko?{' '}
        <Link href="/register" className="font-medium text-(--color-gekko-400) hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
