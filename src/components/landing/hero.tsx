'use client';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { gamesShowcase } from '@/data/games-showcase';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CYCLE_MS = 2600;

/**
 * Game-select hero. A rail of the games the community plays drives a portrait
 * "select" panel — hovering, focusing, or tapping a game swaps the standing
 * art, the accent colour, and the caption. It auto-cycles on load (until the
 * visitor takes over, and never under reduced-motion) so the page feels live.
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  // `active` is always kept in-bounds (modulo cycle + index-bound picks).
  const game = gamesShowcase[active]!;

  useEffect(() => {
    if (locked) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const id = setInterval(() => setActive((i) => (i + 1) % gamesShowcase.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [locked]);

  const pick = (i: number) => {
    setActive(i);
    setLocked(true);
  };

  return (
    <section className="relative flex min-h-[100svh] items-center px-6 pt-28 pb-16 sm:pt-32 sm:pb-24 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* LEFT — copy + game select */}
          <div className="relative z-10 order-2 lg:order-1">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-(--color-text-muted)">
              <span
                className="size-1.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: game.accent }}
              />
              Team Gekko · {gamesShowcase.length} games, one squad
            </p>

            <h1 className="mt-5 font-(family-name:--font-heading) text-4xl font-bold leading-[1.05] tracking-tight text-balance-pretty sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Where the squad{' '}
              <span className="bg-gradient-to-r from-(--color-gekko-400) via-(--color-neon-cyan) to-(--color-neon-violet) bg-clip-text text-transparent">
                plays, competes
              </span>
              , and grows together.
            </h1>

            <p className="mt-6 max-w-xl text-balance-pretty text-base text-(--color-text-secondary) sm:text-lg">
              A living gaming community — Valorant, PUBG, CS2, EA FC, and more. Squads, tournaments,
              and real-time presence. Built for people who love to play.
            </p>

            {/* Game-select rail — the signature */}
            <div className="mt-8">
              <div
                role="tablist"
                aria-label="Pick a game the community plays"
                className="flex flex-wrap gap-2"
              >
                {gamesShowcase.map((g, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={g.slug}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onMouseEnter={() => pick(i)}
                      onFocus={() => pick(i)}
                      onClick={() => pick(i)}
                      className={cn(
                        'rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300',
                        isActive
                          ? 'text-(--color-bg-void)'
                          : 'border-(--glass-border) text-(--color-text-secondary) hover:text-(--color-text-primary)',
                      )}
                      style={
                        isActive ? { backgroundColor: g.accent, borderColor: g.accent } : undefined
                      }
                    >
                      {g.shortName}
                    </button>
                  );
                })}
              </div>
              <p
                aria-live="polite"
                className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-(--color-text-muted)"
              >
                <span style={{ color: game.accent }}>▸</span> {game.name} · {game.tagline}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button asChild size="xl" className="w-full sm:w-auto">
                <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                  Join the community <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="glass" size="xl" className="w-full sm:w-auto">
                <Link href="/games">Browse the games</Link>
              </Button>
            </div>
          </div>

          {/* RIGHT — game-select display panel */}
          <div className="relative order-1 lg:order-2">
            <GamePanel active={active} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#featured-event"
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted) transition hover:text-(--color-gekko-300) md:flex"
      >
        <span>Scroll</span>
        <ChevronDown
          className="size-4 text-(--color-gekko-400)"
          style={{ animation: 'scroll-bob 1.8s ease-in-out infinite' }}
        />
      </a>
    </section>
  );
}

function GamePanel({ active }: { active: number }) {
  const game = gamesShowcase[active]!;
  return (
    <div
      className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-[1.75rem] border border-(--glass-border) lg:max-w-none"
      style={{ boxShadow: `0 40px 120px -50px ${game.accent}` }}
    >
      {/* Per-game gradient base (behind the art) */}
      <div
        aria-hidden
        className="absolute inset-0 transition-[background] duration-700"
        style={{ background: game.gradient }}
      />

      {/* Crossfading art — all preloaded so swaps never flash */}
      {gamesShowcase.map((g, i) => (
        <Image
          key={g.slug}
          src={g.art}
          alt=""
          aria-hidden
          fill
          priority={i === 0}
          quality={90}
          sizes="(max-width: 1024px) 26rem, 33vw"
          className={cn(
            'transition-opacity duration-700 ease-out',
            i === active ? 'opacity-100' : 'opacity-0',
            g.artFit === 'cover' ? 'object-cover' : 'scale-110 object-contain object-bottom',
          )}
        />
      ))}

      {/* Readability gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30"
      />

      {/* Accent ring (animates colour) */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[1.75rem] transition-[box-shadow] duration-700"
        style={{ boxShadow: `inset 0 0 0 1.5px ${game.accent}66` }}
      />

      {/* HUD corner ticks — the broadcast signature */}
      <CornerTicks color={game.accent} />

      {/* Top labels */}
      <div className="absolute inset-x-4 top-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
        <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-white/80 backdrop-blur-md">
          Select
        </span>
        <span className="text-white/70 tabular-nums">
          {String(active + 1).padStart(2, '0')} / {String(gamesShowcase.length).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.25em]"
          style={{ color: game.accent }}
        >
          {game.tagline}
        </p>
        <h2 className="mt-1.5 font-(family-name:--font-heading) text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
          {game.name}
        </h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CornerTicks({ color }: { color: string }) {
  const base = 'absolute size-5 transition-colors duration-700';
  return (
    <div aria-hidden className="pointer-events-none absolute inset-3">
      <span
        className={cn(base, 'left-0 top-0 border-l-2 border-t-2')}
        style={{ borderColor: color }}
      />
      <span
        className={cn(base, 'right-0 top-0 border-r-2 border-t-2')}
        style={{ borderColor: color }}
      />
      <span
        className={cn(base, 'bottom-0 left-0 border-b-2 border-l-2')}
        style={{ borderColor: color }}
      />
      <span
        className={cn(base, 'bottom-0 right-0 border-b-2 border-r-2')}
        style={{ borderColor: color }}
      />
    </div>
  );
}
