/**
 * Gekko Cup — 2v2 round-robin tournament.
 *
 * 5 teams, single round-robin (everyone plays everyone once = 10 group matches),
 * then the top 2 of the standings meet in the final.
 *
 * The fixture below was randomised once and is now fixed. To post a result,
 * fill in `scoreA` / `scoreB` on a match and flip its `status` to `'completed'`
 * (use `'live'` while it is being played). Standings recompute automatically.
 */

/** Lucide icon key — resolved to a component on the page (see ICONS map). */
export type GekkoTeamIcon = 'briefcase' | 'leaf' | 'skull' | 'eye' | 'zap';

export type GekkoTeam = {
  id: string;
  /** Solid icon representing the team. */
  icon: GekkoTeamIcon;
  /** Accent colour (hex) for the team's icon chip and highlights. */
  accent: string;
  /** Team name shown across the bracket. */
  name: string;
  /** The two players — kept for reference, shown small. */
  players: [string, string];
};

export type GekkoMatchStatus = 'pending' | 'live' | 'completed';

export type GekkoMatch = {
  id: string;
  /** Matchday (1–5). Each matchday one team gets a bye. */
  matchday: number;
  teamA: string;
  teamB: string;
  /** Goals scored by each side — null until the result is in. */
  scoreA: number | null;
  scoreB: number | null;
  status: GekkoMatchStatus;
};

export type GekkoFinal = {
  /** Team ids once the top two are locked, else null. */
  teamA: string | null;
  teamB: string | null;
  scoreA: number | null;
  scoreB: number | null;
  status: GekkoMatchStatus;
};

export const gekkoCup = {
  name: 'Gekko FIFA 26 Co-Op Tournament',
  /** Short label for nav / chips. */
  shortName: 'Gekko Cup',
  /** The event this live page belongs to (see events.mock.ts). */
  eventSlug: 'gekko-fifa-26-coop-tournament',
  game: 'EA SPORTS FC 26',
  /** Official EA SPORTS FC 26 key art — used as the header cover band. */
  coverImage:
    'https://drop-assets.ea.com/images/3eEHjjY2wGQ5tSWAaF37cL/b03bdcaa03bdba60d2b1b52d91bedbbe/fc26-twg-featured-image-16x9.jpg?im=Resize=(2560)&q=85',
  /** Official EA SPORTS FC trophy render — used as a watermark on the final / champion. */
  trophyImage:
    'https://media.contentapi.ea.com/content/dam/ea/fc/common/trophy.png.adapt.1920w.png',
  format: 'Round-robin · 2v2 Co-Op · Top 2 to the Final',
  /** All group games are played today. */
  playedOn: '2026-07-01',
  totalMatchdays: 5,
};

export const gekkoTeams: GekkoTeam[] = [
  {
    id: 'emp',
    icon: 'briefcase',
    accent: '#fbbf24',
    name: 'Employed and Unemployed',
    players: ['oobitoo', 'Akashi'],
  },
  {
    id: 'sea',
    icon: 'leaf',
    accent: '#fb923c',
    name: 'Seasonal Fanbase',
    players: ['Zaraki', 'Vo1d'],
  },
  {
    id: 'gob',
    icon: 'skull',
    accent: '#a78bfa',
    name: 'Team GOBLIN',
    players: ['Hamim', 'Avishek'],
  },
  { id: 'gaw', icon: 'eye', accent: '#22d3ee', name: '69_GawkGawk', players: ['Mir Eju', 'Nafiz'] },
  {
    id: 'com',
    icon: 'zap',
    accent: '#f472b6',
    name: 'Team Comatozze',
    players: ['Uday', 'Rajking'],
  },
];

/**
 * Randomised single round-robin. Generated with the circle method then shuffled
 * onto the teams, so each matchday pairs two games with a different team resting.
 */
export const gekkoMatches: GekkoMatch[] = [
  // Matchday 1 — Seasonal Fanbase rests
  {
    id: 'gc_m1',
    matchday: 1,
    teamA: 'gob',
    teamB: 'com',
    scoreA: null,
    scoreB: null,
    status: 'pending',
  },
  {
    id: 'gc_m2',
    matchday: 1,
    teamA: 'gaw',
    teamB: 'emp',
    scoreA: null,
    scoreB: null,
    status: 'pending',
  },

  // Matchday 2 — Team Comatozze rests
  {
    id: 'gc_m3',
    matchday: 2,
    teamA: 'sea',
    teamB: 'emp',
    scoreA: null,
    scoreB: null,
    status: 'pending',
  },
  {
    id: 'gc_m4',
    matchday: 2,
    teamA: 'gob',
    teamB: 'gaw',
    scoreA: null,
    scoreB: null,
    status: 'pending',
  },

  // Matchday 3 — Employed and Unemployed rests
  {
    id: 'gc_m5',
    matchday: 3,
    teamA: 'com',
    teamB: 'gaw',
    scoreA: null,
    scoreB: null,
    status: 'pending',
  },
  {
    id: 'gc_m6',
    matchday: 3,
    teamA: 'sea',
    teamB: 'gob',
    scoreA: null,
    scoreB: null,
    status: 'pending',
  },

  // Matchday 4 — 69_GawkGawk rests
  {
    id: 'gc_m7',
    matchday: 4,
    teamA: 'emp',
    teamB: 'gob',
    scoreA: null,
    scoreB: null,
    status: 'pending',
  },
  {
    id: 'gc_m8',
    matchday: 4,
    teamA: 'com',
    teamB: 'sea',
    scoreA: null,
    scoreB: null,
    status: 'pending',
  },

  // Matchday 5 — Team GOBLIN rests
  {
    id: 'gc_m9',
    matchday: 5,
    teamA: 'gaw',
    teamB: 'sea',
    scoreA: null,
    scoreB: null,
    status: 'pending',
  },
  {
    id: 'gc_m10',
    matchday: 5,
    teamA: 'emp',
    teamB: 'com',
    scoreA: null,
    scoreB: null,
    status: 'pending',
  },
];

export const gekkoFinal: GekkoFinal = {
  teamA: null,
  teamB: null,
  scoreA: null,
  scoreB: null,
  status: 'pending',
};

/* --------------------------------- helpers -------------------------------- */

export type TeamStanding = {
  team: GekkoTeam;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  /** Goals scored / conceded across the group stage. */
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
};

export function teamById(id: string): GekkoTeam {
  const t = gekkoTeams.find((team) => team.id === id);
  if (!t) throw new Error(`Unknown team id: ${id}`);
  return t;
}

/** True once a match has both scores filled in and is marked completed. */
export function isPlayed(m: {
  scoreA: number | null;
  scoreB: number | null;
  status: GekkoMatchStatus;
}) {
  return m.status === 'completed' && m.scoreA !== null && m.scoreB !== null;
}

/**
 * Standings from completed group matches. 3 pts for a win, 1 for a draw.
 * Sorted by points, then goal difference, then goals scored.
 */
export function computeStandings(): TeamStanding[] {
  const table = new Map<string, TeamStanding>(
    gekkoTeams.map((team) => [
      team.id,
      {
        team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0,
      },
    ]),
  );

  for (const m of gekkoMatches) {
    if (!isPlayed(m)) continue;
    const a = table.get(m.teamA)!;
    const b = table.get(m.teamB)!;
    const sa = m.scoreA!;
    const sb = m.scoreB!;

    a.played++;
    b.played++;
    a.goalsFor += sa;
    a.goalsAgainst += sb;
    b.goalsFor += sb;
    b.goalsAgainst += sa;

    if (sa > sb) {
      a.won++;
      b.lost++;
      a.points += 3;
    } else if (sb > sa) {
      b.won++;
      a.lost++;
      b.points += 3;
    } else {
      a.drawn++;
      b.drawn++;
      a.points += 1;
      b.points += 1;
    }
  }

  for (const s of table.values()) s.goalDiff = s.goalsFor - s.goalsAgainst;

  return [...table.values()].sort(
    (x, y) =>
      y.points - x.points ||
      y.goalDiff - x.goalDiff ||
      y.goalsFor - x.goalsFor ||
      x.team.name.localeCompare(y.team.name),
  );
}

/** True when every group match has a result, so the final's teams are locked. */
export function groupStageComplete(): boolean {
  return gekkoMatches.every(isPlayed);
}
