export type ChangelogEntryType = 'major' | 'minor' | 'patch';

export type ChangelogChange = {
  /** Bullet category — "Added", "Changed", "Fixed", "Removed". */
  kind: 'added' | 'changed' | 'fixed' | 'removed';
  text: string;
};

export type ChangelogEntry = {
  /** Semver string — "0.7.0". */
  version: string;
  /** Phase label — "Phase 1.11 · Blog & Gallery". */
  phase: string;
  /** ISO date of the release. */
  date: string;
  /** Bump type. */
  type: ChangelogEntryType;
  /** Short headline summarizing the release. */
  headline: string;
  /** Long-form summary paragraph. */
  summary: string;
  changes: ChangelogChange[];
};

export const CHANGE_KIND_LABEL: Record<ChangelogChange['kind'], string> = {
  added: 'Added',
  changed: 'Changed',
  fixed: 'Fixed',
  removed: 'Removed',
};

export const CHANGE_KIND_COLOR: Record<ChangelogChange['kind'], string> = {
  added: 'var(--color-gekko-500)',
  changed: 'var(--color-neon-cyan)',
  fixed: 'var(--color-neon-violet)',
  removed: 'var(--color-warning)',
};

export const TYPE_LABEL: Record<ChangelogEntryType, string> = {
  major: 'Major',
  minor: 'Minor',
  patch: 'Patch',
};
