import { useGameStats } from "@/hooks/useGameStats";
import { GAMES } from "./games";

export function StatsDashboard() {
  const { results, stats, byGame } = useGameStats();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "المباريات", value: stats.total, color: "#e94560" },
          { label: "الانتصارات", value: stats.wins, color: "#10b981" },
          { label: "المجموع", value: stats.totalScore, color: "#ffd700" },
          { label: "أفضل نتيجة", value: stats.bestScore, color: "#00d9ff" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
            <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="mt-1 text-[10px] text-white/60">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="mb-3 text-sm font-bold text-white">📊 أداء حسب اللعبة</h3>
        <div className="space-y-2">
          {GAMES.map(g => {
            const rs = byGame(g.id);
            const best = rs.reduce((m, r) => Math.max(m, r.score), 0);
            const played = rs.length;
            return (
              <div key={g.id} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                <div className="grid size-10 place-items-center rounded-xl text-xl" style={{ background: g.color + "22" }}>{g.emoji}</div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">{g.name}</div>
                  <div className="text-[10px] text-white/50">{played} مباراة</div>
                </div>
                <div className="text-end">
                  <div className="text-sm font-black" style={{ color: g.color }}>{best}</div>
                  <div className="text-[9px] text-white/50">أفضل</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="mb-3 text-sm font-bold text-white">🕒 آخر المباريات</h3>
        {results.length === 0 ? (
          <p className="text-center text-xs text-white/50">لم تلعب بعد. ابدأ لعبة!</p>
        ) : (
          <div className="space-y-2">
            {results.slice(0, 8).map(r => {
              const g = GAMES.find(x => x.id === r.gameId);
              return (
                <div key={r.id} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2">
                  <span className="text-lg">{g?.emoji}</span>
                  <div className="flex-1 text-xs text-white/80">{g?.name}</div>
                  <div className="text-xs font-bold text-[#ffd700]">+{r.score}</div>
                  <div className="text-[10px] text-white/40">{r.correct}/{r.total}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
