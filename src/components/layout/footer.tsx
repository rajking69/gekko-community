import { SiteStats } from '@/components/layout/site-stats';
import { footerSections } from '@/config/nav.config';
import { siteConfig } from '@/config/site.config';
import { versionConfig } from '@/config/version.config';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-(--glass-border) bg-(--color-bg-deep)/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-14 sm:gap-12 md:grid-cols-5 md:py-16 lg:px-10">
        <div className="col-span-2 md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5" aria-label={siteConfig.name}>
            <Image
              src="/brand/gekko-logo-128.png"
              alt=""
              width={193}
              height={128}
              className="h-9 w-auto"
            />
            <span className="font-(family-name:--font-heading) text-xl font-bold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-(--color-text-secondary)">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {(
              [
                { label: 'Discord', href: siteConfig.links.discord },
                { label: 'YouTube', href: siteConfig.links.youtube },
                { label: 'Facebook', href: siteConfig.links.facebook },
                { label: 'Telegram', href: siteConfig.links.telegram },
                { label: 'GitHub', href: siteConfig.links.github },
              ] as const
            ).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-(--glass-border) px-3 py-2 transition hover:border-(--color-gekko-500) hover:text-(--color-gekko-300)"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-text-muted)">
              {section.title}
            </p>
            <ul className="mt-4 space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-(--color-text-secondary) transition hover:text-(--color-gekko-300)"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl border-t border-(--glass-border) px-6 py-6 lg:px-10">
        {/* Live visit counters (hidden until loaded / if metrics are unavailable) */}
        <SiteStats />

        <div className="mt-5 flex flex-col gap-4 text-xs text-(--color-text-muted) md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2.5 sm:gap-y-1">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <span aria-hidden className="hidden text-(--color-text-muted)/40 sm:inline">
              ·
            </span>
            <p>
              Developed by the{' '}
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-text-secondary) underline-offset-4 transition hover:text-(--color-gekko-300) hover:underline"
              >
                founding developer
              </a>{' '}
              of the Gekko Community
            </p>
          </div>

          <p
            className="flex flex-wrap items-center gap-2 font-mono uppercase tracking-[0.3em]"
            aria-label="Build info"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-(--color-gekko-500)" />v
              {versionConfig.version}
            </span>
            {versionConfig.commit && (
              <>
                <span aria-hidden>·</span>
                <a
                  href={`${siteConfig.links.github}/commit/${versionConfig.commit}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-(--color-gekko-300)"
                >
                  {versionConfig.commit}
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
