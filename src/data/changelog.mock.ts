import type { ChangelogEntry } from '@/types/changelog';

/**
 * Versioned release log. Newest first. Each entry matches a `versionConfig.phase`
 * bump in `src/config/version.config.ts` so the footer phase label and the
 * changelog page stay in sync.
 */
export const mockChangelog: ChangelogEntry[] = [
  {
    version: '0.7.0',
    phase: 'Phase 1.11 · Blog & Gallery',
    date: '2026-05-19',
    type: 'minor',
    headline: 'Blog hub + masonry gallery shipped',
    summary:
      'Full /blog and /gallery surfaces with detail pages. Structured post bodies, lightbox-equipped masonry, and 32 prerendered detail pages between them.',
    changes: [
      { kind: 'added', text: '/blog index with featured slot, category filter, 12 posts.' },
      { kind: 'added', text: '/blog/[slug] detail pages with structured-block body renderer.' },
      { kind: 'added', text: '/gallery masonry index with category + game filters and lightbox.' },
      { kind: 'added', text: '/gallery/[id] detail pages with linked-game + uploader context.' },
      {
        kind: 'changed',
        text: 'Post type gained body (heading/paragraph/quote/code/list/callout) and tags.',
      },
    ],
  },
  {
    version: '0.6.0',
    phase: 'Phase 1.10 · Events hub',
    date: '2026-05-19',
    type: 'minor',
    headline: 'Events hub with bracket previews',
    summary:
      'Full event catalog (grid + calendar toggle) with detail pages, tournament bracket previews, and structured run-of-show + prize tiers.',
    changes: [
      { kind: 'added', text: '/events index with grid/calendar view toggle.' },
      {
        kind: 'added',
        text: '/events/[slug] detail pages with countdown, capacity bar, schedule, prizes.',
      },
      {
        kind: 'added',
        text: 'Bracket preview component for tournaments (single-elim, scrollable).',
      },
      { kind: 'added', text: 'Event participants pulled from the member directory.' },
      {
        kind: 'changed',
        text: 'Event type gained longDescription, host, schedule, prizes, format fields.',
      },
    ],
  },
  {
    version: '0.5.0',
    phase: 'Phase 1.9 · Members',
    date: '2026-05-19',
    type: 'minor',
    headline: 'Members directory',
    summary: '42-member directory with role/game filters and 42 prerendered profiles.',
    changes: [
      { kind: 'added', text: '/members directory with search, role, main-game filters.' },
      {
        kind: 'added',
        text: '/members/[username] profile pages — badges, main games, recent activity.',
      },
    ],
  },
  {
    version: '0.4.0',
    phase: 'Phase 1.8 · Games hub',
    date: '2026-05-19',
    type: 'minor',
    headline: 'Games catalog with detail pages',
    summary:
      'Filterable /games index and per-title detail pages with squad rosters, weekly schedules, and recent match results.',
    changes: [
      { kind: 'added', text: '/games index with genre + cadence filters.' },
      { kind: 'added', text: '/games/[slug] detail pages — squads, schedules, recent matches.' },
      { kind: 'added', text: 'Squad and Match types + mock data.' },
      { kind: 'added', text: '3 on-request titles (Overwatch 2, League, Minecraft).' },
    ],
  },
  {
    version: '0.3.0',
    phase: 'Phase 1.7 · Gaming pivot',
    date: '2026-05-19',
    type: 'minor',
    headline: 'Identity pivot to gaming community',
    summary:
      'Reframed every surface around gaming. Project showcase replaced with Games Showcase. Copy refresh across hero, bento, leadership, members, FAQ, posts, events.',
    changes: [
      { kind: 'added', text: 'Games Showcase replaces Project Showcase on landing.' },
      { kind: 'added', text: 'Game, GameGenre, GameStatus types + mock data.' },
      {
        kind: 'changed',
        text: 'All voice + copy rewritten around squads, queues, matches, tournaments.',
      },
      { kind: 'changed', text: 'Permission strings: manage_projects → manage_games.' },
      { kind: 'removed', text: 'Project showcase, project mock data, project type.' },
    ],
  },
  {
    version: '0.2.0',
    phase: 'Phase 1.6 · SEO + a11y polish',
    date: '2026-05-12',
    type: 'minor',
    headline: 'Full SEO, OG, a11y polish',
    summary:
      'Dynamic OG image, sitemap, robots, manifest, JSON-LD Organization+WebSite, skip-to-content link, reduced-motion fallbacks, and a Vice President + General Secretary quote section.',
    changes: [
      { kind: 'added', text: 'Dynamic /opengraph-image route (Edge).' },
      { kind: 'added', text: 'sitemap.ts, robots.ts, manifest.ts.' },
      { kind: 'added', text: 'JSON-LD Organization + WebSite blocks.' },
      { kind: 'added', text: 'Skip-to-content link, reduced-motion gates on 3D canvases.' },
      { kind: 'added', text: 'Leadership section with President + VP + GS bios.' },
    ],
  },
  {
    version: '0.1.0',
    phase: 'Phase 1 · Marketing surface',
    date: '2026-05-05',
    type: 'major',
    headline: 'First public landing surface',
    summary:
      'Initial Team Gekko landing — Next.js 15, Tailwind v4, R3F hero, smooth scroll, design tokens, mock data system, and the first deploy to Vercel.',
    changes: [
      { kind: 'added', text: 'Next.js 15 + TypeScript strict + Tailwind v4 scaffold.' },
      { kind: 'added', text: 'Hero with R3F Gekko core + cursor-follow.' },
      {
        kind: 'added',
        text: 'Live pulse strip, feature bento, events carousel.',
      },
      { kind: 'added', text: 'Members spotlight, blog preview, FAQ, Discord CTA, newsletter.' },
      { kind: 'added', text: 'Auto-deploy on push to main via Vercel Git integration.' },
    ],
  },
];
