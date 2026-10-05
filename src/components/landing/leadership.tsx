import { Button } from '@/components/ui/button';
import { type LeadershipMember, leadership } from '@/config/leadership.config';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import Image from 'next/image';
import type { CSSProperties } from 'react';

const accentMap = {
  gekko: { hex: '#00ff88', soft: 'rgba(0,255,140,0.18)', border: 'rgba(0,255,140,0.35)' },
  violet: { hex: '#8b5cf6', soft: 'rgba(139,92,246,0.18)', border: 'rgba(139,92,246,0.35)' },
  cyan: { hex: '#22d3ee', soft: 'rgba(34,211,238,0.18)', border: 'rgba(34,211,238,0.35)' },
  pink: { hex: '#f472b6', soft: 'rgba(244,114,182,0.18)', border: 'rgba(244,114,182,0.35)' },
  amber: { hex: '#fbbf24', soft: 'rgba(251,191,36,0.18)', border: 'rgba(251,191,36,0.35)' },
  rose: { hex: '#f43f5e', soft: 'rgba(244,63,94,0.18)', border: 'rgba(244,63,94,0.35)' },
} as const;

export function Leadership() {
  return (
    <section id="leadership" className="relative px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400) flex items-center justify-center gap-2 font-semibold">
            EXECUTIVE BOARD
          </p>
          <h2 className="font-(family-name:--font-heading) text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white">
            Meet the people steering Team Gekko
          </h2>
          <p className="text-sm sm:text-base text-(--color-text-secondary) leading-relaxed">
            A small group setting direction and supporting the community day-to-day.
          </p>
        </div>

        {/* Board Groups */}
        <div className="space-y-16">
          {(['president', 'directors', 'secretaries'] as const).map((group) => {
            const groupLabels = {
              president: 'PRESIDENT & EXECUTIVE LEAD',
              directors: 'EXECUTIVE DIRECTORS',
              secretaries: 'EXECUTIVE SECRETARIES',
            };
            const members = leadership.filter((member) => member.group === group);

            return (
              <section key={group} aria-labelledby={`${group}-heading`} className="space-y-6">
                <div className="flex items-center gap-4">
                  <span aria-hidden className="h-px flex-1 bg-white/10" />
                  <p
                    id={`${group}-heading`}
                    className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 font-semibold"
                  >
                    {groupLabels[group]}
                  </p>
                  <span aria-hidden className="h-px flex-1 bg-white/10" />
                </div>

                <div
                  className={
                    group === 'president'
                      ? 'flex justify-center'
                      : group === 'directors'
                      ? 'grid grid-cols-1 gap-6 md:grid-cols-3'
                      : 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
                  }
                >
                  {members.map((member) => (
                    <LeadershipCard key={member.id} member={member} isPresident={group === 'president'} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LeadershipCard({
  member,
  isPresident = false,
}: {
  member: LeadershipMember;
  isPresident?: boolean;
}) {
  const accent = accentMap[member.accent];

  if (isPresident) {
    return (
      <article
        className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#06090c] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--card-border)] hover:shadow-[0_25px_65px_-20px_var(--card-soft)] w-full max-w-5xl"
        style={
          {
            '--card-accent': accent.hex,
            '--card-border': accent.border,
            '--card-soft': accent.soft,
          } as CSSProperties
        }
      >
        {/* Radial Ambient Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-full w-[70%] opacity-40 blur-3xl transition duration-700 group-hover:opacity-75"
          style={{
            background: `radial-gradient(circle at 75% 35%, ${accent.hex}, transparent 70%)`,
          }}
        />

        <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-8 md:p-10 gap-8">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-6 flex flex-col justify-between h-full z-10">
            <div className="space-y-4">
              {/* Tag & Role */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
                  TEAM GEKKO
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full animate-pulse" style={{ backgroundColor: accent.hex }} />
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent.hex }}>
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Title & Additional Roles */}
              <div>
                <h3 className="font-(family-name:--font-heading) text-3xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-[var(--card-accent)] transition-colors">
                  {member.name}
                </h3>
                {member.additionalRoles && member.additionalRoles.length > 0 && (
                  <p className="mt-1 font-mono text-xs font-semibold text-white/60">
                    {member.additionalRoles.join(' · ')}
                  </p>
                )}
              </div>

              {/* Bio */}
              {member.bio && (
                <p className="text-sm text-gray-400 leading-relaxed">
                  {member.bio}
                </p>
              )}
            </div>

            {/* Tags & Actions */}
            <div className="space-y-4 pt-2">
              <ul className="flex flex-wrap gap-1.5">
                {member.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-white/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-2.5">
                {member.portfolio && (
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full border border-[var(--card-border)] bg-black/60 px-5 py-2 font-semibold text-xs text-white shadow-lg backdrop-blur-md transition hover:bg-[var(--card-accent)] hover:text-black hover:border-[var(--card-accent)]"
                  >
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${member.name}'s portfolio`}
                    >
                      View Portfolio <ArrowUpRight className="size-3.5 ml-1" />
                    </a>
                  </Button>
                )}
                {member.linkedin && (
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold text-xs text-white/90 shadow-lg backdrop-blur-md transition hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2]"
                  >
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="size-3.5 mr-1" /> LinkedIn <ArrowUpRight className="size-3 ml-0.5 opacity-70" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Standardized Spotlight Avatar Frame */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative size-56 sm:size-64 md:size-72 overflow-hidden rounded-[2rem] border border-white/15 bg-black/50 p-2 shadow-2xl backdrop-blur-md ring-2 ring-[var(--card-accent)]/40 ring-offset-4 ring-offset-[#06090c] transition duration-500 group-hover:ring-[var(--card-accent)]">
              {member.image ? (
                <div className="relative size-full overflow-hidden rounded-[1.6rem]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="400px"
                    priority
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06090c]/60 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="flex size-full items-center justify-center bg-black/30 backdrop-blur-sm rounded-[1.6rem]">
                  <div
                    className="grid size-20 place-items-center rounded-full border border-white/15 text-2xl font-extrabold tracking-wider shadow-2xl"
                    style={{ color: accent.hex, backgroundColor: accent.soft }}
                  >
                    {getInitials(member.name)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Directors & Secretaries Standardized Vertical Card Layout
  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#06090c] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--card-border)] hover:shadow-[0_20px_50px_-15px_var(--card-soft)] w-full h-full min-h-[460px]"
      style={
        {
          '--card-accent': accent.hex,
          '--card-border': accent.border,
          '--card-soft': accent.soft,
        } as CSSProperties
      }
    >
      {/* Radial Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-full w-[80%] opacity-30 blur-3xl transition duration-700 group-hover:opacity-60"
        style={{
          background: `radial-gradient(circle at 75% 25%, ${accent.hex}, transparent 70%)`,
        }}
      />

      {/* Top Header Section with Floating Badges */}
      <div className="relative pt-6 px-6 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2 z-10 relative">
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
            TEAM GEKKO
          </span>
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 backdrop-blur-md">
            <span className="size-2 rounded-full animate-pulse" style={{ backgroundColor: accent.hex }} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: accent.hex }}>
              {member.role}
            </span>
          </div>
        </div>
      </div>

      {/* Standardized Uniform Avatar Spotlight Container */}
      <div className="relative py-4 flex items-center justify-center">
        <div className="relative size-40 sm:size-44 overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/50 p-1.5 shadow-2xl backdrop-blur-md ring-2 ring-[var(--card-accent)]/35 ring-offset-4 ring-offset-[#06090c] transition duration-500 group-hover:scale-105 group-hover:ring-[var(--card-accent)]">
          {member.image ? (
            <div className="relative size-full overflow-hidden rounded-[1.4rem]">
              <Image
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                fill
                sizes="300px"
                className="object-cover object-top transition duration-700 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06090c]/50 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="flex size-full items-center justify-center bg-black/30 backdrop-blur-sm rounded-[1.4rem]">
              <div
                className="grid size-16 place-items-center rounded-full border border-white/15 text-xl font-extrabold tracking-wider shadow-2xl"
                style={{ color: accent.hex, backgroundColor: accent.soft }}
              >
                {getInitials(member.name)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Content Body */}
      <div className="relative z-10 flex flex-1 flex-col justify-between px-6 pb-6 space-y-4">
        <div className="space-y-2 text-center">
          {/* Name & Subtitle */}
          <div>
            <h3 className="font-(family-name:--font-heading) text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-[var(--card-accent)] transition-colors">
              {member.name}
            </h3>
            {member.additionalRoles && member.additionalRoles.length > 0 && (
              <p className="mt-0.5 font-mono text-xs font-semibold text-white/60">
                {member.additionalRoles.join(' · ')}
              </p>
            )}
          </div>

          {/* Bio Description */}
          {member.bio && (
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
              {member.bio}
            </p>
          )}
        </div>

        {/* Tags & Action Buttons */}
        <div className="space-y-3.5 pt-1">
          <ul className="flex flex-wrap justify-center gap-1.5">
            {member.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/70"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {member.portfolio && (
              <Button
                asChild
                size="sm"
                className="rounded-full border border-[var(--card-border)] bg-black/60 px-4 py-1.5 font-semibold text-xs text-white shadow-lg backdrop-blur-md transition hover:bg-[var(--card-accent)] hover:text-black hover:border-[var(--card-accent)]"
              >
                <a
                  href={member.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${member.name}'s portfolio`}
                >
                  Portfolio <ArrowUpRight className="size-3.5 ml-1" />
                </a>
              </Button>
            )}

            {member.linkedin && (
              <Button
                asChild
                size="sm"
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-semibold text-xs text-white/90 shadow-lg backdrop-blur-md transition hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2]"
              >
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${member.name}'s LinkedIn profile`}
                >
                  <Linkedin className="size-3.5 mr-1" /> LinkedIn <ArrowUpRight className="size-3 ml-0.5 opacity-70" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
}


