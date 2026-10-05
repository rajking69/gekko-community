import { GameCard } from '@/components/marketing/game-card';
import { Button } from '@/components/ui/button';
import { mockGames } from '@/data/games.mock';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function GamesShowcase() {
  const featured = mockGames.filter((g) => g.featured);
  const rest = mockGames.filter((g) => !g.featured);
  const games = [...featured, ...rest].slice(0, 6);

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
              Valorant, PUBG, CS2, and FIFA every weekday — Apex and Rocket League on weekend
              nights. Squad up in Discord, hop in a voice channel, queue with the crew.
            </p>
          </div>
          <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
            <Link href="/games">
              See all games <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3">
          {games.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
