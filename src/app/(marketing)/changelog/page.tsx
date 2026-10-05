import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { PageHeader } from '@/components/marketing/page-header';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { mockChangelog } from '@/data/changelog.mock';
import { formatDate } from '@/lib/format';
import {
  CHANGE_KIND_COLOR,
  CHANGE_KIND_LABEL,
  type ChangelogEntry,
  TYPE_LABEL,
} from '@/types/changelog';
import { MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Every Team Gekko platform release, with what changed and why. Versions follow semver and match the footer phase label.',
  alternates: { canonical: '/changelog' },
  openGraph: {
    title: 'Changelog · Team Gekko',
    description: 'Versioned release notes for the community platform.',
    url: '/changelog',
  },
};

const TYPE_COLOR: Record<ChangelogEntry['type'], string> = {
  major: 'var(--color-gekko-500)',
  minor: 'var(--color-neon-cyan)',
  patch: 'var(--color-text-secondary)',
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <PageHeader
              eyebrow="Changelog"
              title="Every release, with the reason"
              description={`${mockChangelog.length} releases shipped so far. Versions track semver and match the footer phase label so you always know what you're looking at.`}
              action={
                <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                  <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                    Suggest a feature <MessageCircle className="size-4" />
                  </a>
                </Button>
              }
            />
          </div>
        </section>

        <section className="relative px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-4xl">
            <ol className="relative space-y-10 border-l border-(--glass-border) pl-6 md:pl-10">
              {mockChangelog.map((entry) => (
                <li key={entry.version} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[33px] grid size-6 place-items-center rounded-full border bg-(--color-bg-deep) md:-left-[49px]"
                    style={{
                      borderColor: `${TYPE_COLOR[entry.type]}66`,
                      color: TYPE_COLOR[entry.type],
                    }}
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: TYPE_COLOR[entry.type] }}
                    />
                  </span>

                  <article className="glass rounded-3xl p-6 md:p-8">
                    <header className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.25em]">
                      <span
                        className="rounded-full border px-2.5 py-1 tabular-nums"
                        style={{
                          borderColor: `${TYPE_COLOR[entry.type]}55`,
                          color: TYPE_COLOR[entry.type],
                        }}
                      >
                        v{entry.version}
                      </span>
                      <span className="text-(--color-text-muted)">
                        {TYPE_LABEL[entry.type]} release
                      </span>
                      <span aria-hidden className="text-(--color-text-muted)">
                        ·
                      </span>
                      <time dateTime={entry.date} className="text-(--color-text-secondary)">
                        {formatDate(entry.date, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                      <span aria-hidden className="text-(--color-text-muted)">
                        ·
                      </span>
                      <span className="text-(--color-gekko-400)">{entry.phase}</span>
                    </header>

                    <h2 className="mt-4 font-(family-name:--font-heading) text-xl font-bold tracking-tight sm:text-2xl">
                      {entry.headline}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
                      {entry.summary}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {entry.changes.map((c) => (
                        <li
                          key={c.text}
                          className="flex gap-3 text-sm leading-relaxed text-(--color-text-secondary)"
                        >
                          <span
                            className="mt-0.5 inline-flex w-[68px] shrink-0 items-center justify-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]"
                            style={{
                              borderColor: `${CHANGE_KIND_COLOR[c.kind]}55`,
                              color: CHANGE_KIND_COLOR[c.kind],
                            }}
                          >
                            {CHANGE_KIND_LABEL[c.kind]}
                          </span>
                          <span className="min-w-0 flex-1">{c.text}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
