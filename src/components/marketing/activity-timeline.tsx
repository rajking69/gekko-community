import { formatRelative } from '@/lib/format';
import { ACTIVITY_COLOR, ACTIVITY_LABEL, type ActivityEntry } from '@/types/activity';
import { Award, Calendar, Flame, Gamepad2, TrendingUp, Trophy, Users } from 'lucide-react';
import type { ComponentType } from 'react';

const ICON_MAP: Record<ActivityEntry['kind'], ComponentType<{ className?: string }>> = {
  match_won: Trophy,
  match_played: Gamepad2,
  event_attended: Calendar,
  badge_earned: Award,
  joined_squad: Users,
  streak_milestone: Flame,
  level_up: TrendingUp,
};

export function ActivityTimeline({ entries }: { entries: ActivityEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="glass rounded-2xl p-6 text-sm text-(--color-text-secondary)">
        No recent activity logged. Activity shows up here after match wins, hosted events, and badge
        unlocks.
      </p>
    );
  }
  return (
    <ol className="relative space-y-3 border-l border-(--glass-border) pl-6">
      {entries.map((entry) => {
        const Icon = ICON_MAP[entry.kind];
        const color = ACTIVITY_COLOR[entry.kind];
        return (
          <li key={entry.id} className="relative">
            <span
              aria-hidden
              className="absolute -left-[33px] grid size-6 place-items-center rounded-full border bg-(--color-bg-deep)"
              style={{ borderColor: `${color}55`, color }}
            >
              <Icon className="size-3" />
            </span>
            <div className="rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color }}
                >
                  {ACTIVITY_LABEL[entry.kind]}
                </span>
                <time
                  dateTime={entry.occurredAt}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted) tabular-nums"
                  suppressHydrationWarning
                >
                  {formatRelative(entry.occurredAt)}
                </time>
              </div>
              <p className="mt-1 text-sm text-(--color-text-primary)">{entry.text}</p>
              {entry.detail && (
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                  {entry.detail}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
