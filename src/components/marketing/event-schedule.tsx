import type { EventScheduleItem } from '@/types/event';
import { Clock } from 'lucide-react';

export function EventSchedule({ schedule }: { schedule: EventScheduleItem[] }) {
  if (schedule.length === 0) {
    return (
      <p className="glass rounded-2xl p-6 text-sm text-(--color-text-secondary)">
        No run-of-show published yet — the host posts the schedule in Discord a day before the
        event.
      </p>
    );
  }
  return (
    <ol className="space-y-3">
      {schedule.map((slot, i) => (
        <li
          key={`${slot.label}-${i}`}
          className="flex items-start gap-4 rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-4"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-(--glass-border) bg-(--color-bg-deep)/60 text-(--color-gekko-400)">
            <Clock className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-(family-name:--font-heading) text-sm font-bold tracking-tight">
              {slot.label}
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              {slot.time}
              {slot.detail && <span aria-hidden> · {slot.detail}</span>}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
