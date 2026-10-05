import { CtaDiscord } from '@/components/landing/cta-discord';
import { EventsCarousel } from '@/components/landing/events-carousel';
import { Faq } from '@/components/landing/faq';
import { FeatureBento } from '@/components/landing/feature-bento';
import { FeaturedEvent } from '@/components/landing/featured-event';
import { GamesStrip } from '@/components/landing/games-strip';
import { Hero } from '@/components/landing/hero';
import { Leadership } from '@/components/landing/leadership';
import { MembersSpotlight } from '@/components/landing/members-spotlight';
import { YoutubeCta } from '@/components/landing/youtube-cta';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/shared/json-ld';
import { Reveal } from '@/components/shared/reveal';

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Reveal>
          <FeaturedEvent />
        </Reveal>
        <Reveal>
          <GamesStrip />
        </Reveal>
        <Reveal>
          <FeatureBento />
        </Reveal>
        <Reveal>
          <EventsCarousel />
        </Reveal>
        <Reveal>
          <Leadership />
        </Reveal>
        <Reveal>
          <MembersSpotlight />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
        <Reveal>
          <YoutubeCta />
        </Reveal>
        <Reveal>
          <CtaDiscord />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
