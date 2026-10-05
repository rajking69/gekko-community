import { PulseDot } from '@/components/shared/pulse-dot';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gamepad2, MapPin, Trophy, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const EVENT_SLUG = 'gekko-fifa-26-coop-tournament';

const BANNER =
  'https://drop-assets.ea.com/images/3eEHjjY2wGQ5tSWAaF37cL/b03bdcaa03bdba60d2b1b52d91bedbbe/fc26-twg-featured-image-16x9.jpg?im=Resize=(2560)&q=85';

const meta = [
  { icon: Gamepad2, label: '2v2 Co-Op format' },
  { icon: Users, label: '5 teams · round-robin' },
  { icon: MapPin, label: 'Bangladesh' },
] as const;

export function FeaturedEvent() {
  return (
    <section id="featured-event" className="relative px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="group relative overflow-hidden rounded-3xl border border-red-500/30 bg-black px-6 py-14 text-center shadow-[0_0_90px_-30px_rgba(239,68,68,0.55)] sm:px-10 sm:py-20 md:px-16 md:py-28">
          {/* EA SPORTS FC 26 banner — slow Ken Burns zoom */}
          <Image
            src={BANNER}
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-[ken-burns_22s_ease-in-out_infinite_alternate] object-cover object-center motion-reduce:animate-none"
          />
          {/* Dark scrim so the headline stays readable over the artwork */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/90"
          />
          {/* Red ambient glows echoing the poster */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -right-24 size-96 rounded-full bg-red-700/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-32 size-80 rounded-full bg-red-600/15 blur-3xl"
          />

          <div className="relative">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-red-500 sm:text-xs">
              <PulseDot />
              Live Now · Group Stage
            </p>

            <h2 className="mt-5 font-(family-name:--font-heading) text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="block text-white">GEKKO FIFA 26</span>
              <span className="block bg-gradient-to-b from-white via-white/80 to-white/30 bg-clip-text text-transparent">
                CO-OP TOURNAMENT
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-balance-pretty text-sm text-(--color-text-secondary) sm:text-base">
              The ultimate competitive EA SPORTS FC 26 experience. 2v2 Co-Op format —
              Bangladesh&apos;s premier esports event.
            </p>

            <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {meta.map((m) => (
                <li
                  key={m.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary) sm:text-xs"
                >
                  <m.icon className="size-3.5 text-red-400" />
                  {m.label}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                asChild
                size="xl"
                className="group/reg relative w-full overflow-hidden bg-red-600 text-white shadow-[0_10px_36px_-12px_rgba(239,68,68,0.8)] transition-transform hover:scale-[1.03] hover:bg-red-500 sm:w-auto"
              >
                <Link href="/tournament">
                  {/* Shine sweep on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1/4 -translate-x-[220%] bg-white/30 blur-md group-hover/reg:animate-[cta-shine_0.9s_ease-out] motion-reduce:hidden"
                  />
                  <Trophy className="size-4" /> View Live Standings{' '}
                  <ArrowRight className="size-4 transition-transform group-hover/reg:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl" className="w-full sm:w-auto">
                <Link href={`/events/${EVENT_SLUG}`}>Event details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
