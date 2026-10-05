import type { EventPrize } from '@/types/event';
import { Trophy } from 'lucide-react';

const placeColor = (i: number) =>
  i === 0
    ? 'var(--color-gekko-500)'
    : i === 1
      ? 'var(--color-neon-cyan)'
      : i === 2
        ? 'var(--color-neon-violet)'
        : 'var(--color-text-muted)';

export function EventPrizeList({ prizes }: { prizes: EventPrize[] }) {
  if (prizes.length === 0) {
    return (
      <p className="glass rounded-2xl p-6 text-sm text-(--color-text-secondary)">
        No prize tiers published — most tournaments add them an hour before kickoff.
      </p>
    );
  }
  return (
    <ol className="space-y-3">
      {prizes.map((p, i) => {
        const color = placeColor(i);
        return (
          <li
            key={`${p.place}-${i}`}
            className="flex items-center gap-4 rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 px-4 py-3"
          >
            <span
              className="grid size-10 shrink-0 place-items-center rounded-xl border"
              style={{ borderColor: `${color}55`, color, background: `${color}0d` }}
            >
              <Trophy className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p
                className="font-(family-name:--font-heading) text-sm font-bold tracking-tight"
                style={{ color }}
              >
                {p.place}
              </p>
              <p className="mt-0.5 text-xs text-(--color-text-secondary)">{p.reward}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
