import { GameCard } from '@/components/marketing/game-card';
import type { Game } from '@/types/game';

export function RelatedGames({ games }: { games: Game[] }) {
  if (games.length === 0) return null;
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {games.map((g) => (
        <li key={g.id}>
          <GameCard game={g} />
        </li>
      ))}
    </ul>
  );
}
