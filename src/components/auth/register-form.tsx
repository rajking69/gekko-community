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
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'idle' | 'success' | 'error';
    text: string;
    user?: UserSession;
  }>({ type: 'idle', text: '' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    if (password !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    if (password.length < 8) {
      setStatusMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: 'idle', text: '' });

    try {
      const result = await authService.register(fullName, email, password);

      if (result.success && result.user) {
        setStatusMessage({
          type: 'success',
          text: `Account created successfully! Welcome to Team Gekko, ${result.user.displayName}. Redirecting...`,
          user: result.user,
        });

        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 1200);
      } else {
        setStatusMessage({
          type: 'error',
          text: result.message || 'Registration failed. Please try again.',
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
          text: result.message || 'Google authentication is unavailable.',
        });
        return;
      }
      setStatusMessage({
        type: 'success',
        text: `Account created with Google as ${result.user.displayName}. Redirecting...`,
        user: result.user,
      });

      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 1200);
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Google authentication failed.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-4" onSubmit={handleRegister}>
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
        <span>or register with email</span>
        <span className="h-px flex-1 bg-(--glass-border)" />
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-(--color-text-primary)">Full Name</span>
        <span className="relative block">
          <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Astra Vega"
            required
            className="block h-11 w-full rounded-xl border border-(--glass-border) bg-(--color-bg-deep)/40 pl-10 pr-3 text-sm text-(--color-text-primary) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-gekko-500) focus:bg-(--color-bg-deep)/70"
          />
        </span>
      </label>

      <label className="block space-y-1.5">
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

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-(--color-text-primary)">Password</span>
        <span className="relative block">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            required
            className="block h-11 w-full rounded-xl border border-(--glass-border) bg-(--color-bg-deep)/40 px-10 text-sm text-(--color-text-primary) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-gekko-500) focus:bg-(--color-bg-deep)/70"
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) transition hover:text-(--color-text-primary)"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </span>
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-(--color-text-primary)">Confirm Password</span>
        <span className="relative block">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="Re-enter password"
            required
            className="block h-11 w-full rounded-xl border border-(--glass-border) bg-(--color-bg-deep)/40 pl-10 pr-3 text-sm text-(--color-text-primary) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-gekko-500) focus:bg-(--color-bg-deep)/70"
          />
        </span>
      </label>

      {statusMessage.type !== 'idle' && (
        <div
          className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition ${
            statusMessage.type === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" /> Creating account...
          </span>
        ) : (
          'Create Account'
        )}
      </Button>

      <p className="text-center text-sm text-(--color-text-secondary)">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-(--color-gekko-400) hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
