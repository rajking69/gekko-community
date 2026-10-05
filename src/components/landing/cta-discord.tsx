import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { ArrowRight } from 'lucide-react';

export function CtaDiscord() {
  return (
    <section className="relative px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 p-6 sm:p-10 md:p-16">
          {/* Animated gradient border */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-50"
            style={{
              background: 'conic-gradient(from 0deg, #00ff88, #22d3ee, #8b5cf6, #f472b6, #00ff88)',
              maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
              maskComposite: 'exclude',
              padding: 1,
            }}
          />
          <div
            aria-hidden
            className="absolute -right-32 -top-32 size-96 rounded-full bg-(--color-neon-violet)/20 blur-3xl"
          />

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
              Discord
            </p>
            <h2 className="mt-4 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Join the community today.
            </h2>
            <p className="mt-4 max-w-xl text-(--color-text-secondary)">
              Connect with gamers, streamers, and squad-mates. Voice channels, scrim nights,
              tournaments, and an active community that actually shows up.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="group/dc relative w-full overflow-hidden transition-transform hover:scale-[1.03] sm:w-auto"
              >
                <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1/4 -translate-x-[220%] bg-white/30 blur-md group-hover/dc:animate-[cta-shine_0.9s_ease-out] motion-reduce:hidden"
                  />
                  Join Discord{' '}
                  <ArrowRight className="size-4 transition-transform group-hover/dc:translate-x-0.5" />
                </a>
              </Button>
              <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                <a href="/about">Read the docs</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
