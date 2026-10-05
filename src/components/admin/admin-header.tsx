'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { type UserSession } from '@/services/auth.service';
import { Menu, Search, Bell, Shield, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  user: UserSession | null;
  onOpenMobileSidebar: () => void;
}

export function AdminHeader({ user, onOpenMobileSidebar }: AdminHeaderProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes('/members')) return 'Member Management';
    if (pathname.includes('/events')) return 'Event Management';
    if (pathname.includes('/hall-of-fame')) return 'Hall of Fame Management';
    if (pathname.includes('/hall-of-shame')) return 'Hall of Shame Management';
    if (pathname.includes('/activity')) return 'Activity Logs';
    if (pathname.includes('/settings')) return 'Platform Settings';
    return 'Dashboard Overview';
  };

  const role = user?.role || 'member';
  const isAdmin = role === 'admin' || role === 'super_admin';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-(--glass-border) bg-(--color-bg-deep)/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="text-(--color-text-muted) hover:text-white lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <div>
          <nav className="flex items-center gap-2 font-mono text-xs text-(--color-text-muted)">
            <span>Gekko</span>
            <span>/</span>
            <span className="text-(--color-gekko-400)">Console</span>
          </nav>
          <h1 className="font-(family-name:--font-heading) text-base font-bold text-white">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Badge */}
        {user && (
          <div
            className={`hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider ${
              isAdmin
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
            }`}
          >
            {isAdmin ? <Shield className="size-3.5" /> : <ShieldCheck className="size-3.5" />}
            <span>{isAdmin ? 'ADMIN' : 'MODERATOR'}</span>
          </div>
        )}

        {/* User Info */}
        {user && (
          <div className="text-right text-xs">
            <p className="font-semibold text-white">{user.displayName || user.username}</p>
            <p className="text-(--color-text-muted) text-[10px]">{user.email}</p>
          </div>
        )}
      </div>
    </header>
  );
}
