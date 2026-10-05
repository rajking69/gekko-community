import type { Role } from '@/config/roles.config';

export type SpotlightMember = {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  role: Role;
  /** Short role/title shown under the name. */
  tagline: string;
  /** Single-sentence quote/testimonial that fades in on hover. */
  quote: string;
  /** Member since — ISO date. */
  since: string;
  /** Highlighted game name (optional). */
  topGame?: string;
  accent: 'gekko' | 'violet' | 'cyan' | 'pink' | 'amber';
};
