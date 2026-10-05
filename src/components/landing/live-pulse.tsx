'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { formatCompact, formatNumber } from '@/lib/format';
import { BellRing, Calendar, Gamepad2, Sparkles, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Metric = {
  key: string;
  label: string;
  baseValue: number;
  unit?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  format?: 'integer' | 'compact';
  /** Per-tick increment range (min, max). Random within range each interval. */
  tick?: [number, number];
};

const METRICS: Metric[] = [
  {
    key: 'online',
    label: 'Members online',
    baseValue: 1204,
    icon: Users,
    accent: 'var(--color-gekko-500)',
    format: 'integer',
    tick: [-2, 4],
  },
  {
    key: 'matches',
    label: 'Matches live now',
    baseValue: 18,
    icon: Gamepad2,
    accent: 'var(--color-neon-cyan)',
    format: 'integer',
    tick: [-1, 2],
  },
  {
    key: 'events',
    label: 'Events this month',
    baseValue: 24,
    icon: Calendar,
    accent: 'var(--color-neon-violet)',
    format: 'integer',
    tick: [0, 1],
  },
  {
    key: 'xp',
    label: 'XP earned today',
    baseValue: 18_420,
    icon: Sparkles,
    accent: 'var(--color-neon-amber)',
    format: 'compact',
    tick: [10, 60],
  },
  {
    key: 'notifications',
    label: 'Notifications / hr',
    baseValue: 342,
    icon: BellRing,
    accent: 'var(--color-neon-pink)',
    format: 'integer',
    tick: [-3, 6],
  },
];

export function LivePulse() {
  return (
    <section
      id="live-pulse"
      aria-label="Live community metrics"
      className="relative border-y border-(--glass-border) bg-(--color-bg-deep)/40 backdrop-blur-md"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-(--color-gekko-500)/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-(--color-neon-violet)/30 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl no-scrollbar overflow-x-auto px-6 py-4 md:px-10 md:py-5">
        <div className="flex min-w-max items-center gap-10 md:gap-14">
          <div className="flex items-center gap-3 pr-4 border-r border-(--glass-border)">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-gekko-500) opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-gekko-500)" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-secondary)">
              Live pulse
            </span>
          </div>

          {METRICS.map((m) => (
            <MetricItem key={m.key} metric={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricItem({ metric }: { metric: Metric }) {
  const Icon = metric.icon;
  const reduced = useReducedMotion();
  const value = useTickingValue(metric.baseValue, metric.tick, reduced);

  const display = metric.format === 'compact' ? formatCompact(value) : formatNumber(value);

  return (
    <div className="flex shrink-0 items-center gap-3">
      <div
        className="flex size-9 items-center justify-center rounded-xl border border-(--glass-border) bg-(--glass-tint)"
        style={{ color: metric.accent }}
      >
        <Icon className="size-4" />
      </div>
      <div>
        <div className="font-(family-name:--font-heading) text-xl font-bold tabular-nums tracking-tight md:text-2xl">
          {display}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          {metric.label}
        </div>
      </div>
    </div>
  );
}

/**
 * Returns a number that starts at `base` and jitters every 4–9s by a random
 * amount within `tick`. Caps at non-negative. If reduced motion is on, never ticks.
 */
function useTickingValue(base: number, tick: Metric['tick'], reduced: boolean) {
  const [value, setValue] = useState(base);
  const baseRef = useRef(base);
  baseRef.current = base;

  useEffect(() => {
    if (reduced || !tick) return;
    const [min, max] = tick;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 4000 + Math.random() * 5000;
      timer = setTimeout(() => {
        setValue((v) => {
          const delta = Math.floor(min + Math.random() * (max - min + 1));
          const next = v + delta;
          // Soft anchor: drift back toward the base over time to avoid runaway numbers
          const driftBack =
            Math.sign(baseRef.current - next) * Math.floor(Math.abs(baseRef.current - next) * 0.02);
          return Math.max(0, next + driftBack);
        });
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [reduced, tick]);

  return value;
}
