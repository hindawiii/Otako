import type { AniListMedia } from "@/lib/hooks/useAniListData";
import { HUB_COLORS, HubCard } from "./shared";
import { CountdownTimer } from "./CountdownTimer";

const statusMap: Record<string, string> = {
  RELEASING: "يُبَث",
  FINISHED: "مكتمل",
  NOT_YET_RELEASED: "قادم",
  CANCELLED: "ملغي",
  HIATUS: "متوقف",
};

export function AnimeCard({ m, compact = false }: { m: AniListMedia; compact?: boolean }) {
  const title = m.title.english || m.title.romaji || m.title.native || "—";
  const airing = m.nextAiringEpisode;
  return (
    <a href={m.siteUrl} target="_blank" rel="noopener noreferrer" className="block">
      <HubCard className="!p-0 overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={m.coverImage.large}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {m.averageScore != null && (
            <div
              className="absolute top-2 end-2 rounded-md px-1.5 py-0.5 text-[10px] font-black text-white"
              style={{ background: "rgba(0,0,0,0.7)", color: HUB_COLORS.secondary }}
            >
              ⭐ {m.averageScore}
            </div>
          )}
          {m.status && (
            <div
              className="absolute bottom-2 start-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold"
              style={{ background: HUB_COLORS.primary, color: "white" }}
            >
              {statusMap[m.status] ?? m.status}
            </div>
          )}
        </div>
        <div className="p-2.5">
          <div className="line-clamp-2 text-xs font-bold text-white" title={title}>
            {title}
          </div>
          {!compact && (
            <div className="mt-1 flex items-center justify-between text-[10px] text-white/50">
              <span>{m.episodes ? `${m.episodes} حلقة` : m.format ?? ""}</span>
              {airing ? (
                <CountdownTimer target={airing.airingAt} />
              ) : (
                <span>{m.genres?.[0] ?? ""}</span>
              )}
            </div>
          )}
        </div>
      </HubCard>
    </a>
  );
}
