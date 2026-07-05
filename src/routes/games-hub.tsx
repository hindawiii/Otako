import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GiftSystem } from "@/components/games/GiftSystem";
import { GamesHub } from "@/components/games/games-hub/GamesHub";
import { Leaderboard } from "@/components/games/games-hub/Leaderboard";
import { StatsDashboard } from "@/components/games/games-hub/StatsDashboard";

type Section = "gifts" | "games" | "leaderboard" | "stats";
const SECTIONS: { id: Section; label: string; icon: string }[] = [
  { id: "gifts",       label: "الهدايا",   icon: "🎁" },
  { id: "games",       label: "الألعاب",   icon: "🎮" },
  { id: "leaderboard", label: "المتصدرون", icon: "🏆" },
  { id: "stats",       label: "إحصائياتي", icon: "📊" },
];

export const Route = createFileRoute("/games-hub")({
  head: () => ({ meta: [{ title: "الألعاب والهدايا — أوتاكو" }] }),
  component: Page,
});

function Page() {
  const [section, setSection] = useState<Section>("gifts");
  return (
    <div dir="rtl" className="min-h-screen pb-24 text-white" style={{ background: "radial-gradient(ellipse at top,#1a0a1e 0%,#0a0a1a 60%)", fontFamily: '"Cairo",system-ui' }}>
      <div className="mx-auto max-w-3xl px-4 pt-4">
        <div className="grid grid-cols-4 gap-2 rounded-3xl border border-white/10 bg-white/[0.03] p-1.5">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`rounded-2xl py-2 text-xs font-bold transition ${
                section === s.id ? "bg-gradient-to-br from-[#e94560] to-[#c81d43] text-white" : "text-white/70 hover:bg-white/10"
              }`}
            >
              <div className="text-lg">{s.icon}</div>
              <div>{s.label}</div>
            </button>
          ))}
        </div>
      </div>

      {section === "gifts" && <GiftSystem />}
      {section !== "gifts" && (
        <div className="mx-auto max-w-3xl px-4 py-6">
          {section === "games"       && <GamesHub />}
          {section === "leaderboard" && <Leaderboard />}
          {section === "stats"       && <StatsDashboard />}
        </div>
      )}
    </div>
  );
}
