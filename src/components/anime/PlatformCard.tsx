import type { ReactNode } from "react";
import { HUB_COLORS, HubCard } from "./shared";

export function PlatformCard({
  emoji,
  name,
  desc,
  badge,
  color,
  href,
  extra,
}: {
  emoji: string;
  name: string;
  desc: string;
  badge: string;
  color: string;
  href: string;
  extra?: ReactNode;
}) {
  return (
    <HubCard className="!p-0 overflow-hidden">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 p-3.5"
      >
        <div
          className="flex size-11 flex-shrink-0 items-center justify-center rounded-xl text-2xl"
          style={{ background: color + "22" }}
        >
          {emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-bold text-white">{name}</span>
            <span
              className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
              style={{ background: color + "22", color }}
            >
              {badge}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] leading-relaxed text-white/60">{desc}</p>
        </div>
        <span className="text-white/40" aria-hidden>↗</span>
      </a>
      {extra && <div className="border-t px-3.5 py-2" style={{ borderColor: HUB_COLORS.border }}>{extra}</div>}
    </HubCard>
  );
}
