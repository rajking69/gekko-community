import { EventCard } from '@/components/marketing/event-card';
import { Button } from '@/components/ui/button';
import { mockEvents } from '@/data/events.mock';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function EventsCarousel() {
  return (
    <section id="events" className="relative px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
              Events
            </p>
            <h2 className="mt-4 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              What's happening next
            </h2>
            <p className="mt-4 text-(--color-text-secondary)">
              Workshops, tournaments, meetups, and live streams. Most events are free and open to
              members.
            </p>
          </div>
          <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
            <Link href="/events">
              All events <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Horizontal scrolling row — reuses the shared EventCard */}
        <div className="-mx-6 mt-10 md:-mx-10 md:mt-14">
          <ul
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:gap-6 md:px-10"
            aria-label="Upcoming community events"
          >
            {mockEvents.map((event) => (
              <li key={event.id} className="w-[88vw] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]">
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
