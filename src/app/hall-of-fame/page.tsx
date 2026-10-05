'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { listHallOfFameParams, type HallOfFameEntry } from '@/services/hall-of-fame.service';
import { StatusBadge } from '@/components/admin/status-badge';
import { Trophy, Star, Award } from 'lucide-react';

export default function HallOfFamePage() {
  const [entries, setEntries] = useState<HallOfFameEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFame() {
      try {
        const data = await listHallOfFameParams({ published: true });
        const list = Array.isArray(data) ? data : data?.data || [];
        setEntries(list);
      } catch {
        setEntries([]);
      } finally {
        setLoading(false);
      }
    }
    loadFame();
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative min-h-screen px-6 py-28 md:px-10 md:py-36">
        <div className="mesh-bg" />
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="max-w-2xl text-left space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400) flex items-center gap-2">
              <Trophy className="size-4" /> Hall of Fame
            </p>
            <h1 className="font-(family-name:--font-heading) text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              Great work deserves a permanent place.
            </h1>
            <p className="text-base text-(--color-text-secondary) leading-relaxed">
              Recognized community members, tournament MVP winners, and honor recipients.
            </p>
          </div>

          {/* Published Entries Grid */}
          {loading ? (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-3xl h-64 border border-(--glass-border) animate-pulse" />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div className="mt-16 glass rounded-3xl border border-(--glass-border) p-12 text-center max-w-lg mx-auto">
              <Award className="mx-auto size-12 text-(--color-gekko-400)" />
              <h3 className="mt-4 font-(family-name:--font-heading) text-xl font-bold text-white">
                No published Hall of Fame entries yet
              </h3>
              <p className="mt-2 text-xs text-(--color-text-secondary)">
                Check back soon as new achievements are published by community administrators.
              </p>
            </div>
          ) : (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <div
                  key={entry.slug}
                  className="glass rounded-3xl border border-(--glass-border) p-6 space-y-4 flex flex-col justify-between transition hover:-translate-y-1 hover:border-(--color-gekko-500)/40"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-400 font-semibold">
                        {entry.category} · {entry.year}
                      </span>
                      {entry.featured && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] text-amber-300 border border-amber-500/30">
                          <Star className="size-3 fill-current text-amber-400" /> FEATURED
                        </span>
                      )}
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
