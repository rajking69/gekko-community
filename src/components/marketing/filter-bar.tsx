'use client';

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export type FilterOption<T extends string> = {
  value: T;
  label: string;
  /** Optional count badge — useful for "All (12)". */
  count?: number;
};

export type FilterGroup<T extends string = string> = {
  /** Identifier — used for aria + key. */
  id: string;
  /** Visible label above the pill row. */
  label: string;
  value: T;
  onChange: (next: T) => void;
  options: FilterOption<T>[];
};

type FilterBarProps = {
  /** Optional search input. Omit `onSearchChange` to hide. */
  search?: string;
  onSearchChange?: (next: string) => void;
  searchPlaceholder?: string;
  /** Pill groups — render in order. Any number is supported but 1-3 is sane. */
  groups: FilterGroup<string>[];
  /** Total results so the user can see filters took effect. */
  resultCount?: number;
  /** Singular noun for the result count — "game", "event". Plural derives. */
  resultLabel?: string;
  /** Show a reset button when any filter is active. */
  onReset?: () => void;
  className?: string;
};

export function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder = 'Search…',
  groups,
  resultCount,
  resultLabel = 'result',
  onReset,
  className,
}: FilterBarProps) {
  return (
    <div className={cn('glass rounded-3xl p-4 sm:p-5', className)}>
      <div className="flex flex-col gap-4">
        {onSearchChange && (
          <label className="relative flex items-center" aria-label={searchPlaceholder}>
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 size-4 text-(--color-text-muted)"
            />
            <input
              type="search"
              value={search ?? ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-11 w-full rounded-xl border border-(--glass-border) bg-(--color-bg-deep)/40 pl-10 pr-10 text-sm text-(--color-text-primary) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-gekko-500) focus:bg-(--color-bg-deep)/70"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-2 grid size-7 place-items-center rounded-lg text-(--color-text-muted) transition hover:bg-(--glass-tint) hover:text-(--color-text-primary)"
              >
                <X className="size-3.5" />
              </button>
            )}
          </label>
        )}

        {groups.map((group) => (
          <fieldset key={group.id} className="space-y-2">
            <legend className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
              {group.label}
            </legend>
            <div className="-mx-1 flex flex-wrap gap-1.5" aria-label={group.label}>
              {group.options.map((opt) => {
                const active = opt.value === group.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => group.onChange(opt.value)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition',
                      active
                        ? 'border-(--color-gekko-500)/60 bg-(--color-gekko-500)/10 text-(--color-gekko-300)'
                        : 'border-(--glass-border) bg-(--color-bg-deep)/30 text-(--color-text-secondary) hover:border-(--color-gekko-500)/40 hover:text-(--color-text-primary)',
                    )}
                  >
                    {opt.label}
                    {typeof opt.count === 'number' && (
                      <span
                        className={cn(
                          'rounded-full px-1.5 text-[9px] tabular-nums',
                          active
                            ? 'bg-(--color-gekko-500)/20 text-(--color-gekko-300)'
                            : 'bg-(--glass-tint) text-(--color-text-muted)',
                        )}
                      >
                        {opt.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {(typeof resultCount === 'number' || onReset) && (
        <div className="mt-4 flex items-center justify-between border-t border-(--glass-border) pt-4">
          {typeof resultCount === 'number' ? (
            <p
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted) tabular-nums"
              aria-live="polite"
            >
              {resultCount} {resultCount === 1 ? resultLabel : `${resultLabel}s`}
            </p>
          ) : (
            <span />
          )}
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-gekko-400) transition hover:text-(--color-gekko-300)"
            >
              Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
