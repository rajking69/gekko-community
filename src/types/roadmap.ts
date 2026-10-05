export type RoadmapStatus = 'shipped' | 'in_progress' | 'queued' | 'exploring';

export type RoadmapItem = {
  id: string;
  /** Quarter label — "Q2 · 2026". */
  quarter: string;
  title: string;
  /** Short pitch — one or two sentences. */
  description: string;
  status: RoadmapStatus;
  /** Optional fake vote count (community vote placeholder). */
  votes?: number;
  /** Optional sub-bullets. */
  details?: string[];
  /** Decorative accent. */
  accent: 'gekko' | 'violet' | 'cyan' | 'pink' | 'amber';
};

export const ROADMAP_STATUS_LABEL: Record<RoadmapStatus, string> = {
  shipped: 'Shipped',
  in_progress: 'In progress',
  queued: 'Queued',
  exploring: 'Exploring',
};

export const ROADMAP_STATUS_COLOR: Record<RoadmapStatus, string> = {
  shipped: 'var(--color-gekko-500)',
  in_progress: 'var(--color-neon-cyan)',
  queued: 'var(--color-text-secondary)',
  exploring: 'var(--color-neon-violet)',
};
