import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { MembersExplorer } from '@/components/marketing/members-explorer';
import { PageHeader } from '@/components/marketing/page-header';
import { Reveal } from '@/components/shared/reveal';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { gameService } from '@/services/game.service';
import { listMembers, allMembers } from '@/services/member.service';
import { MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Members',
  description:
    'Browse the Team Gekko community. Squad regulars, captains, organizers, newcomers — filter by main game, role, or just search by name.',
  alternates: { canonical: '/members' },
  openGraph: {
    title: 'Members · Team Gekko',
    description: 'Meet the squad. Filter by main game or role to find someone who plays your stuff — or jump into Discord and just say hi.',
    url: '/members',
  },
}

export default async function MembersPage() {
  const [members, games] = await Promise.all([allMembers(), gameService.all()]);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative px-6 pb-12 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <PageHeader
                eyebrow="Members"
                title="Meet the squad"
                description={`${members.length} community members in the directory. Filter by main game or role to find someone who plays your stuff — or jump into Discord and just say hi.`}
                action={
                  <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                    <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                      Join the squad <MessageCircle className="size-4" />
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
              <MembersExplorer members={members} games={games} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}