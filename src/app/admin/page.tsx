'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authService, type UserSession } from '@/services/auth.service';
import { memberService } from '@/services/member.service';

import { listMembers } from '@/services/member.service';
import { listEventsBackend } from '@/services/event-backend.service';
import { listHallOfFameParams } from '@/services/hall-of-fame.service';
import { listHallOfShameParams } from '@/services/hall-of-shame.service';
import { StatusBadge } from '@/components/admin/status-badge';
import { LoadingSkeleton } from '@/components/admin/loading-skeleton';
import {
  Users,
  Calendar,
  Trophy,
  Skull,
  Plus,
  ArrowRight,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Real stats fetched from APIs
  const [stats, setStats] = useState({
    membersTotal: 0,
    eventsTotal: 0,
    hofTotal: 0,
    hosTotal: 0,
  });

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    async function loadData() {
      try {
        const [membersData, eventsData, hofData, hosData] = await Promise.allSettled([
          listMembers(),
          listEventsBackend(),
          listHallOfFameParams({ published: true }),
          listHallOfShameParams({ published: true }),
        ]);

        const membersTotal = membersData.status === 'fulfilled' ? membersData.value.length : 0;
        const eventsTotal = eventsData.status === 'fulfilled' ? (Array.isArray(eventsData.value) ? eventsData.value.length : eventsData.value?.data?.length || 0) : 0;
        const hofTotal = hofData.status === 'fulfilled' ? (Array.isArray(hofData.value) ? hofData.value.length : hofData.value?.data?.length || 0) : 0;
        const hosTotal = hosData.status === 'fulfilled' ? (Array.isArray(hosData.value) ? hosData.value.length : hosData.value?.data?.length || 0) : 0;

        setStats({ membersTotal, eventsTotal, hofTotal, hosTotal });

        // Load member activity if username exists
        if (currentUser?.username) {
          const act = await memberService.listActivity(currentUser.username);
          setActivities(act || []);
        }
      } catch {
        // Fallback silently
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  const role = user?.role || 'member';
  const isAdmin = role === 'admin' || role === 'super_admin';
  const isModerator = role === 'moderator' || isAdmin;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Hero Header */}
      <div className="glass rounded-3xl border border-(--glass-border) p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-gekko-400)">
              COMMUNITY COMMAND CENTER
            </span>
            <h1 className="mt-2 font-(family-name:--font-heading) text-3xl font-bold tracking-tight text-white">
              {getGreeting()}, {user?.displayName || user?.username}
            </h1>
            <p className="mt-2 text-sm text-(--color-text-secondary)">
              Here’s what’s happening across the Gekko community.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-mono text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>REAL-TIME SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isAdmin && (
          <div className="glass rounded-2xl border border-(--glass-border) p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-muted)">
                Total Members
              </span>
              <div className="grid size-9 place-items-center rounded-xl bg-(--color-gekko-500)/20 text-(--color-gekko-400)">
                <Users className="size-5" />
              </div>
            </div>
            <p className="mt-4 font-(family-name:--font-heading) text-3xl font-bold text-white">
              {stats.membersTotal}
            </p>
            <p className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
              <Sparkles className="size-3" /> Live directory API
            </p>
          </div>
        )}

        <div className="glass rounded-2xl border border-(--glass-border) p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-muted)">
              Events
            </span>
            <div className="grid size-9 place-items-center rounded-xl bg-blue-500/20 text-blue-400">
              <Calendar className="size-5" />
            </div>
          </div>
          <p className="mt-4 font-(family-name:--font-heading) text-3xl font-bold text-white">
            {stats.eventsTotal}
          </p>
          <p className="mt-1 text-xs text-(--color-text-muted)">Community events</p>
        </div>

        <div className="glass rounded-2xl border border-(--glass-border) p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-muted)">
              Hall of Fame
            </span>
            <div className="grid size-9 place-items-center rounded-xl bg-indigo-500/20 text-indigo-400">
              <Trophy className="size-5" />
            </div>
          </div>
          <p className="mt-4 font-(family-name:--font-heading) text-3xl font-bold text-white">
            {stats.hofTotal}
          </p>
          <p className="mt-1 text-xs text-indigo-400">Published honors</p>
        </div>

        <div className="glass rounded-2xl border border-(--glass-border) p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-muted)">
              Hall of Shame
            </span>
            <div className="grid size-9 place-items-center rounded-xl bg-rose-500/20 text-rose-400">
              <Skull className="size-5" />
            </div>
          </div>
          <p className="mt-4 font-(family-name:--font-heading) text-3xl font-bold text-white">
            {stats.hosTotal}
          </p>
          <p className="mt-1 text-xs text-rose-400">Moderated entries</p>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="glass rounded-3xl border border-(--glass-border) p-8">
        <h2 className="font-(family-name:--font-heading) text-xl font-bold tracking-tight text-white">
          Quick Actions
        </h2>
        <p className="mt-1 text-xs text-(--color-text-secondary)">
          Authorized actions available for your role.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isAdmin && (
            <Link
              href="/admin/members"
              className="flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-white/5 p-4 text-left transition hover:border-(--color-gekko-500)/50 hover:bg-white/10"
            >
              <div className="grid size-10 place-items-center rounded-xl bg-(--color-gekko-500)/20 text-(--color-gekko-400)">
                <Users className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-white">Manage Members</h3>
                <p className="text-[10px] text-(--color-text-muted)">Directory & roles</p>
              </div>
            </Link>
          )}

          {isModerator && (
            <Link
              href="/admin/events"
              className="flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-white/5 p-4 text-left transition hover:border-blue-500/50 hover:bg-white/10"
            >
              <div className="grid size-10 place-items-center rounded-xl bg-blue-500/20 text-blue-400">
                <Calendar className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-white">Manage Events</h3>
                <p className="text-[10px] text-(--color-text-muted)">Tournaments & Scrims</p>
              </div>
            </Link>
          )}

          {isModerator && (
            <Link
              href="/admin/hall-of-fame"
              className="flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-white/5 p-4 text-left transition hover:border-indigo-500/50 hover:bg-white/10"
            >
              <div className="grid size-10 place-items-center rounded-xl bg-indigo-500/20 text-indigo-400">
                <Trophy className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-white">Hall of Fame</h3>
                <p className="text-[10px] text-(--color-text-muted)">Publish awards</p>
              </div>
            </Link>
          )}

          {isModerator && (
            <Link
              href="/admin/hall-of-shame"
              className="flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-white/5 p-4 text-left transition hover:border-rose-500/50 hover:bg-white/10"
            >
              <div className="grid size-10 place-items-center rounded-xl bg-rose-500/20 text-rose-400">
                <Skull className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-white">Hall of Shame</h3>
                <p className="text-[10px] text-(--color-text-muted)">Moderated logs</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Activity Feed Section */}
      <div className="glass rounded-3xl border border-(--glass-border) p-8">
        <h2 className="font-(family-name:--font-heading) text-xl font-bold tracking-tight text-white">
          Recent Activity
        </h2>
        <div className="mt-6 space-y-3">
          {activities.length > 0 ? (
            activities.map((act, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-xl border border-(--glass-border) bg-white/5 p-3 text-xs">
                <span className="text-white">{act.title || act.action}</span>
                <span className="font-mono text-(--color-text-muted)">{act.timestamp || 'Just now'}</span>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-(--glass-border) bg-black/20 p-8 text-center">
              <div className="space-y-2">
                <Activity className="mx-auto size-8 text-(--color-text-muted)" />
                <p className="font-semibold text-sm text-white">No recent audit log activity.</p>
                <p className="text-xs text-(--color-text-muted)">All platform operations are currently nominal.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
