export interface HallOfFameEntry {
  slug: string;
  title: string;
  category: string;
  year: number;
  description: string;
  story: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
}

export interface ListHallOfFameParams {
  published?: boolean;
  featured?: boolean;
  limit?: number;
}

export async function listHallOfFameParams(params: ListHallOfFameParams = {}) {
  const { published = true, featured, limit = 20 } = params;
  const response = await fetch(`/api/v1/hall-of-fame?published=${published}&featured=${featured}&limit=${limit}`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Hall of Fame entries');
  }

  return response.json();
}
