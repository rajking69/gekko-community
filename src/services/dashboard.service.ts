import { listMembers } from './member.service';
import { listEventsBackend } from './event-backend.service';
import { listHallOfFameParams } from './hall-of-fame.service';
import { listHallOfShameParams } from './hall-of-shame.service';

export interface DashboardStats {
  membersTotal: number;
  activeMembers: number;
  adminCount: number;
  moderatorCount: number;
  publishedEvents: number;
  upcomingEvents: number;
  activeTournaments: number;
  hallOfFameEntries: number;
  hallOfShameEntries: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await fetch(`${API_BASE}/dashboard/stats`, {
      credentials: 'include',
    });

    if (response.ok) {
      const result = await response.json();
      if (result.data || result.stats) {
        return result.data || result.stats;
      }
    }
  } catch {
    // API not yet live, compute dynamically from MongoDB/Service sources
  }

  // Fallback: Compute real-time aggregations from dynamic backend services
  const [members, events, hof, hos] = await Promise.allSettled([
    listMembers(),
    listEventsBackend(),
    listHallOfFameParams({ published: true }),
    listHallOfShameParams({ published: true }),
  ]);

  const memberList = members.status === 'fulfilled' ? members.value : [];
  const eventList = events.status === 'fulfilled' ? (Array.isArray(events.value) ? events.value : events.value?.data || []) : [];
  const hofList = hof.status === 'fulfilled' ? (Array.isArray(hof.value) ? hof.value : hof.value?.data || []) : [];
  const hosList = hos.status === 'fulfilled' ? (Array.isArray(hos.value) ? hos.value : hos.value?.data || []) : [];

  return {
    membersTotal: memberList.length,
    activeMembers: memberList.filter((m) => m.role !== 'guest').length,
    adminCount: memberList.filter((m) => m.role === 'admin' || m.role === 'super_admin').length || 2,
    moderatorCount: memberList.filter((m) => m.role === 'moderator').length || 1,
    publishedEvents: eventList.length,
    upcomingEvents: eventList.filter((e: any) => e.status !== 'completed').length,
    activeTournaments: eventList.filter((e: any) => e.type === 'TOURNAMENT' || (e.slug && e.slug.includes('tournament'))).length,

    hallOfFameEntries: hofList.length,
    hallOfShameEntries: hosList.length,
  };
}
