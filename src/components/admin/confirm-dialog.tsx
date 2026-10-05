'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="glass relative w-full max-w-md rounded-3xl border border-(--glass-border) p-6 shadow-2xl">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-(--color-text-muted) hover:text-white"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3">
          <div
            className={`grid size-10 place-items-center rounded-xl ${
              isDanger
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}
          >
            <AlertTriangle className="size-5" />
          </div>
          <h3 className="font-(family-name:--font-heading) text-lg font-bold text-white">
            {title}
          </h3>
        </div>

        <p className="mt-4 text-sm text-(--color-text-secondary) leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-(--glass-border) bg-white/5 px-4 py-2 text-xs font-semibold text-(--color-text-secondary) hover:text-white"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2 text-xs font-semibold ${
              isDanger
                ? 'bg-rose-600 text-white hover:bg-rose-500'
                : 'bg-(--color-gekko-500) text-black hover:bg-(--color-gekko-400)'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
