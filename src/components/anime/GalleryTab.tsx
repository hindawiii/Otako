import { useMemo, useState } from "react";
import { useAniListTrending } from "@/lib/hooks/useAniListData";
import { guestStorage } from "@/lib/guest-storage";
import { HUB_COLORS, HubCard, SectionHeader } from "./shared";

type Category = "all" | "covers" | "banners" | "characters";

const CATS: { id: Category; label: string; emoji: string }[] = [
  { id: "all", label: "الكل", emoji: "🎴" },
  { id: "covers", label: "الأغلفة", emoji: "🖼️" },
  { id: "banners", label: "البانرات", emoji: "🏞️" },
  { id: "characters", label: "الشخصيات", emoji: "🎭" },
];

const SAVED_KEY = "gallery_saved_v1";

export function GalleryTab() {
  const { data: seasonal, loading } = useAniListTrending(true);
  const { data: allTime } = useAniListTrending(false);
  const [cat, setCat] = useState<Category>("all");
  const [saved, setSaved] = useState<number[]>(
    () => guestStorage.get<number[]>(SAVED_KEY, []) ?? [],
  );
  const [preview, setPreview] = useState<string | null>(null);

  const toggleSave = (id: number) => {
    const next = saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id];
    setSaved(next);
    guestStorage.set(SAVED_KEY, next);
  };

  const merged = useMemo(() => {
    const map = new Map<number, (typeof seasonal)[number]>();
    [...seasonal, ...allTime].forEach((m) => map.set(m.id, m));
    return Array.from(map.values());
  }, [seasonal, allTime]);

  const images = useMemo(() => {
    const list: { id: number; url: string; title: string; kind: string; siteUrl: string }[] = [];
    merged.forEach((m) => {
      const title = m.title.english || m.title.romaji || "—";
      if (cat === "all" || cat === "covers") {
        list.push({ id: m.id * 10 + 1, url: m.coverImage.large, title, kind: "غلاف", siteUrl: m.siteUrl });
      }
      if ((cat === "all" || cat === "banners") && m.bannerImage) {
        list.push({ id: m.id * 10 + 2, url: m.bannerImage, title, kind: "بانر", siteUrl: m.siteUrl });
      }
      if (cat === "all" || cat === "characters") {
        list.push({ id: m.id * 10 + 3, url: m.coverImage.large, title, kind: "شخصية", siteUrl: m.siteUrl });
      }
    });
    return list;
  }, [merged, cat]);

  return (
    <div className="space-y-5">
      <SectionHeader
        icon="🖼️"
        title="معرض الصور"
        subtitle={`${images.length} صورة · مصدر AniList الرسمي`}
      />

      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition"
            style={{
              background: cat === c.id ? HUB_COLORS.primary : HUB_COLORS.card,
              borderColor: cat === c.id ? HUB_COLORS.primary : HUB_COLORS.border,
              color: cat === c.id ? "white" : "rgba(255,255,255,0.75)",
            }}
          >
            <span>{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-lg bg-white/5" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
          {images.map((img) => {
            const isSaved = saved.includes(img.id);
            return (
              <div
                key={img.id}
                className="group relative aspect-square overflow-hidden rounded-lg border"
                style={{ borderColor: HUB_COLORS.border }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  onClick={() => setPreview(img.url)}
                  className="h-full w-full cursor-zoom-in object-cover transition-transform duration-300 hover:scale-110"
                />
                <button
                  onClick={() => toggleSave(img.id)}
                  className="absolute end-1.5 top-1.5 flex size-7 items-center justify-center rounded-full text-xs backdrop-blur"
                  style={{
                    background: isSaved ? HUB_COLORS.primary : "rgba(0,0,0,0.6)",
                    color: "white",
                  }}
                  aria-label={isSaved ? "إزالة" : "حفظ"}
                >
                  {isSaved ? "❤️" : "🤍"}
                </button>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="line-clamp-1 text-[10px] font-bold text-white">{img.title}</div>
                  <div className="text-[9px] text-white/60">{img.kind}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {saved.length > 0 && (
        <HubCard>
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-white">💾 محفوظاتك: {saved.length}</div>
            <button
              onClick={() => {
                setSaved([]);
                guestStorage.set(SAVED_KEY, []);
              }}
              className="text-[11px] font-bold text-white/60 hover:text-white"
            >
              مسح الكل
            </button>
          </div>
        </HubCard>
      )}

      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
        >
          <img src={preview} alt="" className="max-h-full max-w-full rounded-xl" />
        </div>
      )}
    </div>
  );
}
