export type MatchResult = 'win' | 'loss' | 'draw';

export type Match = {
  id: string;
  /** Foreign key on `Game.slug`. */
  gameSlug: string;
  /** Opponent team / lobby / event label. */
  opponent: string;
  /** Mode label — "Ranked", "Premier", "Pro Clubs", "Tournament". */
  mode: string;
  /** Score string — "13-9", "2-1". Format is per-game, presentational only. */
  score: string;
  result: MatchResult;
  /** ISO datetime of the match. */
  playedAt: string;
  /** Squad that played — links visually to `Squad.name`. */
  squad: string;
  /** Optional MVP / standout player. */
  mvp?: { username: string; displayName: string };
  /** Optional map / arena / pitch. */
  map?: string;
};

export const RESULT_LABEL: Record<MatchResult, string> = {
  win: 'Win',
  loss: 'Loss',
  draw: 'Draw',
};

export const RESULT_COLOR: Record<MatchResult, string> = {
  win: 'var(--color-gekko-500)',
  loss: 'var(--color-danger)',
  draw: 'var(--color-text-muted)',
};
