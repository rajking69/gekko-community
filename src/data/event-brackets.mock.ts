import type { Bracket } from '@/types/bracket';

/**
 * Tournament brackets keyed by event slug. Only tournaments have brackets.
 * Round 1 = quarterfinals, Round 2 = semis, Round 3 = final.
 * The live cup (`valorant-cup-round-2`) shows mid-tournament state: round 1
 * complete, round 2 in progress, final pending.
 */
export const mockBrackets: Bracket[] = [
  {
    eventSlug: 'valorant-cup-round-2',
    format: 'Single elimination · BO3 (BO5 final)',
    rounds: 3,
    matches: [
      // Quarterfinals (round 1)
      {
        id: 'val_qf_1',
        round: 1,
        position: 0,
        participantA: { username: 'astra', displayName: 'Neon Five', seed: 1 },
        participantB: { displayName: 'Pulse Gaming', seed: 8 },
        score: '2-0',
        winnerUsername: 'astra',
        status: 'completed',
      },
      {
        id: 'val_qf_2',
        round: 1,
        position: 1,
        participantA: { displayName: 'Rogue Signal', seed: 4 },
        participantB: { username: 'kael', displayName: 'Aurora Squad', seed: 5 },
        score: '2-1',
        winnerUsername: 'kael',
        status: 'completed',
      },
      {
        id: 'val_qf_3',
        round: 1,
        position: 2,
        participantA: { displayName: 'Vector Esports', seed: 3 },
        participantB: { username: 'jules', displayName: 'Util Vision', seed: 6 },
        score: '2-1',
        winnerUsername: 'jules',
        status: 'completed',
      },
      {
        id: 'val_qf_4',
        round: 1,
        position: 3,
        participantA: { displayName: 'Nightfall Esports', seed: 2 },
        participantB: { username: 'mae', displayName: 'Customs Lobby', seed: 7 },
        score: '2-0',
        winnerUsername: 'mae',
        status: 'completed',
      },

      // Semifinals (round 2)
      {
        id: 'val_sf_1',
        round: 2,
        position: 0,
        participantA: { username: 'astra', displayName: 'Neon Five', seed: 1 },
        participantB: { username: 'kael', displayName: 'Aurora Squad', seed: 5 },
        score: '1-1',
        status: 'live',
      },
      {
        id: 'val_sf_2',
        round: 2,
        position: 1,
        participantA: { username: 'jules', displayName: 'Util Vision', seed: 6 },
        participantB: { username: 'mae', displayName: 'Customs Lobby', seed: 7 },
        status: 'pending',
      },

      // Final (round 3)
      {
        id: 'val_final',
        round: 3,
        position: 0,
        participantA: null,
        participantB: null,
        status: 'pending',
      },
    ],
  },

  {
    eventSlug: 'spring-rocket-league-cup',
    format: 'Single elimination · BO5',
    rounds: 3,
    matches: [
      // Quarterfinals
      {
        id: 'rl_qf_1',
        round: 1,
        position: 0,
        participantA: { username: 'sky', displayName: 'Orbital 3', seed: 1 },
        participantB: { displayName: 'Snow Day Squad', seed: 8 },
        score: '3-0',
        winnerUsername: 'sky',
        status: 'completed',
      },
      {
        id: 'rl_qf_2',
        round: 1,
        position: 1,
        participantA: { username: 'arlo', displayName: 'Boost Trio', seed: 4 },
        participantB: { displayName: 'Aerial Knights', seed: 5 },
        score: '3-2',
        winnerUsername: 'arlo',
        status: 'completed',
      },
      {
        id: 'rl_qf_3',
        round: 1,
        position: 2,
        participantA: { displayName: 'Wall Riders', seed: 3 },
        participantB: { username: 'theo', displayName: 'Hoops Heroes', seed: 6 },
        score: '3-1',
        winnerUsername: undefined,
        status: 'completed',
      },
      {
        id: 'rl_qf_4',
        round: 1,
        position: 3,
        participantA: { username: 'ren', displayName: 'Stormcallers', seed: 2 },
        participantB: { username: 'pol', displayName: 'Hoops Fanatics', seed: 7 },
        score: '3-1',
        winnerUsername: 'ren',
        status: 'completed',
      },
      // Semifinals
      {
        id: 'rl_sf_1',
        round: 2,
        position: 0,
        participantA: { username: 'sky', displayName: 'Orbital 3', seed: 1 },
        participantB: { username: 'arlo', displayName: 'Boost Trio', seed: 4 },
        score: '3-2',
        winnerUsername: 'sky',
        status: 'completed',
      },
      {
        id: 'rl_sf_2',
        round: 2,
        position: 1,
        participantA: { displayName: 'Wall Riders', seed: 3 },
        participantB: { username: 'ren', displayName: 'Stormcallers', seed: 2 },
        score: '2-3',
        winnerUsername: 'ren',
        status: 'completed',
      },
      // Final
      {
        id: 'rl_final',
        round: 3,
        position: 0,
        participantA: { username: 'sky', displayName: 'Orbital 3', seed: 1 },
        participantB: { username: 'ren', displayName: 'Stormcallers', seed: 2 },
        score: '5-3',
        winnerUsername: 'sky',
        status: 'completed',
      },
    ],
  },

  {
    eventSlug: 'fifa-community-cup',
    format: 'Single elimination · two-leg ties (R16) · single match after',
    rounds: 3,
    // Bracket reveal happens 60 minutes before kickoff. We show all matches as
    // pending so the page can render the structure without spoilers.
    matches: [
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `fifa_qf_${i + 1}`,
        round: 1,
        position: i,
        participantA: null,
        participantB: null,
        status: 'pending' as const,
      })),
      ...Array.from({ length: 2 }, (_, i) => ({
        id: `fifa_sf_${i + 1}`,
        round: 2,
        position: i,
        participantA: null,
        participantB: null,
        status: 'pending' as const,
      })),
      {
        id: 'fifa_final',
        round: 3,
        position: 0,
        participantA: null,
        participantB: null,
        status: 'pending',
      },
    ],
  },
];
