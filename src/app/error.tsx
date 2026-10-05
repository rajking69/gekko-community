'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Phase 0: just log. Wire Sentry in Phase 6.
    console.error('App error:', error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mesh-bg" />
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-danger)">
        Something broke
      </p>
      <h1 className="mt-6 font-(family-name:--font-heading) text-5xl font-bold tracking-tight md:text-6xl">
        An unexpected error occurred.
      </h1>
      <p className="mt-4 max-w-md text-(--color-text-secondary)">
        {error.message || 'We have logged this issue. Please try again.'}
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-(--color-text-muted)">ref: {error.digest}</p>
      )}
      <div className="mt-10 flex gap-3">
        <Button onClick={reset} size="lg">
          Try again
        </Button>
        <Button asChild variant="ghost" size="lg">
          <a href="/">Home</a>
        </Button>
      </div>
    </main>
  );
}
