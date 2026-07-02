export type Studio = {
  name: string;
  handle: string;
  url: string;
  emoji: string;
};

export const STUDIOS: Studio[] = [
  { name: "MAPPA", handle: "@MAPPA_Info", url: "https://twitter.com/MAPPA_Info", emoji: "🎬" },
  { name: "ufotable", handle: "@ufotable", url: "https://twitter.com/ufotable", emoji: "🔥" },
  { name: "WIT STUDIO", handle: "@wit_studio_", url: "https://twitter.com/wit_studio_", emoji: "⚔️" },
  { name: "Kyoto Animation", handle: "@kyoani_official", url: "https://twitter.com/kyoani_official", emoji: "🌸" },
  { name: "Bones", handle: "@bones_official", url: "https://twitter.com/bones_official", emoji: "💥" },
  { name: "Studio Trigger", handle: "@trigger_inc", url: "https://twitter.com/trigger_inc", emoji: "⚡" },
];

export type WatchPlatform = {
  name: string;
  emoji: string;
  url: (query: string) => string;
  color: string;
  tag: string;
};

export const WATCH_PLATFORMS: WatchPlatform[] = [
  {
    name: "Crunchyroll",
    emoji: "🟠",
    url: (q) => `https://www.crunchyroll.com/search?q=${encodeURIComponent(q)}`,
    color: "#F47521",
    tag: "اشتراك",
  },
  {
    name: "Netflix",
    emoji: "🔴",
    url: (q) => `https://www.netflix.com/search?q=${encodeURIComponent(q)}`,
    color: "#E50914",
    tag: "اشتراك",
  },
  {
    name: "Tubi",
    emoji: "🟣",
    url: (q) => `https://tubitv.com/search/${encodeURIComponent(q)}`,
    color: "#8A00FF",
    tag: "مجاني",
  },
  {
    name: "YouTube",
    emoji: "▶️",
    url: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q + " anime")}`,
    color: "#FF0000",
    tag: "مجاني",
  },
];

export const MUSE_ASIA_CHANNEL_ID = "UUQ0iVeZNXi5Zi3Ycz2XI4Yw";
export const MUSE_ASIA_EMBED_URL = `https://www.youtube.com/embed/videoseries?list=UULF0iVeZNXi5Zi3Ycz2XI4Yw`;
export const MUSE_ASIA_CHANNEL_URL = "https://www.youtube.com/@MuseAsia";
