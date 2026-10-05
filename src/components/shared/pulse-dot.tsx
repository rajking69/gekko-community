import { cn } from '@/lib/utils';

/**
 * Decorative pulsing "live" dot. Pass `color` (any CSS color) for a dynamic
 * status hue; defaults to the danger colour. Size via `className` (default
 * size-1.5). Always decorative — pair with a visible/sr-only label for meaning.
 */
export function PulseDot({ color, className }: { color?: string; className?: string }) {
  const style = color ? { backgroundColor: color } : undefined;
  return (
    <span className={cn('relative flex', className ?? 'size-1.5')} aria-hidden>
      <span
        className={cn(
          'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
          !color && 'bg-(--color-danger)',
        )}
        style={style}
      />
      <span
        className={cn(
          'relative inline-flex h-full w-full rounded-full',
          !color && 'bg-(--color-danger)',
        )}
        style={style}
      />
    </span>
  );
}
