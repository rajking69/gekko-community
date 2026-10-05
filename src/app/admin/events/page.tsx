'use client';

import React, { useEffect, useState } from 'react';
import { listEventsBackend, type CommunityEvent } from '@/services/event-backend.service';
import { StatusBadge } from '@/components/admin/status-badge';
import { LoadingSkeleton } from '@/components/admin/loading-skeleton';
import { EmptyState } from '@/components/admin/empty-state';
import { Search, Calendar, Trophy, Users, Globe, MapPin } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await listEventsBackend();
        const eventList = Array.isArray(data) ? data : data?.data || [];
        setEvents(eventList);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) return <LoadingSkeleton />;

  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (e.status && e.status.toLowerCase() === statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight text-white">
            Event & Tournament Management
          </h1>
          <p className="text-xs text-(--color-text-secondary)">
            Manage community scrims, Gekko Cup tournaments, and events.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search event title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-(--glass-border) bg-black/40 pl-9 pr-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-(--glass-border) bg-black/40 px-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
          >
            <option value="all">All Statuses</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Grid or Empty state */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon="📅"
          title="No upcoming events"
          description="There are currently no events registered in the platform database."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div key={event.slug} className="glass rounded-2xl border border-(--glass-border) p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <StatusBadge status={event.status || 'UPCOMING'} />
                  <span className="flex items-center gap-1 font-mono text-[10px] text-(--color-text-muted)">
                    {event.isOnline ? <Globe className="size-3 text-emerald-400" /> : <MapPin className="size-3 text-amber-400" />}
                    {event.isOnline ? 'ONLINE' : 'LAN / OFFLINE'}
                  </span>
                </div>

                <h3 className="font-(family-name:--font-heading) text-lg font-bold text-white">
                  {event.title}
                </h3>
                <p className="text-xs text-(--color-text-secondary) line-clamp-2">
                  {event.description || event.shortDescription}
                </p>
              </div>

              <div className="border-t border-(--glass-border) pt-4 space-y-2 text-xs font-mono text-(--color-text-muted)">
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <span className="text-white">{event.registered || 0} / {event.capacity || 'Unlimited'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="text-white truncate max-w-[150px]">{event.location || 'Discord / Online'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
