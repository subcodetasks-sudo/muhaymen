export type FavoriteType = "service" | "article";

export type FavoritesState = {
  services: string[];
  articles: string[];
};

export const FAVORITES_STORAGE_KEY = "muhaymin:favorites";

const EMPTY_FAVORITES: FavoritesState = {
  services: [],
  articles: [],
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function normalizeFavorites(value: unknown): FavoritesState {
  if (!value || typeof value !== "object") {
    return { ...EMPTY_FAVORITES };
  }

  const record = value as Record<string, unknown>;

  return {
    services: isStringArray(record.services) ? [...record.services] : [],
    articles: isStringArray(record.articles) ? [...record.articles] : [],
  };
}

export function getEmptyFavorites(): FavoritesState {
  return { ...EMPTY_FAVORITES };
}

export function readFavorites(): FavoritesState {
  if (typeof window === "undefined") {
    return getEmptyFavorites();
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      return getEmptyFavorites();
    }

    return normalizeFavorites(JSON.parse(raw));
  } catch {
    return getEmptyFavorites();
  }
}

export function writeFavorites(state: FavoritesState): FavoritesState {
  const next = normalizeFavorites(state);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
  }

  return next;
}

export function isFavorite(
  state: FavoritesState,
  type: FavoriteType,
  id: string,
  aliases: string[] = [],
): boolean {
  const list = type === "service" ? state.services : state.articles;
  if (list.includes(id)) return true;
  return aliases.some((alias) => Boolean(alias) && list.includes(alias));
}

export function toggleFavoriteInState(
  state: FavoritesState,
  type: FavoriteType,
  id: string,
  aliases: string[] = [],
): { next: FavoritesState; added: boolean } {
  const key = type === "service" ? "services" : "articles";
  const current = state[key];
  const matchKeys = new Set(
    [id, ...aliases].filter((value) => Boolean(value)),
  );
  const exists = current.some((item) => matchKeys.has(item));

  const withoutMatches = current.filter((item) => !matchKeys.has(item));
  const nextList = exists ? withoutMatches : [...withoutMatches, id];

  return {
    next: {
      ...state,
      [key]: nextList,
    },
    added: !exists,
  };
}

/**
 * Rewrite legacy locale slugs to stable ids when we can resolve them.
 * `slugToStableId` maps any known AR/EN slug → stable favorite id.
 */
export function migrateFavoritesToStableIds(
  state: FavoritesState,
  maps: {
    services: Map<string, string>;
    articles: Map<string, string>;
  },
): FavoritesState {
  const migrateList = (
    list: string[],
    slugMap: Map<string, string>,
  ): string[] => {
    const next = new Set<string>();

    for (const value of list) {
      const stable = slugMap.get(value) ?? value;
      next.add(stable);
    }

    return [...next];
  };

  return {
    services: migrateList(state.services, maps.services),
    articles: migrateList(state.articles, maps.articles),
  };
}
