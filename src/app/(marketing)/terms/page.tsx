import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { PageHeader } from '@/components/marketing/page-header';
import { Info } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Placeholder Terms of Service for the Team Gekko community platform. Real legal copy lands when accounts ship in Phase 2.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    heading: 'Acceptance of these terms',
    body: 'By accessing teamgekko.com or signing in to the platform, you agree to these Terms of Service. If you do not agree, do not use the platform. This is a community space first — most rules are common-sense, but a few of them have legal weight.',
  },
  {
    heading: 'Community-first conduct',
    body: 'No harassment, slurs, hate speech, doxxing, or coordinated targeting. No cheating, smurfing in non-rank-appropriate events, or match-throwing for placement manipulation. Moderators have final say. Repeat or severe violations earn account bans without refund where applicable.',
  },
  {
    heading: 'Accounts',
    body: 'You are responsible for keeping your credentials safe. One account per person — no shared accounts in ranked events. We may suspend accounts that show clear automation, scraping, or abuse patterns.',
  },
  {
    heading: 'User-generated content',
    body: 'You retain ownership of clips, screenshots, posts, and comments you submit. By posting, you grant us a non-exclusive license to display them within the platform and in promotional material (with attribution). We can remove content that violates these terms.',
  },
  {
    heading: 'Events, tournaments, and prizes',
    body: 'Event rulesets are published per event. Tournament outcomes are final once acknowledged by the tournament director. Prizes — including physical trophies — ship to the address you provide at sign-off; we are not responsible for shipping issues beyond our control.',
  },
  {
    heading: 'Third-party platforms',
    body: 'The platform integrates with Discord, GitHub, Cloudinary, and others. Their respective terms apply to the parts of the experience they power. We do not control their availability, pricing, or policies.',
  },
  {
    heading: 'Liability disclaimer',
    body: 'The platform is provided "as is" — we take reasonable care to keep it running and your data safe, but we make no warranty of uninterrupted availability, defect-free operation, or fitness for a specific purpose. To the extent allowed by law, our liability is limited to amounts you paid us in the prior 12 months (which, on the free tier, is zero).',
  },
  {
    heading: 'Changes to these terms',
    body: 'We may update these terms — when we do, we will note the change in the changelog and notify members in #announcements. Continued use of the platform after a material change constitutes acceptance.',
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-4xl">
            <PageHeader
              eyebrow="Legal"
              title="Terms of Service"
              description="The ground rules for using the Team Gekko platform. Real legal copy lands when accounts and payments ship — until then, this is the working version."
            />
          </div>
        </section>

        <section className="relative px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-4xl">
            <aside className="glass mb-10 flex items-start gap-4 rounded-2xl p-5">
              <Info className="size-5 shrink-0 text-(--color-neon-cyan)" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
                  Placeholder
                </p>
                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  This document is a working draft maintained alongside the codebase. The
                  legally-reviewed version replaces it the day we open real accounts (Phase 2).
                </p>
              </div>
            </aside>

            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
              Last updated · 2026-05-19
            </p>

            <div className="mt-8 space-y-10">
              {SECTIONS.map((s, i) => (
                <section key={s.heading}>
                  <h2 className="font-(family-name:--font-heading) text-xl font-bold tracking-tight sm:text-2xl">
                    {i + 1}. {s.heading}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-(--color-text-secondary)">
                    {s.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
