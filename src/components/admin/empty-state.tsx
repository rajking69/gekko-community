'use client';

import React from 'react';

interface EmptyStateProps {
  icon?: string | React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = '📂',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-3xl border border-(--glass-border) px-6 py-16 text-center">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 font-(family-name:--font-heading) text-xl font-bold tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-(--color-text-secondary)">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--color-gekko-500) px-4 py-2.5 font-semibold text-xs text-black transition hover:bg-(--color-gekko-400)"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
