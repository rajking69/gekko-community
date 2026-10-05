/**
 * Games the community plays — shared by the landing hero (game-select) and the
 * "Games we play" strip so both stay in sync. Art is official key art: Steam
 * vertical capsules, plus a Valorant agent render used as a standing cutout.
 */
export type GameShowcase = {
  slug: string;
  name: string;
  /** Short label for the hero rail chip. */
  shortName: string;
  tagline: string;
  tags: string[];
  /** Accent hex — drives glow, ring, and labels. */
  accent: string;
  gradient: string;
  art: string;
  /** 'cover' fills the frame; 'character' is a cutout that stands at the bottom. */
  artFit: 'cover' | 'character';
};

// 2x capsule (1200×1800) — crisp in the large hero panel, not the soft 600×900.
const STEAM = (appId: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900_2x.jpg`;

export const gamesShowcase: GameShowcase[] = [
  {
    slug: 'valorant',
    name: 'Valorant',
    shortName: 'Valorant',
    tagline: 'Daily rotation · 5v5',
    tags: ['Ranked', 'Scrims'],
    accent: '#ff4655',
    gradient:
      'radial-gradient(at 25% 20%, #ff4655 0%, transparent 55%), radial-gradient(at 80% 90%, #0f1923 0%, transparent 60%), #0a0a0f',
    art: 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png',
    artFit: 'character',
  },
  {
    slug: 'pubg',
    name: 'PUBG: Battlegrounds',
    shortName: 'PUBG',
    tagline: 'Daily rotation · BR',
    tags: ['Squad', 'TPP'],
    accent: '#f2a900',
    gradient: 'radial-gradient(at 50% 30%, #f2a900 0%, transparent 60%), #0a0a0f',
    art: STEAM(578080),
    artFit: 'cover',
  },
  {
    slug: 'cs2',
    name: 'Counter-Strike 2',
    shortName: 'CS2',
    tagline: 'Daily rotation · 5v5',
    tags: ['Premier', '10-man'],
    accent: '#2196f3',
    gradient: 'radial-gradient(at 50% 30%, #2196f3 0%, transparent 60%), #0a0a0f',
    art: STEAM(730),
    artFit: 'cover',
  },
  {
    slug: 'fifa',
    name: 'EA SPORTS FC 26',
    shortName: 'EA FC 26',
    tagline: 'Daily rotation · Football',
    tags: ['Pro Clubs', 'Cup'],
    accent: '#00ff88',
    gradient: 'radial-gradient(at 50% 30%, #00b35c 0%, transparent 60%), #0a0a0f',
    // Official EA SPORTS FC 26 "World's Game Edition" key art (no-copy, clean).
    art: 'https://drop-assets.ea.com/images/6g5Yie1DUeAS4zbSBADAr0/0aee1e0e6d4c371042db4ad7b521e377/EAS_FC26_WGE_KeyArt-no-copy-16x9.jpg?im=Resize=(1920)&q=90',
    artFit: 'cover',
  },
  {
    slug: 'apex',
    name: 'Apex Legends',
    shortName: 'Apex',
    tagline: 'Weekend nights · BR',
    tags: ['Trios', 'Ranked'],
    accent: '#8b5cf6',
    gradient: 'radial-gradient(at 50% 30%, #ff3a3a 0%, transparent 60%), #0a0a0f',
    art: STEAM(1172470),
    artFit: 'cover',
  },
  {
    slug: 'rocket-league',
    name: 'Rocket League',
    shortName: 'Rocket League',
    tagline: 'Weekend nights · 3v3',
    tags: ['3v3', 'Tournament'],
    accent: '#22d3ee',
    gradient: 'radial-gradient(at 50% 30%, #22d3ee 0%, transparent 60%), #0a0a0f',
    art: STEAM(252950),
    artFit: 'cover',
  },
];
