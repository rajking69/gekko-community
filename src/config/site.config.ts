export const siteConfig = {
  name: 'Team Gekko',
  shortName: 'Gekko',
  /** One-liner used in metadata, OG cards, and the footer brand description. */
  description:
    'A gaming community first — and a place to grow far beyond it. Squad up, compete, and find your crew.',
  /** Slightly longer description for OG cards / metadata description. */
  longDescription:
    'Where the squad plays, competes, and grows together. Games, tournaments, and real-time presence — all on one community platform.',
  /** Canonical site URL. Falls back to the prod alias. `||` (not `??`) so an
   *  empty-string env value also falls back — an empty NEXT_PUBLIC_APP_URL would
   *  otherwise make `new URL(siteConfig.url)` throw and 500 every page. */
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://gekko-community.vercel.app',
  ogImage: '/opengraph-image',
  locale: 'en_US',
  /** SEO keywords. Kept short — Google ignores long lists. */
  keywords: [
    'team gekko',
    'gaming community',
    'community platform',
    'valorant community',
    'pubg community',
    'cs2 community',
    'fifa community',
    'esports community',
    'events',
    'tournaments',
  ],
  /** Authors / creator (used in Organization schema + JSON-LD). */
  authors: [
    { name: 'Sheikh Mohammad Rajking', role: 'President' },
    { name: 'A.M. Asik Ifthaker Hamim', role: 'General Secretary' },
  ],
  links: {
    discord: 'https://discord.gg/dD6uy9CDV4',
    github: 'https://github.com/Asik-Ifthaker-Hamim/gekko-community',
    youtube: 'https://youtube.com/@ggyt69',
    facebook: 'https://www.facebook.com/profile.php?id=61575895614827',
    telegram: 'https://t.me/+QBMhiZtJkqs3Nzk9',
  },
  contactEmail: 'hello@teamgekko.local',
} as const;
