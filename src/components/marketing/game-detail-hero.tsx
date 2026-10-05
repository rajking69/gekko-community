import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { GENRE_LABEL, type Game, STATUS_COLOR, STATUS_LABEL } from '@/types/game';
import { ExternalLink, MessageCircle, Users } from 'lucide-react';

const accentMap = {
  gekko: '#00ff88',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  pink: '#f472b6',
  amber: '#fbbf24',
} as const;

export function GameDetailHero({ game }: { game: Game }) {
  const accent = accentMap[game.accent];

  return (
    <section className="relative overflow-hidden border-b border-(--glass-border) pt-28 pb-12 md:pt-36 md:pb-16">
      {/* Cover background */}
      <div aria-hidden className="absolute inset-0" style={{ background: game.cover.gradient }} />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-(--color-bg-void)/55 via-(--color-bg-void)/75 to-(--color-bg-void)"
      />
      {game.cover.glyph && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -bottom-20 select-none font-(family-name:--font-heading) text-[24rem] font-bold leading-none tracking-tighter opacity-15 mix-blend-screen md:-right-16 md:-bottom-32 md:text-[32rem]"
          style={{ color: accent }}
        >
          {game.cover.glyph}
        </span>
      )}

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>
          {GENRE_LABEL[game.genre]} · {game.publisher}
        </p>
        <h1 className="mt-4 font-(family-name:--font-heading) text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {game.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-(--color-text-secondary) sm:text-lg">
          {game.tagline} · {game.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: STATUS_COLOR[game.status] }}
            />
            {STATUS_LABEL[game.status]}
          </span>
          {game.region && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
              {game.region}
            </span>
          )}
          {game.playLevel && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
              {game.playLevel}
            </span>
          )}
          {game.voiceChannel && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
              {game.voiceChannel}
            </span>
          )}
        </div>

        {/* Stat row */}
        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          <StatBlock
            label="Active members"
            value={game.activeMembers.toLocaleString()}
            accent={accent}
            icon="users"
          />
          <StatBlock label="Squads" value={game.squads.toString()} accent={accent} />
          <StatBlock label="Tags" value={game.tags.length.toString()} accent={accent} />
          <StatBlock label="Cadence" value={STATUS_LABEL[game.status]} accent={accent} compact />
        </dl>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="xl" className="w-full sm:w-auto">
            <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
              Squad up in Discord <MessageCircle className="size-4" />
            </a>
          </Button>
          {game.officialUrl && (
            <Button asChild variant="glass" size="xl" className="w-full sm:w-auto">
              <a href={game.officialUrl} target="_blank" rel="noopener noreferrer">
                Official site <ExternalLink className="size-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  label,
  value,
  accent,
  icon,
  compact,
}: {
  label: string;
  value: string;
  accent: string;
  icon?: 'users';
  compact?: boolean;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
        {icon === 'users' && <Users className="size-3" style={{ color: accent }} />}
        {label}
      </dt>
      <dd
        className={
          compact
            ? 'mt-1 font-(family-name:--font-heading) text-lg font-bold tracking-tight'
            : 'mt-1 font-(family-name:--font-heading) text-2xl font-bold tracking-tight tabular-nums sm:text-3xl'
        }
      >
        {value}
      </dd>
    </div>
  );
}
