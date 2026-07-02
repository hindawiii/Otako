import { useState } from "react";
import { HUB_COLORS, LegalBadge } from "./anime/shared";
import { NewsTab } from "./anime/NewsTab";
import { WatchTab } from "./anime/WatchTab";

const TABS = [
  { id: "news", label: "الأخبار", icon: "📰" },
  { id: "watch", label: "المشاهدة", icon: "📺" },
  { id: "manga", label: "مانجا", icon: "📚" },
  { id: "music", label: "موسيقى", icon: "🎵" },
  { id: "gallery", label: "معرض", icon: "🖼️" },
  { id: "lists", label: "قوائمي", icon: "⭐" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AnimeMangaSection() {
  const [active, setActive] = useState<TabId>("news");

  return (
    <div
      dir="rtl"
      className="min-h-screen"
      style={{ background: HUB_COLORS.bg, fontFamily: "'Cairo', system-ui, sans-serif" }}
    >
      {/* Sticky glass header */}
      <div
        className="sticky top-0 z-30 border-b backdrop-blur-xl"
        style={{
          background: "rgba(10,10,15,0.75)",
          borderColor: HUB_COLORS.border,
        }}
      >
        <div className="mx-auto max-w-screen-lg px-4 py-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-black text-white">أنمي & مانجا</h1>
              <p className="text-[11px] text-white/60">دليلك للمحتوى الرسمي</p>
            </div>
            <LegalBadge />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition"
                style={{
                  background: active === t.id ? HUB_COLORS.primary : HUB_COLORS.card,
                  borderColor: active === t.id ? HUB_COLORS.primary : HUB_COLORS.border,
                  color: active === t.id ? "white" : "rgba(255,255,255,0.75)",
                }}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-lg px-4 py-5 pb-28">
        {active === "news" && <NewsTab />}
        {active === "watch" && <WatchTab />}
        {active === "manga" && <ComingSoon label="📚 مانجا — المرحلة 2" />}
        {active === "music" && <ComingSoon label="🎵 موسيقى — المرحلة 2" />}
        {active === "gallery" && <ComingSoon label="🖼️ معرض الصور — المرحلة 3" />}
        {active === "lists" && <ComingSoon label="⭐ قوائم المتابعة — المرحلة 3" />}
      </div>
    </div>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div
      className="rounded-2xl border p-10 text-center"
      style={{ background: HUB_COLORS.card, borderColor: HUB_COLORS.border }}
    >
      <div className="mb-2 text-3xl">🚧</div>
      <div className="text-sm font-bold text-white">{label}</div>
      <div className="mt-1 text-[11px] text-white/50">سيتم بناؤه في المرحلة التالية.</div>
    </div>
  );
}
