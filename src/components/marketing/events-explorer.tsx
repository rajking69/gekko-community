'use client';

import { EventCard } from '@/components/marketing/event-card';
import { FilterBar, type FilterGroup } from '@/components/marketing/filter-bar';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { cn } from '@/lib/utils';
import {
  type CommunityEvent,
  EVENT_ACCENT_HEX,
  EVENT_STATUS_LABEL,
  EVENT_TYPE_LABEL,
  type EventStatus,
  type EventType,
} from '@/types/event';
import { CalendarDays, LayoutGrid, ListVideo, MessageCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

type TypeFilter = EventType | 'all';
type StatusFilter = EventStatus | 'all';
type ViewMode = 'grid' | 'calendar';

const VIEW_OPTIONS: {
  value: ViewMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: 'grid', label: 'Grid', icon: LayoutGrid },
  { value: 'calendar', label: 'Calendar', icon: CalendarDays },
];

export function EventsExplorer({ events }: { events: CommunityEvent[] }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<TypeFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [view, setView] = useState<ViewMode>('grid');

  const typeCounts = useMemo(() => {
    const m = new Map<EventType, number>();
    for (const e of events) m.set(e.type, (m.get(e.type) ?? 0) + 1);
    return m;
  }, [events]);

  const statusCounts = useMemo(() => {
    const m = new Map<EventStatus, number>();
    for (const e of events) m.set(e.status, (m.get(e.status) ?? 0) + 1);
    return m;
  }, [events]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const out = events.filter((e) => {
      if (type !== 'all' && e.type !== type) return false;
      if (status !== 'all' && e.status !== status) return false;
      if (q) {
        const haystack = `${e.title} ${e.description} ${e.location}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    return out.sort((a, b) => {
      // Undated ("Date TBA") events sort to the end.
      const ta = a.startAt ? new Date(a.startAt).getTime() : Number.POSITIVE_INFINITY;
      const tb = b.startAt ? new Date(b.startAt).getTime() : Number.POSITIVE_INFINITY;
      return ta - tb;
    });
  }, [events, search, type, status]);

  const typeOptions = useMemo(() => {
    const order: EventType[] = ['tournament', 'workshop', 'meetup', 'stream'];
    return [
      { value: 'all' as const, label: 'All', count: events.length },
      ...order
        .filter((t) => typeCounts.has(t))
        .map((t) => ({ value: t, label: EVENT_TYPE_LABEL[t], count: typeCounts.get(t) })),
    ];
  }, [events.length, typeCounts]);

  const statusOptions = useMemo(() => {
    const order: EventStatus[] = ['live', 'open', 'closed', 'completed', 'cancelled'];
    return [
      { value: 'all' as const, label: 'Any', count: events.length },
      ...order
        .filter((s) => statusCounts.has(s))
        .map((s) => ({ value: s, label: EVENT_STATUS_LABEL[s], count: statusCounts.get(s) })),
    ];
  }, [events.length, statusCounts]);

  const groups: FilterGroup<string>[] = [
    {
      id: 'type',
      label: 'Type',
      value: type,
      onChange: (v) => setType(v as TypeFilter),
      options: typeOptions,
    },
    {
      id: 'status',
      label: 'Status',
      value: status,
      onChange: (v) => setStatus(v as StatusFilter),
      options: statusOptions,
    },
  ];

  const hasActiveFilter = search.trim().length > 0 || type !== 'all' || status !== 'all';

  // With only a couple of events the filter rail + search adds noise, not value —
  // show the cards on their own in a centered grid instead.
  if (events.length <= 2) {
    return (
      <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {events.map((e) => (
          <li key={e.id}>
            <EventCard event={e} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search title, location, host…"
          groups={groups}
          resultCount={filtered.length}
          resultLabel="event"
          onReset={
            hasActiveFilter
              ? () => {
                  setSearch('');
                  setType('all');
                  setStatus('all');
                }
              : undefined
          }
        />

        {/* View toggle */}
        <div
          className="mt-4 inline-flex w-full overflow-hidden rounded-2xl border border-(--glass-border) bg-(--color-bg-deep)/40"
          aria-label="View toggle"
        >
          {VIEW_OPTIONS.map((opt) => {
            const active = opt.value === view;
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                type="button"
                aria-pressed={active}
                onClick={() => setView(opt.value)}
                className={cn(
                  'flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition',
                  active
                    ? 'bg-(--color-gekko-500)/10 text-(--color-gekko-300)'
                    : 'text-(--color-text-secondary) hover:text-(--color-text-primary)',
                )}
              >
                <Icon className="size-3.5" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </aside>

      <div>
        {filtered.length === 0 ? (
          <EmptyState
            onReset={() => {
              setSearch('');
              setType('all');
              setStatus('all');
            }}
          />
        ) : view === 'grid' ? (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {filtered.map((e) => (
              <li key={e.id}>
                <EventCard event={e} />
              </li>
            ))}
          </ul>
        ) : (
          <CalendarView events={filtered} />
        )}
      </div>
    </div>
  );
}

function CalendarView({ events }: { events: CommunityEvent[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, CommunityEvent[]>();
    for (const e of events) {
      // Undated events are grouped under a "tba" bucket (sorts last).
      const key = e.startAt
        ? (() => {
            const d = new Date(e.startAt);
            return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
          })()
        : 'tba';
      const list = map.get(key) ?? [];
      list.push(e);
      map.set(key, list);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [events]);

  return (
    <ol className="space-y-10">
      {groups.map(([key, group]) => {
        const [year, month] = key.split('-');
        const monthLabel =
          key === 'tba'
            ? 'Date TBA'
            : new Date(Number(year), Number(month) - 1, 1).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              });
        return (
          <li key={key}>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
              {monthLabel}
            </h3>
            <ul className="mt-4 space-y-3">
              {group.map((e) => (
                <li key={e.id}>
                  <CalendarRow event={e} />
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}

function CalendarRow({ event }: { event: CommunityEvent }) {
  const d = event.startAt ? new Date(event.startAt) : null;
  const dayNumber = d ? String(d.getUTCDate()) : '—';
  const dayOfWeek = d
    ? d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' })
    : 'TBA';
  const accent = EVENT_ACCENT_HEX[event.accent];

  return (
    <a
      href={`/events/${event.slug}`}
      className="group grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 px-4 py-3 transition hover:border-(--color-gekko-500)/40 sm:px-5"
    >
      <div
        className="flex flex-col items-center justify-center rounded-xl border px-2 py-2 text-center"
        style={{ borderColor: `${accent}55`, background: `${accent}0a` }}
      >
        <span
          className="font-(family-name:--font-heading) text-xl font-bold tabular-nums"
          style={{ color: accent }}
        >
          {dayNumber}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          {dayOfWeek}
        </span>
      </div>
      <div className="min-w-0">
        <p className="truncate font-(family-name:--font-heading) text-sm font-bold tracking-tight sm:text-base">
          {event.title}
        </p>
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          {EVENT_TYPE_LABEL[event.type]} · {event.location} · {EVENT_STATUS_LABEL[event.status]}
        </p>
      </div>
      <ListVideo className="size-4 shrink-0 text-(--color-text-muted) transition group-hover:text-(--color-gekko-300)" />
    </a>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center">
      <div className="grid size-14 place-items-center rounded-2xl border border-(--glass-border) bg-(--color-bg-deep)/60">
        <CalendarDays className="size-6 text-(--color-gekko-400)" />
      </div>
      <h3 className="mt-5 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
        Nothing on the calendar for that
      </h3>
      <p className="mt-2 max-w-md text-sm text-(--color-text-secondary)">
        Try a different type or status — or pitch an event in Discord. Most of what runs here
        started as someone saying "hey, can we do this?"
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="glass" onClick={onReset}>
          Reset filters
        </Button>
        <Button asChild>
          <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
            Pitch an event <MessageCircle className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
