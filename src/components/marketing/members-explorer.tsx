'use client';

import { FilterBar, type FilterGroup } from '@/components/marketing/filter-bar';
import { MemberCard } from '@/components/marketing/member-card';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import type { Game } from '@/types/game';
import type { DirectoryMember } from '@/types/member';
import { MessageCircle, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';

type SortKey = 'recently_active' | 'xp' | 'newest';

const SORT_LABEL: Record<SortKey, string> = {
  recently_active: 'Recently active',
  xp: 'Most XP',
  newest: 'Newest',
};

type MembersExplorerProps = {
  members: DirectoryMember[];
  games: Game[];
};

export function MembersExplorer({ members, games }: MembersExplorerProps) {
  const [search, setSearch] = useState('');
  const [game, setGame] = useState<string>('all');
  const [role, setRole] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('recently_active');

  const presentRoles = useMemo(() => {
    const set = new Set<string>();
    for (const m of members) set.add(m.role);
    return Array.from(set);
  }, [members]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let out = members.filter((m) => {
      if (role !== 'all' && m.role !== role) return false;
      if (game !== 'all' && !m.mainGames.some((g) => g.gameSlug === game)) return false;
      if (q) {
        const haystack =
          `${m.displayName} ${m.username} ${m.bio} ${m.location ?? ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    out = out.slice().sort((a, b) => {
      if (sort === 'xp') return b.xp - a.xp;
      if (sort === 'newest') return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
      return new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime();
    });
    return out;
  }, [members, search, role, game, sort]);

  const groups: FilterGroup<string>[] = [
    {
      id: 'sort',
      label: 'Sort by',
      value: sort,
      onChange: (v) => setSort(v as SortKey),
      options: (Object.keys(SORT_LABEL) as SortKey[]).map((k) => ({
        value: k,
        label: SORT_LABEL[k],
      })),
    },
    {
      id: 'role',
      label: 'Role',
      value: role,
      onChange: setRole,
      options: [
        { value: 'all', label: 'Any', count: members.length },
        ...presentRoles.map((r) => ({
          value: r,
          label: r.replace(/_/g, ' '),
          count: members.filter((m) => m.role === r).length,
        })),
      ],
    },
    {
      id: 'game',
      label: 'Main game',
      value: game,
      onChange: setGame,
      options: [
        { value: 'all', label: 'Any', count: members.length },
        ...games.map((g) => ({
          value: g.slug,
          label: g.name,
          count: members.filter((m) => m.mainGames.some((mg) => mg.gameSlug === g.slug)).length,
        })),
      ],
    },
  ];

  const hasActiveFilter =
    search.trim().length > 0 || game !== 'all' || role !== 'all' || sort !== 'recently_active';

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-10">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search name, username, location…"
          groups={groups}
          resultCount={filtered.length}
          resultLabel="member"
          onReset={
            hasActiveFilter
              ? () => {
                  setSearch('');
                  setRole('all');
                  setGame('all');
                  setSort('recently_active');
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
              setRole('all');
              setGame('all');
              setSort('recently_active');
            }}
          />
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {filtered.map((m) => (
              <li key={m.id}>
                <MemberCard member={m} />
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
        <UsersRound className="size-6 text-(--color-gekko-400)" />
      </div>
      <h3 className="mt-5 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
        No members match those filters
      </h3>
      <p className="mt-2 max-w-md text-sm text-(--color-text-secondary)">
        Try a different game or role — or invite someone new in Discord. The community keeps growing
        whenever someone hops in a voice channel and stays for the night.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="glass" onClick={onReset}>
          Reset filters
        </Button>
        <Button asChild>
          <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
            Invite someone <MessageCircle className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
