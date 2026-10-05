import { formatDate } from '@/lib/format';
import { POST_CATEGORY_LABEL, type Post } from '@/types/post';
import { ArrowUpRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

export function PostCard({
  post,
  variant = 'default',
}: { post: Post; variant?: 'default' | 'featured' }) {
  const accent = accentMap[post.accent];
  const isFeatured = variant === 'featured';

  return (
    <article
      className={
        isFeatured
          ? 'group relative grid overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 transition duration-500 hover:border-(--color-gekko-500)/40 md:grid-cols-[1.3fr_1fr]'
          : 'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 transition duration-500 hover:border-(--color-gekko-500)/40'
      }
    >
      {/* Cover */}
      <Link
        href={`/blog/${post.slug}`}
        aria-label={post.title}
        className={
          isFeatured
            ? 'relative block h-56 overflow-hidden sm:h-72 md:h-full md:min-h-[320px]'
            : 'relative block h-40 overflow-hidden sm:h-44'
        }
        style={{ background: post.coverGradient }}
      >
        {post.glyph && (
          <span
            aria-hidden
            className={
              isFeatured
                ? 'absolute inset-0 flex items-center justify-center font-(family-name:--font-heading) text-[12rem] font-bold tracking-tighter opacity-25 mix-blend-screen transition duration-700 group-hover:scale-105'
                : 'absolute inset-0 flex items-center justify-center font-(family-name:--font-heading) text-[8rem] font-bold tracking-tighter opacity-25 mix-blend-screen'
            }
            style={{ color: accent }}
          >
            {post.glyph}
          </span>
        )}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-(--color-bg-card)/70"
        />
        {post.featured && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
            <span
              aria-hidden
              className="size-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="text-white">Featured</span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className={isFeatured ? 'flex flex-col p-6 md:p-8' : 'flex flex-1 flex-col p-5 md:p-6'}>
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.25em] text-(--color-text-muted)">
          <span style={{ color: accent }}>{POST_CATEGORY_LABEL[post.category]}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt} suppressHydrationWarning>
            {formatDate(post.publishedAt, { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {post.readMinutes} min
          </span>
        </div>

        <h3
          className={
            isFeatured
              ? 'mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight md:text-3xl'
              : 'mt-3 font-(family-name:--font-heading) text-lg font-bold leading-snug tracking-tight md:text-xl'
          }
        >
          <Link
            href={`/blog/${post.slug}`}
            className="transition group-hover:text-(--color-gekko-300)"
          >
            {post.title}
          </Link>
        </h3>

        <p
          className={
            isFeatured
              ? 'mt-3 text-balance-pretty text-(--color-text-secondary)'
              : 'mt-2 line-clamp-2 text-sm text-(--color-text-secondary)'
          }
        >
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((t) => (
              <li
                key={t}
                className="rounded-full border border-(--glass-border) bg-(--glass-tint) px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        <footer className="mt-auto flex items-center justify-between gap-3 pt-5">
          <AuthorRow author={post.author} />
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read "${post.title}"`}
            className="grid size-9 place-items-center rounded-xl border border-(--glass-border) text-(--color-text-secondary) transition hover:border-(--color-gekko-500) hover:text-(--color-gekko-300)"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </footer>
      </div>
    </article>
  );
}

function AuthorRow({ author }: { author: Post['author'] }) {
  const wrapper = author.username
    ? (children: React.ReactNode) => (
        <Link
          href={`/members/${author.username}`}
          className="flex min-w-0 items-center gap-3 transition hover:text-(--color-gekko-300)"
        >
          {children}
        </Link>
      )
    : (children: React.ReactNode) => (
        <div className="flex min-w-0 items-center gap-3">{children}</div>
      );

  return wrapper(
    <>
      <div className="size-8 shrink-0 overflow-hidden rounded-full border border-(--glass-border) bg-(--color-bg-elev-1)">
        <Image
          src={author.avatar}
          alt=""
          width={64}
          height={64}
          sizes="32px"
          className="size-full object-cover"
          unoptimized
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-bold tracking-tight">{author.name}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          Author
        </p>
      </div>
    </>,
  );
}
