import { useState } from "react";
import { MANGA_PLATFORMS, MANGA_GENRES } from "@/lib/data/anime-hub";
import { HUB_COLORS, HubCard, SectionHeader } from "./shared";
import { PlatformCard } from "./PlatformCard";

export function MangaTab() {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Legal notice */}
      <HubCard className="border-l-4" hover={false}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚖️</span>
          <div>
            <div className="text-xs font-bold text-white">مانجا رسمية فقط</div>
            <p className="mt-1 text-[11px] leading-relaxed text-white/60">
              كل المنصات أدناه ناشرة رسمية معتمدة من دور النشر اليابانية والكورية. ادعم المبدعين وتجنب المواقع القرصنة.
            </p>
          </div>
        </div>
      </HubCard>

      {/* Search bar */}
      <div>
        <SectionHeader icon="🔎" title="ابحث في المنصات الرسمية" subtitle="ابحث بعنوان المانجا/المانهوا" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="مثال: One Piece, Solo Leveling…"
          className="w-full rounded-xl border px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
          style={{ background: HUB_COLORS.card, borderColor: HUB_COLORS.border }}
        />
      </div>

      {/* Platforms grid */}
      <div>
        <SectionHeader icon="📚" title="منصات القراءة الرسمية" subtitle={`${MANGA_PLATFORMS.length} منصة معتمدة`} />
        <div className="grid gap-2.5 sm:grid-cols-2">
          {MANGA_PLATFORMS.map((p) => (
            <PlatformCard
              key={p.name}
              emoji={p.emoji}
              name={p.name}
              desc={p.desc}
              badge={p.badge}
              color={p.color}
              href={query.trim().length >= 2 ? p.url(query) : p.home}
            />
          ))}
        </div>
      </div>

      {/* Genres */}
      <div>
        <SectionHeader icon="🏷️" title="التصنيفات" subtitle="اختر نوعك المفضل" />
        <div className="flex flex-wrap gap-2">
          {MANGA_GENRES.map((g) => (
            <button
              key={g.tag}
              type="button"
              onClick={() => setQuery(g.tag)}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold text-white/80 transition hover:-translate-y-0.5"
              style={{ background: HUB_COLORS.card, borderColor: HUB_COLORS.border }}
            >
              <span>{g.emoji}</span>
              <span>{g.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
