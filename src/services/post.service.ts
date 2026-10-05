import { mockPosts } from '@/data/posts.mock';
import type { Post, PostCategory } from '@/types/post';

export type ListPostsParams = {
  q?: string;
  category?: PostCategory | 'all';
};

function filterPosts(posts: Post[], params: ListPostsParams): Post[] {
  const q = params.q?.trim().toLowerCase();
  return posts.filter((p) => {
    if (params.category && params.category !== 'all' && p.category !== params.category)
      return false;
    if (q) {
      const haystack = `${p.title} ${p.excerpt} ${(p.tags ?? []).join(' ')}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export const postService = {
  list: async (params: ListPostsParams = {}): Promise<Post[]> => {
    return filterPosts(mockPosts, params);
  },

  all: async (): Promise<Post[]> => mockPosts,

  get: async (slug: string): Promise<Post | null> => {
    return mockPosts.find((p) => p.slug === slug) ?? null;
  },
};
