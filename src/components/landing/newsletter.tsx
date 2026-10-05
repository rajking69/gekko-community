'use client';

import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== 'idle') return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setStatus('loading');
    // Phase 1 — mock. Wire to /api/newsletter/subscribe in Phase 2+.
    await new Promise((r) => setTimeout(r, 700));
    setStatus('done');
    toast.success("You're on the list. Welcome to Gekko.");
  };

  return (
    <section className="relative px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40 p-8 sm:p-10 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 size-72 rounded-full bg-(--color-gekko-500)/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-32 size-72 rounded-full bg-(--color-neon-violet)/15 blur-3xl"
          />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-(--glass-border) bg-(--glass-tint) px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-gekko-400)">
              <Mail className="size-3" />
              Newsletter
            </div>
            <h2 className="mt-5 font-(family-name:--font-heading) text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              One email per month. Real signal, no fluff.
            </h2>
            <p className="mt-3 text-sm text-(--color-text-secondary) sm:text-base">
              Tournament drops, upcoming events, community wins. Unsubscribe anytime.
            </p>

            <form
              onSubmit={onSubmit}
              className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
              noValidate
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="you@teamgekko.com"
                value={email}
                disabled={status !== 'idle'}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1 rounded-xl border border-(--glass-border) bg-(--input) px-4 text-sm outline-none placeholder:text-(--color-text-muted) focus:border-(--color-gekko-500) disabled:opacity-60"
              />
              <Button
                type="submit"
                size="lg"
                disabled={status !== 'idle'}
                className="w-full sm:w-auto"
              >
                {status === 'idle' && 'Subscribe'}
                {status === 'loading' && 'Adding…'}
                {status === 'done' && '✓ Subscribed'}
              </Button>
            </form>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              No spam · No tracking pixels · Unsubscribe in one click
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
