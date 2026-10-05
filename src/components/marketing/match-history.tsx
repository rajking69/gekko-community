import { formatDate } from '@/lib/format';
import { type Match, RESULT_COLOR, RESULT_LABEL } from '@/types/match';

export function MatchHistory({ matches }: { matches: Match[] }) {
  if (matches.length === 0) {
    return (
      <p className="glass rounded-2xl p-6 text-sm text-(--color-text-secondary)">
        No recent matches logged for this title — squads usually report results in the channel
        within a day of playing.
      </p>
    );
  }
  return (
    <ol className="overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40">
      {matches.map((m) => (
        <MatchRow key={m.id} match={m} />
      ))}
    </ol>
  );
}

function MatchRow({ match }: { match: Match }) {
  const color = RESULT_COLOR[match.result];
  return (
    <li className="flex flex-col gap-3 border-b border-(--glass-border) px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-5 sm:px-6">
      {/* Result chip */}
      <span
        className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] tabular-nums"
        style={{ borderColor: `${color}55`, color }}
      >
        <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
        {RESULT_LABEL[match.result]}
      </span>

      {/* Opponent + meta */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-(family-name:--font-heading) text-sm font-bold tracking-tight sm:text-base">
          {match.squad} <span className="text-(--color-text-muted)">vs</span> {match.opponent}
        </p>
        <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          {match.mode}
          {match.map && <span aria-hidden> · {match.map}</span>}
          {match.mvp && (
            <span>
              <span aria-hidden> · </span>
              MVP {match.mvp.displayName}
            </span>
          )}
        </p>
      </div>

      {/* Score + date */}
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-1">
        <span
          className="font-(family-name:--font-heading) text-lg font-bold tracking-tight tabular-nums"
          style={{ color }}
        >
          {match.score}
        </span>
        <time
          dateTime={match.playedAt}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted) tabular-nums"
          suppressHydrationWarning
        >
          {formatDate(match.playedAt, { month: 'short', day: 'numeric' })}
        </time>
      </div>
    </li>
  );
}
