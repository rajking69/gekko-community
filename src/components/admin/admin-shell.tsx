'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authService, type UserSession } from '@/services/auth.service';
import { AdminSidebar } from './admin-sidebar';
import { AdminHeader } from './admin-header';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--color-bg-deep)">
        <div className="flex items-center gap-3 text-(--color-gekko-400)">
          <span className="size-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
          <span className="font-mono text-sm uppercase tracking-wider">Authenticating Dashboard...</span>
        </div>
      </div>
    );
  }

  // Authorization Check: Must be admin or moderator
  const role = user?.role || 'member';
  const isAuthorized = role === 'admin' || role === 'super_admin' || role === 'moderator';

  if (!isAuthorized) {
    return (
      <div className="relative flex min-h-screen items-center justify-center px-6 py-16 bg-(--color-bg-deep)">
        <div className="mesh-bg" />
        <div className="glass relative z-10 w-full max-w-md rounded-3xl border border-rose-500/20 p-8 text-center shadow-2xl">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-rose-500/10 text-rose-400">
            <Lock className="size-8" />
          </div>
          <h1 className="mt-6 font-(family-name:--font-heading) text-2xl font-bold tracking-tight text-white">
            Access Restricted
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-(--color-text-secondary)">
            Management Dashboard access requires an <code className="text-(--color-gekko-400)">ADMIN</code> or <code className="text-indigo-400">MODERATOR</code> account.
          </p>
          {user ? (
            <div className="mt-4 rounded-xl bg-white/5 p-3 text-xs text-(--color-text-muted)">
              Signed in as <span className="font-semibold text-white">{user.email}</span> (Role: <span className="uppercase text-amber-400">{user.role}</span>)
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 rounded-xl bg-(--color-gekko-500) py-3 font-semibold text-xs text-black transition hover:bg-(--color-gekko-400)"
            >
              Sign In as Admin / Moderator <ArrowRight className="size-4" />
            </Link>
            <Link href="/" className="text-xs text-(--color-text-muted) hover:text-white">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-(--color-bg-deep) text-(--color-text-primary)">
      {/* Shared Sidebar */}
      <AdminSidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0">
        <AdminHeader
          user={user}
          onOpenMobileSidebar={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
