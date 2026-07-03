import { useState } from "react";
import { MUSIC_PLATFORMS, MUSIC_PLAYLISTS } from "@/lib/data/anime-hub";
import { HUB_COLORS, HubCard, SectionHeader } from "./shared";
import { PlatformCard } from "./PlatformCard";

export function MusicTab() {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Legal notice */}
      <HubCard className="border-l-4" hover={false}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎧</span>
          <div>
            <div className="text-xs font-bold text-white">استمع بشكل قانوني</div>
            <p className="mt-1 text-[11px] leading-relaxed text-white/60">
              كل الروابط تؤدي إلى منصات موسيقى مرخّصة رسمياً. عمليات التحميل غير المصرح بها من قنوات مجهولة تخالف حقوق الفنانين والاستوديوهات.
            </p>
          </div>
        </div>
      </HubCard>

      {/* Search */}
      <div>
        <SectionHeader icon="🔎" title="ابحث عن OST" subtitle="ابحث في المنصات الرسمية" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="مثال: Attack on Titan, Naruto, Frieren…"
          className="w-full rounded-xl border px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
          style={{ background: HUB_COLORS.card, borderColor: HUB_COLORS.border }}
        />
      </div>

      {/* Platforms */}
      <div>
        <SectionHeader icon="🎵" title="منصات الاستماع الرسمية" subtitle={`${MUSIC_PLATFORMS.length} منصات`} />
        <div className="grid gap-2.5 sm:grid-cols-2">
          {MUSIC_PLATFORMS.map((p) => (
            <PlatformCard
              key={p.name}
              emoji={p.emoji}
              name={p.name}
              desc={p.desc}
              badge={p.badge}
              color={p.color}
              href={query.trim().length >= 2 ? p.search(query) : p.home}
            />
          ))}
        </div>
      </div>

      {/* Playlists */}
      <div>
        <SectionHeader icon="🎶" title="قوائم تشغيل مختارة" subtitle="من Spotify" />
        <div className="grid gap-3 sm:grid-cols-2">
          {MUSIC_PLAYLISTS.map((pl) => (
            <HubCard key={pl.title} className="!p-0 overflow-hidden">
              <div className="p-3">
                <div className="text-sm font-bold text-white">{pl.title}</div>
                <div className="text-[11px] text-white/50">{pl.desc}</div>
              </div>
              <iframe
                src={pl.embed}
                title={pl.title}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="w-full"
                style={{ height: 152, border: 0, background: "transparent" }}
              />
              <a
                href={pl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-t px-3 py-2 text-center text-[11px] font-bold text-white/70 hover:text-white"
                style={{ borderColor: HUB_COLORS.border }}
              >
                افتح في Spotify ↗
              </a>
            </HubCard>
          ))}
        </div>
      </div>
    </div>
  );
}
