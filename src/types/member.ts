import type { Role } from '@/config/roles.config';

export type MemberMainGame = {
  /** Foreign key on `Game.slug`. */
  gameSlug: string;
  /** Display label for the game (mock-friendly; in prod we'd resolve via gameService). */
  name: string;
  /** Mock rank / tier string. */
  rank: string;
};

export type MemberBadge = {
  id: string;
  name: string;
  description: string;
  /** Accent for the badge chip. */
  color: 'gekko' | 'violet' | 'cyan' | 'pink' | 'amber';
  /** ISO date earned. */
  earnedAt: string;
};

export type DirectoryMember = {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  /** One-liner bio. */
  bio: string;
  role: Role;
  pronouns?: string;
  location?: string;
  /** ISO date joined. */
  joinedAt: string;
  xp: number;
  level: number;
  /** Games this member shows up for the most. */
  mainGames: MemberMainGame[];
  /** Earned badges shown on profile. */
  badges: MemberBadge[];
  /** Last seen ISO date — used for "recently active" sort. */
  lastActiveAt: string;
  /** Decorative accent matching mainGame[0] accent. */
  accent: 'gekko' | 'violet' | 'cyan' | 'pink' | 'amber';
  /** Optional quote shown on the profile hero. */
  quote?: string;
};
