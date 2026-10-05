import { Leadership } from '@/components/landing/leadership';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { PageHeader } from '@/components/marketing/page-header';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { eventService } from '@/services/event.service';
import { gameService } from '@/services/game.service';
import { listMembers, allMembers } from '@/services/member.service';
import { Calendar, Gamepad2, MessageCircle, Sparkles, Trophy, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Team Gekko is a gaming community first. Squad up, compete, host events, and grow into more. Here is what we are, what we are not, and how the community runs.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About · Team Gekko',
    description: 'Who we are, what we play, and how the community runs.',
    url: '/about',
  },
};

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

const VALUES = [
  {
    icon: Users,
    title: 'Show up for each other',
    description:
      'We organize around the people who show up — voice channels, queues, late-night runs. Members coach members. Captains pick captains.',
    accent: 'gekko' as const,
  },
  {
    icon: Trophy,
    title: 'Compete without ego',
    description:
      'Cups and brackets — they sharpen the squad. We climb, we lose, we recap. Nobody flames, nobody gatekeeps.',
    accent: 'pink' as const,
  },
  {
    icon: Sparkles,
    title: 'Build small, ship often',
    description:
      'The platform itself is a community project. Every release tightens a workflow, fixes a friction, or makes a moment feel cinematic.',
    accent: 'cyan' as const,
  },
];

export default async function AboutPage() {
  const [games, members, events] = await Promise.all([
    gameService.all(),
    allMembers(),
    eventService.all(),
  ]);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <PageHeader
              eyebrow="About"
              title="A gaming community, first."
              description="Team Gekko is where the squad plays, competes, and grows together. Daily-rotation FPS nights, weekend BR runs, sports cups once a month, in-person meetups when people travel — all on one platform built by members, for members."
              action={
                <Button asChild size="lg">
                  <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                    Join the squad <MessageCircle className="size-4" />
                  </a>
                </Button>
              }
            />
          </div>
        </section>

        {/* Story */}
        <section className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div className="md:sticky md:top-24 md:self-start">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                Origin
              </p>
              <h2 className="mt-3 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl">
                Where it started
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
              <p>
                Team Gekko started as a four-person Discord voice channel. Someone said "let's play
                Valorant tonight" — and never really stopped. A year later it was a dozen daily
                regulars, a monthly cup, and a printed trophy that traveled.
              </p>
              <p>
                Today it's a multi-game community with squads across Valorant, PUBG, CS2, FIFA, Apex
                Legends, Rocket League, and a handful of on-request titles. Daily queues, weekend
                tournaments, occasional meetups in Tokyo and Berlin.
              </p>
              <p>
                We're not a project incubator, an esports org, or a clan. We are a gaming community
                — and a platform built around that.
              </p>
            </div>
          </div>
        </section>

        {/* What we are / are not */}
        <section className="border-y border-(--glass-border) bg-(--color-bg-deep)/30 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 md:gap-8">
            <div className="glass rounded-3xl p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                What we are
              </p>
              <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight">
                A gaming community
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-(--color-text-secondary) sm:text-base">
                {[
                  'Daily queues across 6 main games + 3 on-request titles.',
                  'Monthly cups with real (printed) trophies.',
                  'In-person meetups when the squad travels.',
                  'Workshops + coaching for newer players.',
                  'A community-built platform that supports all of the above.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 size-2 shrink-0 rounded-full bg-(--color-gekko-400)"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-3xl p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-neon-pink)">
                What we are not
              </p>
              <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight">
                Not these things
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-(--color-text-secondary) sm:text-base">
                {[
                  "An esports organisation. We don't sign players or run rosters under a brand.",
                  "A project incubator. We don't ship multi-contributor software here.",
                  'A grind-only clan. Casual nights are first-class.',
                  'A gatekept community. Everyone gets a queue.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 size-2 shrink-0 rounded-full bg-(--color-neon-pink)"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Stat row */}
        <section className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <StatBlock
                icon={Users}
                label="Members"
                value={members.length.toString()}
                accent="gekko"
              />
              <StatBlock
                icon={Gamepad2}
                label="Games"
                value={games.length.toString()}
                accent="cyan"
              />
              <StatBlock
                icon={Calendar}
                label="Events on the board"
                value={events.length.toString()}
                accent="pink"
              />
              <StatBlock icon={Trophy} label="Cups hosted" value="4+" accent="amber" />
            </dl>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-(--glass-border) bg-(--color-bg-deep)/30 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                Principles
              </p>
              <h2 className="mt-3 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl">
                What we keep coming back to
              </h2>
              <p className="mt-4 text-(--color-text-secondary)">
                Three things shape every event we run, every feature we ship, and every conversation
                in the channel.
              </p>
            </div>
            <ul className="mt-10 grid gap-5 md:gap-6 lg:grid-cols-3">
              {VALUES.map((v) => {
                const Icon = v.icon;
                const color = accentMap[v.accent];
                return (
                  <li
                    key={v.title}
                    className="glass relative flex flex-col gap-4 rounded-3xl p-6 md:p-8"
                  >
                    <div
                      className="grid size-12 place-items-center rounded-xl border"
                      style={{ borderColor: `${color}55`, color, background: `${color}0d` }}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-(family-name:--font-heading) text-xl font-bold tracking-tight">
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-(--color-text-secondary)">
                      {v.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Leadership (reuse landing section) */}
        <Leadership />

        {/* Bottom CTA */}
        <section className="px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="glass relative overflow-hidden rounded-3xl p-8 text-center md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  background:
                    'radial-gradient(at 20% 20%, rgba(0,255,140,0.18) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(139,92,246,0.20) 0px, transparent 50%)',
                }}
              />
              <div className="relative">
                <h3 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  Want in?
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-(--color-text-secondary)">
                  Join Discord, pick a game, react to a role ping. Most regulars were lurking a week
                  before they queued for the first time — that's normal.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild size="xl">
                    <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                      Join Discord <MessageCircle className="size-4" />
                    </a>
                  </Button>
                  <Button asChild variant="glass" size="xl">
                    <Link href="/games">Browse games</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StatBlock({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  accent: keyof typeof accentMap;
}) {
  const color = accentMap[accent];
  return (
    <div>
      <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
        <Icon className="size-3" style={{ color }} />
        {label}
      </dt>
      <dd
        className="mt-1 font-(family-name:--font-heading) text-3xl font-bold tracking-tight tabular-nums sm:text-4xl"
        style={{ color }}
      >
        {value}
      </dd>
    </div>
  );
}