import { Button } from '@/components/ui/button';
import { mockSpotlight } from '@/data/spotlight.mock';
import { formatDate } from '@/lib/format';
import type { SpotlightMember } from '@/types/spotlight';
import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

export function MembersSpotlight() {
  return (
    <section id="members" className="relative px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
              Members
            </p>
            <h2 className="mt-4 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              In their own words
            </h2>
            <p className="mt-4 text-(--color-text-secondary)">
              The community is what makes Gekko work. Hear it from people who actually show up,
              queue up, and stick around.
            </p>
          </div>
          <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
            <Link href="/members">
              Browse members <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          {mockSpotlight.map((member) => (
            <SpotlightCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotlightCard({ member }: { member: SpotlightMember }) {
  const accent = accentMap[member.accent];

  return (
    <article className="group relative h-[460px] w-full max-w-sm overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(0,255,140,0.35)]">
      {/* Photo cover */}
      <div className="absolute inset-0">
        <Image
          src={member.avatar}
          alt={`${member.displayName} — ${member.tagline}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          unoptimized
        />
      </div>

      {/* Dark gradient bottom-to-top — keeps the name readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-(--color-bg-void) via-(--color-bg-void)/60 to-transparent"
      />

      {/* Accent vignette that intensifies on hover */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 mix-blend-screen transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(at 50% 80%, ${accent}40, transparent 70%)`,
        }}
      />

      {/* Content stack */}
      <div className="relative flex h-full flex-col justify-end p-5 md:p-6">
        {/* Quote — always visible (single featured testimonial) */}
        <div className="mb-4">
          <Quote className="size-4" style={{ color: accent }} />
          <p className="mt-2 text-sm leading-snug text-white/90">{member.quote}</p>
        </div>

        {/* Identity row — always visible */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
            {member.tagline}
          </p>
          <h3 className="mt-1 font-(family-name:--font-heading) text-xl font-bold tracking-tight text-white">
            {member.displayName}
          </h3>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="font-mono uppercase tracking-[0.2em] text-white/50">
              Since {formatDate(member.since, { month: 'short', year: 'numeric' })}
            </span>
            <Link
              href={`/members/${member.username}`}
              aria-label={`View ${member.displayName}'s profile`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] transition hover:border-white/60 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              View <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
