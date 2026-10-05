import type { ActivityEntry } from '@/types/activity';

/**
 * Recent activity timeline per member. Not every member has entries — only the
 * regulars who appear in spotlights. Newest first.
 * The detail page falls back to a "no recent activity" empty state when a user
 * has no entries.
 */
export const mockActivity: ActivityEntry[] = [
  /* ---------- nyra ---------- */
  {
    id: 'act_nyra_1',
    username: 'nyra',
    kind: 'event_attended',
    text: 'Hosted Valorant Cup · R2',
    detail: 'Bracket of 16',
    occurredAt: '2026-05-18T19:00:00Z',
  },
  {
    id: 'act_nyra_2',
    username: 'nyra',
    kind: 'badge_earned',
    text: 'Earned "Cup Master" badge',
    detail: '3 cups organized this season',
    occurredAt: '2026-05-14T22:30:00Z',
  },
  {
    id: 'act_nyra_3',
    username: 'nyra',
    kind: 'match_won',
    text: 'Won Premier match · 13-9',
    detail: 'Valorant · Haven',
    occurredAt: '2026-05-12T20:45:00Z',
  },
  {
    id: 'act_nyra_4',
    username: 'nyra',
    kind: 'level_up',
    text: 'Reached level 27',
    occurredAt: '2026-05-09T18:10:00Z',
  },

  /* ---------- astra ---------- */
  {
    id: 'act_astra_1',
    username: 'astra',
    kind: 'match_won',
    text: 'Won scrim vs Nightfall · 13-9',
    detail: 'Valorant · Haven',
    occurredAt: '2026-05-17T20:30:00Z',
  },
  {
    id: 'act_astra_2',
    username: 'astra',
    kind: 'streak_milestone',
    text: '7-day match streak',
    occurredAt: '2026-05-17T20:35:00Z',
  },
  {
    id: 'act_astra_3',
    username: 'astra',
    kind: 'match_played',
    text: 'Played custom vs Vector · 13-13 draw',
    detail: 'Valorant · Split',
    occurredAt: '2026-05-12T20:30:00Z',
  },
  {
    id: 'act_astra_4',
    username: 'astra',
    kind: 'joined_squad',
    text: 'Joined Squad XI (FIFA Pro Clubs)',
    occurredAt: '2026-05-10T14:00:00Z',
  },

  /* ---------- kael ---------- */
  {
    id: 'act_kael_1',
    username: 'kael',
    kind: 'match_won',
    text: 'Won 10-man · 16-12',
    detail: 'CS2 · Mirage',
    occurredAt: '2026-05-17T21:10:00Z',
  },
  {
    id: 'act_kael_2',
    username: 'kael',
    kind: 'event_attended',
    text: 'Hosted weekly stream',
    detail: '4h · 612 concurrent',
    occurredAt: '2026-05-15T20:00:00Z',
  },
  {
    id: 'act_kael_3',
    username: 'kael',
    kind: 'match_played',
    text: 'Played Premier · 10-13 loss',
    detail: 'CS2 · Dust2',
    occurredAt: '2026-05-13T21:15:00Z',
  },

  /* ---------- priya ---------- */
  {
    id: 'act_priya_1',
    username: 'priya',
    kind: 'match_won',
    text: 'Pro Clubs win vs River · 3-1',
    detail: 'EA SPORTS FC',
    occurredAt: '2026-05-16T22:25:00Z',
  },
  {
    id: 'act_priya_2',
    username: 'priya',
    kind: 'badge_earned',
    text: 'Earned "Captain" badge',
    detail: '20 Pro Clubs as captain',
    occurredAt: '2026-05-14T23:00:00Z',
  },

  /* ---------- ren ---------- */
  {
    id: 'act_ren_1',
    username: 'ren',
    kind: 'match_won',
    text: 'Apex Ranked #1 trios',
    detail: 'Storm Point · 4 kills',
    occurredAt: '2026-05-17T22:30:00Z',
  },
  {
    id: 'act_ren_2',
    username: 'ren',
    kind: 'streak_milestone',
    text: '3 Apex wins in a row',
    occurredAt: '2026-05-17T22:40:00Z',
  },

  /* ---------- oren ---------- */
  {
    id: 'act_oren_1',
    username: 'oren',
    kind: 'match_won',
    text: 'PUBG #1 · Sanhok',
    detail: 'Squad TPP',
    occurredAt: '2026-05-14T22:10:00Z',
  },
  {
    id: 'act_oren_2',
    username: 'oren',
    kind: 'joined_squad',
    text: 'Captained Sanhok Surf',
    occurredAt: '2024-11-02T19:00:00Z',
  },

  /* ---------- sky ---------- */
  {
    id: 'act_sky_1',
    username: 'sky',
    kind: 'match_won',
    text: 'Won RL tournament SF · 4-2',
    detail: 'Rocket League · Sunday cup',
    occurredAt: '2026-05-12T18:00:00Z',
  },

  /* ---------- jules ---------- */
  {
    id: 'act_jules_1',
    username: 'jules',
    kind: 'badge_earned',
    text: 'Earned "Util Vision" badge',
    detail: '25 util MVPs',
    occurredAt: '2025-02-09T20:00:00Z',
  },
  {
    id: 'act_jules_2',
    username: 'jules',
    kind: 'match_played',
    text: 'Played Premier · 11-13 loss',
    detail: 'Valorant · Ascent',
    occurredAt: '2026-05-15T20:50:00Z',
  },

  /* ---------- echo ---------- */
  {
    id: 'act_echo_1',
    username: 'echo',
    kind: 'event_attended',
    text: 'Coached Saturday Apex block',
    detail: '4 trainees',
    occurredAt: '2026-05-17T15:30:00Z',
  },

  /* ---------- iris ---------- */
  {
    id: 'act_iris_1',
    username: 'iris',
    kind: 'badge_earned',
    text: 'Earned "Clean Sheet" badge',
    detail: '20 shutouts',
    occurredAt: '2025-03-04T21:00:00Z',
  },

  /* ---------- mira ---------- */
  {
    id: 'act_mira_1',
    username: 'mira',
    kind: 'joined_squad',
    text: 'Joined Aurora Squad (Valorant)',
    occurredAt: '2024-09-04T19:30:00Z',
  },
  {
    id: 'act_mira_2',
    username: 'mira',
    kind: 'match_played',
    text: 'First custom — 13-11 win',
    detail: 'Valorant · Lotus',
    occurredAt: '2025-02-10T20:00:00Z',
  },

  /* ---------- tess ---------- */
  {
    id: 'act_tess_1',
    username: 'tess',
    kind: 'badge_earned',
    text: 'Earned "On Air" badge',
    detail: '30 hosted streams',
    occurredAt: '2025-03-22T22:00:00Z',
  },
];
