import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { BracketPreview } from '@/components/marketing/bracket-preview';
import { EventCard } from '@/components/marketing/event-card';
import { EventDetailHero } from '@/components/marketing/event-detail-hero';
import { EventParticipants } from '@/components/marketing/event-participants';
import { EventPrizeList } from '@/components/marketing/event-prize-list';
import { EventSchedule } from '@/components/marketing/event-schedule';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { gekkoCup } from '@/data/gekko-cup';
import { eventService } from '@/services/event.service';
import { gameService } from '@/services/game.service';
import { ArrowLeft, ArrowUpRight, MessageCircle, Trophy } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const events = await eventService.all();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await eventService.get(slug);
  if (!event) return { title: 'Event not found' };

  const description = event.description.slice(0, 200);
  return {
    title: event.title,
    description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: `${event.title} · Team Gekko`,
      description,
      url: `/events/${event.slug}`,
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const event = await eventService.get(slug);
  if (!event) notFound();

  const [participants, bracket, allEvents, allGames] = await Promise.all([
    eventService.listParticipants(event.slug),
    event.type === 'tournament' ? eventService.getBracket(event.slug) : Promise.resolve(null),
    eventService.all(),
    gameService.all(),
  ]);

  const related = allEvents
    .filter(
      (e) => e.slug !== event.slug && (e.type === event.type || e.gameSlug === event.gameSlug),
    )
    .slice(0, 3);
  const linkedGame = event.gameSlug ? allGames.find((g) => g.slug === event.gameSlug) : null;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <EventDetailHero event={event} />

        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
          {/* Back link */}
          <div className="mt-8">
            <Button asChild variant="link" className="px-0">
              <Link href="/events">
                <ArrowLeft className="size-4" /> Back to events
              </Link>
            </Button>
          </div>

          {/* Live group stage — this tournament has a dedicated results page */}
          {event.slug === gekkoCup.eventSlug && (
            <section className="mt-8">
              <Link
                href="/tournament"
                className="group glass flex flex-col gap-4 overflow-hidden rounded-3xl border border-(--color-gekko-500)/30 p-6 transition hover:border-(--color-gekko-500)/60 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-(--color-gekko-500)/15 text-(--color-gekko-300)">
                    <Trophy className="size-6" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-gekko-400)">
                      Live now · {gekkoCup.format}
                    </p>
                    <h3 className="mt-1 font-(family-name:--font-heading) text-lg font-bold tracking-tight">
                      Standings, fixtures &amp; results
                    </h3>
                    <p className="mt-1 text-sm text-(--color-text-secondary)">
                      Follow every matchday live — top two advance to the grand final.
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 self-start whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-(--color-gekko-300) transition group-hover:gap-2.5 sm:self-center">
                  View live <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </section>
          )}

          {/* Long description */}
          {event.longDescription && event.longDescription.length > 0 && (
            <section className="mt-8" aria-labelledby="about-event">
              <h2
                id="about-event"
                className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
              >
                About this event
              </h2>
              <div className="mt-4 max-w-3xl space-y-4 text-base text-(--color-text-secondary) sm:text-lg">
                {event.longDescription.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {/* Host + game context cards */}
          {(event.host || linkedGame || event.requirements) && (
            <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {event.host && <HostCard host={event.host} />}
              {linkedGame && (
                <article className="glass flex flex-col rounded-3xl p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
                    Game
                  </p>
                  <h3 className="mt-2 font-(family-name:--font-heading) text-lg font-bold tracking-tight">
                    {linkedGame.name}
                  </h3>
                  <p className="mt-2 text-sm text-(--color-text-secondary)">{linkedGame.tagline}</p>
                  <Button asChild variant="glass" size="sm" className="mt-auto self-start">
                    <Link href={`/games/${linkedGame.slug}`}>
                      Game page <ArrowUpRight className="size-3.5" />
                    </Link>
                  </Button>
                </article>
              )}
              {event.requirements && event.requirements.length > 0 && (
                <article className="glass flex flex-col rounded-3xl p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
                    Requirements
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-(--color-text-secondary)">
                    {event.requirements.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="text-(--color-gekko-400)" aria-hidden>
                          ·
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </section>
          )}

          {/* Two-column: schedule + prizes */}
          {(event.schedule || event.prizes) && (
            <section className="mt-16 grid gap-10 md:mt-20 md:grid-cols-[1.2fr_1fr] md:gap-12">
              {event.schedule && (
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                    Run of show
                  </h2>
                  <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                    Schedule
                  </h3>
                  <div className="mt-6">
                    <EventSchedule schedule={event.schedule} />
                  </div>
                </div>
              )}
              {event.prizes && event.prizes.length > 0 && (
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                    Prizes
                  </h2>
                  <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                    What's on the line
                  </h3>
                  <div className="mt-6">
                    <EventPrizeList prizes={event.prizes} />
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Bracket — tournaments only */}
          {bracket && (
            <section className="mt-16 md:mt-24" aria-labelledby="bracket">
              <h2
                id="bracket"
                className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
              >
                Bracket
              </h2>
              <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                The road to the trophy
              </h3>
              <div className="mt-6">
                <BracketPreview bracket={bracket} />
              </div>
            </section>
          )}

          {/* Participants */}
          <section className="mt-16 md:mt-24" aria-labelledby="participants">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2
                  id="participants"
                  className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
                >
                  Participants
                </h2>
                <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                  Who's showing up
                </h3>
              </div>
              {participants.length > 0 && (
                <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted) tabular-nums sm:block">
                  {participants.length} confirmed
                </p>
              )}
            </div>
            <div className="mt-8">
              <EventParticipants members={participants} />
            </div>
          </section>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16 md:mt-24" aria-labelledby="related">
              <h2
                id="related"
                className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
              >
                Up next
              </h2>
              <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                More like this
              </h3>
              <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {related.map((e) => (
                  <li key={e.id}>
                    <EventCard event={e} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Bottom CTA */}
          <section className="mt-16 md:mt-24">
            <div className="glass relative overflow-hidden rounded-3xl p-8 text-center md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{ background: event.coverGradient }}
              />
              <div className="relative">
                <h3 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  Want to be in the next one?
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-(--color-text-secondary)">
                  Most events are open registration. Drop into Discord, react to the announcement
                  ping, and you're in.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild size="xl">
                    <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                      Join Discord <MessageCircle className="size-4" />
                    </a>
                  </Button>
                  <Button asChild variant="glass" size="xl">
                    <Link href="/events">All events</Link>
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

function HostCard({
  host,
}: {
  host: NonNullable<import('@/types/event').CommunityEvent['host']>;
}) {
  return (
    <article className="glass flex items-center gap-4 rounded-3xl p-6">
      <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-(--glass-border)">
        <Image
          src={host.avatar}
          alt=""
          width={96}
          height={96}
          sizes="48px"
          className="size-full object-cover"
          unoptimized
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
          Hosted by
        </p>
        <p className="mt-1 truncate font-(family-name:--font-heading) text-base font-bold tracking-tight">
          {host.displayName}
        </p>
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          @{host.username} · {host.role}
        </p>
      </div>
      <Link
        href={`/members/${host.username}`}
        className="grid size-9 shrink-0 place-items-center rounded-lg border border-(--glass-border) text-(--color-text-secondary) transition hover:border-(--color-gekko-500) hover:text-(--color-gekko-300)"
        aria-label={`Open ${host.displayName}'s profile`}
      >
        <ArrowUpRight className="size-4" />
      </Link>
    </article>
  );
}
