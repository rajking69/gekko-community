import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { PageHeader } from '@/components/marketing/page-header';
import { SupportForm } from '@/components/marketing/support-form';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Help center for Team Gekko members — common questions, ticket creation, and faster paths in Discord.',
  alternates: { canonical: '/support' },
  openGraph: {
    title: 'Support · Team Gekko',
    description: 'Open a ticket or browse common questions.',
    url: '/support',
  },
};

const QUICK_LINKS = [
  {
    title: 'Account & login',
    description:
      "Can't sign in, forgot password, OAuth issues — these are tracked in Phase 2 once auth lands.",
  },
  {
    title: 'Event registration',
    description:
      'Bracket capacity full? Wrong region? Drop a ticket — we hold a small reserve for every event.',
  },
  {
    title: 'Report abuse',
    description:
      'Flame, slurs, cheating — every report goes to a mod within 24 hours. Anonymous reports OK.',
  },
];

const FAQ = [
  {
    q: 'How fast do tickets get answered?',
    a: 'Low priority: 48h. Medium: 24h. High: 8h. Urgent: 2h during community hours (EU + AS evenings).',
  },
  {
    q: 'Can I reply to a ticket from Discord?',
    a: 'Not yet — replies go to the email you registered with. Once accounts land in Phase 2, ticket threads sync to your dashboard.',
  },
  {
    q: 'Is there a status page?',
    a: 'Not a hosted one. We post any platform outage in #announcements and in the footer banner.',
  },
  {
    q: 'How do I report a bug?',
    a: "Open a ticket with category 'Bug or glitch'. Include the URL, screenshots, and the steps you took. Console logs help.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <PageHeader
              eyebrow="Support"
              title="Need a hand?"
              description="Open a ticket below for anything that needs a paper trail. For quick questions, Discord is faster — most regulars answer in minutes."
              action={
                <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                  <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                    Quick ask in Discord <MessageCircle className="size-4" />
                  </a>
                </Button>
              }
            />
          </div>
        </section>

        <section className="relative px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            <SupportForm />

            <aside className="space-y-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                  Common topics
                </p>
                <h3 className="mt-2 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
                  Before you open a ticket
                </h3>
                <ul className="mt-4 space-y-3">
                  {QUICK_LINKS.map((q) => (
                    <li
                      key={q.title}
                      className="rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-4"
                    >
                      <p className="font-(family-name:--font-heading) text-sm font-bold tracking-tight">
                        {q.title}
                      </p>
                      <p className="mt-1 text-xs text-(--color-text-secondary)">{q.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-3xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
                  Hint
                </p>
                <p className="mt-2 text-sm text-(--color-text-secondary)">
                  Many community questions are answered in the{' '}
                  <Link href="/#faq" className="text-(--color-gekko-300) hover:underline">
                    homepage FAQ
                  </Link>{' '}
                  — give it a scan first.
                </p>
              </div>
            </aside>
          </div>

          {/* Inline FAQ */}
          <div className="mx-auto mt-16 max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
              FAQ
            </p>
            <h2 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
              Support questions, answered
            </h2>
            <dl className="mt-8 space-y-4">
              {FAQ.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-5"
                >
                  <dt className="font-(family-name:--font-heading) text-base font-bold tracking-tight">
                    {item.q}
                  </dt>
                  <dd className="mt-2 text-sm text-(--color-text-secondary)">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
