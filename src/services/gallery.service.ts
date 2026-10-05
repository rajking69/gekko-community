import { mockGallery } from '@/data/gallery.mock';
import type { GalleryCategory, GalleryItem } from '@/types/gallery';

export type ListGalleryParams = {
  q?: string;
  category?: GalleryCategory | 'all';
  game?: string;
};

function filterGallery(items: GalleryItem[], params: ListGalleryParams): GalleryItem[] {
  const q = params.q?.trim().toLowerCase();
  return items.filter((g) => {
    if (params.category && params.category !== 'all' && g.category !== params.category)
      return false;
    if (params.game && params.game !== 'all' && g.gameSlug !== params.game) return false;
    if (q) {
      const haystack = `${g.title} ${g.caption} ${g.tags.join(' ')}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export const galleryService = {
  list: async (params: ListGalleryParams = {}): Promise<GalleryItem[]> => {
    return filterGallery(mockGallery, params);
  },

  all: async (): Promise<GalleryItem[]> => mockGallery,

  get: async (id: string): Promise<GalleryItem | null> => {
    return mockGallery.find((g) => g.slug === id || g.id === id) ?? null;
  },
};
