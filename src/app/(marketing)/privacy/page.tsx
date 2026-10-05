import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { PageHeader } from '@/components/marketing/page-header';
import { Info } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Placeholder privacy policy. We minimize collection, store data on EU/US infrastructure, and never sell anything to advertisers.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    heading: 'What we collect',
    body: 'When you visit the platform anonymously: page views and aggregate device info via privacy-respecting analytics (no cross-site tracking). When you create an account (Phase 2): email, display name, avatar URL, OAuth provider tokens (Discord/GitHub), and the in-platform content you create — posts, comments, gallery items, event registrations, match results.',
  },
  {
    heading: 'Why we collect it',
    body: 'To run the platform — show your profile, save your settings, send event reminders. We do not sell your data to advertisers. We do not build behavioral profiles for resale.',
  },
  {
    heading: 'Where it lives',
    body: 'Member data is stored on Neon Postgres (EU region by default). Avatars and gallery uploads live in Cloudinary. Email lives in Resend for transactional sends. Auth tokens are encrypted at rest and never leave the server.',
  },
  {
    heading: 'Who sees it',
    body: 'Profiles are public by default — your display name, username, joined date, badges, and main games appear on /members/[username]. You can switch your profile to members-only or private in settings (Phase 2). Email, login history, and ticket contents are never shown to other members.',
  },
  {
    heading: 'Third parties',
    body: 'We use a small set of third-party services to keep the platform running: Vercel (hosting), Neon (database), Pusher (real-time), Cloudinary (uploads), Resend (email), PostHog (analytics, EU instance), Sentry (error tracking). Each has its own privacy policy linked from this page when accounts land.',
  },
  {
    heading: 'Cookies',
    body: 'Strictly-necessary cookies for session and CSRF protection. A single first-party analytics cookie (no third-party trackers). No marketing or retargeting cookies — ever.',
  },
  {
    heading: 'Your rights',
    body: 'When real accounts ship you will be able to export every piece of data we hold about you (one-click GDPR export via a background job) and delete your account permanently. Hard deletes are irreversible and propagate to backups within 30 days.',
  },
  {
    heading: 'Children',
    body: 'Team Gekko is not intended for users under 13. If you believe a child has registered, contact us — we will delete the account immediately.',
  },
  {
    heading: 'Contact for privacy questions',
    body: 'Email the team via the contact page or DM @nyra in Discord. We aim to acknowledge privacy requests within 72 hours and resolve them within 30 days.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-4xl">
            <PageHeader
              eyebrow="Legal"
              title="Privacy Policy"
              description="Short version: we collect what is needed to run the platform, we never sell it to advertisers, and you can export or delete it whenever you want. The long version is below."
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
                  This is the working privacy policy — it reflects current practice on the anonymous
                  v0.x platform and what we plan to do when accounts ship. The legally-reviewed
                  version replaces it the day accounts open (Phase 2).
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
