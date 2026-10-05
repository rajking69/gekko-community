import { formatDate } from '@/lib/format';
import type { DirectoryMember } from '@/types/member';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

export function MemberCard({ member }: { member: DirectoryMember }) {
  const accent = accentMap[member.accent];
  const primary = member.mainGames[0];

  return (
    <Link
      href={`/members/${member.username}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-(--color-gekko-500)/40"
    >
      {/* Avatar + accent glow */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={member.avatar}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          unoptimized
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(7,11,20,0.92) 0%, rgba(7,11,20,0.35) 55%, transparent 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 mix-blend-screen transition duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(at 50% 80%, ${accent}38, transparent 70%)` }}
        />

        {/* Primary game pill */}
        {primary && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
            <span
              aria-hidden
              className="size-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="text-(--color-text-primary)">{primary.name}</span>
          </div>
        )}

        {/* Arrow indicator */}
        <span
          aria-hidden
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-white/15 bg-black/40 text-(--color-text-secondary) backdrop-blur-md transition group-hover:border-(--color-gekko-500) group-hover:text-(--color-gekko-300)"
        >
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
          {member.role.replace(/_/g, ' ')}
        </p>
        <h3 className="mt-1.5 font-(family-name:--font-heading) text-lg font-bold tracking-tight">
          {member.displayName}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          @{member.username}
          {member.location && <span aria-hidden> · {member.location}</span>}
        </p>

        <p className="mt-3 line-clamp-2 text-sm text-(--color-text-secondary)">{member.bio}</p>

        <footer className="mt-auto flex items-center justify-between pt-5">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
            <span className="tabular-nums">
              <span className="text-(--color-text-secondary)">L{member.level}</span> ·{' '}
              {member.xp.toLocaleString()} XP
            </span>
            {member.badges.length > 0 && (
              <span aria-label={`${member.badges.length} badges`}>
                <span className="text-(--color-text-secondary) tabular-nums">
                  {member.badges.length}
                </span>{' '}
                {member.badges.length === 1 ? 'badge' : 'badges'}
              </span>
            )}
          </div>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)"
            suppressHydrationWarning
          >
            Since {formatDate(member.joinedAt, { month: 'short', year: 'numeric' })}
          </span>
        </footer>
      </div>
    </Link>
  );
}
