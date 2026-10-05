import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { BlogExplorer } from '@/components/marketing/blog-explorer';
import { PageHeader } from '@/components/marketing/page-header';
import { Reveal } from '@/components/shared/reveal';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { postService } from '@/services/post.service';
import { MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Tournament recaps, game guides, community updates, and the occasional rant from Team Gekko members.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog · Team Gekko',
    description:
      'Recaps, guides, and community writeups. Filter by category — announcements, guides, tutorials, community, updates, changelog.',
    url: '/blog',
  },
};

export default async function BlogIndexPage() {
  const posts = await postService.all();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <PageHeader
                eyebrow="Blog"
                title="Notes from the squad"
                description={`${posts.length} posts so far. Tournament recaps, game guides, platform updates, and the occasional rant. Written by members, edited by members.`}
                action={
                  <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                    <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                      Pitch a post <MessageCircle className="size-4" />
                    </a>
                  </Button>
                }
              />
            </Reveal>
          </div>
        </section>

        <section className="relative px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-7xl">
            <Reveal delay={100}>
              <BlogExplorer posts={posts} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
