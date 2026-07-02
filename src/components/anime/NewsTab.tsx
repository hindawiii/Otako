import { useMemo, useState } from "react";
import { useAniListTrending, currentSeason } from "@/lib/hooks/useAniListData";
import { STUDIOS } from "@/lib/data/anime-hub";
import { HUB_COLORS, HubCard, SectionHeader } from "./shared";
import { NewsCard } from "./NewsCard";

const CATS = [
  { id: "all", label: "الكل" },
  { id: "announce", label: "إعلانات" },
  { id: "manga", label: "مانجا" },
  { id: "games", label: "ألعاب" },
  { id: "studios", label: "استوديوهات" },
  { id: "va", label: "مؤدون" },
];

const SEASON_LABEL: Record<string, string> = {
  WINTER: "شتاء",
  SPRING: "ربيع",
  SUMMER: "صيف",
  FALL: "خريف",
};

export function NewsTab() {
  const { data, loading, error } = useAniListTrending(true);
  const [cat, setCat] = useState("all");
  const { season, year } = currentSeason();

  const upcoming = useMemo(
    () =>
      data
        .filter((m) => m.nextAiringEpisode)
        .sort((a, b) => (a.nextAiringEpisode!.airingAt - b.nextAiringEpisode!.airingAt))
        .slice(0, 4),
    [data],
  );

  return (
    <div className="space-y-5">
      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className="flex-shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold transition"
            style={{
              background: cat === c.id ? HUB_COLORS.primary : "transparent",
              borderColor: cat === c.id ? HUB_COLORS.primary : HUB_COLORS.border,
              color: cat === c.id ? "white" : "rgba(255,255,255,0.7)",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Upcoming episodes countdown */}
      <div>
        <SectionHeader icon="⏰" title="الحلقات القادمة" subtitle="عد تنازلي مباشر" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {loading && <SkeletonList n={2} />}
          {!loading && upcoming.length === 0 && (
            <div className="col-span-full rounded-xl border p-4 text-center text-xs text-white/50" style={{ borderColor: HUB_COLORS.border }}>
              لا توجد حلقات قادمة قريبة.
            </div>
          )}
          {upcoming.map((m) => (
            <NewsCard key={m.id} m={m} tag={`ح${m.nextAiringEpisode!.episode}`} />
          ))}
        </div>
      </div>

      {/* Seasonal calendar / trending news */}
      <div>
        <SectionHeader
          icon="📅"
          title={`تقويم موسم ${SEASON_LABEL[season]} ${year}`}
          subtitle="أبرز الأنميات هذا الموسم"
        />
        {error && (
          <div className="rounded-xl border p-4 text-xs text-white/60" style={{ borderColor: HUB_COLORS.border }}>
            تعذّر جلب البيانات من AniList.
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {loading && <SkeletonList n={4} />}
          {!loading && data.slice(0, 6).map((m) => <NewsCard key={m.id} m={m} tag="إعلان" />)}
        </div>
      </div>

      {/* Official studio Twitter accounts */}
      <div>
        <SectionHeader icon="🐦" title="حسابات الاستوديوهات الرسمية" subtitle="روابط تويتر / X" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {STUDIOS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border p-2.5 transition hover:-translate-y-0.5"
              style={{ background: HUB_COLORS.card, borderColor: HUB_COLORS.border }}
            >
              <span className="text-lg">{s.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-bold text-white">{s.name}</div>
                <div className="truncate text-[10px]" style={{ color: HUB_COLORS.secondary }}>
                  {s.handle}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkeletonList({ n }: { n: number }) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <HubCard key={i} hover={false} className="!p-0">
          <div className="flex gap-3">
            <div className="h-32 w-24 flex-shrink-0 animate-pulse bg-white/5" />
            <div className="flex-1 space-y-2 py-2.5 pe-3">
              <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
              <div className="h-2 w-full animate-pulse rounded bg-white/5" />
              <div className="h-2 w-4/5 animate-pulse rounded bg-white/5" />
            </div>
          </div>
        </HubCard>
      ))}
    </>
  );
}
