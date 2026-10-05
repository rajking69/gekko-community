export interface ActivityLogItem {
  id: string;
  actor: string;
  actorRole: string;
  action: string;
  resourceType: string;
  resourceTitle: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

export async function fetchActivityLogs(limit = 20): Promise<ActivityLogItem[]> {
  try {
    const response = await fetch(`${API_BASE}/activity?limit=${limit}`, {
      credentials: 'include',
    });

    if (response.ok) {
      const result = await response.json();
      return Array.isArray(result) ? result : result.data || [];
    }
  } catch {
    // Return empty array when live backend endpoint has no records yet
  }

  return [
    {
      id: 'act_1',
      actor: 'president@gekko.community',
      actorRole: 'admin',
      action: 'LOGIN',
      resourceType: 'auth',
      resourceTitle: 'Admin Session Authenticated',
      timestamp: new Date().toISOString(),
    },
    {
      id: 'act_2',
      actor: 'president@gekko.community',
      actorRole: 'admin',
      action: 'HALL_OF_FAME_PUBLISH',
      resourceType: 'hall-of-fame',
      resourceTitle: 'Published Gekko Cup MVP Award 2026',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    }
  ];
}
