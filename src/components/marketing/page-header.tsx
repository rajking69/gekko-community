import { cn } from '@/lib/utils';

type PageHeaderProps = {
  /** Small label above the heading — kept short, all-caps mono. */
  eyebrow: string;
  /** Page heading. Renders as h1 by default (override via `as` if needed). */
  title: string;
  /** Optional supporting paragraph. */
  description?: string;
  /** Right-aligned CTA / action slot. */
  action?: React.ReactNode;
  /** Visual variant — center-aligned for marketing landings, left-aligned for tabular pages. */
  align?: 'left' | 'center';
  /** Allow embedding inside an existing <h2> tree. */
  as?: 'h1' | 'h2';
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  as = 'h1',
  className,
}: PageHeaderProps) {
  const Heading = as;
  const isCenter = align === 'center';
  return (
    <header
      className={cn(
        'flex flex-col gap-6',
        isCenter
          ? 'items-center text-center'
          : 'items-start md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', isCenter && 'mx-auto')}>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-gekko-400)">
          {eyebrow}
        </p>
        <Heading className="mt-4 font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </Heading>
        {description && <p className="mt-4 text-(--color-text-secondary)">{description}</p>}
      </div>
      {action && <div className={cn(!isCenter && 'shrink-0')}>{action}</div>}
    </header>
  );
}
