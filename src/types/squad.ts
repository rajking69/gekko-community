export type SquadMemberStub = {
  username: string;
  displayName: string;
  avatar: string;
  /** Optional role within the squad — "IGL", "Entry", "Support". */
  role?: string;
};

export type Squad = {
  id: string;
  /** Foreign key on `Game.slug` — links squads to a game. */
  gameSlug: string;
  /** Squad name shown on the card. */
  name: string;
  /** One-line tagline. */
  tagline?: string;
  captain: SquadMemberStub;
  /** All roster members excluding the captain. */
  roster: SquadMemberStub[];
  /** Total slots in the squad (captain included). */
  capacity: number;
  /** Mock current rank or tier. */
  rank?: string;
  /** Human-readable cadence — "Mon / Wed / Fri · 21:00 GMT". */
  cadence: string;
  /** ISO date the squad was formed. */
  formedAt: string;
  /** Decorative accent reused from Game / Spotlight. */
  accent: 'gekko' | 'violet' | 'cyan' | 'pink' | 'amber';
  /** Optional flag — true if the squad currently accepts new members. */
  openSlots?: boolean;
};
