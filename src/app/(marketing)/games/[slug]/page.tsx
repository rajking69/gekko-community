import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { GameDetailHero } from '@/components/marketing/game-detail-hero';
import { MatchHistory } from '@/components/marketing/match-history';
import { RelatedGames } from '@/components/marketing/related-games';
import { SquadRosterList } from '@/components/marketing/squad-roster';
import { WeeklySchedule } from '@/components/marketing/weekly-schedule';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { gameService } from '@/services/game.service';
import { ArrowRight, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const games = await gameService.all();
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = await gameService.get(slug);
  if (!game) return { title: 'Game not found' };

  const description = `${game.tagline}. ${game.description}`.slice(0, 200);
  return {
    title: game.name,
    description,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: `${game.name} · Team Gekko`,
      description,
      url: `/games/${game.slug}`,
    },
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const game = await gameService.get(slug);
  if (!game) notFound();

  const [squads, matches, allGames] = await Promise.all([
    gameService.listSquads(game.slug),
    gameService.listMatches(game.slug, 6),
    gameService.all(),
  ]);

  const related = allGames
    .filter((g) => g.slug !== game.slug && g.genre === game.genre)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <GameDetailHero game={game} />

        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
          {/* Long description */}
          {game.longDescription && game.longDescription.length > 0 && (
            <section className="mt-12 md:mt-16" aria-labelledby="about-game">
              <h2
                id="about-game"
                className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
              >
                About
              </h2>
              <div className="mt-4 max-w-3xl space-y-4 text-base text-(--color-text-secondary) sm:text-lg">
                {game.longDescription.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {/* Two-column: schedule + how to join */}
          {(game.weeklySchedule || game.howToJoin) && (
            <section className="mt-16 grid gap-10 md:mt-20 md:grid-cols-[1.2fr_1fr] md:gap-12">
              {game.weeklySchedule && (
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                    Weekly schedule
                  </h2>
                  <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                    When the squad runs
                  </h3>
                  <div className="mt-6">
                    <WeeklySchedule schedule={game.weeklySchedule} />
                  </div>
                </div>
              )}
              {game.howToJoin && (
                <aside className="glass flex flex-col rounded-3xl p-6 md:self-start">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                    How to join
                  </p>
                  <h3 className="mt-3 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
                    Get queued up tonight
                  </h3>
                  <p className="mt-3 text-sm text-(--color-text-secondary)">{game.howToJoin}</p>
                  <Button asChild className="mt-6 w-full">
                    <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                      Open Discord <MessageCircle className="size-4" />
                    </a>
                  </Button>
                </aside>
              )}
            </section>
          )}

          {/* Squads */}
          <section className="mt-16 md:mt-24" aria-labelledby="squads">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2
                  id="squads"
                  className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
                >
                  Squads
                </h2>
                <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                  Who's running it
                </h3>
              </div>
              <p
                className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted) tabular-nums sm:block"
                aria-label={`${squads.length} squad${squads.length === 1 ? '' : 's'}`}
              >
                {squads.length} {squads.length === 1 ? 'squad' : 'squads'}
              </p>
            </div>
            <div className="mt-8">
              <SquadRosterList squads={squads} />
            </div>
          </section>

          {/* Recent matches */}
          <section className="mt-16 md:mt-24" aria-labelledby="matches">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2
                  id="matches"
                  className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
                >
                  Recent matches
                </h2>
                <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                  Last few results
                </h3>
              </div>
            </div>
            <div className="mt-8">
              <MatchHistory matches={matches} />
            </div>
          </section>

          {/* Related games */}
          {related.length > 0 && (
            <section className="mt-16 md:mt-24" aria-labelledby="related">
              <h2
                id="related"
                className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
              >
                Same vibe
              </h2>
              <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                If this is your thing, try these
              </h3>
              <div className="mt-8">
                <RelatedGames games={related} />
              </div>
            </section>
          )}

          {/* Bottom CTA */}
          <section className="mt-16 md:mt-24">
            <div className="glass relative overflow-hidden rounded-3xl p-8 text-center md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{ background: game.cover.gradient }}
              />
              <div className="relative">
                <h3 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  Ready to queue?
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-(--color-text-secondary)">
                  Hop into Discord, find the {game.voiceChannel ?? 'right'} channel, and squad up
                  with the crew. No tryouts, no gatekeeping — just show up.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild size="xl">
                    <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                      Join Discord <MessageCircle className="size-4" />
                    </a>
                  </Button>
                  <Button asChild variant="glass" size="xl">
                    <Link href="/games">See all games</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
