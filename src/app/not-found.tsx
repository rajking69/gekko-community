import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mesh-bg" />
      <div className="grid-floor" />

      <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-500)">
        404 · Lost in the void
      </p>
      <h1 className="mt-6 font-(family-name:--font-heading) text-6xl font-bold tracking-tight md:text-8xl">
        Gekko's wandered off.
      </h1>
      <p className="mt-6 max-w-md text-balance-pretty text-(--color-text-secondary)">
        The page you're looking for isn't here. It might have moved, been deleted, or slipped
        beneath the surface.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/support">Get help</Link>
        </Button>
      </div>
    </main>
  );
}
