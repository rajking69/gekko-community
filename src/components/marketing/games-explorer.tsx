'use client';

import { FilterBar, type FilterGroup } from '@/components/marketing/filter-bar';
import { GameCard } from '@/components/marketing/game-card';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import {
  GENRE_LABEL,
  type Game,
  type GameGenre,
  type GameStatus,
  STATUS_LABEL,
} from '@/types/game';
import { Gamepad2, MessageCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

type GenreFilter = GameGenre | 'all';
type StatusFilter = GameStatus | 'all';

export function GamesExplorer({ games }: { games: Game[] }) {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState<GenreFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');

  const genreCounts = useMemo(() => {
    const counts = new Map<GameGenre, number>();
    for (const g of games) counts.set(g.genre, (counts.get(g.genre) ?? 0) + 1);
    return counts;
  }, [games]);

  const statusCounts = useMemo(() => {
    const counts = new Map<GameStatus, number>();
    for (const g of games) counts.set(g.status, (counts.get(g.status) ?? 0) + 1);
    return counts;
  }, [games]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return games.filter((g) => {
      if (genre !== 'all' && g.genre !== genre) return false;
      if (status !== 'all' && g.status !== status) return false;
      if (q) {
        const haystack = `${g.name} ${g.publisher} ${g.tags.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [games, search, genre, status]);

  const genreOptions = useMemo(() => {
    const present = Array.from(genreCounts.keys());
    return [
      { value: 'all' as const, label: 'All', count: games.length },
      ...present.map((g) => ({ value: g, label: GENRE_LABEL[g], count: genreCounts.get(g) })),
    ];
  }, [games.length, genreCounts]);

  const statusOptions = useMemo(() => {
    const order: GameStatus[] = ['regular', 'weekend', 'rotating', 'on_request'];
    return [
      { value: 'all' as const, label: 'Any', count: games.length },
      ...order
        .filter((s) => statusCounts.has(s))
        .map((s) => ({ value: s, label: STATUS_LABEL[s], count: statusCounts.get(s) })),
    ];
  }, [games.length, statusCounts]);

  const groups: FilterGroup<string>[] = [
    {
      id: 'genre',
      label: 'Genre',
      value: genre,
      onChange: (v) => setGenre(v as GenreFilter),
      options: genreOptions,
    },
    {
      id: 'status',
      label: 'Cadence',
      value: status,
      onChange: (v) => setStatus(v as StatusFilter),
      options: statusOptions,
    },
  ];

  const hasActiveFilter = search.trim().length > 0 || genre !== 'all' || status !== 'all';

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by name, publisher, tag…"
          groups={groups}
          resultCount={filtered.length}
          resultLabel="game"
          onReset={
            hasActiveFilter
              ? () => {
                  setSearch('');
                  setGenre('all');
                  setStatus('all');
                }
              : undefined
          }
        />
      </aside>

      <div>
        {filtered.length === 0 ? (
          <EmptyState
            onReset={() => {
              setSearch('');
              setGenre('all');
              setStatus('all');
            }}
          />
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {filtered.map((g) => (
              <li key={g.id}>
                <GameCard game={g} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center">
      <div className="grid size-14 place-items-center rounded-2xl border border-(--glass-border) bg-(--color-bg-deep)/60">
        <Gamepad2 className="size-6 text-(--color-gekko-400)" />
      </div>
      <h3 className="mt-5 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
        No games match those filters
      </h3>
      <p className="mt-2 max-w-md text-sm text-(--color-text-secondary)">
        Try a different genre or cadence — or pitch a new title in Discord. We are always open to
        adding a game when enough members want to play it.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="glass" onClick={onReset}>
          Reset filters
        </Button>
        <Button asChild>
          <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
            Suggest a game <MessageCircle className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
