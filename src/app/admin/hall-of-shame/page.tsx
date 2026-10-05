'use client';

import React, { useEffect, useState } from 'react';
import { listHallOfShameParams, type HallOfShameEntry } from '@/services/hall-of-shame.service';
import { StatusBadge } from '@/components/admin/status-badge';
import { LoadingSkeleton } from '@/components/admin/loading-skeleton';
import { EmptyState } from '@/components/admin/empty-state';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { Search, Skull, Eye, EyeOff, Trash2, ShieldAlert } from 'lucide-react';

export default function AdminHallOfShamePage() {
  const [entries, setEntries] = useState<HallOfShameEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Confirmation dialog state
  const [selectedEntry, setSelectedEntry] = useState<HallOfShameEntry | null>(null);
  const [actionType, setActionType] = useState<'toggle_publish' | 'delete' | null>(null);

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await listHallOfShameParams({ published: true });
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

  const handleAction = (entry: HallOfShameEntry, type: 'toggle_publish' | 'delete') => {
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

  const filteredEntries = entries.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Skull className="size-6 text-rose-400" /> Hall of Shame Management
          </h1>
          <p className="text-xs text-(--color-text-secondary)">
            Moderated log of community incidents, penalties, and wall of shame entries.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search incident title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-(--glass-border) bg-black/40 pl-9 pr-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
          />
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredEntries.length === 0 ? (
        <EmptyState
          icon="☠️"
          title="No Hall of Shame entries"
          description="There are currently no published Hall of Shame records in the database."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry) => (
            <div key={entry.slug} className="glass rounded-2xl border border-rose-500/20 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <StatusBadge status={entry.published ? 'PUBLISHED' : 'DRAFT'} />
                  <span className="font-mono text-[10px] uppercase text-rose-400 font-semibold">
                    {entry.category}
                  </span>
                </div>

                <h3 className="font-(family-name:--font-heading) text-lg font-bold text-white">
                  {entry.title}
                </h3>

                <p className="text-xs text-(--color-text-secondary) line-clamp-3 leading-relaxed">
                  {entry.description}
                </p>
              </div>

              {/* Controls */}
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
        title={actionType === 'delete' ? 'Delete Incident Record' : selectedEntry?.published ? 'Unpublish Record' : 'Publish Record'}
        description={
          actionType === 'delete'
            ? `Are you sure you want to delete "${selectedEntry?.title}" from the Hall of Shame database? This action is permanent.`
            : `Are you sure you want to toggle the publication status for "${selectedEntry?.title}"?`
        }
        confirmLabel={actionType === 'delete' ? 'Delete Record' : 'Confirm'}
        isDanger={true}
        onConfirm={confirmAction}
        onCancel={() => {
          setSelectedEntry(null);
          setActionType(null);
        }}
      />
    </div>
  );
}
