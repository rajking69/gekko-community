import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { GalleryExplorer } from '@/components/marketing/gallery-explorer';
import { PageHeader } from '@/components/marketing/page-header';
import { Reveal } from '@/components/shared/reveal';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { galleryService } from '@/services/gallery.service';
import { gameService } from '@/services/game.service';
import { MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Clips, highlights, meetup photos, memes, and screenshots from the Team Gekko squad. Filter by category or game.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery · Team Gekko',
    description: 'Member-uploaded clips, highlights, meetup photos, and screenshots.',
    url: '/gallery',
  },
};

export default async function GalleryIndexPage() {
  const [items, games] = await Promise.all([galleryService.all(), gameService.all()]);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <PageHeader
                eyebrow="Gallery"
                title="Clips, highlights, and the occasional meme"
                description={`${items.length} member-uploaded items. Tournament clutches, meetup photos, tactic boards, screenshots — the running visual record of the community.`}
                action={
                  <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                    <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                      Submit a clip <MessageCircle className="size-4" />
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
              <GalleryExplorer items={items} games={games} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
