'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService, type UserSession } from '@/services/auth.service';
import { mockUsers } from '@/data/users.mock';
import type { PublicUser } from '@/types/user';
import {
  ShieldCheck,
  AlertOctagon,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  LogOut,
  Lock,
  ArrowRight,
  Shield,
  BadgeAlert,
  Flag,
  UserX,
  FileCheck
} from 'lucide-react';

export function ModeratorDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Moderation state
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([
    { id: 'rep_101', user: 'mira', reportedBy: 'kael', reason: 'Tournament chat spam & inappropriate links', status: 'pending', date: '2026-10-04', severity: 'high' },
    { id: 'rep_102', user: 'ren', reportedBy: 'nyra', reason: 'Unsportsmanlike conduct in Gekko Cup match', status: 'pending', date: '2026-10-04', severity: 'medium' },
    { id: 'rep_103', user: 'astra', reportedBy: 'mira', reason: 'Disputed match result screenshot', status: 'resolved', date: '2026-10-03', severity: 'low' },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleActionReport = (reportId: string, action: 'resolved' | 'dismissed') => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: action } : r))
    );
    showToast(`Report ${reportId} successfully ${action}.`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--color-bg-deep)">
        <div className="flex items-center gap-3 text-indigo-400">
          <ShieldCheck className="size-6 animate-pulse" />
          <span className="font-mono text-sm uppercase tracking-wider">Loading Moderator Dashboard...</span>
        </div>
      </div>
    );
  }

  // Guard: Accessible by Moderator, Admin, Super Admin
  const isAuthorized =
    currentUser && (currentUser.role === 'moderator' || currentUser.role === 'admin' || currentUser.role === 'super_admin');

  if (!isAuthorized) {
    return (
      <div className="relative flex min-h-screen items-center justify-center px-6 py-16">
        <div className="mesh-bg" />
        <div className="glass relative z-10 w-full max-w-lg rounded-3xl p-8 text-center border border-indigo-500/20 shadow-2xl">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-indigo-500/10 text-indigo-400">
            <Lock className="size-8" />
          </div>
          <h1 className="mt-6 font-(family-name:--font-heading) text-2xl font-bold tracking-tight text-white">
            Moderator Access Only
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-(--color-text-secondary)">
            You must have a <code className="text-indigo-400">MODERATOR</code> or <code className="text-(--color-gekko-400)">ADMIN</code> role to view the Moderation Console.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-sm text-white transition hover:bg-indigo-500"
            >
              Sign In to Account <ArrowRight className="size-4" />
            </Link>
            <Link href="/" className="text-xs text-(--color-text-muted) transition hover:text-white">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pendingCount = reports.filter((r) => r.status === 'pending').length;

  return (
    <div className="relative min-h-screen bg-(--color-bg-deep) text-(--color-text-primary)">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-(--glass-border) bg-(--color-bg-deep)/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h1 className="font-(family-name:--font-heading) text-lg font-bold tracking-tight">
                Moderator Safety Console
              </h1>
              <p className="text-xs text-(--color-text-muted)">Community Moderation & Safety</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300 font-mono">
              <span className="size-2 rounded-full bg-indigo-400 animate-ping" />
              MODERATOR ACTIVE
            </div>

            <div className="flex items-center gap-3 border-l border-(--glass-border) pl-4">
              <div className="text-right text-xs">
                <p className="font-semibold text-white">{currentUser.displayName}</p>
                <p className="text-indigo-400 uppercase text-[10px] font-bold">{currentUser.role}</p>
              </div>
              <button
                onClick={() => {
                  authService.logout();
                  router.push('/login');
                }}
                className="grid size-8 place-items-center rounded-lg border border-(--glass-border) bg-white/5 text-(--color-text-muted) transition hover:border-rose-500/50 hover:text-rose-400"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {notification && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-300 animate-in fade-in">
            <CheckCircle2 className="size-4 text-indigo-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* Stats Row */}
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <div className="glass rounded-2xl p-6 border border-(--glass-border)">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-(--color-text-muted)">Active Reports</span>
              <Flag className="size-5 text-amber-400" />
            </div>
            <p className="mt-4 font-(family-name:--font-heading) text-3xl font-bold text-amber-400">{pendingCount}</p>
            <p className="mt-1 text-xs text-amber-400/80">Pending moderation review</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-(--glass-border)">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-(--color-text-muted)">Resolved Tickets</span>
              <FileCheck className="size-5 text-emerald-400" />
            </div>
            <p className="mt-4 font-(family-name:--font-heading) text-3xl font-bold text-emerald-400">
              {reports.filter((r) => r.status === 'resolved').length}
            </p>
            <p className="mt-1 text-xs text-emerald-400/80">Action taken today</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-(--glass-border)">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-(--color-text-muted)">Community Status</span>
              <ShieldCheck className="size-5 text-indigo-400" />
            </div>
            <p className="mt-4 font-(family-name:--font-heading) text-2xl font-bold text-indigo-400">Protected</p>
            <p className="mt-1 text-xs text-(--color-text-muted)">Automated & Staff Guard</p>
          </div>
        </div>

        {/* Reports Queue */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight">Moderation Queue</h2>
              <p className="text-sm text-(--color-text-secondary)">Inspect user reports, community chat violations, and tournament disputes.</p>
            </div>
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="glass rounded-2xl p-6 border border-(--glass-border) flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-indigo-500/30"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-indigo-400">{report.id}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-mono uppercase font-semibold ${
                        report.severity === 'high'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : report.severity === 'medium'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {report.severity} severity
                    </span>
                    <span className="text-xs text-(--color-text-muted)">• {report.date}</span>
                  </div>

                  <p className="font-semibold text-white text-base">
                    Reported User: <span className="text-rose-400">@{report.user}</span> (by @{report.reportedBy})
                  </p>
                  <p className="text-xs text-(--color-text-muted)">Issue: {report.reason}</p>
                </div>

                {report.status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleActionReport(report.id, 'resolved')}
                      className="flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20"
                    >
                      <CheckCircle2 className="size-3.5" /> Resolve & Action
                    </button>
                    <button
                      onClick={() => handleActionReport(report.id, 'dismissed')}
                      className="flex items-center gap-1 rounded-xl border border-(--glass-border) bg-white/5 px-3 py-2 text-xs font-semibold text-(--color-text-secondary) hover:text-white"
                    >
                      Dismiss
                    </button>
                  </div>
                ) : (
                  <span className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono text-emerald-400 uppercase">
                    {report.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
