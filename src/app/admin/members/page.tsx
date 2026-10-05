'use client';

import React, { useEffect, useState } from 'react';
import { listMembers } from '@/services/member.service';
import type { DirectoryMember } from '@/types/member';
import { StatusBadge } from '@/components/admin/status-badge';
import { LoadingSkeleton } from '@/components/admin/loading-skeleton';
import { EmptyState } from '@/components/admin/empty-state';
import { Search, UserCheck, Shield } from 'lucide-react';

export default function AdminMembersPage() {
  const [members, setMembers] = useState<DirectoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await listMembers();
        setMembers(data || []);
      } catch {
        setMembers([]);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  if (loading) return <LoadingSkeleton />;

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.displayName && m.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = roleFilter === 'all' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-(family-name:--font-heading) text-2xl font-bold tracking-tight text-white">
            Member Management
          </h1>
          <p className="text-xs text-(--color-text-secondary)">
            Manage community members, roles, and status.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-(--glass-border) bg-black/40 pl-9 pr-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-10 rounded-xl border border-(--glass-border) bg-black/40 px-3 text-xs text-white outline-none focus:border-(--color-gekko-500)"
          >
            <option value="all">All Roles</option>
            <option value="member">Member</option>
            <option value="moderator">Moderator</option>
            <option value="developer">Developer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Table / Empty State */}
      {filteredMembers.length === 0 ? (
        <EmptyState
          icon="👥"
          title="No members found"
          description="No community members match the selected search query or role filter."
        />
      ) : (
        <div className="glass overflow-hidden rounded-2xl border border-(--glass-border)">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-(--glass-border) font-mono text-xs uppercase tracking-wider text-(--color-text-muted)">
                <tr>
                  <th className="px-6 py-4">Member</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Level / XP</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--glass-border)">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="transition hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64'}
                          alt={member.username}
                          className="size-9 rounded-full object-cover border border-(--glass-border)"
                        />
                        <div>
                          <p className="font-semibold text-white">{member.displayName || member.username}</p>
                          <p className="text-xs text-(--color-text-muted)">@{member.username}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${
                          member.role === 'admin'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : member.role === 'moderator'
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-white/10 text-(--color-text-secondary)'
                        }`}
                      >
                        {member.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-white">
                      Lvl {member.level} · {member.xp.toLocaleString()} XP
                    </td>

                    <td className="px-6 py-4 text-xs text-(--color-text-muted)">
                      {member.location || 'Global'}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status="ACTIVE" />
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
