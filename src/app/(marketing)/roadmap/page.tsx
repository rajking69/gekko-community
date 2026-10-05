import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { PageHeader } from '@/components/marketing/page-header';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { mockRoadmap } from '@/data/roadmap.mock';
import { ROADMAP_STATUS_COLOR, ROADMAP_STATUS_LABEL, type RoadmapItem } from '@/types/roadmap';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'What Team Gekko is building this quarter and next. Status, scope, and an early look at what is being explored beyond.',
  alternates: { canonical: '/roadmap' },
  openGraph: {
    title: 'Roadmap · Team Gekko',
    description:
      'Quarterly platform roadmap with status — shipped, in progress, queued, exploring.',
    url: '/roadmap',
  },
};

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

export default function RoadmapPage() {
  // Group by quarter, preserving source order so the page reads "current → future".
  const grouped: Record<string, RoadmapItem[]> = {};
  for (const item of mockRoadmap) {
    const list = grouped[item.quarter] ?? [];
    list.push(item);
    grouped[item.quarter] = list;
  }
  const quarters = Object.keys(grouped);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <PageHeader
              eyebrow="Roadmap"
              title="What we're building next"
              description={`${mockRoadmap.length} items across ${quarters.length} quarters. Status reflects the public state — we update it after every release.`}
              action={
                <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                  <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                    Pitch a feature <MessageCircle className="size-4" />
                  </a>
                </Button>
              }
            />
          </div>
        </section>

        <section className="relative px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-7xl space-y-16">
            {quarters.map((quarter) => (
              <div key={quarter}>
                <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                  {quarter}
                </h2>
                <ul className="mt-5 grid gap-5 md:gap-6 lg:grid-cols-2">
                  {grouped[quarter]?.map((item) => (
                    <li key={item.id}>
                      <RoadmapCard item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Voting placeholder note */}
            <aside className="glass rounded-3xl p-6 text-center md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                Voting · placeholder
              </p>
              <h3 className="mt-2 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
                Real voting opens with accounts in Phase 2
              </h3>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-(--color-text-secondary)">
                Today's counts are placeholders from internal scoping. When real accounts ship,
                you'll be able to upvote items + leave one-paragraph rationales here.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const accent = accentMap[item.accent];
  const statusColor = ROADMAP_STATUS_COLOR[item.status];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 p-6 transition hover:border-(--color-gekko-500)/40 md:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at 20% 0%, ${accent}1f, transparent 60%)`,
        }}
      />
      <header className="relative flex items-start justify-between gap-3">
        <h3 className="font-(family-name:--font-heading) text-lg font-bold tracking-tight sm:text-xl">
          {item.title}
        </h3>
        <span
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{
            borderColor: `${statusColor}55`,
            color: statusColor,
            background: `${statusColor}0d`,
          }}
        >
          <span
            aria-hidden
            className="size-1.5 rounded-full"
            style={{ backgroundColor: statusColor }}
          />
          {ROADMAP_STATUS_LABEL[item.status]}
        </span>
      </header>

      <p className="relative mt-3 text-sm leading-relaxed text-(--color-text-secondary)">
        {item.description}
      </p>

      {item.details && item.details.length > 0 && (
        <ul className="relative mt-4 space-y-1.5 text-xs text-(--color-text-secondary)">
          {item.details.map((d) => (
            <li key={d} className="flex gap-2">
              <span
                aria-hidden
                className="mt-1.5 size-1 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      )}

      {typeof item.votes === 'number' && (
        <footer className="relative mt-auto flex items-center justify-between gap-3 pt-5">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-(--glass-border) px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)"
            aria-label={`${item.votes} votes`}
          >
            <ThumbsUp className="size-3" />
            <span className="tabular-nums text-(--color-text-secondary)">{item.votes}</span>
            <span aria-hidden>votes</span>
          </span>
        </footer>
      )}
    </article>
  );
}
