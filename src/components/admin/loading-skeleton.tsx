'use client';

export function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPI Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass rounded-2xl p-6 border border-(--glass-border) h-32 space-y-3">
            <div className="h-4 w-24 rounded bg-white/10" />
            <div className="h-8 w-16 rounded bg-white/20" />
            <div className="h-3 w-32 rounded bg-white/10" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="glass rounded-2xl p-6 border border-(--glass-border) space-y-4">
        <div className="h-6 w-48 rounded bg-white/15" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-full rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
