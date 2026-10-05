import type { WeeklyScheduleSlot } from '@/types/game';
import { Clock } from 'lucide-react';

export function WeeklySchedule({ schedule }: { schedule: WeeklyScheduleSlot[] }) {
  if (schedule.length === 0) {
    return (
      <p className="glass rounded-2xl p-6 text-sm text-(--color-text-secondary)">
        Schedule is ad-hoc for this title — squads form when the channel pings.
      </p>
    );
  }
  return (
    <ul className="space-y-3">
      {schedule.map((slot, i) => (
        <li
          key={`${slot.day}-${i}`}
          className="flex items-center gap-4 rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 px-4 py-3"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-(--glass-border) bg-(--color-bg-deep)/60 text-(--color-gekko-400)">
            <Clock className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-(family-name:--font-heading) text-sm font-bold tracking-tight">
              {slot.day}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              {slot.time} · {slot.mode}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
