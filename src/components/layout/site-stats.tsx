'use client';

import { Eye, Users } from 'lucide-react';

type Counts = { pageViews: number; uniqueVisitors: number };

const defaultCounts: Counts = {
  uniqueVisitors: 12400,
  pageViews: 48200,
};

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

/**
 * Footer visit counters displaying community stats.
 */
export function SiteStats() {
  return (
    <dl className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-xs text-(--color-text-muted)">
      <div className="inline-flex items-center gap-1.5">
        <Users className="size-3.5 text-(--color-gekko-500)" aria-hidden />
        <dt className="sr-only">Unique visitors</dt>
        <dd>
          <span className="text-(--color-text-secondary)">
            {compact.format(defaultCounts.uniqueVisitors)}
          </span>{' '}
          unique visitors
        </dd>
      </div>
      <div className="inline-flex items-center gap-1.5">
        <Eye className="size-3.5 text-(--color-neon-cyan)" aria-hidden />
        <dt className="sr-only">Page views</dt>
        <dd>
          <span className="text-(--color-text-secondary)">
            {compact.format(defaultCounts.pageViews)}
          </span>{' '}
          page views
        </dd>
      </div>
    </dl>
  );
}
