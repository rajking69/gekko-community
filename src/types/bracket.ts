export type BracketParticipant = {
  /** Optional `DirectoryMember.username` — when set, name links to profile. */
  username?: string;
  displayName: string;
  avatar?: string;
  seed?: number;
};

export type BracketMatchStatus = 'pending' | 'live' | 'completed';

export type BracketMatch = {
  id: string;
  /** Round number, 1-indexed. */
  round: number;
  /** Position within the round, 0-indexed. */
  position: number;
  participantA: BracketParticipant | null;
  participantB: BracketParticipant | null;
  /** Score string — "13-9" / "2-1" / null while pending. */
  score?: string;
  /** Winner's `username` when known. */
  winnerUsername?: string;
  status: BracketMatchStatus;
};

export type Bracket = {
  eventSlug: string;
  /** Format label — "Single elimination", "Double elimination". */
  format: string;
  /** Total rounds (1 = final only). */
  rounds: number;
  matches: BracketMatch[];
};

/** Human-readable round names, indexed by remaining rounds (1 = final). */
export function roundLabel(round: number, totalRounds: number): string {
  const remaining = totalRounds - round + 1;
  if (remaining === 1) return 'Final';
  if (remaining === 2) return 'Semifinals';
  if (remaining === 3) return 'Quarterfinals';
  return `Round of ${2 ** remaining}`;
}
