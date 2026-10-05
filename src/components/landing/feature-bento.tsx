import {
  Bell,
  Bot,
  Gamepad2,
  Image as ImageIcon,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure auth & 2FA',
    body: 'Email + password, Discord/GitHub OAuth, TOTP 2FA, recovery codes, session management.',
    span: 'sm:col-span-2 lg:col-span-2',
  },
  {
    icon: LayoutDashboard,
    title: 'Role-based dashboard',
    body: 'Permission-driven UI. Add roles, gate features instantly.',
  },
  {
    icon: ShieldCheck,
    title: 'Admin console',
    body: 'Users, content CMS, gallery, events, tickets, audit logs, system health.',
  },
  {
    icon: ImageIcon,
    title: 'Gekko gallery',
    body: 'Drag-drop uploads, moderation, masonry layouts, hover lightbox.',
    span: 'sm:col-span-2 lg:col-span-2',
  },
  {
    icon: Trophy,
    title: 'Events & tournaments',
    body: 'Registration, capacity, brackets, live mode, reminders.',
  },
  {
    icon: Bell,
    title: 'Real-time notifications',
    body: 'Toasts, banners, push — all wired via Pusher.',
  },
  {
    icon: Gamepad2,
    title: 'Game library',
    body: 'Browse the games we play, squad rosters, and weekly rotation.',
  },
  {
    icon: Users,
    title: 'Community presence',
    body: 'See who is online, what they are doing, where they are.',
    span: 'sm:col-span-2 lg:col-span-2',
  },
  {
    icon: Sparkles,
    title: 'Discord integration',
    body: 'OAuth login, role sync, webhook fanout.',
  },
  {
    icon: Bot,
    title: 'AI assist (coming)',
    body: 'Content suggestions, support triage, smart search.',
  },
];

export function FeatureBento() {
  return (
    <section className="relative px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
            Built for community
          </p>
          <h2 className="mt-4 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything a thriving community needs
          </h2>
          <p className="mt-4 text-(--color-text-secondary)">
            Everything the squad needs in one place. Bring your members, tell us where to add the
            rest.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group relative overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-(--color-gekko-500)/40 hover:bg-(--color-bg-card)/60 hover:shadow-[0_24px_50px_-30px_rgba(0,255,140,0.5)] ${f.span ?? ''}`}
              >
                <div
                  aria-hidden
                  className="absolute -right-12 -top-12 size-40 rounded-full bg-(--color-gekko-500)/0 blur-3xl transition duration-500 group-hover:bg-(--color-gekko-500)/15"
                />
                <div className="inline-flex size-10 items-center justify-center rounded-xl border border-(--glass-border) bg-(--glass-tint) transition duration-300 group-hover:border-(--color-gekko-500)/50 group-hover:text-(--color-gekko-300)">
                  <Icon className="size-5 text-(--color-gekko-400) transition duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mt-5 font-(family-name:--font-heading) text-lg font-bold tracking-tight sm:text-xl">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-(--color-text-secondary)">{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
