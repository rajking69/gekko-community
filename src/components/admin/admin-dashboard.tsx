'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService, type UserSession } from '@/services/auth.service';
import { mockUsers } from '@/data/users.mock';
import type { PublicUser } from '@/types/user';
import {
  ShieldAlert,
  Users,
  Trophy,
  Calendar,
  Activity,
  Search,
  UserCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  LogOut,
  Sparkles,
  Lock,
  ArrowRight,
  Shield,
  BadgeAlert,
  FileText
} from 'lucide-react';

export function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'moderation' | 'hof' | 'logs'>('overview');

  // User management state
  const [usersList, setUsersList] = useState<PublicUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [notification, setNotification] = useState<{ type: 'success' | 'info'; message: string } | null>(null);

  // Moderation state
  const [reportsList, setReportsList] = useState([
    { id: 'rep_1', reportedUser: 'mira', reporter: 'kael', reason: 'Abusive language in scrim chat', status: 'pending', date: '2026-10-04' },
    { id: 'rep_2', reportedUser: 'astra', reporter: 'nyra', reason: 'Unfair tournament bracket dispute', status: 'resolved', date: '2026-10-03' },
    { id: 'rep_3', reportedUser: 'ren', reporter: 'mira', reason: 'Spamming event lobby', status: 'pending', date: '2026-10-02' }
  ]);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const showToast = (message: string) => {
    setNotification({ type: 'success', message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRoleChange = (targetUserId: string, newRole: string) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === targetUserId ? { ...u, role: newRole as any } : u))
    );
    const targetUser = usersList.find((u) => u.id === targetUserId);
    showToast(`Updated role for ${targetUser?.displayName || targetUserId} to [${newRole.toUpperCase()}]`);
  };

  const handleResolveReport = (reportId: string, action: 'approved' | 'dismissed') => {
    setReportsList((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: action } : r))
    );
    showToast(`Report ${reportId} marked as ${action}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--color-bg-deep)">
        <div className="flex items-center gap-3 text-(--color-gekko-400)">
          <Activity className="size-6 animate-spin" />
          <span className="font-mono text-sm uppercase tracking-wider">Loading Command Center...</span>
        </div>
      </div>
    );
  }

  // Access Guard: Only Admin & Super Admin can access full admin panel
  const isAuthorized = currentUser && (currentUser.role === 'admin' || currentUser.role === 'super_admin');

  if (!isAuthorized) {
    return (
      <div className="relative flex min-h-screen items-center justify-center px-6 py-16">
        <div className="mesh-bg" />
        <div className="glass relative z-10 w-full max-w-lg rounded-3xl p-8 text-center border border-rose-500/20 shadow-2xl">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-rose-500/10 text-rose-400">
            <Lock className="size-8" />
          </div>
          <h1 className="mt-6 font-(family-name:--font-heading) text-2xl font-bold tracking-tight text-white">
            Admin Access Required
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-(--color-text-secondary)">
            You must be logged in as an Authorized Admin (<code className="text-(--color-gekko-400)">president@gekko.community</code> or <code className="text-(--color-gekko-400)">gs@gekko.community</code>) to access the Admin Console.
          </p>
          {currentUser ? (
            <div className="mt-4 rounded-xl bg-(--color-bg-deep)/60 p-3 text-xs text-(--color-text-muted)">
              Currently logged in as: <span className="font-semibold text-white">{currentUser.email}</span> (Role: <span className="uppercase text-(--color-gekko-400)">{currentUser.role}</span>)
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 rounded-xl bg-(--color-gekko-500) px-5 py-3 font-semibold text-sm text-black transition hover:bg-(--color-gekko-400)"
            >
              Sign In as Admin <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/"
              className="text-xs text-(--color-text-muted) transition hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = usersList.filter((u) => {
    const matchesQuery =
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.displayName && u.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = selectedRoleFilter === 'all' || u.role === selectedRoleFilter;
    return matchesQuery && matchesRole;
  });

  return (
    <div className="relative min-h-screen bg-(--color-bg-deep) text-(--color-text-primary)">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 border-b border-(--glass-border) bg-(--color-bg-deep)/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-(--color-gekko-500)/20 text-(--color-gekko-400) border border-(--color-gekko-500)/30">
              <Shield className="size-5" />
            </div>
            <div>
              <h1 className="font-(family-name:--font-heading) text-lg font-bold tracking-tight">
                Team Gekko Command Center
              </h1>
              <p className="text-xs text-(--color-text-muted)">Admin & System Control</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-mono">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              ADMIN ACTIVE
            </div>

            <div className="flex items-center gap-3 border-l border-(--glass-border) pl-4">
              <div className="text-right text-xs">
                <p className="font-semibold text-white">{currentUser.displayName}</p>
                <p className="text-(--color-text-muted)">{currentUser.email}</p>
              </div>
              <button
                onClick={() => {
                  authService.logout();
                  router.push('/login');
                }}
                className="grid size-8 place-items-center rounded-lg border border-(--glass-border) bg-white/5 text-(--color-text-muted) transition hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400"
                title="Logout"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Toast Notification */}
        {notification && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-emerald-400" />
              <span>{notification.message}</span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-(--glass-border) pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === 'overview'
                ? 'bg-(--color-gekko-500) text-black font-semibold shadow-md shadow-(--color-gekko-500)/20'
                : 'text-(--color-text-secondary) hover:bg-white/5 hover:text-white'
            }`}
          >
            <Activity className="size-4" /> Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === 'users'
                ? 'bg-(--color-gekko-500) text-black font-semibold shadow-md shadow-(--color-gekko-500)/20'
                : 'text-(--color-text-secondary) hover:bg-white/5 hover:text-white'
            }`}
          >
            <Users className="size-4" /> Users & Roles
          </button>
          <button
            onClick={() => setActiveTab('moderation')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === 'moderation'
                ? 'bg-(--color-gekko-500) text-black font-semibold shadow-md shadow-(--color-gekko-500)/20'
                : 'text-(--color-text-secondary) hover:bg-white/5 hover:text-white'
            }`}
          >
            <ShieldAlert className="size-4" /> Moderation Queue
            {reportsList.filter((r) => r.status === 'pending').length > 0 && (
              <span className="rounded-full bg-rose-500 px-2 py-0.5 font-mono text-[10px] text-white">
                {reportsList.filter((r) => r.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('hof')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === 'hof'
                ? 'bg-(--color-gekko-500) text-black font-semibold shadow-md shadow-(--color-gekko-500)/20'
                : 'text-(--color-text-secondary) hover:bg-white/5 hover:text-white'
            }`}
          >
            <Trophy className="size-4" /> Hall of Fame CMS
          </button>
          <Link
            href="/moderator"
            className="ml-auto flex items-center gap-2 rounded-xl border border-(--glass-border) bg-white/5 px-4 py-2 text-sm font-medium text-(--color-text-secondary) transition hover:border-(--color-gekko-500)/40 hover:text-white"
          >
            <BadgeAlert className="size-4 text-(--color-gekko-400)" /> Switch to Moderator Dashboard
          </Link>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="glass rounded-2xl p-6 border border-(--glass-border)">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-(--color-text-muted)">Total Members</span>
                  <Users className="size-5 text-(--color-gekko-400)" />
                </div>
                <p className="mt-4 font-(family-name:--font-heading) text-3xl font-bold">{usersList.length}</p>
                <p className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
                  <Sparkles className="size-3" /> System synchronized
                </p>
              </div>

              <div className="glass rounded-2xl p-6 border border-(--glass-border)">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-(--color-text-muted)">Moderators</span>
                  <UserCheck className="size-5 text-indigo-400" />
                </div>
                <p className="mt-4 font-(family-name:--font-heading) text-3xl font-bold">
                  {usersList.filter((u) => u.role === 'moderator').length}
                </p>
                <p className="mt-1 text-xs text-(--color-text-muted)">Assigned staff</p>
              </div>

              <div className="glass rounded-2xl p-6 border border-(--glass-border)">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-(--color-text-muted)">Pending Reports</span>
                  <AlertTriangle className="size-5 text-amber-400" />
                </div>
                <p className="mt-4 font-(family-name:--font-heading) text-3xl font-bold text-amber-400">
                  {reportsList.filter((r) => r.status === 'pending').length}
                </p>
                <p className="mt-1 text-xs text-amber-400/80">Requires review</p>
              </div>

              <div className="glass rounded-2xl p-6 border border-(--glass-border)">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-(--color-text-muted)">System Status</span>
                  <Activity className="size-5 text-emerald-400" />
                </div>
                <p className="mt-4 font-(family-name:--font-heading) text-2xl font-bold text-emerald-400">Operational</p>
                <p className="mt-1 text-xs text-(--color-text-muted)">Phase 2 Scaffold Active</p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="glass rounded-3xl p-8 border border-(--glass-border)">
              <h2 className="font-(family-name:--font-heading) text-xl font-bold tracking-tight">Admin Quick Actions</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <button
                  onClick={() => setActiveTab('users')}
                  className="flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-white/5 p-4 text-left transition hover:border-(--color-gekko-500)/50 hover:bg-white/10"
                >
                  <div className="grid size-10 place-items-center rounded-xl bg-(--color-gekko-500)/20 text-(--color-gekko-400)">
                    <UserCheck className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Assign Moderator Role</h3>
                    <p className="text-xs text-(--color-text-muted)">Promote users to Moderator</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('moderation')}
                  className="flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-white/5 p-4 text-left transition hover:border-(--color-gekko-500)/50 hover:bg-white/10"
                >
                  <div className="grid size-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                    <ShieldAlert className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Review Reports Queue</h3>
                    <p className="text-xs text-(--color-text-muted)">Resolve pending tickets</p>
                  </div>
                </button>

                <Link
                  href="/hall-of-fame"
                  className="flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-white/5 p-4 text-left transition hover:border-(--color-gekko-500)/50 hover:bg-white/10"
                >
                  <div className="grid size-10 place-items-center rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Trophy className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Public Hall of Fame</h3>
                    <p className="text-xs text-(--color-text-muted)">View community achievements</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER & ROLE MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight">User & Role Management</h2>
                <p className="text-sm text-(--color-text-secondary)">Manage registered members and assign Moderator / Admin permissions.</p>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
                  <input
                    type="text"
                    placeholder="Search username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-full rounded-xl border border-(--glass-border) bg-black/40 pl-9 pr-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
                  />
                </div>

                <select
                  value={selectedRoleFilter}
                  onChange={(e) => setSelectedRoleFilter(e.target.value)}
                  className="h-10 rounded-xl border border-(--glass-border) bg-black/40 px-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
                >
                  <option value="all">All Roles</option>
                  <option value="member">Member</option>
                  <option value="moderator">Moderator</option>
                  <option value="developer">Developer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="glass overflow-hidden rounded-2xl border border-(--glass-border)">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 border-b border-(--glass-border) font-mono text-xs uppercase tracking-wider text-(--color-text-muted)">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Current Role</th>
                      <th className="px-6 py-4">Level / XP</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4 text-right">Assign Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--glass-border)">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="transition hover:bg-white/[0.02]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64'}
                              alt={user.username}
                              className="size-9 rounded-full object-cover border border-(--glass-border)"
                            />
                            <div>
                              <p className="font-semibold text-white">{user.displayName || user.username}</p>
                              <p className="text-xs text-(--color-text-muted)">@{user.username}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                              user.role === 'admin'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : user.role === 'moderator'
                                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                                : user.role === 'developer'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-white/10 text-(--color-text-secondary) border border-white/10'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-mono text-xs">
                          Lvl {user.level} · {user.xp.toLocaleString()} XP
                        </td>

                        <td className="px-6 py-4 text-xs text-(--color-text-muted)">
                          {user.location || 'Global'}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="h-8 rounded-lg border border-(--glass-border) bg-black/60 px-2 text-xs text-white outline-none focus:border-(--color-gekko-500)"
                          >
                            <option value="member">Member</option>
                            <option value="moderator">Set Moderator</option>
                            <option value="developer">Developer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MODERATION QUEUE */}
        {activeTab === 'moderation' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight">Moderation & Reports</h2>
              <p className="text-sm text-(--color-text-secondary)">Review community reports, member flags, and safety requests.</p>
            </div>

            <div className="space-y-4">
              {reportsList.map((report) => (
                <div key={report.id} className="glass rounded-2xl p-6 border border-(--glass-border) flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-(--color-gekko-400)">{report.id}</span>
                      <span className="text-xs text-(--color-text-muted)">• {report.date}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-mono uppercase font-semibold ${
                          report.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : report.status === 'approved'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <p className="font-semibold text-white text-base">
                      User <span className="text-(--color-gekko-400)">@{report.reportedUser}</span> reported by <span className="text-(--color-text-secondary)">@{report.reporter}</span>
                    </p>
                    <p className="text-xs text-(--color-text-muted)">Reason: {report.reason}</p>
                  </div>

                  {report.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleResolveReport(report.id, 'approved')}
                        className="flex items-center gap-1 rounded-xl bg-rose-500/20 border border-rose-500/40 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/30"
                      >
                        <XCircle className="size-3.5" /> Warn / Ban User
                      </button>
                      <button
                        onClick={() => handleResolveReport(report.id, 'dismissed')}
                        className="flex items-center gap-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30"
                      >
                        <CheckCircle className="size-3.5" /> Dismiss Report
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HALL OF FAME CMS */}
        {activeTab === 'hof' && (
          <div className="glass rounded-3xl p-8 border border-(--glass-border) space-y-4">
            <h2 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight">Hall of Fame Content CMS</h2>
            <p className="text-sm text-(--color-text-secondary)">Manage published community achievements, tournament MVP awards, and hall of fame entries.</p>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/hall-of-fame"
                className="rounded-xl bg-(--color-gekko-500) px-4 py-2.5 font-semibold text-xs text-black hover:bg-(--color-gekko-400)"
              >
                View Hall of Fame Page
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
