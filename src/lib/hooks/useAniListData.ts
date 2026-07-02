import { useEffect, useState } from "react";

const ANILIST_URL = "https://graphql.anilist.co";

export type AniListMedia = {
  id: number;
  title: { romaji: string; english: string | null; native: string | null };
  coverImage: { large: string; color: string | null };
  bannerImage: string | null;
  averageScore: number | null;
  status: string | null;
  episodes: number | null;
  format: string | null;
  season: string | null;
  seasonYear: number | null;
  genres: string[];
  siteUrl: string;
  nextAiringEpisode?: { airingAt: number; episode: number; timeUntilAiring: number } | null;
  description?: string | null;
};

async function query<T>(q: string, variables: Record<string, unknown>): Promise<T> {
  const r = await fetch(ANILIST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query: q, variables }),
  });
  if (!r.ok) throw new Error("AniList error " + r.status);
  const j = (await r.json()) as { data: T };
  return j.data;
}

const TRENDING_Q = `
query ($page: Int, $season: MediaSeason, $seasonYear: Int) {
  Page(page: $page, perPage: 12) {
    media(type: ANIME, sort: TRENDING_DESC, season: $season, seasonYear: $seasonYear) {
      id
      title { romaji english native }
      coverImage { large color }
      bannerImage
      averageScore
      status
      episodes
      format
      season
      seasonYear
      genres
      siteUrl
      description(asHtml: false)
      nextAiringEpisode { airingAt episode timeUntilAiring }
    }
  }
}`;

const SEARCH_Q = `
query ($search: String) {
  Page(page: 1, perPage: 10) {
    media(type: ANIME, search: $search, sort: SEARCH_MATCH) {
      id
      title { romaji english native }
      coverImage { large color }
      averageScore
      status
      episodes
      format
      genres
      siteUrl
      description(asHtml: false)
    }
  }
}`;

function currentSeason(): { season: string; year: number } {
  const m = new Date().getMonth();
  const y = new Date().getFullYear();
  if (m <= 1 || m === 11) return { season: "WINTER", year: m === 11 ? y + 1 : y };
  if (m <= 4) return { season: "SPRING", year: y };
  if (m <= 7) return { season: "SUMMER", year: y };
  return { season: "FALL", year: y };
}

export function useAniListTrending(seasonal = true) {
  const [data, setData] = useState<AniListMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const { season, year } = currentSeason();
    query<{ Page: { media: AniListMedia[] } }>(TRENDING_Q, {
      page: 1,
      season: seasonal ? season : undefined,
      seasonYear: seasonal ? year : undefined,
    })
      .then((d) => alive && setData(d.Page.media))
      .catch((e) => alive && setError(String(e)))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [seasonal]);

  return { data, loading, error };
}

export function useAniListSearch(term: string) {
  const [data, setData] = useState<AniListMedia[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = term.trim();
    if (t.length < 2) {
      setData([]);
      return;
    }
    let alive = true;
    setLoading(true);
    const id = setTimeout(() => {
      query<{ Page: { media: AniListMedia[] } }>(SEARCH_Q, { search: t })
        .then((d) => alive && setData(d.Page.media))
        .catch(() => alive && setData([]))
        .finally(() => alive && setLoading(false));
    }, 350);
    return () => {
      alive = false;
      clearTimeout(id);
    };
  }, [term]);

  return { data, loading };
}

export { currentSeason };
