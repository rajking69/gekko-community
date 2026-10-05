export interface HallOfShameEntry {
  slug: string;
  title: string;
  category: string;
  description: string;
  story: string;
  imageUrl: string;
  year?: number;
  featured: boolean;
  published: boolean;
}

export interface ListHallOfShameParams {
  published?: boolean;
  featured?: boolean;
  limit?: number;
}

export async function listHallOfShameParams(params: ListHallOfShameParams = {}) {
  const { published = true, featured, limit = 20 } = params;
  const response = await fetch(`/api/v1/hall-of-shame?published=${published}&featured=${featured}&limit=${limit}`, {
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Hall of Shame entries');
  }

  return response.json();
}
