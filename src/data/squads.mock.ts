import type { Squad } from '@/types/squad';

/**
 * Fictional community squads keyed by game slug. Two-to-three squads per
 * featured game; on-request titles get one or zero (see notes inline).
 * Avatars reuse the same Unsplash IDs the rest of the mock data uses so we
 * don't sprinkle new image sources around.
 */
export const mockSquads: Squad[] = [
  /* ---------- Valorant ---------- */
  {
    id: 'sq_val_neon',
    gameSlug: 'valorant',
    name: 'Neon Five',
    tagline: 'Coached scrim crew, ranked stack on weekdays.',
    accent: 'pink',
    rank: 'Diamond II',
    cadence: 'Mon / Wed · 20:00 GMT',
    formedAt: '2024-04-12',
    capacity: 5,
    captain: {
      username: 'astra',
      displayName: 'Astra Vega',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop',
      role: 'IGL / Duelist',
    },
    roster: [
      {
        username: 'ren',
        displayName: 'Ren Okafor',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop',
        role: 'Initiator',
      },
      {
        username: 'priya',
        displayName: 'Priya Anand',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=128&h=128&fit=crop',
        role: 'Controller',
      },
      {
        username: 'sky',
        displayName: 'Sky Tanaka',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
        role: 'Sentinel',
      },
      {
        username: 'oren',
        displayName: 'Oren Hollis',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
        role: 'Flex',
      },
    ],
  },
  {
    id: 'sq_val_aurora',
    gameSlug: 'valorant',
    name: 'Aurora Squad',
    tagline: 'Newer players, customs-first, sub-friendly.',
    accent: 'violet',
    rank: 'Platinum I',
    cadence: 'Tue / Thu · 20:00 GMT',
    formedAt: '2024-09-04',
    capacity: 5,
    openSlots: true,
    captain: {
      username: 'kael',
      displayName: 'Kael Riven',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop',
      role: 'IGL',
    },
    roster: [
      {
        username: 'mira',
        displayName: 'Mira Cho',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
        role: 'Duelist',
      },
      {
        username: 'tobi',
        displayName: 'Tobi Adams',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=128&h=128&fit=crop',
        role: 'Support',
      },
      {
        username: 'lina',
        displayName: 'Lina Vega',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop',
        role: 'Controller',
      },
    ],
  },

  /* ---------- PUBG ---------- */
  {
    id: 'sq_pubg_drift',
    gameSlug: 'pubg',
    name: 'Drift Kings',
    tagline: 'TPP squad, Erangel mains, clean rotations.',
    accent: 'amber',
    rank: 'Diamond',
    cadence: 'Mon / Thu · 21:00 GMT',
    formedAt: '2024-02-18',
    capacity: 4,
    captain: {
      username: 'kael',
      displayName: 'Kael Riven',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop',
      role: 'IGL / Driver',
    },
    roster: [
      {
        username: 'tobi',
        displayName: 'Tobi Adams',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=128&h=128&fit=crop',
        role: 'Sniper',
      },
      {
        username: 'cyrus',
        displayName: 'Cyrus Park',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=128&h=128&fit=crop',
        role: 'Assault',
      },
      {
        username: 'nyra',
        displayName: 'Nyra Soto',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
        role: 'Scout',
      },
    ],
  },
  {
    id: 'sq_pubg_sanhok',
    gameSlug: 'pubg',
    name: 'Sanhok Surf',
    tagline: 'Aggressive fragger trio, open 4th slot.',
    accent: 'gekko',
    rank: 'Platinum',
    cadence: 'Tue · 21:00 GMT',
    formedAt: '2024-11-02',
    capacity: 4,
    openSlots: true,
    captain: {
      username: 'oren',
      displayName: 'Oren Hollis',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
      role: 'IGL',
    },
    roster: [
      {
        username: 'sky',
        displayName: 'Sky Tanaka',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
        role: 'Sniper',
      },
      {
        username: 'lina',
        displayName: 'Lina Vega',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop',
        role: 'Assault',
      },
    ],
  },

  /* ---------- CS2 ---------- */
  {
    id: 'sq_cs_void',
    gameSlug: 'cs2',
    name: 'Void Protocol',
    tagline: 'Premier stack, weekly map study.',
    accent: 'cyan',
    rank: '18,400 ELO',
    cadence: 'Mon — Thu · 20:00 GMT',
    formedAt: '2023-10-22',
    capacity: 5,
    captain: {
      username: 'kael',
      displayName: 'Kael Riven',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop',
      role: 'IGL / Awper',
    },
    roster: [
      {
        username: 'astra',
        displayName: 'Astra Vega',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop',
        role: 'Entry',
      },
      {
        username: 'priya',
        displayName: 'Priya Anand',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=128&h=128&fit=crop',
        role: 'Support',
      },
      {
        username: 'oren',
        displayName: 'Oren Hollis',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
        role: 'Lurk',
      },
      {
        username: 'ren',
        displayName: 'Ren Okafor',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop',
        role: 'Rifler',
      },
    ],
  },
  {
    id: 'sq_cs_10man',
    gameSlug: 'cs2',
    name: 'Friday 10-man',
    tagline: 'Rotating 10-man captains, open signups.',
    accent: 'gekko',
    cadence: 'Fri · 21:00 GMT',
    formedAt: '2024-06-01',
    capacity: 10,
    openSlots: true,
    captain: {
      username: 'nyra',
      displayName: 'Nyra Soto',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
      role: 'Organizer',
    },
    roster: [
      {
        username: 'cyrus',
        displayName: 'Cyrus Park',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=128&h=128&fit=crop',
      },
      {
        username: 'tobi',
        displayName: 'Tobi Adams',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=128&h=128&fit=crop',
      },
      {
        username: 'mira',
        displayName: 'Mira Cho',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
      },
      {
        username: 'sky',
        displayName: 'Sky Tanaka',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
      },
    ],
  },

  /* ---------- EA SPORTS FC ---------- */
  {
    id: 'sq_fc_eleven',
    gameSlug: 'fifa',
    name: 'Squad XI',
    tagline: 'Pro Clubs lineup, monthly cup contenders.',
    accent: 'gekko',
    rank: 'Div 2',
    cadence: 'Tue / Thu · 22:00 GMT',
    formedAt: '2024-01-08',
    capacity: 11,
    captain: {
      username: 'priya',
      displayName: 'Priya Anand',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=128&h=128&fit=crop',
      role: 'CDM / Captain',
    },
    roster: [
      {
        username: 'astra',
        displayName: 'Astra Vega',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop',
        role: 'ST',
      },
      {
        username: 'tobi',
        displayName: 'Tobi Adams',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=128&h=128&fit=crop',
        role: 'CAM',
      },
      {
        username: 'ren',
        displayName: 'Ren Okafor',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop',
        role: 'GK',
      },
      {
        username: 'mira',
        displayName: 'Mira Cho',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
        role: 'CB',
      },
      {
        username: 'cyrus',
        displayName: 'Cyrus Park',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=128&h=128&fit=crop',
        role: 'CM',
      },
    ],
  },

  /* ---------- Apex ---------- */
  {
    id: 'sq_apex_trio',
    gameSlug: 'apex',
    name: 'Stormcallers',
    tagline: 'Weekend trio, ranked grind block.',
    accent: 'violet',
    rank: 'Diamond III',
    cadence: 'Fri · 21:00 GMT',
    formedAt: '2024-08-15',
    capacity: 3,
    openSlots: true,
    captain: {
      username: 'ren',
      displayName: 'Ren Okafor',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop',
      role: 'Bloodhound',
    },
    roster: [
      {
        username: 'astra',
        displayName: 'Astra Vega',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop',
        role: 'Wraith',
      },
      {
        username: 'oren',
        displayName: 'Oren Hollis',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
        role: 'Gibraltar',
      },
    ],
  },

  /* ---------- Rocket League ---------- */
  {
    id: 'sq_rl_orbital',
    gameSlug: 'rocket-league',
    name: 'Orbital 3',
    tagline: 'Sunday tournament crew, casual 3v3s.',
    accent: 'cyan',
    rank: 'Champ I',
    cadence: 'Sat / Sun · 21:00 GMT',
    formedAt: '2024-04-29',
    capacity: 3,
    captain: {
      username: 'sky',
      displayName: 'Sky Tanaka',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
      role: 'Playmaker',
    },
    roster: [
      {
        username: 'cyrus',
        displayName: 'Cyrus Park',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=128&h=128&fit=crop',
        role: 'Striker',
      },
      {
        username: 'tobi',
        displayName: 'Tobi Adams',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=128&h=128&fit=crop',
        role: 'Goalie',
      },
    ],
  },

  /* ---------- Overwatch 2 (on-request) ---------- */
  {
    id: 'sq_ow_pickup',
    gameSlug: 'overwatch-2',
    name: 'Pickup Stack',
    tagline: 'Rotating 5, ping the channel to fill.',
    accent: 'amber',
    cadence: 'On request',
    formedAt: '2024-11-20',
    capacity: 5,
    openSlots: true,
    captain: {
      username: 'lina',
      displayName: 'Lina Vega',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop',
      role: 'Tank',
    },
    roster: [
      {
        username: 'oren',
        displayName: 'Oren Hollis',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
        role: 'DPS',
      },
      {
        username: 'mira',
        displayName: 'Mira Cho',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
        role: 'Support',
      },
    ],
  },

  /* ---------- League of Legends (on-request) ---------- */
  {
    id: 'sq_lol_flex',
    gameSlug: 'league-of-legends',
    name: 'Flex Five',
    tagline: 'Weekend flex queue, no flaming policy.',
    accent: 'cyan',
    rank: 'Gold I',
    cadence: 'Sat · 20:00 GMT',
    formedAt: '2025-01-12',
    capacity: 5,
    openSlots: true,
    captain: {
      username: 'priya',
      displayName: 'Priya Anand',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=128&h=128&fit=crop',
      role: 'Mid',
    },
    roster: [
      {
        username: 'kael',
        displayName: 'Kael Riven',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop',
        role: 'Top',
      },
      {
        username: 'sky',
        displayName: 'Sky Tanaka',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
        role: 'ADC',
      },
    ],
  },
];
