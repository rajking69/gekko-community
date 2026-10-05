import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { ActivityTimeline } from '@/components/marketing/activity-timeline';
import { BadgeGrid } from '@/components/marketing/badge-grid';
import { MainGamesList } from '@/components/marketing/main-games-list';
import { ProfileHero } from '@/components/marketing/profile-hero';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { gameService } from '@/services/game.service';
import { getMemberByUsername, listMemberActivity } from '@/services/member.service';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This route is dynamic - member data is fetched at runtime
export const dynamic = 'force-static';

type RouteParams = { username: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { username } = await params;
  const member = await getMemberByUsername(username);
  if (!member) return { title: 'Member not found' };

  const description =
    `${member.bio}${member.mainGames.length > 0 ? ` · Main games: ${member.mainGames.map((g) => g.name).join(', ')}` : ''}`.slice(
      0,
      200,
    );
  return {
    title: `${member.displayName} (@${member.username})`,
    description,
    alternates: { canonical: `/members/${member.username}` },
    openGraph: {
      title: `${member.displayName} · Team Gekko`,
      description,
      url: `/members/${member.username}`,
    },
  };
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { username } = await params;
  const member = await getMemberByUsername(username);
  if (!member) notFound();

  const [activity, games] = await Promise.all([
    listMemberActivity(member.username, 8),
    gameService.all(),
  ]);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <ProfileHero member={member} />

        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
          {/* Back link */}
          <div className="mt-8">
            <Button asChild variant="link" className="px-0">
              <Link href="/members">
                <ArrowLeft className="size-4" /> Back to directory
              </Link>
            </Button>
          </div>

          {/* Two-column body */}
          <div className="mt-8 grid gap-10 md:gap-12 lg:grid-cols-[1fr_360px]">
            {/* LEFT — main content */}
            <div className="space-y-16">
              <section aria-labelledby="badges">
                <h2
                  id="badges"
                  className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
                >
                  Badges
                </h2>
                <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                  Earned along the way
                </h3>
                <div className="mt-6">
                  <BadgeGrid badges={member.badges} />
                </div>
              </section>

              <section aria-labelledby="activity">
                <h2
                  id="activity"
                  className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
                >
                  Recent activity
                </h2>
                <h3 className="mt-3 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl">
                  What they've been up to
                </h3>
                <div className="mt-6">
                  <ActivityTimeline entries={activity} />
                </div>
              </section>
            </div>

            {/* RIGHT — sidebar */}
            <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
              <section aria-labelledby="main-games">
                <h2
                  id="main-games"
                  className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)"
                >
                  Main games
                </h2>
                <h3 className="mt-3 font-(family-name:--font-heading) text-xl font-bold tracking-tight">
                  Where they show up
                </h3>
                <div className="mt-5">
                  <MainGamesList mainGames={member.mainGames} catalog={games} />
                </div>
              </section>

              <section className="glass rounded-3xl p-6">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
                  Squad up
                </p>
                <h3 className="mt-2 font-(family-name:--font-heading) text-lg font-bold tracking-tight">
                  Queue with {member.displayName.split(' ')[0]}
                </h3>
                <p className="mt-2 text-sm text-(--color-text-secondary)">
                  Member profiles are read-only for now — drop into Discord and ping @
                  {member.username} when they're online.
                </p>
                <Button asChild className="mt-5 w-full">
                  <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                    Open Discord <MessageCircle className="size-4" />
                  </a>
                </Button>
              </section>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}