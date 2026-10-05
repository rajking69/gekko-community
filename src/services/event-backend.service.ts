export interface CommunityEvent {
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  type?: string;
  status?: string;
  startAt?: string;
  endAt?: string;
  location?: string;
  isOnline?: boolean;
  capacity?: number;
  registered?: number;
}

export interface ListEventsParams {
  q?: string;
  type?: string;
  status?: string;
  limit?: number;
}

export async function listEventsBackend(params: ListEventsParams = {}) {
  const { q, type, status, limit = 20 } = params;
  const queryParams = new URLSearchParams();
  if (q) queryParams.append('q', q);
  if (type) queryParams.append('type', type);
  if (status) queryParams.append('status', status);
  if (limit) queryParams.append('limit', limit.toString());

  const response = await fetch(`/api/v1/events?${queryParams.toString()}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  return response.json();
}
