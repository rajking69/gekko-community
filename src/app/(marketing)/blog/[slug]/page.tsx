import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { PostBody } from '@/components/marketing/post-body';
import { PostCard } from '@/components/marketing/post-card';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { formatDate } from '@/lib/format';
import { postService } from '@/services/post.service';
import { POST_CATEGORY_LABEL, type Post } from '@/types/post';
import { ArrowLeft, Clock, MessageCircle, Share2 } from 'lucide-react';
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

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const posts = await postService.all();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await postService.get(slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.excerpt.slice(0, 200),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt.slice(0, 200),
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = await postService.get(slug);
  if (!post) notFound();

  const accent = accentMap[post.accent];
  const allPosts = await postService.all();
  const related = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  // Fallback body: split excerpt into paragraphs so posts without `body`
  // still render meaningful content.
  const bodyBlocks: Post['body'] = post.body ?? [{ kind: 'paragraph', text: post.excerpt }];

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-(--glass-border) pt-28 pb-12 md:pt-36 md:pb-16">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: post.coverGradient }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-(--color-bg-void)/55 via-(--color-bg-void)/75 to-(--color-bg-void)"
          />
          {post.glyph && (
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -bottom-20 select-none font-(family-name:--font-heading) text-[24rem] font-bold leading-none tracking-tighter opacity-15 mix-blend-screen md:-right-16 md:-bottom-32 md:text-[32rem]"
              style={{ color: accent }}
            >
              {post.glyph}
            </span>
          )}

          <div className="relative mx-auto max-w-3xl px-6 md:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>
              {POST_CATEGORY_LABEL[post.category]}
            </p>
            <h1 className="mt-4 font-(family-name:--font-heading) text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base text-(--color-text-secondary) sm:text-lg">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              <time dateTime={post.publishedAt} suppressHydrationWarning>
                {formatDate(post.publishedAt, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3" />
                {post.readMinutes} min read
              </span>
              {post.tags && post.tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-(--glass-border) bg-(--glass-tint) px-2 py-0.5 normal-case tracking-normal text-(--color-text-secondary)"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 pb-24 md:px-10 md:pb-32">
          {/* Back link */}
          <div className="mt-8">
            <Button asChild variant="link" className="px-0">
              <Link href="/blog">
                <ArrowLeft className="size-4" /> All posts
              </Link>
            </Button>
          </div>

          {/* Author card */}
          <AuthorCard author={post.author} />

          {/* Body */}
          <article className="mt-10">
            <PostBody blocks={bodyBlocks} />
          </article>

          {/* End-of-post CTA */}
          <section className="glass mt-16 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                  Join the conversation
                </p>
                <h3 className="mt-2 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
                  Drop your take in Discord
                </h3>
                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  Every post has a thread. Add your callouts, your clips, or your counter-argument.
                </p>
              </div>
              <Button asChild>
                <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                  Open Discord <MessageCircle className="size-4" />
                </a>
              </Button>
            </div>
          </section>

          {/* Share */}
          <p className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-text-muted)">
            <Share2 className="size-3" />
            Share with someone — every regular here got an invite from someone else.
          </p>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-(--glass-border) px-6 py-16 md:px-10 md:py-24">
            <div className="mx-auto max-w-7xl">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                Read next
              </p>
              <h2 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                More {POST_CATEGORY_LABEL[post.category]} posts
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {related.map((p) => (
                  <li key={p.id}>
                    <PostCard post={p} />
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

function AuthorCard({ author }: { author: Post['author'] }) {
  const inner = (
    <>
      <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-(--glass-border)">
        <Image
          src={author.avatar}
          alt=""
          width={96}
          height={96}
          sizes="48px"
          className="size-full object-cover"
          unoptimized
        />
      </div>
      <div className="min-w-0">
        <p className="truncate font-(family-name:--font-heading) text-sm font-bold tracking-tight">
          {author.name}
        </p>
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          Author
          {author.username && <span aria-hidden> · @{author.username}</span>}
        </p>
      </div>
    </>
  );

  return (
    <div className="mt-6">
      {author.username ? (
        <Link
          href={`/members/${author.username}`}
          className="glass inline-flex w-full items-center gap-4 rounded-2xl p-4 transition hover:border-(--color-gekko-500)/40 sm:w-auto"
        >
          {inner}
        </Link>
      ) : (
        <div className="glass inline-flex w-full items-center gap-4 rounded-2xl p-4 sm:w-auto">
          {inner}
        </div>
      )}
    </div>
  );
}
