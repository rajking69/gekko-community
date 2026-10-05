'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { GENRE_LABEL, type Game, STATUS_COLOR, STATUS_LABEL } from '@/types/game';
import { ArrowUpRight, ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

const accentMap = {
  gekko: { hex: '#00ff88', soft: 'rgba(0,255,140,0.18)' },
  violet: { hex: '#8b5cf6', soft: 'rgba(139,92,246,0.20)' },
  cyan: { hex: '#22d3ee', soft: 'rgba(34,211,238,0.20)' },
  pink: { hex: '#f472b6', soft: 'rgba(244,114,182,0.20)' },
  amber: { hex: '#fbbf24', soft: 'rgba(251,191,36,0.20)' },
} as const;

export function GameCard({ game }: { game: Game }) {
  const accent = accentMap[game.accent];
  const cardRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    // Mouse-only tilt — touch/pen gestures don't reset cleanly.
    if (reduced || e.pointerType !== 'mouse' || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    const nx = px / r.width - 0.5;
    const ny = py / r.height - 0.5;
    setTilt({ rx: -ny * 6, ry: nx * 8 });
    setPointer({ x: px, y: py });
  };

  const onLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setPointer(null);
  };

  const cardStyle: React.CSSProperties = {
    transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
    transformStyle: 'preserve-3d',
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerCancel={onLeave}
      style={cardStyle}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 transition-[border-color,box-shadow] duration-500 hover:border-(--color-gekko-500)/40 will-change-transform"
    >
      {pointer && !reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(180px circle at ${pointer.x}px ${pointer.y}px, ${accent.soft}, transparent 60%)`,
          }}
        />
      )}

      {/* Cover */}
      <div className="relative h-44 overflow-hidden" style={{ background: game.cover.gradient }}>
        {game.cover.glyph && (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-(family-name:--font-heading) text-[12rem] font-bold tracking-tighter opacity-25 mix-blend-screen"
            style={{ color: accent.hex }}
          >
            {game.cover.glyph}
          </span>
        )}
        <div className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: STATUS_COLOR[game.status] }}
          />
          <span className="text-(--color-text-primary)">{STATUS_LABEL[game.status]}</span>
        </div>
        <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-primary) backdrop-blur-md">
          {GENRE_LABEL[game.genre]}
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-(--color-bg-card)/80"
        />
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
          {game.publisher}
        </p>
        <h3 className="mt-2 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
          {game.name}
        </h3>
        <p className="mt-1 text-sm text-(--color-text-secondary)">{game.tagline}</p>

        <p className="mt-4 line-clamp-3 text-sm text-(--color-text-secondary)/80">
          {game.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {game.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-(--glass-border) bg-(--glass-tint) px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
            >
              {tag}
            </li>
          ))}
        </ul>

        <footer className="mt-auto flex items-center justify-between gap-3 pt-6">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5" style={{ color: accent.hex }} />
              <span className="tabular-nums text-(--color-text-secondary)">
                {game.activeMembers}
              </span>
              <span>active</span>
            </span>
            <span aria-hidden>·</span>
            <span className="tabular-nums">
              {game.squads} {game.squads === 1 ? 'squad' : 'squads'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {game.officialUrl && (
              <a
                href={game.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${game.name} official site (opens in new tab)`}
                className="grid size-9 place-items-center rounded-lg border border-(--glass-border) text-(--color-text-secondary) transition hover:border-(--color-gekko-500) hover:text-(--color-gekko-300)"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
            <Link
              href={`/games/${game.slug}`}
              aria-label={`Open ${game.name} game page`}
              className="grid size-9 place-items-center rounded-lg border border-(--glass-border) text-(--color-text-secondary) transition hover:border-(--color-gekko-500) hover:text-(--color-gekko-300)"
            >
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
