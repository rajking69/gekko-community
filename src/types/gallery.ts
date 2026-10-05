export type GalleryCategory = 'clip' | 'highlight' | 'meetup' | 'meme' | 'screenshot';

export type GalleryItem = {
  id: string;
  /** Optional slug for the per-item route; falls back to id. */
  slug?: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  /** Image URL. */
  src: string;
  /** Source aspect (width / height) — drives the masonry column span. */
  aspect: number;
  /** Member who uploaded — links to `/members/[username]`. */
  uploader: {
    username: string;
    displayName: string;
    avatar: string;
  };
  /** ISO date posted. */
  postedAt: string;
  likes: number;
  /** Optional foreign keys. */
  gameSlug?: string;
  eventSlug?: string;
  accent: 'gekko' | 'violet' | 'cyan' | 'pink' | 'amber';
  tags: string[];
};

export const GALLERY_CATEGORY_LABEL: Record<GalleryCategory, string> = {
  clip: 'Clip',
  highlight: 'Highlight',
  meetup: 'Meetup',
  meme: 'Meme',
  screenshot: 'Screenshot',
};
