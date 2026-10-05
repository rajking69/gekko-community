import { formatDate } from '@/lib/format';
import type { MemberBadge } from '@/types/member';
import { Award } from 'lucide-react';

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

export function BadgeGrid({ badges }: { badges: MemberBadge[] }) {
  if (badges.length === 0) {
    return (
      <p className="glass rounded-2xl p-6 text-sm text-(--color-text-secondary)">
        No badges yet — they unlock from match wins, hosted events, hitting level milestones, and
        showing up over time.
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((b) => {
        const accent = accentMap[b.color];
        return (
          <li
            key={b.id}
            className="group relative overflow-hidden rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-5 transition hover:border-(--color-gekko-500)/40"
          >
            <div
              aria-hidden
              className="absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(160px circle at 30% 0%, ${accent}1f, transparent 60%)`,
              }}
            />
            <div className="relative flex items-start gap-4">
              <div
                className="grid size-12 shrink-0 place-items-center rounded-xl border"
                style={{
                  borderColor: `${accent}55`,
                  background: `linear-gradient(135deg, ${accent}1a, transparent 60%)`,
                  color: accent,
                }}
              >
                <Award className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-(family-name:--font-heading) text-base font-bold tracking-tight">
                  {b.name}
                </p>
                <p className="mt-1 text-xs text-(--color-text-secondary)">{b.description}</p>
                <p
                  className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)"
                  suppressHydrationWarning
                >
                  Earned {formatDate(b.earnedAt, { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
