'use client';

import { PulseDot } from '@/components/shared/pulse-dot';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import {
  type CommunityEvent,
  EVENT_ACCENT_HEX,
  EVENT_STATUS_COLOR,
  EVENT_STATUS_LABEL,
  EVENT_TYPE_LABEL,
} from '@/types/event';
import { Calendar, ExternalLink, MapPin, MessageCircle, Trophy, Tv, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function EventDetailHero({ event }: { event: CommunityEvent }) {
  const accent = EVENT_ACCENT_HEX[event.accent];
  const isLive = event.status === 'live';
  const isCompleted = event.status === 'completed';
  const progress =
    event.capacity && event.capacity > 0
      ? Math.min(100, Math.round((event.registered / event.capacity) * 100))
      : null;

  return (
    <section className="relative overflow-hidden border-b border-(--glass-border) pt-28 pb-12 md:pt-36 md:pb-16">
      {/* Cover background */}
      <div aria-hidden className="absolute inset-0" style={{ background: event.coverGradient }} />
      {event.coverImage && (
        <Image
          src={event.coverImage}
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="object-cover object-center"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-(--color-bg-void)/55 via-(--color-bg-void)/75 to-(--color-bg-void)"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-20 select-none font-(family-name:--font-heading) text-[24rem] font-bold leading-none tracking-tighter opacity-15 mix-blend-screen md:-right-16 md:-bottom-32 md:text-[32rem]"
        style={{ color: accent }}
      >
        {event.glyph}
      </span>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Type + status pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md"
            style={{ color: accent }}
          >
            {EVENT_TYPE_LABEL[event.type]}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
            {isLive ? (
              <PulseDot color={EVENT_STATUS_COLOR[event.status]} />
            ) : (
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: EVENT_STATUS_COLOR[event.status] }}
              />
            )}
            {EVENT_STATUS_LABEL[event.status]}
          </span>
          {event.format && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
              {event.format}
            </span>
          )}
        </div>

        <h1 className="mt-5 font-(family-name:--font-heading) text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {event.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-(--color-text-secondary) sm:text-lg">
          {event.description}
        </p>

        {/* Meta strip */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3" />
            <Countdown target={event.startAt} live={isLive} completed={isCompleted} />
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3" />
            {event.location}
            {event.isOnline ? '' : ' · in person'}
          </span>
          {event.timezone && (
            <span className="inline-flex items-center gap-1.5">{event.timezone}</span>
          )}
        </div>

        {/* Capacity bar */}
        {progress !== null && (
          <div className="mt-8 max-w-md">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3" />
                {event.registered} / {event.capacity} registered
              </span>
              <span style={{ color: accent }}>{progress}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-(--color-bg-elev-1)">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${accent}, ${accent})`,
                  boxShadow: `0 0 12px ${accent}55`,
                }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {(isLive || isCompleted) && event.resultsUrl ? (
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href={event.resultsUrl}>
                {isCompleted ? 'Final standings' : 'View live standings'}{' '}
                <Trophy className="size-4" />
              </Link>
            </Button>
          ) : isLive && event.streamUrl ? (
            <Button asChild size="xl" className="w-full sm:w-auto">
              <a href={event.streamUrl} target="_blank" rel="noopener noreferrer">
                Watch live <Tv className="size-4" />
              </a>
            </Button>
          ) : event.status === 'open' ? (
            <Button asChild size="xl" className="w-full sm:w-auto">
              {event.registerUrl ? (
                <a href={event.registerUrl} target="_blank" rel="noopener noreferrer">
                  Register now <ExternalLink className="size-4" />
                </a>
              ) : (
                <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                  Register in Discord <MessageCircle className="size-4" />
                </a>
              )}
            </Button>
          ) : event.status === 'completed' ? (
            <Button asChild size="xl" variant="glass" className="w-full sm:w-auto">
              <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                See the recap <ExternalLink className="size-4" />
              </a>
            </Button>
          ) : (
            <Button asChild size="xl" variant="glass" className="w-full sm:w-auto" disabled>
              <span>{EVENT_STATUS_LABEL[event.status]}</span>
            </Button>
          )}

          {event.streamUrl && !isLive && (
            <Button asChild variant="glass" size="xl" className="w-full sm:w-auto">
              <a href={event.streamUrl} target="_blank" rel="noopener noreferrer">
                Stream link <ExternalLink className="size-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

function Countdown({
  target,
  live,
  completed,
}: {
  target?: string;
  live: boolean;
  completed: boolean;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  if (live) {
    return (
      <span className="text-(--color-danger)" suppressHydrationWarning>
        Live right now
      </span>
    );
  }
  if (completed) {
    return <span suppressHydrationWarning>Completed</span>;
  }
  if (!target) {
    return <span>Date TBA</span>;
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
    if (days >= 1) label = `Ended ${days}d ago`;
    else if (hours >= 1) label = `Ended ${hours}h ago`;
    else label = `Ended ${minutes}m ago`;
  } else if (days >= 1) label = `Starts in ${days}d ${hours}h`;
  else if (hours >= 1) label = `Starts in ${hours}h ${minutes}m`;
  else label = `Starts in ${minutes}m`;

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {label}
    </span>
  );
}
