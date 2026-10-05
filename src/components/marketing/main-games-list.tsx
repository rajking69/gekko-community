import type { Game } from '@/types/game';
import type { MemberMainGame } from '@/types/member';
import { ArrowUpRight, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

type MainGamesListProps = {
  mainGames: MemberMainGame[];
  /** Full games catalog used to resolve accent + cover gradient for each entry. */
  catalog: Game[];
};

export function MainGamesList({ mainGames, catalog }: MainGamesListProps) {
  if (mainGames.length === 0) {
    return (
      <p className="glass rounded-2xl p-6 text-sm text-(--color-text-secondary)">
        No main games on file. Members usually pick 1-3 games they show up for most often.
      </p>
    );
  }
  return (
    <ul className="space-y-3">
      {mainGames.map((mg) => {
        const game = catalog.find((g) => g.slug === mg.gameSlug);
        const accent = game ? accentMap[game.accent] : '#9aa7b8';
        return (
          <li
            key={mg.gameSlug}
            className="group relative overflow-hidden rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 transition hover:border-(--color-gekko-500)/40"
          >
            <Link href={`/games/${mg.gameSlug}`} className="flex items-center gap-4 p-4">
              <div
                className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border"
                style={{
                  borderColor: `${accent}55`,
                  background:
                    game?.cover.gradient ?? `linear-gradient(135deg, ${accent}1a, transparent)`,
                }}
              >
                {game?.cover.glyph ? (
                  <span
                    aria-hidden
                    className="font-(family-name:--font-heading) text-3xl font-bold leading-none"
                    style={{ color: accent }}
                  >
                    {game.cover.glyph}
                  </span>
                ) : (
                  <Gamepad2 className="size-5" style={{ color: accent }} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-(family-name:--font-heading) text-base font-bold tracking-tight">
                  {mg.name}
                </p>
                <p
                  className="truncate font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  {mg.rank}
                </p>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-(--color-text-muted) transition group-hover:text-(--color-gekko-300)" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
