import { useState } from "react";
import { useAniListSearch, useAniListTrending } from "@/lib/hooks/useAniListData";
import { WATCH_PLATFORMS, MUSE_ASIA_CHANNEL_URL } from "@/lib/data/anime-hub";
import { AnimeCard } from "./AnimeCard";
import { HUB_COLORS, HubCard, SectionHeader, ExternalButton } from "./shared";

export function WatchTab() {
  const { data: trending, loading } = useAniListTrending(false);
  const [query, setQuery] = useState("");
  const { data: searchResults, loading: searching } = useAniListSearch(query);

  const shown = query.trim().length >= 2 ? searchResults : trending;

  return (
    <div className="space-y-5">
      {/* Muse Asia embedded player */}
      <div>
        <SectionHeader
          icon="▶️"
          title="Muse Asia — محتوى رسمي مجاني"
          subtitle="قناة يوتيوب رسمية"
          action={<ExternalButton href={MUSE_ASIA_CHANNEL_URL} color="#FF0000" small>القناة</ExternalButton>}
        />
        <HubCard className="!p-0 overflow-hidden">
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=UULF0iVeZNXi5Zi3Ycz2XI4Yw"
              title="Muse Asia — أنمي رسمي مجاني"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </HubCard>
      </div>

      {/* Where to watch search */}
      <div>
        <SectionHeader icon="🔎" title="أين أشاهد؟" subtitle="ابحث في المنصات الرسمية" />
        <div className="mb-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="اسم الأنمي بالإنجليزية أو اليابانية…"
            className="w-full rounded-xl border px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
            style={{ background: HUB_COLORS.card, borderColor: HUB_COLORS.border }}
          />
        </div>
        {query.trim().length >= 2 && (
          <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {WATCH_PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.url(query)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 rounded-xl border p-2.5 transition hover:-translate-y-0.5"
                style={{ background: HUB_COLORS.card, borderColor: HUB_COLORS.border }}
              >
                <span className="text-xl">{p.emoji}</span>
                <span className="text-[11px] font-bold text-white">{p.name}</span>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                  style={{ background: p.color + "22", color: p.color }}
                >
                  {p.tag}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Anime cards */}
      <div>
        <SectionHeader
          icon="🔥"
          title={query.trim().length >= 2 ? "نتائج البحث" : "الأكثر رواجاً"}
          subtitle="بيانات AniList"
        />
        {(loading || searching) && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-white/5" />
            ))}
          </div>
        )}
        {!loading && !searching && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {shown.map((m) => (
              <AnimeCard key={m.id} m={m} />
            ))}
            {shown.length === 0 && (
              <div className="col-span-full rounded-xl border p-6 text-center text-xs text-white/50" style={{ borderColor: HUB_COLORS.border }}>
                لا توجد نتائج.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
