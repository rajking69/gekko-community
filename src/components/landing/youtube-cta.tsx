import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { ArrowUpRight, Play, Youtube } from 'lucide-react';

export function YoutubeCta() {
  return (
    <section id="youtube" className="relative px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 p-6 sm:p-10 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-red-500/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-(--color-neon-violet)/15 blur-3xl"
          />

          <div className="relative grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-red-400">
                <Youtube className="size-4" />
                YouTube
              </p>
              <h2 className="mt-4 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Watch the squad in action.
              </h2>
              <p className="mt-4 max-w-xl text-(--color-text-secondary)">
                Subscribe to{' '}
                <span className="font-semibold text-(--color-text-primary)">Gekko Gaming YT</span>{' '}
                for highlights, full tournament casts, and the plays that get the whole server
                talking.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="group/yt relative w-full overflow-hidden bg-red-600 text-white shadow-[0_10px_36px_-12px_rgba(239,68,68,0.8)] transition-transform hover:scale-[1.03] hover:bg-red-500 sm:w-auto"
                >
                  <a href={siteConfig.links.youtube} target="_blank" rel="noopener noreferrer">
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-1/4 -translate-x-[220%] bg-white/30 blur-md group-hover/yt:animate-[cta-shine_0.9s_ease-out] motion-reduce:hidden"
                    />
                    <Youtube className="size-4" /> Subscribe on YouTube
                  </a>
                </Button>
              </div>
            </div>

            {/* Channel preview card */}
            <a
              href={siteConfig.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Gekko Gaming YT on YouTube"
              className="group relative block overflow-hidden rounded-2xl border border-(--glass-border) bg-(--color-bg-deep)/60 transition duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-[0_24px_60px_-30px_rgba(239,68,68,0.6)]"
            >
              <div
                aria-hidden
                className="relative flex aspect-video items-center justify-center"
                style={{
                  background:
                    'radial-gradient(circle at 50% 40%, rgba(239,68,68,0.18), transparent 60%)',
                }}
              >
                <span className="relative grid size-16 place-items-center rounded-full bg-red-600 text-white shadow-[0_8px_30px_-6px_rgba(239,68,68,0.7)] transition duration-300 group-hover:scale-110">
                  <span
                    aria-hidden
                    className="absolute -inset-2 rounded-full border border-red-500/50 opacity-0 transition group-hover:opacity-100 group-hover:animate-ping motion-reduce:animate-none"
                  />
                  <Play className="size-7 translate-x-0.5 fill-current" />
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-(--glass-border) px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate font-(family-name:--font-heading) font-bold tracking-tight">
                    Gekko Gaming YT
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                    @ggyt69
                  </p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-(--color-text-muted) transition group-hover:text-red-400" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
