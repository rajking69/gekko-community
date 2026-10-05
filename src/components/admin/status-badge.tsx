'use client';

export type StatusType =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'UNPUBLISHED'
  | 'ONGOING'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'INACTIVE'
  | 'FEATURED';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalized = (status || '').toUpperCase();

  const getStyle = () => {
    switch (normalized) {
      case 'PUBLISHED':
      case 'ACTIVE':
      case 'COMPLETED':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
      case 'DRAFT':
      case 'INACTIVE':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
      case 'UNPUBLISHED':
      case 'SUSPENDED':
      case 'CANCELLED':
        return 'border-rose-500/30 bg-rose-500/10 text-rose-400';
      case 'ONGOING':
      case 'FEATURED':
        return 'border-(--color-gekko-500)/30 bg-(--color-gekko-500)/10 text-(--color-gekko-300)';
      default:
        return 'border-white/10 bg-white/5 text-(--color-text-secondary)';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${getStyle()} ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {normalized}
    </span>
  );
}
