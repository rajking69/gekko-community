import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { ContactForm } from '@/components/marketing/contact-form';
import { PageHeader } from '@/components/marketing/page-header';
import { siteConfig } from '@/config/site.config';
import { Github, Mail, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach the Team Gekko team — general questions, partnership pitches, event collaboration, press requests. Most replies go out within 48 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact · Team Gekko',
    description: 'Send a message, partner with us, or join the squad in Discord.',
    url: '/contact',
  },
};

const CHANNELS = [
  {
    icon: MessageCircle,
    label: 'Discord',
    detail: 'Fastest for community questions',
    href: siteConfig.links.discord,
    external: true,
    accent: 'gekko' as const,
  },
  {
    icon: Mail,
    label: siteConfig.contactEmail,
    detail: 'Best for partnerships + press',
    href: `mailto:${siteConfig.contactEmail}`,
    external: false,
    accent: 'cyan' as const,
  },
  {
    icon: Github,
    label: 'GitHub',
    detail: 'Platform bugs + PRs',
    href: siteConfig.links.github,
    external: true,
    accent: 'violet' as const,
  },
];

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <PageHeader
              eyebrow="Contact"
              title="Drop us a line"
              description="Most questions get answered fastest in Discord. For partnerships, events, or press — the form below routes to the right inbox. We reply within 48 hours on average."
            />
          </div>
        </section>

        <section className="relative px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <ContactForm />

            <aside className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                Other channels
              </p>
              <ul className="space-y-3">
                {CHANNELS.map((c) => {
                  const Icon = c.icon;
                  const color = accentMap[c.accent];
                  return (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        target={c.external ? '_blank' : undefined}
                        rel={c.external ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-4 rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-4 transition hover:border-(--color-gekko-500)/40"
                      >
                        <div
                          className="grid size-11 shrink-0 place-items-center rounded-xl border"
                          style={{
                            borderColor: `${color}55`,
                            color,
                            background: `${color}0d`,
                          }}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-(family-name:--font-heading) text-sm font-bold tracking-tight">
                            {c.label}
                          </p>
                          <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                            {c.detail}
                          </p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="glass rounded-3xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
                  Response time
                </p>
                <p className="mt-2 text-sm text-(--color-text-secondary)">
                  General queries within 48 hours. Partnership and press requests within a week.
                  Discord is real-time during community hours (EU + AS evenings).
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
