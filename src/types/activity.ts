export type ActivityKind =
  | 'match_won'
  | 'match_played'
  | 'event_attended'
  | 'badge_earned'
  | 'joined_squad'
  | 'streak_milestone'
  | 'level_up';

export type ActivityEntry = {
  id: string;
  /** Foreign key on `DirectoryMember.username`. */
  username: string;
  kind: ActivityKind;
  /** Human-readable summary line. */
  text: string;
  /** Optional chip / metadata line. */
  detail?: string;
  /** ISO datetime the activity happened. */
  occurredAt: string;
};

export const ACTIVITY_LABEL: Record<ActivityKind, string> = {
  match_won: 'Win',
  match_played: 'Match',
  event_attended: 'Event',
  badge_earned: 'Badge',
  joined_squad: 'Squad',
  streak_milestone: 'Streak',
  level_up: 'Level up',
};

export const ACTIVITY_COLOR: Record<ActivityKind, string> = {
  match_won: 'var(--color-gekko-500)',
  match_played: 'var(--color-text-secondary)',
  event_attended: 'var(--color-neon-violet)',
  badge_earned: 'var(--color-neon-amber)',
  joined_squad: 'var(--color-neon-cyan)',
  streak_milestone: 'var(--color-neon-pink)',
  level_up: 'var(--color-gekko-400)',
};
