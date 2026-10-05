'use client';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { type UserSession, authService } from '@/services/auth.service';
import { eventService } from '@/services/event.service';
import { allMembers } from '@/services/member.service';
import type { CommunityEvent } from '@/types/event';
import type { DirectoryMember } from '@/types/member';
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  ExternalLink,
  Gamepad2,
  LogOut,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function formatEventDate(event: CommunityEvent) {
  return `${event.startAt ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(event.startAt)) : 'Date TBA'} · ${event.location}`;
}

export default function MemberDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [member, setMember] = useState<DirectoryMember | null>(null);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.replace('/login?redirect=/dashboard');
      return;
    }
    if (
      currentUser.role === 'admin' ||
      currentUser.role === 'super_admin' ||
      currentUser.role === 'moderator'
    ) {
      router.replace('/admin');
      return;
    }

    setUser(currentUser);
    Promise.all([allMembers(), eventService.all()])
      .then(([members, allEvents]) => {
        const matchedMember = members.find(
          (item) => item.username === currentUser.username || item.id === currentUser.id,
        );
        setMember(
          matchedMember
            ? {
                ...matchedMember,
                displayName: matchedMember.displayName || currentUser.displayName,
                xp: typeof matchedMember.xp === 'number' ? matchedMember.xp : 0,
                level: typeof matchedMember.level === 'number' ? matchedMember.level : 1,
                badges: Array.isArray(matchedMember.badges) ? matchedMember.badges : [],
                mainGames: Array.isArray(matchedMember.mainGames) ? matchedMember.mainGames : [],
                joinedAt: matchedMember.joinedAt || new Date().toISOString(),
              }
            : null,
        );
        setEvents(
          allEvents
            .filter(
              (event) => (event.status === 'open' || event.status === 'live') && event.startAt,
            )
            .sort((a, b) => new Date(a.startAt ?? 0).getTime() - new Date(b.startAt ?? 0).getTime())
            .slice(0, 3),
        );
      })
      .finally(() => setLoading(false));
  }, [router]);

  const progress = useMemo(() => {
    if (!member) return 0;
    const levelStart = (member.level - 1) * 1000;
    return Math.min(100, Math.max(0, ((member.xp - levelStart) / 1000) * 100));
  }, [member]);

  if (!user || loading) {
    return (
      <>
        <Navbar />
        <main
          id="main-content"
          className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-36 md:px-10"
        >
          <div className="h-72 animate-pulse rounded-3xl bg-(--glass-tint)" />
        </main>
      </>
    );
  }

  const displayName = member?.displayName || user.displayName || user.username;
  const firstName = displayName?.split(' ')[0] || displayName || 'Member';

  return (
    <>
      <Navbar />
      <main id="main-content" className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card) p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-32 size-80 rounded-full bg-(--color-gekko-500)/10 blur-3xl" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-(--color-gekko-400)">
                  <span className="size-1.5 rounded-full bg-(--color-gekko-400)" />
                  Member workspace
                </div>
                <h1 className="mt-3 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl">
                  {greeting()}, {firstName}.
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-(--color-text-secondary)">
                  Your Gekko hub for progress, community activity, and the next match on your
                  calendar.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/members/${user.username}`}>
                    View profile <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                    Open Discord <ExternalLink />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <section className="grid gap-4 sm:grid-cols-3">
                <StatCard
                  icon={Sparkles}
                  label="Current level"
                  value={member ? `LVL ${member.level}` : 'Member'}
                  detail={member ? `${member.xp.toLocaleString()} XP earned` : 'Profile syncing'}
                />
                <StatCard
                  icon={Trophy}
                  label="Badges earned"
                  value={String(member?.badges.length ?? 0).padStart(2, '0')}
                  detail="Milestones unlocked"
                />
                <StatCard
                  icon={CalendarDays}
                  label="Next events"
                  value={String(events.length).padStart(2, '0')}
                  detail="Open community events"
                />
              </section>

              <section className="glass rounded-3xl p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-(--color-gekko-400)">
                      Progression
                    </p>
                    <h2 className="mt-2 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
                      Your next milestone
                    </h2>
                  </div>
                  <Sparkles className="size-5 text-(--color-gekko-400)" />
                </div>
                <div className="mt-6 flex items-end justify-between text-sm">
                  <span className="text-(--color-text-secondary)">Level {member?.level ?? 1}</span>
                  <span className="font-mono text-xs text-(--color-text-muted)">
                    {Math.round(progress)}% complete
                  </span>
                  <span className="text-(--color-text-secondary)">
                    Level {(member?.level ?? 1) + 1}
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-(--color-gekko-500) transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-4 text-sm text-(--color-text-secondary)">
                  Keep showing up, joining events, and contributing to move your community profile
                  forward.
                </p>
              </section>

              <section className="glass rounded-3xl p-6 sm:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-(--color-gekko-400)">
                      Calendar
                    </p>
                    <h2 className="mt-2 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
                      Upcoming in Gekko
                    </h2>
                  </div>
                  <Link
                    href="/events"
                    className="hidden items-center gap-1 text-xs font-medium text-(--color-gekko-400) hover:text-(--color-gekko-300) sm:flex"
                  >
                    View all <ChevronRight className="size-4" />
                  </Link>
                </div>
                <div className="mt-6 space-y-3">
                  {events.length > 0 ? (
                    events.map((event) => (
                      <Link
                        key={event.slug}
                        href={`/events/${event.slug}`}
                        className="group flex items-center gap-4 rounded-2xl border border-(--glass-border) p-4 transition hover:border-(--color-gekko-500)/40 hover:bg-(--glass-tint)"
                      >
                        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-(--color-gekko-500)/10 text-(--color-gekko-400)">
                          <Gamepad2 className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-semibold text-(--color-text-primary)">
                            {event.title}
                          </h3>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-(--color-text-muted)">
                            <Clock3 className="size-3.5" /> {formatEventDate(event)}
                          </p>
                        </div>
                        <ArrowRight className="size-4 text-(--color-text-muted) transition group-hover:translate-x-1 group-hover:text-(--color-gekko-400)" />
                      </Link>
                    ))
                  ) : (
                    <EmptyState label="No upcoming events yet." href="/events" />
                  )}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="glass rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  {member?.avatar ? (
                    <img src={member.avatar} alt="" className="size-14 rounded-2xl object-cover" />
                  ) : (
                    <div className="grid size-14 place-items-center rounded-2xl bg-(--color-gekko-500)/15 font-(family-name:--font-heading) text-xl font-bold text-(--color-gekko-400)">
                      {firstName.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="truncate font-(family-name:--font-heading) text-lg font-bold">
                      {displayName}
                    </h2>
                    <p className="truncate text-sm text-(--color-text-secondary)">
                      @{user.username}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                  <MiniMetric label="Role" value={member?.role || user.role} />
                  <MiniMetric
                    label="Member since"
                    value={member ? formatDate(member.joinedAt) : 'Recently'}
                  />
                </div>
                <Link
                  href={`/members/${user.username}`}
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-(--glass-border) px-4 py-2.5 text-sm font-medium transition hover:border-(--color-gekko-500)/50 hover:bg-(--glass-tint)"
                >
                  Profile settings <ChevronRight className="size-4" />
                </Link>
              </section>

              <section className="rounded-3xl border border-(--color-gekko-500)/20 bg-(--color-gekko-500)/[0.06] p-6">
                <ShieldCheck className="size-5 text-(--color-gekko-400)" />
                <h2 className="mt-4 font-(family-name:--font-heading) font-bold">
                  Community first
                </h2>
                <p className="mt-2 text-sm leading-6 text-(--color-text-secondary)">
                  Connect with the squad, find your next stack, and keep the community moving
                  forward.
                </p>
                <a
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-(--color-gekko-400) hover:text-(--color-gekko-300)"
                >
                  Join the conversation <ExternalLink className="size-3.5" />
                </a>
              </section>

              <button
                type="button"
                onClick={() => {
                  authService.logout();
                  router.replace('/');
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm text-(--color-text-muted) transition hover:bg-white/5 hover:text-(--color-text-primary)"
              >
                <LogOut className="size-4" /> Sign out
              </button>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: { icon: typeof Sparkles; label: string; value: string; detail: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-text-muted)">
          {label}
        </span>
        <Icon className="size-4 text-(--color-gekko-400)" />
      </div>
      <p className="mt-5 font-(family-name:--font-heading) text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-(--color-text-secondary)">{detail}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-(--glass-border) bg-white/[0.02] px-3 py-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-(--color-text-muted)">
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-medium text-(--color-text-primary)">{value}</p>
    </div>
  );
}

function EmptyState({ label, href }: { label: string; href: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-(--glass-border) p-6 text-center">
      <p className="text-sm text-(--color-text-secondary)">{label}</p>
      <Link href={href} className="mt-2 inline-block text-xs font-medium text-(--color-gekko-400)">
        Explore events
      </Link>
    </div>
  );
}
