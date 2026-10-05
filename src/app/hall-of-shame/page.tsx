'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { listHallOfShameParams, type HallOfShameEntry } from '@/services/hall-of-shame.service';
import { Skull, AlertOctagon } from 'lucide-react';

export default function HallOfShamePage() {
  const [entries, setEntries] = useState<HallOfShameEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShame() {
      try {
        const data = await listHallOfShameParams({ published: true });
        const list = Array.isArray(data) ? data : data?.data || [];
        setEntries(list);
      } catch {
        setEntries([]);
      } finally {
        setLoading(false);
      }
    }
    loadShame();
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative min-h-screen px-6 py-28 md:px-10 md:py-36">
        <div className="mesh-bg" />
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="max-w-2xl text-left space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-rose-400 flex items-center gap-2">
              <Skull className="size-4" /> Hall of Shame
            </p>
            <h1 className="font-(family-name:--font-heading) text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              Community Moderation & Penalty Log
            </h1>
            <p className="text-base text-(--color-text-secondary) leading-relaxed">
              Official record of community infractions, unsportsmanlike conduct, and tournament disqualifications.
            </p>
          </div>

          {/* Published Entries Grid */}
          {loading ? (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-3xl h-64 border border-rose-500/20 animate-pulse" />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div className="mt-16 glass rounded-3xl border border-rose-500/20 p-12 text-center max-w-lg mx-auto">
              <AlertOctagon className="mx-auto size-12 text-rose-400" />
              <h3 className="mt-4 font-(family-name:--font-heading) text-xl font-bold text-white">
                No published Hall of Shame entries
              </h3>
              <p className="mt-2 text-xs text-(--color-text-secondary)">
                There are currently no public infraction entries published by moderators.
              </p>
            </div>
          ) : (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <div
                  key={entry.slug}
                  className="glass rounded-3xl border border-rose-500/20 p-6 space-y-4 flex flex-col justify-between transition hover:-translate-y-1 hover:border-rose-500/40"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-rose-400 font-semibold">
                        {entry.category}
                      </span>
                    </div>

                    <h2 className="font-(family-name:--font-heading) text-xl font-bold text-white">
                      {entry.title}
                    </h2>
                    <p className="text-xs text-(--color-text-secondary) leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
