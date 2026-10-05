'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { siteConfig } from '@/config/site.config';
import { authService, type UserSession } from '@/services/auth.service';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Trophy,
  Skull,
  Activity,
  Settings,
  User,
  LogOut,
  X,
  ShieldCheck,
  Shield
} from 'lucide-react';

interface AdminSidebarProps {
  user: UserSession | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ user, isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const role = user?.role || 'member';
  const isAdmin = role === 'admin' || role === 'super_admin';
  const isModerator = role === 'moderator' || isAdmin;

  // Navigation Items with Permission Flags
  const mainNav = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, visible: true },
    { label: 'Members', href: '/admin/members', icon: Users, visible: isAdmin },
    { label: 'Events', href: '/admin/events', icon: Calendar, visible: isAdmin || isModerator },
    { label: 'Hall of Fame', href: '/admin/hall-of-fame', icon: Trophy, visible: isModerator },
    { label: 'Hall of Shame', href: '/admin/hall-of-shame', icon: Skull, visible: isModerator },
  ];

  const managementNav = [
    { label: 'Activity Logs', href: '/admin/activity', icon: Activity, visible: isAdmin },
    { label: 'Settings', href: '/admin/settings', icon: Settings, visible: isAdmin },
  ];

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed bottom-0 top-0 z-50 flex w-64 flex-col border-r border-(--glass-border) bg-(--color-bg-deep) transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'left-0 translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Section */}
        <div className="flex h-16 items-center justify-between border-b border-(--glass-border) px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/brand/gekko-logo-128.png"
              alt="Gekko Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="font-(family-name:--font-heading) text-lg font-bold tracking-tight text-white">
              {siteConfig.shortName}
            </span>
          </Link>
          <button
            onClick={onClose}
            className="text-(--color-text-muted) hover:text-white lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {/* MAIN GROUP */}
          <div>
            <p className="px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              MAIN
            </p>
            <nav className="mt-2 space-y-1">
              {mainNav
                .filter((item) => item.visible)
                .map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? 'bg-(--color-gekko-500) text-black font-semibold shadow-md shadow-(--color-gekko-500)/20'
                          : 'text-(--color-text-secondary) hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
            </nav>
          </div>

          {/* MANAGEMENT GROUP */}
          {managementNav.some((item) => item.visible) && (
            <div>
              <p className="px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                MANAGEMENT
              </p>
              <nav className="mt-2 space-y-1">
                {managementNav
                  .filter((item) => item.visible)
                  .map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? 'bg-(--color-gekko-500) text-black font-semibold shadow-md shadow-(--color-gekko-500)/20'
                            : 'text-(--color-text-secondary) hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
              </nav>
            </div>
          )}
        </div>

        {/* User Account Section */}
        <div className="border-t border-(--glass-border) p-4">
          {user ? (
            <div className="flex items-center justify-between rounded-xl border border-(--glass-border) bg-white/5 p-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-(--color-gekko-500)/20 text-(--color-gekko-400)">
                  {isAdmin ? <Shield className="size-4" /> : <ShieldCheck className="size-4" />}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-xs text-white">
                    {user.displayName || user.username}
                  </p>
                  <p className="truncate font-mono text-[10px] uppercase text-(--color-gekko-400)">
                    {user.role}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="grid size-7 place-items-center rounded-lg text-(--color-text-muted) hover:bg-rose-500/20 hover:text-rose-400"
                title="Logout"
              >
                <LogOut className="size-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--color-gekko-500) py-2.5 text-xs font-semibold text-black"
            >
              Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
