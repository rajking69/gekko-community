'use client';

import React, { useEffect, useState } from 'react';
import { listHallOfFameParams, type HallOfFameEntry } from '@/services/hall-of-fame.service';
import { StatusBadge } from '@/components/admin/status-badge';
import { LoadingSkeleton } from '@/components/admin/loading-skeleton';
import { EmptyState } from '@/components/admin/empty-state';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { Search, Trophy, Star, Eye, EyeOff, Trash2, Plus } from 'lucide-react';

export default function AdminHallOfFamePage() {
  const [entries, setEntries] = useState<HallOfFameEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Confirmation dialog state
  const [selectedEntry, setSelectedEntry] = useState<HallOfFameEntry | null>(null);
  const [actionType, setActionType] = useState<'toggle_publish' | 'delete' | null>(null);

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await listHallOfFameParams({ published: true });
        const list = Array.isArray(data) ? data : data?.data || [];
        setEntries(list);
      } catch {
        setEntries([]);
      } finally {
        setLoading(false);
      }
    }
    loadEntries();
  }, []);

  if (loading) return <LoadingSkeleton />;

  const handleAction = (entry: HallOfFameEntry, type: 'toggle_publish' | 'delete') => {
    setSelectedEntry(entry);
    setActionType(type);
  };

  const confirmAction = () => {
    if (!selectedEntry || !actionType) return;

    if (actionType === 'delete') {
      setEntries((prev) => prev.filter((e) => e.slug !== selectedEntry.slug));
    } else if (actionType === 'toggle_publish') {
      setEntries((prev) =>
        prev.map((e) =>
          e.slug === selectedEntry.slug ? { ...e, published: !e.published } : e
        )
      );
    }

    setSelectedEntry(null);
    setActionType(null);
  };

  const filteredEntries = entries.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight text-white">
            Hall of Fame Management
          </h1>
          <p className="text-xs text-(--color-text-secondary)">
            Manage, publish, and feature prestigious community awards and MVP achievements.
          </p>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-(--glass-border) bg-black/40 pl-9 pr-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 rounded-xl border border-(--glass-border) bg-black/40 px-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
          >
            <option value="all">All Categories</option>
            <option value="MVP">MVP</option>
            <option value="Tournament Champion">Tournament Champion</option>
            <option value="Community Legend">Community Legend</option>
          </select>
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredEntries.length === 0 ? (
        <EmptyState
          icon="🏆"
          title="No Hall of Fame entries"
          description="No published Hall of Fame achievements currently exist in the database."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry) => (
            <div key={entry.slug} className="glass rounded-2xl border border-(--glass-border) p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <StatusBadge status={entry.published ? 'PUBLISHED' : 'DRAFT'} />
                  {entry.featured && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] text-amber-300 border border-amber-500/30">
                      <Star className="size-3 fill-current text-amber-400" /> FEATURED
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-400">
                      {entry.category} · {entry.year}
                    </span>
                    <h3 className="font-(family-name:--font-heading) text-lg font-bold text-white">
                      {entry.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-(--color-text-secondary) line-clamp-3 leading-relaxed">
                  {entry.description}
                </p>
              </div>

              {/* Control Action Buttons */}
              <div className="border-t border-(--glass-border) pt-4 flex items-center justify-between">
                <button
                  onClick={() => handleAction(entry, 'toggle_publish')}
                  className="flex items-center gap-1.5 rounded-lg border border-(--glass-border) bg-white/5 px-3 py-1.5 text-xs text-(--color-text-secondary) hover:text-white"
                >
                  {entry.published ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  {entry.published ? 'Unpublish' : 'Publish'}
                </button>

                <button
                  onClick={() => handleAction(entry, 'delete')}
                  className="grid size-8 place-items-center rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                  title="Delete Entry"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(actionType)}
        title={actionType === 'delete' ? 'Delete Entry' : selectedEntry?.published ? 'Unpublish Entry' : 'Publish Entry'}
        description={
          actionType === 'delete'
            ? `Are you sure you want to delete "${selectedEntry?.title}"? This action cannot be undone.`
            : `Are you sure you want to change the publication state for "${selectedEntry?.title}"?`
        }
        confirmLabel={actionType === 'delete' ? 'Delete' : 'Confirm'}
        isDanger={actionType === 'delete'}
        onConfirm={confirmAction}
        onCancel={() => {
          setSelectedEntry(null);
          setActionType(null);
        }}
      />
    </div>
  );
}
