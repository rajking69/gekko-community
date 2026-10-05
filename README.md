# Team Gekko

Modern community platform — Next.js 15 + TypeScript + Tailwind v4 + Auth.js + Prisma + Three.js, deployed on Vercel's free tier.

See `../team-gekko-frontend-plan.md` and `../team-gekko-backend-plan.md` for the full architecture.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open <http://localhost:3000>.

Phase 0 is **mock-only** — you can run the app without any external services. Real services get wired up as we hit later phases.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server (after build) |
| `npm run lint` | Biome lint |
| `npm run fmt` | Biome format (auto-fix) |
| `npm run typecheck` | TypeScript check (no emit) |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run Prisma migrations (dev) |
| `npm run db:deploy` | Deploy migrations (prod) |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio |

## Folder structure

```
src/
├── app/                  Next.js App Router (UI + API routes)
│   ├── (marketing)/      Public site
│   ├── (auth)/           Login / register / verify
│   ├── dashboard/        Authed user dashboard
│   ├── admin/            Admin console
│   └── api/              Route handlers (the "backend")
├── components/           UI + feature components
├── server/               Server-only business logic (NEVER import in client)
├── services/             Client-side API wrappers (mock-or-real pattern)
├── lib/                  Shared utilities (validators, fetch, format)
├── hooks/                React hooks
├── store/                Zustand stores
├── config/               Static config (site, nav, roles)
├── data/                 Mock data for Phase 0
├── types/                Shared TS types
└── middleware.ts         Auth + route guards
```

## Phase status

- [x] Phase 0 — Foundation (scaffold, routing, providers, mock data)
- [ ] Phase 1 — Marketing surface + 3D hero
- [ ] Phase 2 — Auth
- [ ] Phase 3 — User dashboard
- [ ] Phase 4 — Admin console
- [ ] Phase 5 — Realtime + jobs
- [ ] Phase 6 — Optimization & launch

## Deployment

Push to GitHub and connect the repo in Vercel. Free tier (Hobby) is enough to launch.
