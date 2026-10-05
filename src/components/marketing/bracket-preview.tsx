import { cn } from '@/lib/utils';
import {
  type Bracket,
  type BracketMatch,
  type BracketParticipant,
  roundLabel,
} from '@/types/bracket';
import Image from 'next/image';
import Link from 'next/link';

export function BracketPreview({ bracket }: { bracket: Bracket }) {
  // Group matches by round (1-indexed).
  const byRound = new Map<number, BracketMatch[]>();
  for (const m of bracket.matches) {
    const list = byRound.get(m.round) ?? [];
    list.push(m);
    byRound.set(m.round, list);
  }
  // Sort each round by position so the rendering is stable.
  for (const list of byRound.values()) list.sort((a, b) => a.position - b.position);
  const rounds = Array.from(byRound.keys()).sort((a, b) => a - b);

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
        Format · {bracket.format}
      </p>
      <div className="-mx-6 mt-5 overflow-x-auto px-6 md:-mx-10 md:px-10">
        <div className="flex min-w-max items-stretch gap-6 pb-4">
          {rounds.map((r) => (
            <div key={r} className="flex w-56 flex-col gap-4 sm:w-64">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-gekko-400)">
                {roundLabel(r, bracket.rounds)}
              </h4>
              <ul className="flex flex-1 flex-col justify-around gap-4">
                {byRound.get(r)?.map((m) => (
                  <li key={m.id}>
                    <BracketMatchCard match={m} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BracketMatchCard({ match }: { match: BracketMatch }) {
  return (
    <article
      className={cn(
        'overflow-hidden rounded-2xl border bg-(--color-bg-card)/40 transition',
        match.status === 'live'
          ? 'border-(--color-danger)/50 shadow-[0_0_24px_-6px_rgba(239,68,68,0.4)]'
          : match.status === 'completed'
            ? 'border-(--glass-border)'
            : 'border-dashed border-(--glass-border)',
      )}
    >
      <Participant
        slot="A"
        participant={match.participantA}
        winner={match.winnerUsername}
        score={match.score?.split('-')[0]?.trim()}
        status={match.status}
      />
      <div className="border-t border-(--glass-border)" />
      <Participant
        slot="B"
        participant={match.participantB}
        winner={match.winnerUsername}
        score={match.score?.split('-')[1]?.trim()}
        status={match.status}
      />
      <div className="border-t border-(--glass-border) bg-(--color-bg-deep)/40 px-3 py-1.5">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          {match.status === 'live' ? (
            <span className="text-(--color-danger)">Live</span>
          ) : match.status === 'completed' ? (
            'Final'
          ) : (
            'Pending'
          )}
          {match.score && ` · ${match.score}`}
        </p>
      </div>
    </article>
  );
}

function Participant({
  slot,
  participant,
  winner,
  score,
  status,
}: {
  slot: 'A' | 'B';
  participant: BracketParticipant | null;
  winner?: string;
  score?: string;
  status: BracketMatch['status'];
}) {
  if (!participant) {
    return (
      <div className="flex items-center gap-3 px-3 py-2.5 text-(--color-text-muted)">
        <span className="grid size-7 place-items-center rounded-full border border-dashed border-(--glass-border) font-mono text-[10px] uppercase tracking-[0.2em]">
          {slot}
        </span>
        <span className="text-xs italic">TBD</span>
      </div>
    );
  }
  const isWinner = winner && participant.username === winner;
  const Wrapper: React.ElementType = participant.username ? Link : 'div';
  const wrapperProps = participant.username ? { href: `/members/${participant.username}` } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 transition',
        participant.username ? 'hover:bg-(--glass-tint)' : '',
        isWinner ? 'bg-(--color-gekko-500)/5' : '',
      )}
    >
      {participant.avatar ? (
        <div
          className={cn(
            'relative size-7 shrink-0 overflow-hidden rounded-full border',
            isWinner ? 'border-(--color-gekko-500)/60' : 'border-(--glass-border)',
          )}
        >
          <Image
            src={participant.avatar}
            alt=""
            width={56}
            height={56}
            sizes="28px"
            className="size-full object-cover"
            unoptimized
          />
        </div>
      ) : (
        <span
          className={cn(
            'grid size-7 place-items-center rounded-full border font-mono text-[9px] uppercase tracking-[0.2em]',
            isWinner
              ? 'border-(--color-gekko-500)/60 text-(--color-gekko-300)'
              : 'border-(--glass-border) text-(--color-text-secondary)',
          )}
        >
          {participant.seed ?? slot}
        </span>
      )}
      <p
        className={cn(
          'truncate flex-1 text-sm',
          isWinner
            ? 'text-(--color-gekko-300) font-(family-name:--font-heading) font-bold tracking-tight'
            : status === 'live'
              ? 'text-(--color-text-primary)'
              : 'text-(--color-text-secondary)',
        )}
      >
        {participant.displayName}
      </p>
      {score && (
        <span
          className={cn(
            'font-(family-name:--font-heading) text-sm font-bold tabular-nums',
            isWinner ? 'text-(--color-gekko-300)' : 'text-(--color-text-muted)',
          )}
        >
          {score}
        </span>
      )}
    </Wrapper>
  );
}
