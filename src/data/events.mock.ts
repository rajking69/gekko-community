import type { CommunityEvent } from '@/types/event';

export const mockEvents: CommunityEvent[] = [
  {
    id: 'e_fifa26_coop',
    slug: 'gekko-fifa-26-coop-tournament',
    title: 'Gekko FIFA 26 Co-Op Tournament',
    description:
      "The ultimate competitive EA SPORTS FC 26 experience. 2v2 Co-Op format — Bangladesh's premier esports event.",
    type: 'tournament',
    status: 'live',
    // Group stage is being played today.
    startAt: '2026-07-01T14:00:00Z',
    timezone: 'Asia/Dhaka',
    location: 'Bangladesh',
    isOnline: false,
    capacity: null,
    registered: 5,
    coverGradient:
      'radial-gradient(at 20% 30%, #ef4444 0%, transparent 60%), radial-gradient(at 80% 70%, #b91c1c 0%, transparent 60%), #050505',
    coverImage:
      'https://drop-assets.ea.com/images/3eEHjjY2wGQ5tSWAaF37cL/b03bdcaa03bdba60d2b1b52d91bedbbe/fc26-twg-featured-image-16x9.jpg?im=Resize=(2560)&q=85',
    glyph: 'F',
    accent: 'pink',
    gameSlug: 'fifa',
    format: '2v2 Co-Op',
    resultsUrl: '/tournament',
    // TODO: real details to be filled in one by one — host, schedule, prizes, requirements.
  },
];
