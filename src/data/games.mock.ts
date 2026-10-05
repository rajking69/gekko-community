import type { Game } from '@/types/game';

export const mockGames: Game[] = [
  {
    id: 'g_valorant',
    slug: 'valorant',
    name: 'Valorant',
    tagline: 'Daily rotation · 5v5',
    description:
      'The squad runs ranked and customs every weekday night. We have dedicated agent mains for every role and a coached scrim block on Saturdays.',
    publisher: 'Riot Games',
    genre: 'fps_tactical',
    status: 'regular',
    tags: ['Ranked', 'Customs', 'Scrims'],
    activeMembers: 142,
    squads: 11,
    cover: {
      gradient:
        'radial-gradient(at 25% 25%, #ff4655 0%, transparent 55%), radial-gradient(at 80% 80%, #0f1923 0%, transparent 60%), #070b14',
      glyph: 'V',
    },
    officialUrl: 'https://playvalorant.com',
    featured: true,
    accent: 'pink',
    longDescription: [
      'Valorant is the squad headline. Ranked queues every weekday from 8pm GMT, customs on Tuesday and Thursday for newer players, and a coached scrim block on Saturday afternoons.',
      "We rotate IGLs so multiple members get reps calling. There's an agent-mains channel for every role — entry, sentinel, controller, initiator — and a comp pool we share before scrim weeks.",
      'New here? Hop into #valorant in Discord, react to the role pings you can fill, and we will slot you into the next open lobby.',
    ],
    weeklySchedule: [
      { day: 'Mon / Wed', time: '20:00 GMT', mode: 'Ranked stack' },
      { day: 'Tue / Thu', time: '20:00 GMT', mode: 'Customs (open)' },
      { day: 'Sat', time: '15:00 GMT', mode: 'Scrim block (coached)' },
    ],
    voiceChannel: '#valorant',
    region: 'EU + NA',
    playLevel: 'Mixed',
    howToJoin: 'React to the role ping in #valorant — we slot you into the next open lobby.',
  },
  {
    id: 'g_pubg',
    slug: 'pubg',
    name: 'PUBG: Battlegrounds',
    tagline: 'Daily rotation · BR',
    description:
      'Squad nights every weekday — full four-stacks rolling Erangel and Sanhok. Tactical callouts, no cheese tactics, and a chill voice channel.',
    publisher: 'KRAFTON',
    genre: 'fps_br',
    status: 'regular',
    tags: ['Squad', 'TPP', 'Erangel'],
    activeMembers: 118,
    squads: 9,
    cover: {
      gradient:
        'radial-gradient(at 20% 30%, #f2a900 0%, transparent 55%), radial-gradient(at 80% 70%, #1a1a1a 0%, transparent 60%), #070b14',
      glyph: 'P',
    },
    officialUrl: 'https://pubg.com',
    featured: true,
    accent: 'amber',
    longDescription: [
      'PUBG is the long-running BR habit. We run TPP squads on Erangel and Sanhok every weekday — clean rotations, real callouts, no third-partying memes.',
      'Squads form in #pubg-lfg with a quick ping. Solo nights run on Wednesday for anyone who wants to grind ranked alone with the crew on voice.',
    ],
    weeklySchedule: [
      { day: 'Mon / Tue / Thu', time: '21:00 GMT', mode: 'Squads (TPP)' },
      { day: 'Wed', time: '21:00 GMT', mode: 'Solo with voice' },
      { day: 'Fri', time: '22:00 GMT', mode: 'Customs / tournament prep' },
    ],
    voiceChannel: '#pubg',
    region: 'EU + AS',
    playLevel: 'Mixed',
    howToJoin:
      'Ping #pubg-lfg with your map preference — squads fill in under five minutes most nights.',
  },
  {
    id: 'g_cs',
    slug: 'cs2',
    name: 'Counter-Strike 2',
    tagline: 'Daily rotation · 5v5',
    description:
      'Long-running CS habit moved to CS2. Premier queues, community 10-mans, and a weekly map study group for anyone working through Dust2 and Mirage.',
    publisher: 'Valve',
    genre: 'fps_tactical',
    status: 'regular',
    tags: ['Premier', '10-man', 'Aim DM'],
    activeMembers: 96,
    squads: 7,
    cover: {
      gradient:
        'radial-gradient(at 30% 30%, #2196f3 0%, transparent 55%), radial-gradient(at 70% 70%, #0a3060 0%, transparent 60%), #070b14',
      glyph: 'C',
    },
    officialUrl: 'https://counter-strike.net',
    featured: true,
    accent: 'cyan',
    longDescription: [
      "CS2 is the old guard's home. Premier stacks Monday through Thursday, community 10-mans on Friday, and a weekly map-study session for anyone fixing their map IQ.",
      'Aim DM warms up at 19:30 GMT before every stack night. Drop in even if you are not playing — most people use it as a chat-room more than a server.',
    ],
    weeklySchedule: [
      { day: 'Mon — Thu', time: '20:00 GMT', mode: 'Premier stack' },
      { day: 'Fri', time: '21:00 GMT', mode: '10-man (community)' },
      { day: 'Sun', time: '19:00 GMT', mode: 'Map study + theory' },
    ],
    voiceChannel: '#cs2',
    region: 'EU',
    playLevel: 'Competitive',
    howToJoin:
      'Join #cs2 voice 30 minutes before stack time — DM warms up first, then we vote map.',
  },
  {
    id: 'g_fifa',
    slug: 'fifa',
    name: 'EA SPORTS FC',
    tagline: 'Daily rotation · Football',
    description:
      'Pro Clubs lobby + Ultimate Team squad battles. Community cup runs once a month with a bracket and trophy art. Yes, the trophy is real.',
    publisher: 'EA Sports',
    genre: 'sports',
    status: 'regular',
    tags: ['Pro Clubs', 'Ultimate Team', 'Cup'],
    activeMembers: 84,
    squads: 6,
    cover: {
      gradient:
        'radial-gradient(at 25% 25%, #00b35c 0%, transparent 55%), radial-gradient(at 75% 75%, #004e2f 0%, transparent 60%), #070b14',
      glyph: 'F',
    },
    officialUrl: 'https://www.ea.com/ea-sports-fc',
    featured: true,
    accent: 'gekko',
    longDescription: [
      'FC is the squad palette cleanser. Pro Clubs every weekday after the main stack nights, Ultimate Team squad battles for anyone who likes the grind, and a community cup once a month with a real (printed, framed) trophy.',
      'Newer players welcome — we run a coaching channel where regulars review your FUT lineups and post tactic boards on request.',
    ],
    weeklySchedule: [
      { day: 'Tue / Thu', time: '22:00 GMT', mode: 'Pro Clubs lobby' },
      { day: 'Sat', time: '20:00 GMT', mode: 'FUT squad battles' },
      { day: 'Last Sun / month', time: '18:00 GMT', mode: 'Community cup' },
    ],
    voiceChannel: '#ea-fc',
    region: 'EU + AS',
    playLevel: 'Mixed',
    howToJoin:
      'Pick a position in #ea-fc-clubs and check the pinned lineup — captain pings when the lobby is forming.',
  },
  {
    id: 'g_apex',
    slug: 'apex',
    name: 'Apex Legends',
    tagline: 'Weekend nights · BR',
    description:
      "Weekend trios on World's Edge and Storm Point. Ranked grind sessions on Fridays — we coach roles and aim-train together pre-match.",
    publisher: 'Respawn / EA',
    genre: 'fps_hero',
    status: 'weekend',
    tags: ['Trios', 'Ranked', 'Customs'],
    activeMembers: 52,
    squads: 4,
    cover: {
      gradient:
        'radial-gradient(at 30% 70%, #8b5cf6 0%, transparent 55%), radial-gradient(at 80% 20%, #ff3a3a 0%, transparent 55%), #070b14',
      glyph: 'A',
    },
    officialUrl: 'https://www.ea.com/games/apex-legends',
    accent: 'violet',
    longDescription: [
      'Apex is the weekend trio habit. Friday nights are ranked grind blocks, Saturday is pubs + customs, and we have a small but consistent group climbing to Master every split.',
      "If you only show up on weekends — perfect, that's the rhythm. Legend pool is flexible; nobody minds if you only main Bloodhound.",
    ],
    weeklySchedule: [
      { day: 'Fri', time: '21:00 GMT', mode: 'Ranked grind' },
      { day: 'Sat', time: '20:00 GMT', mode: 'Pubs + customs' },
    ],
    voiceChannel: '#apex',
    region: 'EU + NA',
    playLevel: 'Mixed',
    howToJoin: 'React in #apex on Friday afternoon — trios fill fast once primetime starts.',
  },
  {
    id: 'g_rocket',
    slug: 'rocket-league',
    name: 'Rocket League',
    tagline: 'Weekend nights · 3v3',
    description:
      'Casual 2s and 3s when the squad needs a palate cleanser. Tournaments on Sunday afternoons and a low-stakes coaching channel for anyone climbing ranks.',
    publisher: 'Psyonix',
    genre: 'vehicular',
    status: 'weekend',
    tags: ['3v3', 'Tournament', 'Hoops'],
    activeMembers: 38,
    squads: 3,
    cover: {
      gradient:
        'radial-gradient(at 20% 80%, #22d3ee 0%, transparent 55%), radial-gradient(at 80% 20%, #fbbf24 0%, transparent 55%), #070b14',
      glyph: 'R',
    },
    officialUrl: 'https://www.rocketleague.com',
    accent: 'cyan',
    longDescription: [
      'Rocket League is the chill weekend palate cleanser. 2s and 3s when the squad wants something fast — and the in-game tournament feature gets a Sunday-afternoon run.',
      'We keep a coaching channel for anyone working through Gold → Diamond. No tilt allowed; we will mute the lobby if it starts.',
    ],
    weeklySchedule: [
      { day: 'Sat', time: '21:00 GMT', mode: '3v3 standard' },
      { day: 'Sun', time: '17:00 GMT', mode: 'Tournament block' },
    ],
    voiceChannel: '#rocket-league',
    region: 'EU',
    playLevel: 'Casual',
    howToJoin: 'Drop a "looking for 3rd" in #rocket-league — usually filled inside a few minutes.',
  },

  /* ---------- On-request titles ---------- */

  {
    id: 'g_ow2',
    slug: 'overwatch-2',
    name: 'Overwatch 2',
    tagline: 'On request · 5v5',
    description:
      'Pickup stacks form on demand — drop a ping in #ow2-lfg and a five usually appears within the hour. Tank shortage is real; tanks always get the slot.',
    publisher: 'Blizzard',
    genre: 'fps_hero',
    status: 'on_request',
    tags: ['Stack', 'Open queue', 'Pickup'],
    activeMembers: 24,
    squads: 2,
    cover: {
      gradient:
        'radial-gradient(at 25% 30%, #f97316 0%, transparent 55%), radial-gradient(at 80% 70%, #4338ca 0%, transparent 60%), #070b14',
      glyph: 'O',
    },
    officialUrl: 'https://overwatch.blizzard.com',
    accent: 'amber',
    region: 'EU + NA',
    playLevel: 'Casual',
    howToJoin: 'Ping #ow2-lfg with your role — tanks get an instant slot.',
  },
  {
    id: 'g_lol',
    slug: 'league-of-legends',
    name: 'League of Legends',
    tagline: 'On request · 5v5 MOBA',
    description:
      'Small but committed crew runs flex queue on weekends. Always looking for jungle and support mains. Tilt-free voice channel, no flaming.',
    publisher: 'Riot Games',
    genre: 'moba',
    status: 'on_request',
    tags: ['Flex', 'Norms', 'ARAM'],
    activeMembers: 19,
    squads: 1,
    cover: {
      gradient:
        'radial-gradient(at 30% 25%, #0bc6e3 0%, transparent 55%), radial-gradient(at 75% 75%, #c89b3c 0%, transparent 60%), #070b14',
      glyph: 'L',
    },
    officialUrl: 'https://leagueoflegends.com',
    accent: 'cyan',
    region: 'EU',
    playLevel: 'Mixed',
    howToJoin: 'Ping #lol with your main role and rank — usually queues up by Friday evening.',
  },
  {
    id: 'g_minecraft',
    slug: 'minecraft',
    name: 'Minecraft',
    tagline: 'On request · Sandbox',
    description:
      'Community survival server runs in the background year-round. Build nights every other Sunday, occasional minigame events when someone hosts.',
    publisher: 'Mojang',
    genre: 'sandbox',
    status: 'on_request',
    tags: ['Survival', 'Build nights', 'Minigames'],
    activeMembers: 31,
    squads: 1,
    cover: {
      gradient:
        'radial-gradient(at 25% 30%, #16a34a 0%, transparent 55%), radial-gradient(at 80% 75%, #78350f 0%, transparent 60%), #070b14',
      glyph: 'M',
    },
    officialUrl: 'https://minecraft.net',
    accent: 'gekko',
    region: 'Global',
    playLevel: 'Casual',
    howToJoin:
      'Server IP and whitelist link are pinned in #minecraft — react to the welcome message to get added.',
  },
];
