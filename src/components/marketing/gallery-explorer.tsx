'use client';

import { FilterBar, type FilterGroup } from '@/components/marketing/filter-bar';
import { GalleryLightbox } from '@/components/marketing/gallery-lightbox';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { GALLERY_CATEGORY_LABEL, type GalleryCategory, type GalleryItem } from '@/types/gallery';
import type { Game } from '@/types/game';
import { ImageIcon, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

type CategoryFilter = GalleryCategory | 'all';

export function GalleryExplorer({
  items,
  games,
}: {
  items: GalleryItem[];
  games: Game[];
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [game, setGame] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categoryCounts = useMemo(() => {
    const m = new Map<GalleryCategory, number>();
    for (const it of items) m.set(it.category, (m.get(it.category) ?? 0) + 1);
    return m;
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items
      .filter((it) => {
        if (category !== 'all' && it.category !== category) return false;
        if (game !== 'all' && it.gameSlug !== game) return false;
        if (q) {
          const haystack = `${it.title} ${it.caption} ${it.tags.join(' ')}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }, [items, search, category, game]);

  const categoryOptions = useMemo(() => {
    const order: GalleryCategory[] = ['clip', 'highlight', 'meetup', 'screenshot', 'meme'];
    return [
      { value: 'all' as const, label: 'All', count: items.length },
      ...order
        .filter((c) => categoryCounts.has(c))
        .map((c) => ({
          value: c,
          label: GALLERY_CATEGORY_LABEL[c],
          count: categoryCounts.get(c),
        })),
    ];
  }, [items.length, categoryCounts]);

  const gameOptions = useMemo(
    () => [
      { value: 'all', label: 'Any', count: items.length },
      ...games.map((g) => ({
        value: g.slug,
        label: g.name,
        count: items.filter((it) => it.gameSlug === g.slug).length,
      })),
    ],
    [items, games],
  );

  const groups: FilterGroup<string>[] = [
    {
      id: 'category',
      label: 'Category',
      value: category,
      onChange: (v) => setCategory(v as CategoryFilter),
      options: categoryOptions,
    },
    {
      id: 'game',
      label: 'Game',
      value: game,
      onChange: setGame,
      options: gameOptions,
    },
  ];

  const hasActiveFilter = search.trim().length > 0 || category !== 'all' || game !== 'all';

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search captions, tags…"
          groups={groups}
          resultCount={filtered.length}
          resultLabel="item"
          onReset={
            hasActiveFilter
              ? () => {
                  setSearch('');
                  setCategory('all');
                  setGame('all');
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
              setCategory('all');
              setGame('all');
            }}
          />
        ) : (
          <div className="columns-1 gap-5 sm:columns-2 md:gap-6 xl:columns-3">
            {filtered.map((item, idx) => (
              <GalleryTile key={item.id} item={item} onOpen={() => setActiveIndex(idx)} />
            ))}
          </div>
        )}
      </div>

      {activeIndex !== null && (
        <GalleryLightbox
          items={filtered}
          index={activeIndex}
          onChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
}

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

function GalleryTile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const accent = accentMap[item.accent];
  return (
    <figure className="mb-5 break-inside-avoid md:mb-6">
      <button
        type="button"
        onClick={onOpen}
        className="group relative block w-full overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 text-left transition hover:border-(--color-gekko-500)/40"
      >
        <div className="relative w-full" style={{ aspectRatio: item.aspect }}>
          <Image
            src={item.src}
            alt={item.caption}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
            unoptimized
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-(--color-bg-void)/85 via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 mix-blend-screen transition duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(at 50% 100%, ${accent}30, transparent 70%)` }}
          />
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
            <span
              aria-hidden
              className="size-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="text-white">{item.category}</span>
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-(family-name:--font-heading) text-base font-bold leading-tight tracking-tight text-white sm:text-lg">
              {item.title}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
              {item.uploader.displayName} · {item.likes} likes
            </p>
          </figcaption>
        </div>
      </button>
    </figure>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center">
      <div className="grid size-14 place-items-center rounded-2xl border border-(--glass-border) bg-(--color-bg-deep)/60">
        <ImageIcon className="size-6 text-(--color-gekko-400)" />
      </div>
      <h3 className="mt-5 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
        Nothing matches those filters
      </h3>
      <p className="mt-2 max-w-md text-sm text-(--color-text-secondary)">
        Try a different category or game — or drop your own clip in Discord. The gallery is mostly
        member-uploaded.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="glass" onClick={onReset}>
          Reset filters
        </Button>
        <Button asChild>
          <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
            Submit a clip <MessageCircle className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
