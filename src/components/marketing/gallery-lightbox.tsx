'use client';

import { formatDate } from '@/lib/format';
import type { GalleryItem } from '@/types/gallery';
import { ArrowUpRight, ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  onChange: (next: number) => void;
  onClose: () => void;
};

export function GalleryLightbox({ items, index, onChange, onClose }: LightboxProps) {
  const item = items[index];

  const goPrev = useCallback(() => {
    onChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onChange]);

  const goNext = useCallback(() => {
    onChange((index + 1) % items.length);
  }, [index, items.length, onChange]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    }
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, goPrev, goNext]);

  if (!item) return null;

  return (
    <dialog
      open
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] m-0 flex h-full max-h-none w-full max-w-none flex-col bg-(--color-bg-void)/95 p-0 text-(--color-text-primary) backdrop-blur-xl"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-(--glass-border) px-4 py-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="truncate font-(family-name:--font-heading) text-base font-bold tracking-tight sm:text-lg">
            {item.title}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
            {index + 1} / {items.length} · {item.category}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/gallery/${item.slug ?? item.id}`}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-(--glass-border) px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary) transition hover:border-(--color-gekko-500) hover:text-(--color-gekko-300)"
          >
            Open full <ArrowUpRight className="size-3" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="grid size-9 place-items-center rounded-lg border border-(--glass-border) text-(--color-text-secondary) transition hover:border-(--color-gekko-500) hover:text-(--color-text-primary)"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-6 sm:px-12">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-(--glass-border) bg-(--color-bg-deep)/70 text-(--color-text-primary) transition hover:border-(--color-gekko-500) sm:left-4 sm:size-12"
        >
          <ChevronLeft className="size-5" />
        </button>

        <figure className="relative max-h-full w-full max-w-5xl">
          <div className="relative w-full" style={{ aspectRatio: item.aspect }}>
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="100vw"
              className="rounded-2xl object-contain"
              unoptimized
            />
          </div>
          <figcaption className="mt-4 text-center text-sm text-(--color-text-secondary)">
            {item.caption}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-(--glass-border) bg-(--color-bg-deep)/70 text-(--color-text-primary) transition hover:border-(--color-gekko-500) sm:right-4 sm:size-12"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-(--glass-border) px-4 py-3 sm:px-6">
        <Link href={`/members/${item.uploader.username}`} className="group flex items-center gap-3">
          <div className="relative size-9 overflow-hidden rounded-full border border-(--glass-border)">
            <Image
              src={item.uploader.avatar}
              alt=""
              width={72}
              height={72}
              sizes="36px"
              className="size-full object-cover"
              unoptimized
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight group-hover:text-(--color-gekko-300)">
              {item.uploader.displayName}
            </p>
            <p
              className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)"
              suppressHydrationWarning
            >
              @{item.uploader.username} ·{' '}
              {formatDate(item.postedAt, { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          <Heart className="size-3 text-(--color-neon-pink)" />
          <span className="tabular-nums text-(--color-text-secondary)">{item.likes}</span>
          likes
        </div>
      </div>
    </dialog>
  );
}
