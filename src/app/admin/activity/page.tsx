'use client';

import React, { useEffect, useState } from 'react';
import { fetchActivityLogs, type ActivityLogItem } from '@/services/activity.service';
import { LoadingSkeleton } from '@/components/admin/loading-skeleton';
import { EmptyState } from '@/components/admin/empty-state';
import { Activity, Shield, Clock, FileText, Search } from 'lucide-react';

export default function AdminActivityPage() {
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadLogs() {
      try {
        const data = await fetchActivityLogs();
        setLogs(data || []);
      } catch {
        setLogs([]);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  if (loading) return <LoadingSkeleton />;

  const filteredLogs = logs.filter(
    (l) =>
      l.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.resourceTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Activity className="size-6 text-(--color-gekko-400)" /> Activity Logs & Audit Trail
          </h1>
          <p className="text-xs text-(--color-text-secondary)">
            Real-time audit records of logins, content publications, and role updates.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search action or actor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-(--glass-border) bg-black/40 pl-9 pr-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
          />
        </div>
      </div>

      {/* Log items / Empty State */}
      {filteredLogs.length === 0 ? (
        <EmptyState
          icon="📊"
          title="No activity logs found"
          description="There are currently no recorded administrative audit actions matching your query."
        />
      ) : (
        <div className="glass overflow-hidden rounded-2xl border border-(--glass-border)">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-(--glass-border) font-mono text-xs uppercase tracking-wider text-(--color-text-muted)">
                <tr>
                  <th className="px-6 py-4">Actor</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Resource Title</th>
                  <th className="px-6 py-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--glass-border)">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="transition hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-white">{log.actor}</p>
                        <span className="font-mono text-[10px] uppercase text-(--color-gekko-400)">
                          {log.actorRole}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                        {log.action}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-white">
                      {log.resourceTitle}
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-(--color-text-muted)">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
