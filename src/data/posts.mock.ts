import type { Post } from '@/types/post';

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();
const iso = (d: number) => new Date(d).toISOString();

export const mockPosts: Post[] = [
  {
    id: 'post_v3',
    slug: 'community-v3-is-live',
    title: 'Community v3 is live: 3D moments, real-time presence, and a faster shell',
    excerpt:
      'A complete rewrite on Next.js 15, React Three Fiber, and Lenis. We rebuilt the surface area, fixed every long-standing pain, and launched a new Gekko core in the hero.',
    coverGradient:
      'radial-gradient(at 25% 25%, #00ff88 0%, transparent 60%), radial-gradient(at 75% 75%, #8b5cf6 0%, transparent 60%), #070b14',
    glyph: '◬',
    category: 'announcement',
    publishedAt: iso(now - 2 * DAY),
    readMinutes: 6,
    author: {
      id: 'u_003',
      username: 'nyra',
      name: 'Nyra Soto',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
    },
    featured: true,
    accent: 'gekko',
    tags: ['Platform', 'Launch', '3D'],
    body: [
      {
        kind: 'paragraph',
        text: 'v3 is the third complete rebuild of the Team Gekko platform. We threw out the old dashboard chrome, the half-finished forum, and the dead-end notifications stack — and started over on a stack that actually fits a community-first product.',
      },
      { kind: 'heading', level: 2, text: 'What changed under the hood' },
      {
        kind: 'paragraph',
        text: 'Next.js 15 App Router, Tailwind v4, Auth.js v5, Prisma + Neon, Pusher for real-time, and React Three Fiber for the cinematic moments. The whole thing ships on Vercel Hobby for now.',
      },
      {
        kind: 'list',
        items: [
          'New Gekko core mesh in the hero — drifts toward your cursor, breathes on its own.',
          'Live pulse strip: members online, matches running, XP earned in the last hour.',
          'Real-time presence everywhere — dashboards, member directories, event lobbies.',
        ],
      },
      { kind: 'heading', level: 2, text: 'What we left out (on purpose)' },
      {
        kind: 'paragraph',
        text: "We are a gaming community, not a project-incubator. v3 ships with no public 'projects' surface, no contributor graph, and no repo embeds. If a feature does not serve the squads, it does not exist here.",
      },
      {
        kind: 'callout',
        tone: 'info',
        text: "If you bookmarked something from v2 that no longer resolves — drop the URL in #site-feedback and we'll either restore it or tell you why it isn't coming back.",
      },
    ],
  },
  {
    id: 'post_valorant_guide',
    slug: 'climb-the-valorant-ladder-fast',
    title: 'Climb the Valorant ladder fast — habits that actually work',
    excerpt:
      'Crosshair placement, agent picks, comms, and the warm-up routine our top duelists swear by. Tested across 200 ranked games — here is what stuck.',
    coverGradient:
      'radial-gradient(at 25% 30%, #ff4655 0%, transparent 60%), radial-gradient(at 75% 70%, #f472b6 0%, transparent 60%), #070b14',
    glyph: 'V',
    category: 'guide',
    publishedAt: iso(now - 5 * DAY),
    readMinutes: 9,
    author: {
      id: 'u_001',
      username: 'astra',
      name: 'Astra Vega',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop',
    },
    accent: 'pink',
    tags: ['Valorant', 'Ranked', 'Habits'],
    body: [
      {
        kind: 'paragraph',
        text: 'Most ranked guides skip the boring part: the habits you build between matches. The mechanics matter less than the patterns. Here is what moved my rank from Plat to Immortal across 200 games — and what I see the other Neon Five regulars doing on repeat.',
      },
      { kind: 'heading', level: 2, text: 'Warm up like you mean it' },
      {
        kind: 'paragraph',
        text: 'Twenty minutes of aim trainer is not a warm-up — it is procrastination. Replace it with 1 DM map for 8 minutes, 1 lineup pass for your agent, and 2 minutes of split-second peek/swing drills. Then queue.',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'DM map · 8 minutes · headshots-only mindset',
          'Agent lineup pass · 4 minutes · check timings, not just trajectories',
          'Peek/swing drill · 2 minutes · short, sharp engagements',
          'One range bot strafe-burst pass · 90 seconds',
        ],
      },
      { kind: 'heading', level: 2, text: 'Crosshair placement is a habit, not a setting' },
      {
        kind: 'paragraph',
        text: "Pick one crosshair, do not change it for two months. The wins compound: you stop second-guessing flicks, you start reading angles by muscle memory. The 'perfect crosshair' is the one you forget you have.",
      },
      {
        kind: 'quote',
        text: 'Your crosshair should be where the head will appear in 80% of fights. If you are flicking down or sideways, you are losing first-bullet diff before the round even starts.',
        attribution: 'Astra',
      },
      { kind: 'heading', level: 2, text: 'Comms — three rules' },
      {
        kind: 'list',
        items: [
          'Location, threat, intention — in that order. "B main, two players, going for site."',
          'Never call mid-fight. Trade calls cost you bullets.',
          'Two-word post-trade callouts after a kill, no more.',
        ],
      },
      {
        kind: 'callout',
        tone: 'success',
        text: 'Try this for a week and report back in #valorant. We track who hits a new peak rank — winners get a feature in the next recap.',
      },
    ],
  },
  {
    id: 'post_squad_finder',
    slug: 'inside-the-new-squad-finder',
    title: 'Inside the new Squad Finder — match by game, vibe, and rank',
    excerpt:
      'Five-stacks deserve better than a Discord text-channel scramble. Squad Finder pairs you by game, region, rank range, and how seriously you take ranked.',
    coverGradient:
      'radial-gradient(at 30% 30%, #fbbf24 0%, transparent 55%), radial-gradient(at 70% 70%, #f472b6 0%, transparent 55%), #070b14',
    glyph: '◭',
    category: 'updates',
    publishedAt: iso(now - 9 * DAY),
    readMinutes: 4,
    author: {
      id: 'u_004',
      username: 'ren',
      name: 'Ren Okafor',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop',
    },
    accent: 'amber',
    tags: ['Squad Finder', 'Matchmaking'],
    body: [
      {
        kind: 'paragraph',
        text: 'Squad Finder rolled out this week. The pitch is simple: stop scrolling Discord LFG, start filtering by what actually matters.',
      },
      { kind: 'heading', level: 2, text: 'What you can filter on' },
      {
        kind: 'list',
        items: [
          'Game · Valorant, PUBG, CS2, FIFA, Apex, Rocket League, OW2',
          'Rank band · ±2 tiers of your visible rank',
          'Region · EU, NA, AS, OCE',
          "Vibe · 'chill ranked', 'tryhard', 'customs only', 'first-time-here friendly'",
        ],
      },
      { kind: 'heading', level: 2, text: "What's coming next" },
      {
        kind: 'paragraph',
        text: 'Persistent squads (so the same five can re-form with one click) and a "now or never" flag for people about to queue. Both ship next sprint.',
      },
    ],
  },
  {
    id: 'post_valorant_cup',
    slug: 'valorant-cup-round-2-recap',
    title: 'Valorant Cup — Round 2 recap',
    excerpt:
      'Three hours, 58 entries, a deeply unfair number of Jett one-tricks. Recap, bracket results, and the MVP plays in full.',
    coverGradient:
      'radial-gradient(at 20% 80%, #8b5cf6 0%, transparent 55%), radial-gradient(at 80% 20%, #ff4655 0%, transparent 55%), #070b14',
    glyph: '◊',
    category: 'community',
    publishedAt: iso(now - 12 * DAY),
    readMinutes: 7,
    author: {
      id: 'u_002',
      username: 'kael',
      name: 'Kael Riven',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop',
    },
    accent: 'violet',
    tags: ['Valorant', 'Tournament', 'Recap'],
    body: [
      {
        kind: 'paragraph',
        text: 'Round 2 of the Valorant Cup ran late on Saturday. Fifty-eight entries from R1 narrowed to eight teams — and Round 2 narrowed those eight to four. Here is how it went, with a couple of plays that deserve a permanent spot in the highlight reel.',
      },
      { kind: 'heading', level: 2, text: 'Bracket results' },
      {
        kind: 'list',
        items: [
          'Neon Five 2-0 Pulse Gaming',
          'Aurora Squad 2-1 Rogue Signal',
          'Util Vision 2-1 Vector Esports',
          'Customs Lobby 2-0 Nightfall Esports',
        ],
      },
      { kind: 'heading', level: 2, text: 'MVP plays' },
      {
        kind: 'paragraph',
        text: 'Astra clutched a 1v3 on Haven defense to close round 23 — full audio, no util, just space-control and a perfect peek. The Neon Five voice channel after the fact was unbeatable content on its own.',
      },
      {
        kind: 'quote',
        text: 'I muted everyone for the last 20 seconds so I could think. Best decision of the tournament.',
        attribution: 'Astra, post-round',
      },
      { kind: 'heading', level: 2, text: 'Whats next' },
      {
        kind: 'paragraph',
        text: 'Semis run this Saturday — Neon Five vs Aurora Squad first, Util Vision vs Customs Lobby second. BO5 grand final immediately after. Stream goes live an hour before kickoff.',
      },
    ],
  },
  {
    id: 'post_pubg_guide',
    slug: 'pubg-squad-callouts-erangel',
    title: 'PUBG squad callouts — the Erangel rotation playbook',
    excerpt:
      'Zone calls, rotation lanes, and the four "always safe" compounds the squad rotates through. A field manual we wrote between matches.',
    coverGradient:
      'radial-gradient(at 30% 70%, #f2a900 0%, transparent 55%), radial-gradient(at 70% 30%, #fbbf24 0%, transparent 55%), #070b14',
    glyph: 'P',
    category: 'tutorial',
    publishedAt: iso(now - 18 * DAY),
    readMinutes: 12,
    author: {
      id: 'u_001',
      username: 'astra',
      name: 'Astra Vega',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop',
    },
    accent: 'amber',
    tags: ['PUBG', 'Callouts', 'Erangel'],
    body: [
      {
        kind: 'paragraph',
        text: 'Erangel rotations come down to two questions: where is the zone going, and which compound do you want to fight from. After two hundred matches the Drift Kings narrowed it down to four "always safe" anchors that work from any direction.',
      },
      { kind: 'heading', level: 2, text: 'The four anchors' },
      {
        kind: 'list',
        items: [
          'Pochinki — central, busy, but unbeatable rotation lanes through the school + apartments.',
          'Georgopol containers — long sight lines, controllable from a roof.',
          'Military Base — the south anchor. Risky if zone pulls north.',
          'Lipovka — quiet, eastern, lets you rotate through Stalber.',
        ],
      },
      { kind: 'heading', level: 2, text: 'Calling rotations' },
      {
        kind: 'paragraph',
        text: 'IGL calls the anchor 90 seconds before phase end. Two scouts move ahead, two anchors hold. Once the scouts confirm, the squad reforms inside the next compound — never on open ground.',
      },
      {
        kind: 'callout',
        tone: 'warning',
        text: 'Pochinki and Mil Base are high-traffic. If the lobby is hot, swap to Lipovka and accept the long rotation in.',
      },
    ],
  },
  {
    id: 'post_roadmap',
    slug: 'q3-roadmap',
    title: 'Q3 roadmap: tournaments, voice rooms, and the squad finder',
    excerpt:
      'What we are rolling out next quarter and how to influence priorities. Vote on features, sponsor an event, or volunteer to mod a community night.',
    coverGradient:
      'radial-gradient(at 25% 75%, #f472b6 0%, transparent 55%), radial-gradient(at 75% 25%, #fbbf24 0%, transparent 55%), #070b14',
    glyph: '◉',
    category: 'updates',
    publishedAt: iso(now - 24 * DAY),
    readMinutes: 5,
    author: {
      id: 'u_003',
      username: 'nyra',
      name: 'Nyra Soto',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
    },
    accent: 'pink',
    tags: ['Roadmap', 'Quarterly'],
    body: [
      {
        kind: 'paragraph',
        text: 'Three big rocks for Q3: a tournament organizer panel, voice rooms (community-hosted), and Squad Finder graduation from beta. Everything else is a polish ticket.',
      },
      { kind: 'heading', level: 2, text: 'How priorities get set' },
      {
        kind: 'paragraph',
        text: 'We pull feature pitches from #ideas, weight by squad reach and host commitment, and then vote in a public roundtable. Nothing is shipped because someone shouted loudest. The roadmap board is public — drop a 👀 on what you want to see.',
      },
    ],
  },

  /* ---------- New posts added in v0.7.0 ---------- */

  {
    id: 'post_cs2_climb',
    slug: 'cs2-climb-the-premier-ladder',
    title: 'CS2 — moving from 12k to 20k Premier without grinding',
    excerpt:
      'Map IQ over aim. Trade timing over heroics. A field guide for the Void Protocol map-study Sundays.',
    coverGradient:
      'radial-gradient(at 25% 25%, #22d3ee 0%, transparent 60%), radial-gradient(at 75% 75%, #0a3060 0%, transparent 60%), #070b14',
    glyph: 'C',
    category: 'guide',
    publishedAt: iso(now - 6 * DAY),
    readMinutes: 11,
    author: {
      id: 'u_002',
      username: 'kael',
      name: 'Kael Riven',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop',
    },
    accent: 'cyan',
    tags: ['CS2', 'Premier', 'Map IQ'],
    body: [
      {
        kind: 'paragraph',
        text: 'CS2 Premier in the 12-20k band is mostly a map-IQ problem. Aim diff matters at every level, but the gap between the player who closes a 16-14 and the one who throws a 14-8 lead is not first-bullet — it is map structure.',
      },
      { kind: 'heading', level: 2, text: 'Three habits that move ELO' },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Listen to the round, not the audio. The economy story tells you the next round more than the smokes do.',
          'Pre-trade. Always. Never push when your support is two timings behind.',
          "Use the buy menu as a comms channel. If everyone Glock-saves, that round is not a 'force', it is a stack.",
        ],
      },
      { kind: 'heading', level: 2, text: 'Map study Sunday' },
      {
        kind: 'paragraph',
        text: 'We run a community map-study every Sunday at 19:00 GMT. Pick a map you got smashed on last week, drop the demo timestamp, we walk through the round together. Two hours, no flaming.',
      },
      {
        kind: 'callout',
        tone: 'info',
        text: 'New here? Join #cs2 voice and just listen. Most regulars learned more from listening than from speaking.',
      },
    ],
  },
  {
    id: 'post_meetup_recap_tokyo',
    slug: 'tokyo-meetup-recap',
    title: 'Tokyo meetup recap — twenty people, two FIFA brackets, one karaoke detour',
    excerpt:
      'The first in-person Gekko meetup outside Europe wrapped up last weekend. Notes from the host, the lessons, and the date for round two.',
    coverGradient:
      'radial-gradient(at 30% 20%, #f472b6 0%, transparent 60%), radial-gradient(at 80% 80%, #00ff88 0%, transparent 60%), #070b14',
    glyph: '◇',
    category: 'community',
    publishedAt: iso(now - 21 * DAY),
    readMinutes: 6,
    author: {
      id: 'u_010',
      username: 'sky',
      name: 'Sky Tanaka',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
    },
    accent: 'cyan',
    tags: ['Meetup', 'Tokyo', 'Community'],
    body: [
      {
        kind: 'paragraph',
        text: 'Twenty people, four PCs, two consoles, and one karaoke detour. The Shibuya meetup turned out exactly how a first-of-its-kind community meet should — slightly chaotic, mostly on-time, ended later than planned.',
      },
      { kind: 'heading', level: 2, text: 'What worked' },
      {
        kind: 'list',
        items: [
          'Splitting the room: 6 PCs running customs, 4 consoles on FIFA, the rest hanging.',
          "The 'first hour is just talking' rule. Helped people who knew nobody warm up.",
          'A printed bracket on the wall. Made the small tournament feel official.',
        ],
      },
      { kind: 'heading', level: 2, text: 'What we will change' },
      {
        kind: 'list',
        items: [
          'Earlier doors next time — 18:00 was too late for a Saturday.',
          'A pre-event Discord thread for travel coordination from outside Tokyo.',
          'More chairs.',
        ],
      },
      {
        kind: 'callout',
        tone: 'success',
        text: 'Round two: same venue, same vibe, three months out. Watch #meetups for the date drop.',
      },
    ],
  },
  {
    id: 'post_changelog_may',
    slug: 'changelog-may',
    title: 'Changelog · May — bracket builder, Squad Finder filters, faster shell',
    excerpt:
      'Three big shipments this month. Bracket Builder, Squad Finder vibe filter, and a 30% faster shell after the navbar refactor.',
    coverGradient:
      'radial-gradient(at 25% 25%, #00ff88 0%, transparent 60%), radial-gradient(at 75% 75%, #22d3ee 0%, transparent 60%), #070b14',
    glyph: '∆',
    category: 'changelog',
    publishedAt: iso(now - 1 * DAY),
    readMinutes: 3,
    author: {
      id: 'u_003',
      username: 'nyra',
      name: 'Nyra Soto',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
    },
    accent: 'gekko',
    tags: ['Changelog', 'Platform'],
    body: [
      { kind: 'heading', level: 2, text: 'Shipped' },
      {
        kind: 'list',
        items: [
          'Bracket Builder · single-elim · auto-seeding · supports 8-64 teams.',
          'Squad Finder · vibe filter · "chill", "tryhard", "customs only", "first-time".',
          'Navbar refactor · scroll-react glass · 30% faster initial paint.',
          'Achievements grid (dashboard) · constellation view experimental flag.',
        ],
      },
      { kind: 'heading', level: 2, text: 'Fixed' },
      {
        kind: 'list',
        items: [
          'Live Pulse counter occasionally double-rendered on first paint.',
          'Mobile menu close transition skipped when tapping rapidly.',
          'Member directory pagination did not preserve filter state on back navigation.',
        ],
      },
    ],
  },
  {
    id: 'post_apex_role_coaching',
    slug: 'apex-role-coaching-notes',
    title: 'Apex role coaching — notes from the Saturday block',
    excerpt:
      'Echo walks through what she actually says when she pauses your VOD. Recon, fragger, support — three completely different brains.',
    coverGradient:
      'radial-gradient(at 30% 70%, #8b5cf6 0%, transparent 55%), radial-gradient(at 80% 20%, #ff3a3a 0%, transparent 55%), #070b14',
    glyph: 'A',
    category: 'tutorial',
    publishedAt: iso(now - 14 * DAY),
    readMinutes: 8,
    author: {
      id: 'u_020',
      username: 'echo',
      name: 'Echo Marin',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=128&h=128&fit=crop',
    },
    accent: 'violet',
    tags: ['Apex', 'Coaching', 'Roles'],
    body: [
      {
        kind: 'paragraph',
        text: 'Every Saturday I run a 90-minute role coaching block for 8-12 players. The same three pain points show up no matter what rank you are climbing through.',
      },
      { kind: 'heading', level: 2, text: 'Recon' },
      {
        kind: 'paragraph',
        text: 'You scan too late. Scan when you hear the third-party rotate, not when you see them. The information is only useful before contact.',
      },
      { kind: 'heading', level: 2, text: 'Fragger' },
      {
        kind: 'paragraph',
        text: 'You take fights you cannot trade. Engage when your support is three meters off your shoulder, not seventy.',
      },
      { kind: 'heading', level: 2, text: 'Support' },
      {
        kind: 'paragraph',
        text: 'You hold cover too long. Heal happens between fights, not during them. Crack-heal mid-fight, full-heal in cover.',
      },
      {
        kind: 'callout',
        tone: 'info',
        text: 'Bring a 5-minute ranked clip from the last 7 days. Sessions are capped at 12 — slots fill in #apex on Friday afternoons.',
      },
    ],
  },
  {
    id: 'post_fifa_tactic_boards',
    slug: 'fifa-tactic-boards-the-cup',
    title: 'FIFA tactic boards — what we ran in the cup',
    excerpt:
      'Priya shares the three formations Squad XI rotated through during the spring cup. With board screenshots and the press triggers that worked.',
    coverGradient:
      'radial-gradient(at 25% 25%, #00b35c 0%, transparent 60%), radial-gradient(at 75% 75%, #004e2f 0%, transparent 60%), #070b14',
    glyph: 'F',
    category: 'guide',
    publishedAt: iso(now - 11 * DAY),
    readMinutes: 7,
    author: {
      id: 'u_006',
      username: 'priya',
      name: 'Priya Anand',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=128&h=128&fit=crop',
    },
    accent: 'gekko',
    tags: ['FIFA', 'Pro Clubs', 'Tactics'],
    body: [
      {
        kind: 'paragraph',
        text: 'Squad XI rotated through three formations across the cup. None of them are clever — they are just what we drilled the most. Familiarity beats cleverness in a single-leg knockout.',
      },
      { kind: 'heading', level: 2, text: 'The three formations' },
      {
        kind: 'list',
        items: [
          '4-2-3-1 wide · default · press the wings, lock the middle.',
          '4-3-3 false 9 · vs deep blocks · drag a CB out of position.',
          '5-3-2 mid block · last 15 minutes when up by one · suffocate the channels.',
        ],
      },
      { kind: 'heading', level: 2, text: 'Press triggers that worked' },
      {
        kind: 'paragraph',
        text: 'We pressed on the second pass back, not the first. First pass back is too clean — the opponent has options. Second pass back, options narrow and the trigger is cheap.',
      },
    ],
  },
];
