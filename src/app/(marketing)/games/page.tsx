import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { GamesExplorer } from '@/components/marketing/games-explorer';
import { PageHeader } from '@/components/marketing/page-header';
import { Reveal } from '@/components/shared/reveal';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { gameService } from '@/services/game.service';
import { MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Games',
  description:
    'Every game the Team Gekko squad plays — daily rotation, weekend nights, and on-request titles. Filter by genre or cadence and see who is actively queuing.',
  alternates: { canonical: '/games' },
  openGraph: {
    title: 'Games · Team Gekko',
    description:
      'Daily-rotation FPS, weekend BR nights, sports cups, and on-request titles. Squad up with the crew.',
    url: '/games',
  },
};

export default async function GamesIndexPage() {
  const games = await gameService.all();
  const regularCount = games.filter((g) => g.status === 'regular').length;
  const weekendCount = games.filter((g) => g.status === 'weekend').length;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <PageHeader
                eyebrow="Games we play"
                title="Squad up in the game you actually love"
                description={`${games.length} titles in the rotation right now — ${regularCount} run every weekday, ${weekendCount} on weekend nights, and a handful more on request when the channel pings.`}
                action={
                  <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                    <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                      Join the squad <MessageCircle className="size-4" />
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
              <GamesExplorer games={games} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
