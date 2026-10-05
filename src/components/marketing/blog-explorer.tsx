'use client';

import { FilterBar, type FilterGroup } from '@/components/marketing/filter-bar';
import { PostCard } from '@/components/marketing/post-card';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { POST_CATEGORY_LABEL, type Post, type PostCategory } from '@/types/post';
import { MessageCircle, Rss } from 'lucide-react';
import { useMemo, useState } from 'react';

type CategoryFilter = PostCategory | 'all';

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');

  const featured = useMemo(() => posts.find((p) => p.featured), [posts]);

  const categoryCounts = useMemo(() => {
    const m = new Map<PostCategory, number>();
    for (const p of posts) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const pool = posts
      .filter((p) => {
        if (category !== 'all' && p.category !== category) return false;
        if (q) {
          const haystack = `${p.title} ${p.excerpt} ${(p.tags ?? []).join(' ')}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return pool;
  }, [posts, search, category]);

  // When no filter is active, hide the featured post from the grid (it
  // appears in the dedicated featured slot above). When filters are active,
  // show every match including the featured one.
  const showFeaturedSlot = featured && category === 'all' && search.trim().length === 0;
  const gridPosts = showFeaturedSlot ? filtered.filter((p) => p.id !== featured?.id) : filtered;

  const categoryOptions = useMemo(() => {
    const order: PostCategory[] = [
      'announcement',
      'guide',
      'tutorial',
      'community',
      'updates',
      'changelog',
    ];
    return [
      { value: 'all' as const, label: 'All', count: posts.length },
      ...order
        .filter((c) => categoryCounts.has(c))
        .map((c) => ({
          value: c,
          label: POST_CATEGORY_LABEL[c],
          count: categoryCounts.get(c),
        })),
    ];
  }, [posts.length, categoryCounts]);

  const groups: FilterGroup<string>[] = [
    {
      id: 'category',
      label: 'Category',
      value: category,
      onChange: (v) => setCategory(v as CategoryFilter),
      options: categoryOptions,
    },
  ];

  const hasActiveFilter = search.trim().length > 0 || category !== 'all';

  return (
    <div className="space-y-10">
      {showFeaturedSlot && featured && <PostCard post={featured} variant="featured" />}

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search posts, tags…"
        groups={groups}
        resultCount={gridPosts.length}
        resultLabel="post"
        onReset={
          hasActiveFilter
            ? () => {
                setSearch('');
                setCategory('all');
              }
            : undefined
        }
      />

      {gridPosts.length === 0 ? (
        <EmptyState
          onReset={() => {
            setSearch('');
            setCategory('all');
          }}
        />
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {gridPosts.map((p) => (
            <li key={p.id}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center">
      <div className="grid size-14 place-items-center rounded-2xl border border-(--glass-border) bg-(--color-bg-deep)/60">
        <Rss className="size-6 text-(--color-gekko-400)" />
      </div>
      <h3 className="mt-5 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
        No posts match those filters
      </h3>
      <p className="mt-2 max-w-md text-sm text-(--color-text-secondary)">
        Try a different category — or pitch a writeup in Discord. Most posts here started as someone
        sharing a clip or a tactic in the channel.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="glass" onClick={onReset}>
          Reset filters
        </Button>
        <Button asChild>
          <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
            Pitch a post <MessageCircle className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
