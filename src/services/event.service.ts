import { mockBrackets } from '@/data/event-brackets.mock';
import { mockEvents } from '@/data/events.mock';
import type { Bracket } from '@/types/bracket';
import type { CommunityEvent, EventStatus, EventType } from '@/types/event';
import type { DirectoryMember } from '@/types/member';

export type ListEventsParams = {
  q?: string;
  type?: EventType | 'all';
  status?: EventStatus | 'all';
};

function filterEvents(events: CommunityEvent[], params: ListEventsParams): CommunityEvent[] {
  const q = params.q?.trim().toLowerCase();
  return events.filter((e) => {
    if (params.type && params.type !== 'all' && e.type !== params.type) return false;
    if (params.status && params.status !== 'all' && e.status !== params.status) return false;
    if (q) {
      const haystack = `${e.title} ${e.description} ${e.location}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export const eventService = {
  list: async (params: ListEventsParams = {}): Promise<CommunityEvent[]> => {
    return filterEvents(mockEvents, params);
  },

  all: async (): Promise<CommunityEvent[]> => mockEvents,

  get: async (slug: string): Promise<CommunityEvent | null> => {
    return mockEvents.find((e) => e.slug === slug) ?? null;
  },

  listParticipants: async (slug: string): Promise<DirectoryMember[]> => {
    void slug;
    return [];
  },

  getBracket: async (slug: string): Promise<Bracket | null> => {
    return mockBrackets.find((b) => b.eventSlug === slug) ?? null;
  },
};
