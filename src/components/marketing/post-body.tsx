import type { PostBlock } from '@/types/post';
import { Info, OctagonAlert, ShieldAlert, Sparkles } from 'lucide-react';

const calloutIcon = {
  info: Info,
  success: Sparkles,
  warning: OctagonAlert,
  danger: ShieldAlert,
};

const calloutColor = {
  info: 'var(--color-info)',
  success: 'var(--color-gekko-500)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-danger)',
};

function blockSnippet(block: PostBlock): string {
  if (
    block.kind === 'heading' ||
    block.kind === 'paragraph' ||
    block.kind === 'quote' ||
    block.kind === 'callout'
  ) {
    return block.text.slice(0, 24).replace(/\s+/g, '-');
  }
  if (block.kind === 'list') {
    return block.items[0]?.slice(0, 24).replace(/\s+/g, '-') ?? 'list';
  }
  return block.lang;
}

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-6 text-(--color-text-secondary)">
      {blocks.map((block, i) => (
        <BlockRenderer key={`${block.kind}-${i}-${blockSnippet(block)}`} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: PostBlock }) {
  switch (block.kind) {
    case 'heading': {
      const Tag = block.level === 2 ? 'h2' : 'h3';
      return (
        <Tag
          className={
            block.level === 2
              ? 'mt-6 font-(family-name:--font-heading) text-2xl font-bold tracking-tight text-(--color-text-primary) sm:text-3xl'
              : 'mt-4 font-(family-name:--font-heading) text-xl font-bold tracking-tight text-(--color-text-primary) sm:text-2xl'
          }
        >
          {block.text}
        </Tag>
      );
    }
    case 'paragraph':
      return <p className="text-base leading-relaxed sm:text-lg">{block.text}</p>;
    case 'quote':
      return (
        <blockquote className="glass relative rounded-2xl border-l-4 border-(--color-gekko-500) p-5 sm:p-6">
          <p className="text-base italic text-(--color-text-primary) sm:text-lg">“{block.text}”</p>
          {block.attribution && (
            <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-(--color-text-muted)">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case 'code':
      return (
        <pre className="overflow-x-auto rounded-2xl border border-(--glass-border) bg-(--color-bg-deep)/70 p-5 font-mono text-sm leading-relaxed text-(--color-text-primary)">
          <code>{block.code}</code>
        </pre>
      );
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag
          className={
            block.ordered
              ? 'list-decimal space-y-2 pl-6 marker:font-mono marker:text-(--color-gekko-400)'
              : 'space-y-2'
          }
        >
          {block.items.map((item) => (
            <li
              key={item.slice(0, 32)}
              className={block.ordered ? 'pl-2 leading-relaxed' : 'flex gap-3 leading-relaxed'}
            >
              {!block.ordered && (
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-(--color-gekko-400)"
                />
              )}
              <span>{item}</span>
            </li>
          ))}
        </ListTag>
      );
    }
    case 'callout': {
      const Icon = calloutIcon[block.tone];
      const color = calloutColor[block.tone];
      return (
        <aside
          className="flex gap-4 rounded-2xl border bg-(--color-bg-card)/40 p-5"
          style={{ borderColor: `${color}55` }}
        >
          <Icon className="size-5 shrink-0" style={{ color }} />
          <p className="text-sm leading-relaxed text-(--color-text-primary)">{block.text}</p>
        </aside>
      );
    }
  }
}
