import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { EventsExplorer } from '@/components/marketing/events-explorer';
import { PageHeader } from '@/components/marketing/page-header';
import { Reveal } from '@/components/shared/reveal';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { eventService } from '@/services/event.service';
import { MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Tournaments, workshops, meetups, and streams from the Team Gekko community. Filter by type or status, switch to calendar view to see what is coming up.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events · Team Gekko',
    description:
      'Cups, coaching, meetups, and live streams. Find what is on this week — or pitch the next one.',
    url: '/events',
  },
};

export default async function EventsIndexPage() {
  const events = await eventService.all();
  const liveCount = events.filter((e) => e.status === 'live').length;
  const openCount = events.filter((e) => e.status === 'open').length;
  const tournamentCount = events.filter((e) => e.type === 'tournament').length;
  const plural = (n: number) => (n === 1 ? '' : 's');
  const lead =
    liveCount > 0
      ? `${liveCount} event${plural(liveCount)} live right now`
      : `${openCount} event${plural(openCount)} open for registration`;
  const headerDescription = `${lead}, including ${tournamentCount} tournament${plural(
    tournamentCount,
  )}. Workshops, meetups, and streams round out the schedule.`;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <PageHeader
                eyebrow="Events"
                title="What's on the calendar"
                description={headerDescription}
                action={
                  <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                    <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                      Pitch an event <MessageCircle className="size-4" />
                    </a>
                  </Button>
                }
              />
            </Reveal>
          </div>
        </section>

        <section className="relative px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-7xl">
            <Reveal delay={100}>
              <EventsExplorer events={events} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
