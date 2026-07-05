import { useGameStats } from "@/hooks/useGameStats";
import { Crown, Trophy, Medal } from "lucide-react";

export function Leaderboard() {
  const { leaders } = useGameStats();
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="mb-1 text-base font-bold text-white">🏆 لوحة المتصدرين</h3>
      <p className="mb-4 text-xs text-white/60">أفضل اللاعبين هذا الأسبوع</p>
      <div className="space-y-2">
        {leaders.slice(0, 10).map((row, i) => {
          const isMe = row.userId === "me";
          const Icon = i === 0 ? Crown : i === 1 ? Trophy : i === 2 ? Medal : null;
          const rankColor = i === 0 ? "#ffd700" : i === 1 ? "#c0c0c0" : i === 2 ? "#cd7f32" : "#ffffff40";
          return (
            <div key={row.userId}
              className={`flex items-center gap-3 rounded-2xl border p-3 ${isMe ? "border-[#e94560] bg-[#e94560]/10" : "border-white/10 bg-white/5"}`}
            >
              <div className="grid size-9 place-items-center rounded-full text-sm font-black" style={{ background: rankColor + "33", color: rankColor }}>
                {Icon ? <Icon className="size-4" /> : i + 1}
              </div>
              <div className="text-2xl">{row.avatar}</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{row.name} {isMe && <span className="ms-1 rounded-full bg-[#e94560] px-2 py-0.5 text-[9px]">أنت</span>}</div>
                <div className="text-[10px] text-white/50">{row.wins} فوز · {row.games} لعبة</div>
              </div>
              <div className="text-end">
                <div className="text-sm font-black text-[#ffd700]">{row.totalScore}</div>
                <div className="text-[9px] text-white/50">نقطة</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
