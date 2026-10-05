export type PostCategory =
  | 'announcement'
  | 'guide'
  | 'community'
  | 'tutorial'
  | 'updates'
  | 'changelog';

export type PostBlock =
  | { kind: 'heading'; level: 2 | 3; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'quote'; text: string; attribution?: string }
  | { kind: 'code'; lang: string; code: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'callout'; tone: 'info' | 'success' | 'warning' | 'danger'; text: string };

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** CSS gradient string used as a cover when no image is set. */
  coverGradient: string;
  /** Optional glyph rendered large on the gradient cover. */
  glyph?: string;
  category: PostCategory;
  /** ISO timestamp. */
  publishedAt: string;
  /** Estimated read time in minutes. */
  readMinutes: number;
  author: {
    id: string;
    name: string;
    avatar: string;
    /** Optional username so we can link to `/members/[username]`. */
    username?: string;
  };
  featured?: boolean;
  accent: 'gekko' | 'violet' | 'cyan' | 'pink' | 'amber';
  /** Optional tag pills shown on the index + detail. */
  tags?: string[];
  /** Detail-page body — block array. Optional; falls back to excerpt. */
  body?: PostBlock[];
};

export const POST_CATEGORY_LABEL: Record<PostCategory, string> = {
  announcement: 'Announcement',
  guide: 'Guide',
  community: 'Community',
  tutorial: 'Tutorial',
  updates: 'Updates',
  changelog: 'Changelog',
};
