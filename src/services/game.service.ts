import { mockGames } from '@/data/games.mock';
import { mockMatches } from '@/data/matches.mock';
import { mockSquads } from '@/data/squads.mock';
import type { Game, GameGenre, GameStatus } from '@/types/game';
import type { Match } from '@/types/match';
import type { Squad } from '@/types/squad';

export type ListGamesParams = {
  q?: string;
  genre?: GameGenre | 'all';
  status?: GameStatus | 'all';
};

function filterGames(games: Game[], params: ListGamesParams): Game[] {
  const q = params.q?.trim().toLowerCase();
  return games.filter((g) => {
    if (params.genre && params.genre !== 'all' && g.genre !== params.genre) return false;
    if (params.status && params.status !== 'all' && g.status !== params.status) return false;
    if (q) {
      const haystack = `${g.name} ${g.publisher} ${g.tags.join(' ')}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export const gameService = {
  list: async (params: ListGamesParams = {}): Promise<Game[]> => {
    return filterGames(mockGames, params);
  },

  /** Returns every game without filters — handy for static generation. */
  all: async (): Promise<Game[]> => mockGames,

  get: async (slug: string): Promise<Game | null> => {
    return mockGames.find((g) => g.slug === slug) ?? null;
  },

  listSquads: async (gameSlug: string): Promise<Squad[]> => {
    return mockSquads.filter((s) => s.gameSlug === gameSlug);
  },

  listMatches: async (gameSlug: string, limit = 6): Promise<Match[]> => {
    return mockMatches.filter((m) => m.gameSlug === gameSlug).slice(0, limit);
  },
};
