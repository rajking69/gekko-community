'use client';

import { PulseDot } from '@/components/shared/pulse-dot';
import { Button } from '@/components/ui/button';
import {
  type CommunityEvent,
  EVENT_ACCENT_HEX,
  EVENT_STATUS_COLOR,
  EVENT_STATUS_LABEL,
  EVENT_TYPE_LABEL,
} from '@/types/event';
import { ArrowUpRight, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function EventCard({ event }: { event: CommunityEvent }) {
  const accentHex = EVENT_ACCENT_HEX[event.accent];
  const isLive = event.status === 'live';
  const progress =
    event.capacity && event.capacity > 0
      ? Math.min(100, Math.round((event.registered / event.capacity) * 100))
      : null;
  // Live events with a dedicated results page link there instead of a stream.
  const ctaLabel = isLive
    ? event.resultsUrl
      ? 'Live standings'
      : 'Watch live'
    : event.status === 'completed'
      ? 'Recap'
      : event.status === 'open'
        ? 'Register'
        : 'Details';

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-transparent">
      {/* Accent ring + glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1.5px ${accentHex}, 0 22px 55px -28px ${accentHex}` }}
      />
      {/* Cover */}
      <div className="relative h-32 overflow-hidden" style={{ background: event.coverGradient }}>
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-(family-name:--font-heading) text-[7rem] font-bold tracking-tighter opacity-30 mix-blend-screen"
            style={{ color: accentHex }}
          >
            {event.glyph}
          </span>
        )}

        {/* Type pill */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
          {EVENT_TYPE_LABEL[event.type]}
        </div>

        {/* Status pill */}
        <div className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
          {isLive ? (
            <PulseDot color={EVENT_STATUS_COLOR[event.status]} />
          ) : (
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: EVENT_STATUS_COLOR[event.status] }}
            />
          )}
          {EVENT_STATUS_LABEL[event.status]}
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-(--color-bg-card)/80"
        />
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-(family-name:--font-heading) text-lg font-bold leading-tight tracking-tight md:text-xl">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-(--color-text-secondary)">
          {event.description}
        </p>

        {/* Meta */}
        <dl className="mt-5 grid grid-cols-2 gap-3 text-xs text-(--color-text-secondary)">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              Starts
            </dt>
            <dd className="mt-1">
              <Countdown target={event.startAt} live={isLive} />
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              {event.isOnline ? 'Location' : 'In person'}
            </dt>
            <dd className="mt-1 flex items-center gap-1.5">
              <Calendar className="size-3.5 shrink-0 text-(--color-text-muted)" />
              <span className="truncate">{event.location}</span>
            </dd>
          </div>
        </dl>

        {/* Capacity bar */}
        {progress !== null && (
          <div className="mt-5">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3" />
                {event.registered} / {event.capacity}
              </span>
              <span style={{ color: accentHex }}>{progress}%</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-(--color-bg-elev-1)">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                  background: accentHex,
                  boxShadow: `0 0 12px ${accentHex}40`,
                }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <footer className="mt-auto flex items-center justify-between pt-6">
          <Button asChild size="sm" variant={isLive ? 'default' : 'outline'} className="group/cta">
            <Link href={`/events/${event.slug}`}>
              {ctaLabel}
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </Button>
        </footer>
      </div>
    </article>
  );
}

function Countdown({ target, live }: { target?: string; live: boolean }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  if (live) {
    return (
      <span className="font-mono text-(--color-danger)" suppressHydrationWarning>
        Live now
      </span>
    );
  }

  if (!target) {
    return <span className="font-mono">Date TBA</span>;
  }

  if (now === null) {
    const d = new Date(target);
    return (
      <span suppressHydrationWarning>
        {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </span>
    );
  }

  const diff = new Date(target).getTime() - now;
  const abs = Math.abs(diff);
  const days = Math.floor(abs / (24 * 60 * 60 * 1000));
  const hours = Math.floor((abs / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((abs / (60 * 1000)) % 60);

  let label: string;
  if (diff < 0) {
    if (days >= 1) label = `${days}d ago`;
    else if (hours >= 1) label = `${hours}h ago`;
    else label = `${minutes}m ago`;
  } else if (days >= 1) label = `in ${days}d ${hours}h`;
  else if (hours >= 1) label = `in ${hours}h ${minutes}m`;
  else label = `in ${minutes}m`;

  return (
    <span className="font-mono tabular-nums" suppressHydrationWarning>
      {label}
    </span>
  );
}
