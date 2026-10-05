import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { PageHeader } from '@/components/marketing/page-header';
import { PulseDot } from '@/components/shared/pulse-dot';
import { Reveal } from '@/components/shared/reveal';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import {
  type GekkoMatch,
  type GekkoMatchStatus,
  type GekkoTeam,
  type GekkoTeamIcon,
  computeStandings,
  gekkoCup,
  gekkoFinal,
  gekkoMatches,
  gekkoTeams,
  groupStageComplete,
  isPlayed,
  teamById,
} from '@/data/gekko-cup';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Briefcase,
  Crown,
  Eye,
  Leaf,
  type LucideIcon,
  Skull,
  Trophy,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gekko FIFA 26 Co-Op Tournament',
  description:
    'Live standings, fixtures, and results for the Gekko FIFA 26 Co-Op Tournament — a 5-team 2v2 round-robin. Everyone plays everyone, and the top two meet in the final.',
  alternates: { canonical: '/tournament' },
  openGraph: {
    title: 'Gekko FIFA 26 Co-Op Tournament · Team Gekko',
    description: 'Five teams, round-robin, top two to the final. Follow every result live.',
    url: '/tournament',
  },
};

const ICONS: Record<GekkoTeamIcon, LucideIcon> = {
  briefcase: Briefcase,
  leaf: Leaf,
  skull: Skull,
  eye: Eye,
  zap: Zap,
};

const STATUS_BADGE: Record<GekkoMatchStatus, { label: string; className: string }> = {
  pending: {
    label: 'Upcoming',
    className: 'border-(--glass-border) text-(--color-text-muted)',
  },
  live: {
    label: 'Live',
    className: 'border-(--color-danger)/40 text-(--color-danger) bg-(--color-danger)/10',
  },
  completed: {
    label: 'Final',
    className: 'border-(--color-gekko-500)/40 text-(--color-gekko-300) bg-(--color-gekko-500)/10',
  },
};

function TeamIcon({ team, size = 'md' }: { team: GekkoTeam; size?: 'sm' | 'md' | 'lg' }) {
  const Icon = ICONS[team.icon];
  const box =
    size === 'lg'
      ? 'size-12 rounded-2xl'
      : size === 'sm'
        ? 'size-8 rounded-lg'
        : 'size-9 rounded-xl';
  const glyph = size === 'lg' ? 'size-6' : size === 'sm' ? 'size-4' : 'size-[18px]';
  return (
    <span
      className={cn('grid shrink-0 place-items-center border', box)}
      style={{
        color: team.accent,
        backgroundColor: `${team.accent}1a`,
        borderColor: `${team.accent}40`,
      }}
      aria-hidden
    >
      <Icon className={glyph} />
    </span>
  );
}

/** Standings rank badge — gold crown for the leader, green for the other qualifier. */
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span
        className="inline-flex size-6 items-center justify-center rounded-full"
        style={{ backgroundColor: '#fbbf2426', color: '#fbbf24' }}
        title="Leader"
      >
        <Crown className="size-3.5" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        'inline-flex size-6 items-center justify-center rounded-full font-mono text-xs',
        rank === 2
          ? 'bg-(--color-gekko-500)/20 text-(--color-gekko-300)'
          : 'text-(--color-text-muted)',
      )}
    >
      {rank}
    </span>
  );
}

/** Bare team icon in the team's accent colour (no chip) — for inline labels. */
function TeamGlyph({ team, className }: { team: GekkoTeam; className?: string }) {
  const Icon = ICONS[team.icon];
  return (
    <span style={{ color: team.accent }} aria-hidden>
      <Icon className={className ?? 'size-3.5'} />
    </span>
  );
}

function TeamLabel({ id, align = 'left' }: { id: string; align?: 'left' | 'right' }) {
  const team = teamById(id);
  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-2.5',
        align === 'right' && 'flex-row-reverse text-right',
      )}
    >
      <TeamIcon team={team} />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-(--color-text-primary)">{team.name}</p>
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          {team.players.join(' · ')}
        </p>
      </div>
    </div>
  );
}

function ScoreCell({ match }: { match: Pick<GekkoMatch, 'scoreA' | 'scoreB' | 'status'> }) {
  if (!isPlayed(match)) {
    return (
      <span className="font-mono text-sm text-(--color-text-muted)">
        {match.status === 'live' ? '· vs ·' : 'vs'}
      </span>
    );
  }
  return (
    <span className="font-mono text-base font-bold tabular-nums text-(--color-text-primary)">
      {match.scoreA}
      <span className="px-1 text-(--color-text-muted)">–</span>
      {match.scoreB}
    </span>
  );
}

function MatchRow({ match }: { match: GekkoMatch }) {
  const played = isPlayed(match);
  const aWon = played && (match.scoreA ?? 0) > (match.scoreB ?? 0);
  const bWon = played && (match.scoreB ?? 0) > (match.scoreA ?? 0);
  const badge = STATUS_BADGE[match.status];

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-4 sm:gap-4">
      <div className={cn('relative', !aWon && played && 'opacity-55')}>
        <TeamLabel id={match.teamA} />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <ScoreCell match={match} />
        <span
          className={cn(
            'rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]',
            badge.className,
          )}
        >
          {badge.label}
        </span>
      </div>
      <div className={cn('flex justify-end', !bWon && played && 'opacity-55')}>
        <TeamLabel id={match.teamB} align="right" />
      </div>
    </div>
  );
}

/** Live status pill shown beside the page title — group-stage progress. */
function LiveStatus({ played, total }: { played: number; total: number }) {
  const done = played >= total;
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-(--color-danger)/30 bg-(--color-danger)/[0.08] px-4 py-2.5">
      <PulseDot className="size-2" />
      <div className="text-left">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-(--color-danger)">
          {done ? 'Live · Knockout' : 'Live · Group stage'}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] tabular-nums text-(--color-text-muted)">
          {played}/{total} games played
        </p>
      </div>
    </div>
  );
}

export default function TournamentPage() {
  const standings = computeStandings();
  const matchdays = [...new Set(gekkoMatches.map((m) => m.matchday))].sort((a, b) => a - b);
  const playedCount = gekkoMatches.filter(isPlayed).length;
  const finalLocked = groupStageComplete();
  const [first, second] = standings;

  // Once the group stage is done, the final is contested by the top two seeds.
  const finalA = gekkoFinal.teamA ?? (finalLocked ? (first?.team.id ?? null) : null);
  const finalB = gekkoFinal.teamB ?? (finalLocked ? (second?.team.id ?? null) : null);

  // Champion: the final's winning side once it is played.
  const finalPlayed = isPlayed(gekkoFinal);
  const championId =
    finalPlayed && finalA && finalB
      ? (gekkoFinal.scoreA ?? 0) > (gekkoFinal.scoreB ?? 0)
        ? finalA
        : finalB
      : null;
  const champion = championId ? teamById(championId) : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: gekkoCup.name,
    sport: `Esports · ${gekkoCup.game}`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: gekkoCup.playedOn,
    url: `${siteConfig.url}/tournament`,
    location: { '@type': 'Place', name: 'Bangladesh', address: 'Bangladesh' },
    organizer: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    competitor: gekkoTeams.map((t) => ({ '@type': 'SportsTeam', name: t.name })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted JSON serialization
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content">
        <section className="relative overflow-hidden border-b border-(--glass-border) px-6 pb-12 pt-32 md:px-10 md:pt-40">
          {/* Official EA SPORTS FC 26 cover band — dark scrim keeps content readable */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Image
              src={gekkoCup.coverImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-(--color-bg-void)/70 via-(--color-bg-void)/85 to-(--color-bg-void)" />
            <div className="absolute inset-0 bg-gradient-to-r from-(--color-bg-void)/80 via-transparent to-(--color-bg-void)/40" />
            <div className="absolute -top-20 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,255,140,0.10),transparent_62%)] blur-2xl" />
          </div>
          <div className="relative mx-auto max-w-6xl">
            <Reveal>
              <Button
                asChild
                variant="link"
                className="mb-8 px-0 text-(--color-text-muted) hover:text-(--color-gekko-300)"
              >
                <Link href={`/events/${gekkoCup.eventSlug}`}>
                  <ArrowLeft className="size-4" /> Back to event
                </Link>
              </Button>
              <PageHeader
                eyebrow={`Tournament · ${gekkoCup.game}`}
                title={gekkoCup.name}
                description={`${gekkoTeamsCount()} teams play a single round-robin — everyone plays everyone, and the top two meet in the grand final.`}
                action={<LiveStatus played={playedCount} total={gekkoMatches.length} />}
              />
            </Reveal>
          </div>
        </section>

        {/* Champion banner */}
        {champion && (
          <section className="relative px-6 pb-10 md:px-10">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div
                  className="flex flex-col items-center gap-4 rounded-3xl border p-8 text-center sm:flex-row sm:text-left"
                  style={{
                    borderColor: `${champion.accent}55`,
                    background: `linear-gradient(120deg, ${champion.accent}1f, transparent 70%)`,
                  }}
                >
                  <TeamIcon team={champion} size="lg" />
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-gekko-400)">
                      Champions
                    </p>
                    <h2 className="mt-1 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                      {champion.name}
                    </h2>
                    <p className="mt-1 text-sm text-(--color-text-secondary)">
                      {champion.players.join(' & ')} take the Gekko Cup.
                    </p>
                  </div>
                  <Image
                    src={gekkoCup.trophyImage}
                    alt=""
                    width={240}
                    height={320}
                    aria-hidden
                    className="w-20 shrink-0 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] md:w-24"
                  />
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Standings */}
        <section className="relative px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal delay={80}>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                Standings
              </h2>

              {playedCount === 0 && (
                <p className="mb-4 rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 px-4 py-3 text-sm text-(--color-text-secondary)">
                  No games played yet — the table updates live as results come in.
                </p>
              )}

              {/* Mobile: condensed cards (no horizontal scroll) */}
              <ul className="space-y-2 sm:hidden">
                {standings.map((s, i) => {
                  const qualifies = i < 2;
                  return (
                    <li
                      key={s.team.id}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-3',
                        qualifies && 'border-(--color-gekko-500)/30 bg-(--color-gekko-500)/[0.06]',
                      )}
                    >
                      <RankBadge rank={i + 1} />
                      <TeamIcon team={s.team} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-(--color-text-primary)">
                          {s.team.name}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                          {s.won}W · {s.drawn}D · {s.lost}L · GD{' '}
                          {s.goalDiff > 0 ? `+${s.goalDiff}` : s.goalDiff}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-bold tabular-nums text-(--color-text-primary)">
                          {s.points}
                        </p>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                          pts
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Desktop: full table */}
              <div className="hidden overflow-x-auto rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 sm:block">
                <table className="w-full min-w-[680px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-(--glass-border) text-left font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                      <th scope="col" className="px-4 py-3 font-medium">
                        #
                      </th>
                      <th scope="col" className="px-4 py-3 font-medium">
                        Team
                      </th>
                      <th scope="col" className="px-3 py-3 text-center font-medium" title="Played">
                        P
                      </th>
                      <th scope="col" className="px-3 py-3 text-center font-medium" title="Won">
                        W
                      </th>
                      <th scope="col" className="px-3 py-3 text-center font-medium" title="Drawn">
                        D
                      </th>
                      <th scope="col" className="px-3 py-3 text-center font-medium" title="Lost">
                        L
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-center font-medium"
                        title="Goals for : against"
                      >
                        Goals
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-center font-medium"
                        title="Goal difference"
                      >
                        Diff
                      </th>
                      <th scope="col" className="px-4 py-3 text-center font-medium" title="Points">
                        Pts
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((s, i) => {
                      const qualifies = i < 2;
                      return (
                        <tr
                          key={s.team.id}
                          className={cn(
                            'border-b border-(--glass-border)/60 transition last:border-0 hover:bg-(--glass-tint)',
                            qualifies && 'bg-(--color-gekko-500)/[0.06]',
                          )}
                        >
                          <td className="px-4 py-3">
                            <RankBadge rank={i + 1} />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <TeamIcon team={s.team} size="sm" />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="truncate font-semibold text-(--color-text-primary)">
                                    {s.team.name}
                                  </p>
                                  {qualifies && (
                                    <span className="rounded-full bg-(--color-gekko-500)/15 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-(--color-gekko-300)">
                                      Q
                                    </span>
                                  )}
                                </div>
                                <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                                  {s.team.players.join(' · ')}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-center tabular-nums text-(--color-text-secondary)">
                            {s.played}
                          </td>
                          <td className="px-3 py-3 text-center tabular-nums text-(--color-text-secondary)">
                            {s.won}
                          </td>
                          <td className="px-3 py-3 text-center tabular-nums text-(--color-text-secondary)">
                            {s.drawn}
                          </td>
                          <td className="px-3 py-3 text-center tabular-nums text-(--color-text-secondary)">
                            {s.lost}
                          </td>
                          <td className="px-3 py-3 text-center font-mono text-xs tabular-nums text-(--color-text-secondary)">
                            {s.goalsFor}:{s.goalsAgainst}
                          </td>
                          <td className="px-3 py-3 text-center tabular-nums text-(--color-text-secondary)">
                            {s.goalDiff > 0 ? `+${s.goalDiff}` : s.goalDiff}
                          </td>
                          <td className="px-4 py-3 text-center font-bold tabular-nums text-(--color-text-primary)">
                            {s.points}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                Top 2 (Q) advance to the final · Win 3 pts · Draw 1 pt
              </p>
            </Reveal>
          </div>
        </section>

        {/* Final */}
        <section className="relative px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal delay={100}>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                Grand Final
              </h2>
              <div className="relative overflow-hidden rounded-2xl border border-(--color-gekko-500)/30 bg-gradient-to-b from-(--color-gekko-500)/[0.08] to-transparent p-5 sm:p-6">
                {/* Real EAFC trophy watermark */}
                <Image
                  src={gekkoCup.trophyImage}
                  alt=""
                  width={420}
                  height={560}
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-10 w-40 opacity-[0.08] md:w-52"
                />
                <div className="relative">
                  {finalA && finalB ? (
                    <MatchRow
                      match={{
                        id: 'gc_final',
                        matchday: 0,
                        teamA: finalA,
                        teamB: finalB,
                        scoreA: gekkoFinal.scoreA,
                        scoreB: gekkoFinal.scoreB,
                        status: gekkoFinal.status,
                      }}
                    />
                  ) : playedCount > 0 && first && second ? (
                    <div>
                      <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-(--color-text-muted)">
                        Projected · if the standings hold · {playedCount}/{gekkoMatches.length}{' '}
                        games in
                      </p>
                      <div className="opacity-80">
                        <MatchRow
                          match={{
                            id: 'gc_final_projected',
                            matchday: 0,
                            teamA: first.team.id,
                            teamB: second.team.id,
                            scoreA: null,
                            scoreB: null,
                            status: 'pending',
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-6 text-center">
                      <Trophy className="size-7 text-(--color-gekko-400)" aria-hidden />
                      <p className="text-sm text-(--color-text-secondary)">
                        The two finalists are decided once all group games are played.
                      </p>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                        {playedCount}/{gekkoMatches.length} group games in
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Fixtures by matchday */}
        <section className="relative px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-6xl">
            <Reveal delay={120}>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                Fixtures
              </h2>
              <div className="space-y-8">
                {matchdays.map((day) => {
                  const dayMatches = gekkoMatches.filter((m) => m.matchday === day);
                  const dayDone = dayMatches.filter(isPlayed).length;
                  const resting = gekkoTeamsRestingOn(day);
                  return (
                    <div key={day}>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-(family-name:--font-heading) text-lg font-bold">
                            Matchday {day}
                          </h3>
                          <span
                            className={cn(
                              'rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]',
                              dayDone === dayMatches.length
                                ? 'border-(--color-gekko-500)/40 text-(--color-gekko-300)'
                                : 'border-(--glass-border) text-(--color-text-muted)',
                            )}
                          >
                            {dayDone}/{dayMatches.length}
                          </span>
                        </div>
                        {resting && (
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                            <TeamGlyph team={resting} />
                            {resting.name} rests
                          </span>
                        )}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {dayMatches.map((m) => (
                          <MatchRow key={m.id} match={m} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* small helpers kept local to the page */
function gekkoTeamsCount() {
  return new Set(gekkoMatches.flatMap((m) => [m.teamA, m.teamB])).size;
}

function gekkoTeamsRestingOn(day: number) {
  const playing = new Set(
    gekkoMatches.filter((m) => m.matchday === day).flatMap((m) => [m.teamA, m.teamB]),
  );
  const allIds = new Set(gekkoMatches.flatMap((m) => [m.teamA, m.teamB]));
  const restId = [...allIds].find((id) => !playing.has(id));
  return restId ? teamById(restId) : null;
}
