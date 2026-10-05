import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { formatDate, formatRelative } from '@/lib/format';
import { galleryService } from '@/services/gallery.service';
import { gameService } from '@/services/game.service';
import { GALLERY_CATEGORY_LABEL } from '@/types/gallery';
import { ArrowLeft, ArrowUpRight, Heart, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

type RouteParams = { id: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const items = await galleryService.all();
  return items.map((it) => ({ id: it.slug ?? it.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await galleryService.get(id);
  if (!item) return { title: 'Image not found' };

  return {
    title: item.title,
    description: item.caption.slice(0, 200),
    alternates: { canonical: `/gallery/${item.slug ?? item.id}` },
    openGraph: {
      title: `${item.title} · Team Gekko`,
      description: item.caption.slice(0, 200),
      url: `/gallery/${item.slug ?? item.id}`,
      type: 'article',
      images: [{ url: item.src, alt: item.caption }],
    },
  };
}

export default async function GalleryItemPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;
  const item = await galleryService.get(id);
  if (!item) notFound();

  const accent = accentMap[item.accent];
  const [allItems, games] = await Promise.all([galleryService.all(), gameService.all()]);
  const linkedGame = item.gameSlug ? games.find((g) => g.slug === item.gameSlug) : null;
  const related = allItems
    .filter((x) => x.id !== item.id && x.category === item.category)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-(--glass-border) pt-28 pb-12 md:pt-36 md:pb-16">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(at 30% 30%, ${accent}25 0%, transparent 60%), radial-gradient(at 70% 70%, ${accent}1a 0%, transparent 60%)`,
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-transparent via-(--color-bg-void)/40 to-(--color-bg-void)"
          />

          <div className="relative mx-auto max-w-6xl px-6 md:px-10">
            <Button asChild variant="link" className="px-0">
              <Link href="/gallery">
                <ArrowLeft className="size-4" /> Back to gallery
              </Link>
            </Button>

            <div className="mt-6 grid gap-8 md:grid-cols-[1.6fr_1fr] md:gap-10">
              {/* Image */}
              <figure
                className="relative w-full overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40"
                style={{ aspectRatio: item.aspect }}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                  unoptimized
                />
              </figure>

              {/* Sidebar */}
              <aside className="flex flex-col gap-6">
                <div>
                  <p
                    className="font-mono text-xs uppercase tracking-[0.3em]"
                    style={{ color: accent }}
                  >
                    {GALLERY_CATEGORY_LABEL[item.category]}
                  </p>
                  <h1 className="mt-3 font-(family-name:--font-heading) text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
                    {item.title}
                  </h1>
                  <p className="mt-4 text-base text-(--color-text-secondary)">{item.caption}</p>
                </div>

                {/* Meta */}
                <div className="space-y-4 rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 p-5">
                  <Link
                    href={`/members/${item.uploader.username}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="relative size-11 overflow-hidden rounded-full border border-(--glass-border)">
                      <Image
                        src={item.uploader.avatar}
                        alt=""
                        width={88}
                        height={88}
                        sizes="44px"
                        className="size-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
                        Uploaded by
                      </p>
                      <p className="mt-0.5 truncate font-(family-name:--font-heading) text-sm font-bold tracking-tight group-hover:text-(--color-gekko-300)">
                        {item.uploader.displayName}
                      </p>
                      <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                        @{item.uploader.username}
                      </p>
                    </div>
                  </Link>

                  <dl className="grid grid-cols-2 gap-3 border-t border-(--glass-border) pt-4">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                        Posted
                      </dt>
                      <dd
                        className="mt-1 text-sm text-(--color-text-secondary)"
                        suppressHydrationWarning
                      >
                        {formatDate(item.postedAt, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </dd>
                      <dd
                        className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)"
                        suppressHydrationWarning
                      >
                        {formatRelative(item.postedAt)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                        Likes
                      </dt>
                      <dd className="mt-1 inline-flex items-center gap-1.5 text-sm text-(--color-text-secondary)">
                        <Heart className="size-3.5 text-(--color-neon-pink)" />
                        <span className="tabular-nums">{item.likes}</span>
                      </dd>
                    </div>
                  </dl>

                  {item.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5 border-t border-(--glass-border) pt-4">
                      {item.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-(--glass-border) bg-(--glass-tint) px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Linked game */}
                {linkedGame && (
                  <Link
                    href={`/games/${linkedGame.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-4 transition hover:border-(--color-gekko-500)/40"
                  >
                    <div
                      className="grid size-11 place-items-center overflow-hidden rounded-xl border"
                      style={{
                        borderColor: `${accent}55`,
                        background: linkedGame.cover.gradient,
                      }}
                    >
                      <span
                        aria-hidden
                        className="font-(family-name:--font-heading) text-2xl font-bold leading-none"
                        style={{ color: accent }}
                      >
                        {linkedGame.cover.glyph ?? '◆'}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
                        From
                      </p>
                      <p className="mt-0.5 truncate font-(family-name:--font-heading) text-sm font-bold tracking-tight">
                        {linkedGame.name}
                      </p>
                    </div>
                    <ArrowUpRight className="size-4 shrink-0 text-(--color-text-muted) transition group-hover:text-(--color-gekko-300)" />
                  </Link>
                )}

                <Button asChild>
                  <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                    Discuss in Discord <MessageCircle className="size-4" />
                  </a>
                </Button>
              </aside>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="px-6 py-16 md:px-10 md:py-24">
            <div className="mx-auto max-w-7xl">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                Same category
              </p>
              <h2 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                More {GALLERY_CATEGORY_LABEL[item.category].toLowerCase()}s
              </h2>
              <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/gallery/${r.slug ?? r.id}`}
                      className="group block overflow-hidden rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 transition hover:border-(--color-gekko-500)/40"
                    >
                      <div className="relative w-full" style={{ aspectRatio: r.aspect }}>
                        <Image
                          src={r.src}
                          alt={r.caption}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      <p className="truncate p-3 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)">
                        {r.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
