import type { RoadmapItem } from '@/types/roadmap';

/**
 * Quarterly roadmap. Status reflects the public state — anything in
 * `in_progress` is being actively worked, `queued` is committed for the
 * quarter, `exploring` means we are still scoping it.
 *
 * Vote counts are placeholder — the real voting widget ships when accounts
 * are real (Phase 2).
 */
export const mockRoadmap: RoadmapItem[] = [
  /* ---------- Q2 · 2026 (current) ---------- */
  {
    id: 'rm_games_hub',
    quarter: 'Q2 · 2026',
    title: 'Games hub + detail pages',
    description:
      'Filterable /games catalog with per-title squad rosters, weekly schedules, and recent results.',
    status: 'shipped',
    votes: 142,
    accent: 'gekko',
    details: ['9 games · 6 daily/weekend + 3 on-request', 'Squad rosters + match history per game'],
  },
  {
    id: 'rm_members',
    quarter: 'Q2 · 2026',
    title: 'Members directory',
    description: '42-member directory with role/main-game filters.',
    status: 'shipped',
    votes: 127,
    accent: 'cyan',
    details: ['42 prerendered profiles', 'Search + role/main-game filters'],
  },
  {
    id: 'rm_events',
    quarter: 'Q2 · 2026',
    title: 'Events hub with bracket previews',
    description:
      'Event catalog (grid + calendar) with detail pages including run-of-show, prizes, and single-elim bracket previews.',
    status: 'shipped',
    votes: 156,
    accent: 'pink',
    details: ['Grid + calendar view toggle', 'Mid-tournament bracket states supported'],
  },
  {
    id: 'rm_blog_gallery',
    quarter: 'Q2 · 2026',
    title: 'Blog + Gallery surfaces',
    description: 'Full blog with structured post bodies and a masonry gallery with lightbox.',
    status: 'shipped',
    votes: 98,
    accent: 'amber',
    details: ['Structured-block post renderer', 'Client-side lightbox with keyboard nav'],
  },
  {
    id: 'rm_static_pages',
    quarter: 'Q2 · 2026',
    title: 'About + static info pages',
    description:
      'About, changelog, roadmap, contact, support, terms, privacy — closing the marketing surface.',
    status: 'in_progress',
    votes: 64,
    accent: 'violet',
    details: ['All landing/footer CTAs resolved', 'Mocked contact + support forms'],
  },

  /* ---------- Q3 · 2026 ---------- */
  {
    id: 'rm_auth',
    quarter: 'Q3 · 2026',
    title: 'Auth.js wiring + real accounts',
    description:
      'Discord OAuth + email/password auth, real session cookies, edge middleware route gates.',
    status: 'queued',
    votes: 312,
    accent: 'gekko',
    details: [
      'Discord + GitHub OAuth providers',
      'Verify-email + reset-password flows',
      'Auth.js v5 + Prisma adapter on Neon',
    ],
  },
  {
    id: 'rm_db',
    quarter: 'Q3 · 2026',
    title: 'Real database — Neon migration',
    description:
      'Switch services from mock-or-real to real-only. Initial migration + seeding from the mock catalog.',
    status: 'queued',
    votes: 198,
    accent: 'cyan',
    details: ['Neon Postgres + Prisma migrations', 'Seed script ports existing mocks'],
  },
  {
    id: 'rm_realtime',
    quarter: 'Q3 · 2026',
    title: 'Real-time presence (Pusher)',
    description:
      'Live presence channels for members, events, and the live-pulse strip. Real-time notifications.',
    status: 'queued',
    votes: 247,
    accent: 'pink',
    details: ['Public + private channels', 'Live attendance counts on events'],
  },
  {
    id: 'rm_user_dashboard',
    quarter: 'Q3 · 2026',
    title: 'User dashboard',
    description:
      'Authed dashboard with profile editing, achievements, notifications, settings, and security (2FA).',
    status: 'queued',
    votes: 189,
    accent: 'amber',
    details: ['Profile editor + avatar upload (Cloudinary)', '2FA TOTP setup'],
  },

  /* ---------- Q4 · 2026 ---------- */
  {
    id: 'rm_admin',
    quarter: 'Q4 · 2026',
    title: 'Admin console',
    description:
      'Full admin surface — users, roles, content CMS, events bracket builder, tickets, analytics, audit logs.',
    status: 'exploring',
    votes: 134,
    accent: 'violet',
    details: ['Server-side paginated tables', 'Tiptap CMS for blog + announcements'],
  },
  {
    id: 'rm_squad_finder',
    quarter: 'Q4 · 2026',
    title: 'Squad Finder graduation',
    description:
      'Move Squad Finder out of beta with persistent squads, "queue now" mode, and recurring squad nights.',
    status: 'exploring',
    votes: 276,
    accent: 'gekko',
    details: ['Persistent squad memberships', 'Recurring scheduled lobbies'],
  },
  {
    id: 'rm_voice_rooms',
    quarter: 'Q4 · 2026',
    title: 'Voice rooms (LiveKit)',
    description:
      'Member-hosted voice rooms attached to events, squads, and the lobby — ephemeral, capped at 25.',
    status: 'exploring',
    votes: 168,
    accent: 'cyan',
    details: ['Capped at 25 per room', 'Auto-archive after 24h'],
  },
  {
    id: 'rm_mobile_pwa',
    quarter: 'Q4 · 2026',
    title: 'Installable PWA shell',
    description: 'Service worker, offline shell, install prompt, Web Push for event reminders.',
    status: 'exploring',
    votes: 92,
    accent: 'amber',
  },
];
