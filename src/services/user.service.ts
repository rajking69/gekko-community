import { mockUsers } from '@/data/users.mock';
import type { Pagination } from '@/types/api';
import type { PublicUser } from '@/types/user';

export type ListUsersParams = {
  q?: string;
  page?: number;
  limit?: number;
};

export type ListUsersResult = {
  items: PublicUser[];
  pagination: Pagination;
};

export const userService = {
  list: async (params: ListUsersParams = {}): Promise<ListUsersResult> => {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const filtered = params.q
      ? mockUsers.filter((u) =>
          [u.username, u.displayName ?? '']
            .join(' ')
            .toLowerCase()
            .includes((params.q ?? '').toLowerCase()),
        )
      : mockUsers;
    const start = (page - 1) * limit;
    return {
      items: filtered.slice(start, start + limit),
      pagination: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
      },
    };
  },

  get: async (username: string): Promise<PublicUser | null> => {
    return mockUsers.find((u) => u.username === username) ?? null;
  },
};
