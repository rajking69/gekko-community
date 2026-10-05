import { formatDate, formatRelative } from '@/lib/format';
import type { DirectoryMember } from '@/types/member';
import { MapPin, Quote } from 'lucide-react';
import Image from 'next/image';

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

export function ProfileHero({ member }: { member: DirectoryMember }) {
  const accent = accentMap[member.accent];

  return (
    <section className="relative overflow-hidden border-b border-(--glass-border) pt-28 pb-12 md:pt-36 md:pb-16">
      {/* Accent glow background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(at 20% 10%, ${accent}25 0%, transparent 55%), radial-gradient(at 80% 80%, ${accent}1f 0%, transparent 60%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-(--color-bg-void)/30 to-(--color-bg-void)"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-start gap-8 md:grid-cols-[auto_1fr] md:gap-12">
          {/* Avatar */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full opacity-60 blur-2xl"
              style={{ background: `radial-gradient(circle, ${accent}55 0%, transparent 70%)` }}
            />
            <div
              className="relative size-32 overflow-hidden rounded-full border-2 sm:size-40 md:size-48"
              style={{ borderColor: `${accent}88` }}
            >
              <Image
                src={member.avatar}
                alt={`${member.displayName}'s avatar`}
                width={384}
                height={384}
                sizes="(max-width: 640px) 128px, 192px"
                className="size-full object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>
              {member.role.replace(/_/g, ' ')}
              {member.pronouns && (
                <span className="ml-2 text-(--color-text-muted)">· {member.pronouns}</span>
              )}
            </p>
            <h1 className="mt-3 font-(family-name:--font-heading) text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {member.displayName}
            </h1>
            <p className="mt-2 font-mono text-sm text-(--color-text-muted)">@{member.username}</p>

            <p className="mt-5 max-w-2xl text-base text-(--color-text-secondary) sm:text-lg">
              {member.bio}
            </p>

            {/* Meta strip */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              {member.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3" />
                  {member.location}
                </span>
              )}
              <span suppressHydrationWarning>
                Joined {formatDate(member.joinedAt, { month: 'short', year: 'numeric' })}
              </span>
              <span suppressHydrationWarning>Active {formatRelative(member.lastActiveAt)}</span>
            </div>

            {/* Quote — only if present */}
            {member.quote && (
              <blockquote className="glass mt-8 max-w-2xl rounded-2xl p-5">
                <Quote className="size-4" style={{ color: accent }} />
                <p className="mt-2 text-sm leading-relaxed text-(--color-text-primary)">
                  {member.quote}
                </p>
              </blockquote>
            )}
          </div>
        </div>

        {/* Stat row */}
        <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <StatBlock label="XP" value={member.xp.toLocaleString()} accent={accent} />
          <StatBlock label="Level" value={`L${member.level}`} accent={accent} />
          <StatBlock label="Badges" value={member.badges.length.toString()} accent={accent} />
          <StatBlock
            label="Main games"
            value={member.mainGames.length.toString()}
            accent={accent}
          />
        </dl>
      </div>
    </section>
  );
}

function StatBlock({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
        {label}
      </dt>
      <dd
        className="mt-1 font-(family-name:--font-heading) text-2xl font-bold tracking-tight tabular-nums sm:text-3xl"
        style={{ color: accent }}
      >
        {value}
      </dd>
    </div>
  );
}
