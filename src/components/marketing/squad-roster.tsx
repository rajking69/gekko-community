import { formatDate } from '@/lib/format';
import type { Squad } from '@/types/squad';
import { Crown, Users } from 'lucide-react';
import Image from 'next/image';

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

export function SquadRosterList({ squads }: { squads: Squad[] }) {
  if (squads.length === 0) {
    return (
      <p className="glass rounded-2xl p-6 text-sm text-(--color-text-secondary)">
        No fixed squads yet for this game — when the channel pings, a pickup lobby forms in minutes.
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
      {squads.map((squad) => (
        <li key={squad.id}>
          <SquadCard squad={squad} />
        </li>
      ))}
    </ul>
  );
}

function SquadCard({ squad }: { squad: Squad }) {
  const accent = accentMap[squad.accent];
  const filledSlots = 1 + squad.roster.length;
  const openCount = Math.max(0, squad.capacity - filledSlots);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 p-6 transition hover:border-(--color-gekko-500)/40">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-(family-name:--font-heading) text-xl font-bold tracking-tight">
            {squad.name}
          </h3>
          {squad.tagline && (
            <p className="mt-1 line-clamp-2 text-sm text-(--color-text-secondary)">
              {squad.tagline}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {squad.rank && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] tabular-nums"
              style={{ borderColor: `${accent}55`, color: accent }}
            >
              {squad.rank}
            </span>
          )}
          {squad.openSlots && openCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-(--color-gekko-500)/50 bg-(--color-gekko-500)/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-gekko-300)">
              {openCount} open
            </span>
          )}
        </div>
      </header>

      {/* Meta strip */}
      <dl className="mt-5 grid grid-cols-3 gap-3 text-xs">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
            Cadence
          </dt>
          <dd className="mt-1 text-(--color-text-secondary)">{squad.cadence}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
            Formed
          </dt>
          <dd className="mt-1 text-(--color-text-secondary)" suppressHydrationWarning>
            {formatDate(squad.formedAt, { month: 'short', year: 'numeric' })}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
            Capacity
          </dt>
          <dd
            className="mt-1 inline-flex items-center gap-1.5 tabular-nums text-(--color-text-secondary)"
            style={{ color: accent }}
          >
            <Users className="size-3.5" />
            {filledSlots} / {squad.capacity}
          </dd>
        </div>
      </dl>

      {/* Captain */}
      <div
        className="mt-6 flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-(--color-bg-deep)/40 p-3"
        style={{ borderColor: `${accent}33` }}
      >
        <div
          className="relative size-11 overflow-hidden rounded-full border"
          style={{ borderColor: `${accent}66` }}
        >
          <Image
            src={squad.captain.avatar}
            alt=""
            width={88}
            height={88}
            sizes="44px"
            className="size-full object-cover"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: accent }}
          >
            <Crown className="size-3" />
            Captain
          </p>
          <p className="mt-0.5 truncate font-(family-name:--font-heading) text-sm font-bold tracking-tight">
            {squad.captain.displayName}
          </p>
          {squad.captain.role && (
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              {squad.captain.role}
            </p>
          )}
        </div>
      </div>

      {/* Roster */}
      <div className="mt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
          Roster
        </p>
        <ul className="mt-3 space-y-2">
          {squad.roster.map((m) => (
            <li
              key={m.username}
              className="flex items-center gap-3 rounded-xl border border-(--glass-border) bg-(--color-bg-deep)/30 px-3 py-2"
            >
              <div className="relative size-8 overflow-hidden rounded-full border border-(--glass-border)">
                <Image
                  src={m.avatar}
                  alt=""
                  width={64}
                  height={64}
                  sizes="32px"
                  className="size-full object-cover"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-(--color-text-primary)">{m.displayName}</p>
                <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                  @{m.username}
                  {m.role && <span aria-hidden> · {m.role}</span>}
                </p>
              </div>
            </li>
          ))}
          {Array.from({ length: openCount }).map((_, i) => (
            <li
              key={`${squad.id}-open-${i}`}
              className="flex items-center gap-3 rounded-xl border border-dashed border-(--glass-border) px-3 py-2 text-(--color-text-muted)"
            >
              <div className="grid size-8 place-items-center rounded-full border border-dashed border-(--glass-border)">
                <Users className="size-3.5" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em]">Open slot</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
