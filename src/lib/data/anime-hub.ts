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

// ============ MANGA PLATFORMS ============
export type MangaPlatform = {
  name: string;
  emoji: string;
  desc: string;
  badge: "مجاني" | "اشتراك" | "شراء" | "مجاني/شراء";
  color: string;
  url: (query: string) => string;
  home: string;
};

export const MANGA_PLATFORMS: MangaPlatform[] = [
  {
    name: "MANGA Plus",
    emoji: "📕",
    desc: "شويشا الرسمي — أحدث الفصول مجاناً",
    badge: "مجاني",
    color: "#E60012",
    home: "https://mangaplus.shueisha.co.jp/",
    url: (q) => `https://mangaplus.shueisha.co.jp/search?keyword=${encodeURIComponent(q)}`,
  },
  {
    name: "VIZ Media",
    emoji: "📘",
    desc: "شونين جامب الأمريكي — Shonen Jump",
    badge: "اشتراك",
    color: "#0066B2",
    home: "https://www.viz.com/",
    url: (q) => `https://www.viz.com/search/${encodeURIComponent(q)}`,
  },
  {
    name: "WEBTOON",
    emoji: "📱",
    desc: "مانهوا كورية عمودية بالألوان",
    badge: "مجاني",
    color: "#00D564",
    home: "https://www.webtoons.com/",
    url: (q) => `https://www.webtoons.com/en/search?keyword=${encodeURIComponent(q)}`,
  },
  {
    name: "ComiXology",
    emoji: "📗",
    desc: "أمازون — كوميكس ومانجا رقمية",
    badge: "شراء",
    color: "#FF9900",
    home: "https://www.comixology.com/",
    url: (q) => `https://www.comixology.com/search?search=${encodeURIComponent(q)}`,
  },
  {
    name: "BookWalker",
    emoji: "📚",
    desc: "كوداشنا وكادوكاوا — لايت نوفل ومانجا",
    badge: "شراء",
    color: "#00A0E9",
    home: "https://global.bookwalker.jp/",
    url: (q) => `https://global.bookwalker.jp/search/?word=${encodeURIComponent(q)}`,
  },
  {
    name: "Azuki",
    emoji: "🔴",
    desc: "منصة مانجا رسمية مستقلة",
    badge: "مجاني/شراء",
    color: "#DD2E44",
    home: "https://www.azuki.co/",
    url: (q) => `https://www.azuki.co/search?q=${encodeURIComponent(q)}`,
  },
];

export const MANGA_GENRES: { label: string; emoji: string; tag: string }[] = [
  { label: "شونين", emoji: "⚔️", tag: "Shounen" },
  { label: "شوجو", emoji: "🌸", tag: "Shoujo" },
  { label: "سينن", emoji: "🎯", tag: "Seinen" },
  { label: "جوسي", emoji: "💫", tag: "Josei" },
  { label: "إيسيكاي", emoji: "🌀", tag: "Isekai" },
  { label: "رومانسي", emoji: "❤️", tag: "Romance" },
  { label: "رياضي", emoji: "⚽", tag: "Sports" },
  { label: "غموض", emoji: "🕵️", tag: "Mystery" },
];

// ============ MUSIC PLATFORMS ============
export type MusicPlatform = {
  name: string;
  emoji: string;
  desc: string;
  badge: "مجاني" | "اشتراك" | "مجاني/اشتراك";
  color: string;
  home: string;
  search: (q: string) => string;
};

export const MUSIC_PLATFORMS: MusicPlatform[] = [
  {
    name: "Spotify",
    emoji: "🟢",
    desc: "قوائم OST رسمية بالآلاف",
    badge: "مجاني/اشتراك",
    color: "#1DB954",
    home: "https://open.spotify.com/genre/anime",
    search: (q) => `https://open.spotify.com/search/${encodeURIComponent(q + " anime OST")}`,
  },
  {
    name: "Apple Music",
    emoji: "🎵",
    desc: "قسم Anime رسمي",
    badge: "اشتراك",
    color: "#FA243C",
    home: "https://music.apple.com/us/curator/anime/1558584571",
    search: (q) => `https://music.apple.com/us/search?term=${encodeURIComponent(q + " anime")}`,
  },
  {
    name: "Aniplex",
    emoji: "🎼",
    desc: "الناشر الرسمي — Sony Music Japan",
    badge: "اشتراك",
    color: "#00A0E9",
    home: "https://www.aniplex.co.jp/music/",
    search: (q) => `https://www.aniplex.co.jp/search/?q=${encodeURIComponent(q)}`,
  },
  {
    name: "Lantis",
    emoji: "🎤",
    desc: "شركة موسيقى أنمي يابانية",
    badge: "اشتراك",
    color: "#F39800",
    home: "https://www.lantis.jp/",
    search: (q) => `https://www.lantis.jp/search/?keyword=${encodeURIComponent(q)}`,
  },
  {
    name: "YouTube Music",
    emoji: "▶️",
    desc: "قنوات OST رسمية",
    badge: "مجاني/اشتراك",
    color: "#FF0000",
    home: "https://music.youtube.com/",
    search: (q) => `https://music.youtube.com/search?q=${encodeURIComponent(q + " anime OST")}`,
  },
];

export const MUSIC_PLAYLISTS: { title: string; desc: string; embed: string; url: string }[] = [
  {
    title: "Anime OST Essentials",
    desc: "أشهر موسيقى الأنمي التصويرية",
    embed: "https://open.spotify.com/embed/playlist/37i9dQZF1DWSluGMsH1R9r?utm_source=generator&theme=0",
    url: "https://open.spotify.com/playlist/37i9dQZF1DWSluGMsH1R9r",
  },
  {
    title: "Anime Openings",
    desc: "أفضل تترات البداية",
    embed: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7WLnBLuBnJi?utm_source=generator&theme=0",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX7WLnBLuBnJi",
  },
];
