'use client';

import { faq } from '@/data/faq.mock';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
        <header>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
            FAQ
          </p>
          <h2 className="mt-4 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Questions, answered.
          </h2>
          <p className="mt-4 text-(--color-text-secondary)">
            The most common things people ask before joining. Have something else? Drop it in{' '}
            <a href="/contact" className="text-(--color-gekko-400) hover:underline">
              contact
            </a>{' '}
            and we'll add it here.
          </p>
        </header>

        <ul className="overflow-hidden rounded-3xl border border-(--glass-border) bg-(--color-bg-card)/40">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            const headingId = `faq-q-${i}`;
            const panelId = `faq-a-${i}`;
            return (
              <li key={item.q} className="border-b border-(--glass-border) last:border-b-0">
                <h3>
                  <button
                    id={headingId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-(--glass-tint) md:px-7 md:py-6"
                  >
                    <span className="font-(family-name:--font-heading) text-base font-semibold tracking-tight md:text-lg">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-(--glass-border) text-(--color-text-secondary) transition group-hover:border-(--color-gekko-500) group-hover:text-(--color-gekko-300)"
                    >
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                </h3>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out motion-reduce:transition-none',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <section
                    id={panelId}
                    aria-labelledby={headingId}
                    className="overflow-hidden px-5 text-sm text-(--color-text-secondary) md:px-7 md:text-base"
                  >
                    <div className="pb-6 md:pb-7">{item.a}</div>
                  </section>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
