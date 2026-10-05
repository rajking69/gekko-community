export type GameGenre =
  | 'fps_tactical'
  | 'fps_br'
  | 'fps_hero'
  | 'sports'
  | 'vehicular'
  | 'moba'
  | 'sandbox';

export type GameStatus = 'regular' | 'weekend' | 'rotating' | 'on_request';

export type WeeklyScheduleSlot = {
  /** Short day label — "Mon", "Tue", etc. Multiple days can be combined: "Mon / Wed / Fri". */
  day: string;
  /** Time window in member local-time style — "21:00 GMT", "Weekend nights". */
  time: string;
  /** Mode label — "Ranked", "Customs", "Scrim", "Tournament prep". */
  mode: string;
};

export type Game = {
  id: string;
  slug: string;
  /** Display name. */
  name: string;
  /** Short label shown above the title. */
  tagline: string;
  /** Two-sentence summary used in the showcase card. */
  description: string;
  /** Studio / publisher. */
  publisher: string;
  genre: GameGenre;
  /** How often the community plays it. */
  status: GameStatus;
  /** Short play-mode tags shown as pills. */
  tags: string[];
  /** Mock active player count for the card. */
  activeMembers: number;
  /** Mock squad count. */
  squads: number;
  cover: {
    /** CSS gradient string (no image required for mocks). */
    gradient: string;
    /** Optional emoji / glyph rendered large over the gradient. */
    glyph?: string;
  };
  /** External "official site" link (publisher page) — optional. */
  officialUrl?: string;
  /** Discord channel deep-link or anchor — optional. */
  discordChannel?: string;
  featured?: boolean;
  /** Decorative accent for badges + hover glow. */
  accent: 'gekko' | 'violet' | 'cyan' | 'pink' | 'amber';

  /* ---------- Detail-page fields (optional; only used on /games/[slug]) ---------- */

  /** Long-form description for the detail page (multi-paragraph). */
  longDescription?: string[];
  /** Recurring weekly schedule shown on the detail page. */
  weeklySchedule?: WeeklyScheduleSlot[];
  /** Voice channel name in Discord for context. */
  voiceChannel?: string;
  /** Primary region the squad plays from. */
  region?: string;
  /** How serious the play tends to be on average. */
  playLevel?: 'Casual' | 'Mixed' | 'Competitive';
  /** Optional one-line "how to join" callout shown above the join CTA. */
  howToJoin?: string;
};

export const GENRE_LABEL: Record<GameGenre, string> = {
  fps_tactical: 'Tactical FPS',
  fps_br: 'Battle Royale',
  fps_hero: 'Hero Shooter',
  sports: 'Sports',
  vehicular: 'Vehicular',
  moba: 'MOBA',
  sandbox: 'Sandbox',
};

export const STATUS_LABEL: Record<GameStatus, string> = {
  regular: 'Daily rotation',
  weekend: 'Weekend night',
  rotating: 'Rotating',
  on_request: 'On request',
};

export const STATUS_COLOR: Record<GameStatus, string> = {
  regular: 'var(--color-gekko-500)',
  weekend: 'var(--color-neon-violet)',
  rotating: 'var(--color-neon-cyan)',
  on_request: 'var(--color-text-muted)',
};
