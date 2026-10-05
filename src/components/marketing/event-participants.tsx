import type { DirectoryMember } from '@/types/member';
import Image from 'next/image';
import Link from 'next/link';

export function EventParticipants({ members }: { members: DirectoryMember[] }) {
  if (members.length === 0) {
    return (
      <p className="glass rounded-2xl p-6 text-sm text-(--color-text-secondary)">
        Participant list hasn't been published yet. For tournaments it appears once the bracket
        reveal happens; for workshops it's intentionally private.
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {members.map((m) => (
        <li key={m.id}>
          <Link
            href={`/members/${m.username}`}
            className="group flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-3 transition hover:border-(--color-gekko-500)/40"
          >
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-(--glass-border)">
              <Image
                src={m.avatar}
                alt=""
                width={80}
                height={80}
                sizes="40px"
                className="size-full object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-(--color-text-primary) group-hover:text-(--color-gekko-300)">
                {m.displayName}
              </p>
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                @{m.username}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
