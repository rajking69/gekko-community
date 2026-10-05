import { Button } from '@/components/ui/button';
import { type GameShowcase, gamesShowcase } from '@/data/games-showcase';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function GamesStrip() {
  return (
    <section id="games" className="relative px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
              Games we play
            </p>
            <h2 className="mt-4 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Where the squad shows up
            </h2>
            <p className="mt-4 text-(--color-text-secondary)">
              Valorant, PUBG, CS2, and EA FC every weekday — Apex and Rocket League on weekend
              nights. Squad up in Discord and queue with the crew.
            </p>
          </div>
          <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
            <Link href="/games">
              See all games <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Horizontal scrolling strip */}
        <div className="-mx-6 mt-10 md:-mx-10 md:mt-14">
          <ul
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:gap-6 md:px-10"
            aria-label="Games the community plays"
          >
            {gamesShowcase.map((game) => (
              <GameTileCard key={game.slug} game={game} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function GameTileCard({ game }: { game: GameShowcase }) {
  return (
    <li className="w-[15rem] shrink-0 snap-start sm:w-[16rem]">
      <Link
        href={`/games/${game.slug}`}
        className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-(--glass-border) transition-transform duration-500 hover:-translate-y-1"
        aria-label={game.name}
      >
        {/* Gradient base (visible while art loads / behind character cutouts) */}
        <div aria-hidden className="absolute inset-0" style={{ background: game.gradient }} />

        {/* Official art */}
        <Image
          src={game.art}
          alt=""
          fill
          sizes="(max-width: 640px) 60vw, 256px"
          className={
            game.artFit === 'cover'
              ? 'object-cover transition-transform duration-700 ease-out group-hover:scale-105'
              : 'object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-105'
          }
        />

        {/* Readability overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
        />

        {/* Accent glow + ring on hover */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1.5px ${game.accent}, 0 24px 60px -24px ${game.accent}`,
          }}
        />

        {/* Top-right open chip */}
        <span
          aria-hidden
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-md transition duration-500 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-4" />
        </span>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ color: game.accent }}
          >
            {game.tagline}
          </p>
          <h3 className="mt-1.5 font-(family-name:--font-heading) text-xl font-bold leading-tight tracking-tight text-white">
            {game.name}
          </h3>
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
      </Link>
    </li>
  );
}
