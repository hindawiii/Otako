import type { AniListMedia } from "@/lib/hooks/useAniListData";
import { HUB_COLORS, HubCard } from "./shared";
import { CountdownTimer } from "./CountdownTimer";

export function NewsCard({ m, tag }: { m: AniListMedia; tag?: string }) {
  const title = m.title.english || m.title.romaji || "—";
  const desc = (m.description ?? "").replace(/<[^>]+>/g, "").slice(0, 140);
  const airing = m.nextAiringEpisode;
  return (
    <HubCard className="!p-0 overflow-hidden">
      <div className="flex gap-3">
        <img
          src={m.coverImage.large}
          alt={title}
          loading="lazy"
          className="h-32 w-24 flex-shrink-0 object-cover"
        />
        <div className="flex-1 py-2.5 pe-3">
          <div className="mb-1 flex items-center gap-1.5">
            <span
              className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
              style={{ background: HUB_COLORS.primary + "33", color: HUB_COLORS.primary }}
            >
              {tag ?? "أنمي"}
            </span>
            {m.averageScore != null && (
              <span className="text-[10px]" style={{ color: HUB_COLORS.secondary }}>
                ⭐ {m.averageScore}
              </span>
            )}
          </div>
          <a
            href={m.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="line-clamp-1 text-xs font-bold text-white hover:underline"
          >
            {title}
          </a>
          <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-white/60">{desc}…</p>
          {airing && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] text-white/50">ح{airing.episode}:</span>
              <CountdownTimer target={airing.airingAt} />
            </div>
          )}
        </div>
      </div>
    </HubCard>
  );
}
