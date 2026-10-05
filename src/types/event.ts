export type EventType = 'workshop' | 'meetup' | 'tournament' | 'stream';

export type EventStatus = 'draft' | 'open' | 'closed' | 'live' | 'completed' | 'cancelled';

export type EventScheduleItem = {
  /** Stage label — "Round of 16", "Doors open", "Q&A". */
  label: string;
  /** Relative or absolute time — "T+0", "T+90min", "20:00 GMT". */
  time: string;
  /** Optional secondary line. */
  detail?: string;
};

export type EventHost = {
  username: string;
  displayName: string;
  avatar: string;
  /** Display role under the name. */
  role: string;
};

export type EventPrize = {
  /** "1st", "2nd", "Best play of the day". */
  place: string;
  /** Reward — "Trophy + 3-month nitro", "Custom role color". */
  reward: string;
};

export type CommunityEvent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  /** ISO timestamp. Omit for a "Date TBA" event. */
  startAt?: string;
  /** ISO timestamp. Omit for a "Date TBA" event. */
  endAt?: string;
  timezone: string;
  /** "Online" if remote, otherwise a city/venue. */
  location: string;
  isOnline: boolean;
  capacity: number | null;
  registered: number;
  /** decorative cover gradient */
  coverGradient: string;
  /** Optional cover photo layered over the gradient (event card + detail hero). */
  coverImage?: string;
  /** glyph/icon character rendered large on the cover */
  glyph: string;
  accent: 'gekko' | 'violet' | 'cyan' | 'pink' | 'amber';

  /* ---------- Detail-page fields (optional) ---------- */

  /** Long-form description for the detail page (multi-paragraph). */
  longDescription?: string[];
  /** Hosting member or org. */
  host?: EventHost;
  /** Foreign key on `Game.slug` if the event is game-specific. */
  gameSlug?: string;
  /** Run-of-show / agenda. */
  schedule?: EventScheduleItem[];
  /** Prize tiers — tournament-friendly. */
  prizes?: EventPrize[];
  /** Stream URL — Twitch/YouTube/etc. */
  streamUrl?: string;
  /** External registration link (e.g. a Google Form). Overrides the default Discord CTA. */
  registerUrl?: string;
  /** Internal live standings / results page. Takes over the CTA once the event is live or completed. */
  resultsUrl?: string;
  /** Notes on requirements or eligibility. */
  requirements?: string[];
  /** Format note — "Single-elim BO3 · BO5 finals". */
  format?: string;
};

export const EVENT_TYPE_LABEL: Record<EventType, string> = {
  workshop: 'Workshop',
  meetup: 'Meetup',
  tournament: 'Tournament',
  stream: 'Stream',
};

export const EVENT_STATUS_LABEL: Record<EventStatus, string> = {
  draft: 'Draft',
  open: 'Open',
  closed: 'Closed',
  live: 'Live now',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

/** Single source of truth for accent hexes — shared by cards, hero, calendar. */
export const EVENT_ACCENT_HEX: Record<CommunityEvent['accent'], string> = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
};

export const EVENT_STATUS_COLOR: Record<EventStatus, string> = {
  draft: 'var(--color-text-secondary)',
  open: 'var(--color-gekko-500)',
  closed: 'var(--color-text-muted)',
  live: 'var(--color-danger)',
  completed: 'var(--color-text-muted)',
  cancelled: 'var(--color-text-muted)',
};
