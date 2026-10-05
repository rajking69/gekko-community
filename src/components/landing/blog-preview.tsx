import { Button } from '@/components/ui/button';
import { mockPosts } from '@/data/posts.mock';
import { formatDate, formatRelative } from '@/lib/format';
import { POST_CATEGORY_LABEL, type Post } from '@/types/post';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

export function BlogPreview() {
  const featured = mockPosts.find((p) => p.featured) ?? mockPosts[0];
  const secondary = mockPosts.filter((p) => p.id !== featured?.id).slice(0, 3);

  if (!featured) return null;

  return (
    <section id="blog" className="relative px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
              Blog
            </p>
            <h2 className="mt-4 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Fresh from the community
            </h2>
            <p className="mt-4 text-(--color-text-secondary)">
              Tournament recaps, game guides, community updates, and the occasional rant. Written by
              members, edited by members.
            </p>
          </div>
          <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
            <Link href="/blog">
              All posts <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:gap-6 lg:grid-cols-[1.4fr_1fr]">
          <FeaturedPostCard post={featured} />
          <div className="flex flex-col gap-5 md:gap-6">
            {secondary.map((p) => (
              <SecondaryPostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedPostCard({ post }: { post: Post }) {
  const accent = accentMap[post.accent];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 transition duration-500 hover:border-(--color-gekko-500)/40">
      {/* Cover */}
      <Link
        href={`/blog/${post.slug}`}
        aria-label={post.title}
        className="relative block h-56 overflow-hidden sm:h-72 md:h-80"
        style={{ background: post.coverGradient }}
      >
        {post.glyph && (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-(family-name:--font-heading) text-[12rem] font-bold tracking-tighter opacity-25 mix-blend-screen transition duration-700 group-hover:scale-105"
            style={{ color: accent }}
          >
            {post.glyph}
          </span>
        )}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-(--color-bg-card)/80"
        />
        {/* Featured pill */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
          <span aria-hidden className="size-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <span className="text-white">Featured</span>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <PostMeta post={post} accent={accent} />
        <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight md:text-3xl">
          <Link
            href={`/blog/${post.slug}`}
            className="transition group-hover:text-(--color-gekko-300)"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-balance-pretty text-(--color-text-secondary)">{post.excerpt}</p>

        <footer className="mt-auto flex items-center justify-between gap-3 pt-6">
          <AuthorRow author={post.author} />
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read "${post.title}"`}
            className="grid size-10 place-items-center rounded-xl border border-(--glass-border) text-(--color-text-secondary) transition hover:border-(--color-gekko-500) hover:text-(--color-gekko-300)"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </footer>
      </div>
    </article>
  );
}

function SecondaryPostCard({ post }: { post: Post }) {
  const accent = accentMap[post.accent];

  return (
    <article className="group relative flex gap-4 overflow-hidden rounded-2xl border border-(--glass-border) bg-(--color-bg-card)/40 p-3 transition duration-300 hover:border-(--color-gekko-500)/40 sm:p-4">
      <Link
        href={`/blog/${post.slug}`}
        aria-label={post.title}
        className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl sm:w-32"
        style={{ background: post.coverGradient }}
      >
        {post.glyph && (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-(family-name:--font-heading) text-5xl font-bold tracking-tighter opacity-30 mix-blend-screen sm:text-6xl"
            style={{ color: accent }}
          >
            {post.glyph}
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <PostMeta post={post} accent={accent} compact />
        <h3 className="mt-2 line-clamp-2 font-(family-name:--font-heading) text-base font-bold leading-snug tracking-tight sm:text-lg">
          <Link
            href={`/blog/${post.slug}`}
            className="transition group-hover:text-(--color-gekko-300)"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-auto pt-2 truncate text-xs text-(--color-text-muted)">
          {post.author.name} · {formatRelative(post.publishedAt)}
        </p>
      </div>
    </article>
  );
}

function PostMeta({
  post,
  accent,
  compact,
}: {
  post: Post;
  accent: string;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.25em] text-(--color-text-muted)">
      <span style={{ color: accent }}>{POST_CATEGORY_LABEL[post.category]}</span>
      {!compact && (
        <>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt, { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
        </>
      )}
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3" />
        {post.readMinutes} min
      </span>
    </div>
  );
}

function AuthorRow({ author }: { author: Post['author'] }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="size-9 shrink-0 overflow-hidden rounded-full border border-(--glass-border) bg-(--color-bg-elev-1)">
        <Image
          src={author.avatar}
          alt=""
          width={72}
          height={72}
          sizes="36px"
          className="size-full object-cover"
          unoptimized
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold tracking-tight">{author.name}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          Author
        </p>
      </div>
    </div>
  );
}
