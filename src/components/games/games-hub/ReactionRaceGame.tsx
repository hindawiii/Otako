import { useEffect, useRef, useState } from "react";
import { useCoins } from "@/hooks/useCoins";
import { useGameStats } from "@/hooks/useGameStats";

type Phase = "idle" | "wait" | "go" | "done" | "fail";

export function ReactionRaceGame({ onExit }: { onExit: () => void }) {
  const { addCoins } = useCoins();
  const { record } = useGameStats();
  const [phase, setPhase] = useState<Phase>("idle");
  const [times, setTimes] = useState<number[]>([]);
  const [round, setRound] = useState(0);
  const startRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    if (round >= 5) return finalize();
    setPhase("wait");
    const delay = 1200 + Math.random() * 2200;
    timerRef.current = setTimeout(() => {
      startRef.current = performance.now();
      setPhase("go");
    }, delay);
  };

  const click = () => {
    if (phase === "wait") { if (timerRef.current) clearTimeout(timerRef.current); setPhase("fail"); return; }
    if (phase === "go") {
      const t = performance.now() - startRef.current;
      setTimes(ts => [...ts, t]);
      setRound(r => r + 1);
      setPhase("idle");
    }
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);
  useEffect(() => { if (round >= 5) finalize(); }, [round]);

  const finalize = () => {
    if (phase === "done") return;
    const avg = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 999;
    const score = Math.max(20, Math.round(600 - avg));
    addCoins(score);
    record({ gameId: "reaction-race", score, correct: times.length, total: 5, timeMs: Math.round(avg), mode: "solo" });
    setPhase("done");
  };

  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;

  if (phase === "done") {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="text-6xl">⚡</div>
        <h3 className="mt-3 text-lg font-bold text-white">متوسط الرد: {avg}ms</h3>
        <p className="text-sm text-white/60">حصلت على {Math.max(20, Math.round(600 - avg))} 🪙</p>
        <button onClick={onExit} className="mt-4 rounded-full bg-[#e94560] px-6 py-2 text-sm font-bold text-white">عودة</button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-center">
      <div className="mb-3 flex justify-between text-xs text-white/60">
        <span>جولة {Math.min(round + 1, 5)}/5</span>
        <span>متوسط: {avg || "—"}ms</span>
      </div>
      <button
        onClick={phase === "idle" || phase === "fail" ? start : click}
        className={`h-64 w-full rounded-3xl text-2xl font-black text-white transition ${
          phase === "go" ? "bg-emerald-500"
          : phase === "wait" ? "bg-red-500/80"
          : phase === "fail" ? "bg-orange-500"
          : "bg-[#e94560]"
        }`}
      >
        {phase === "idle" ? "اضغط للبدء" : phase === "wait" ? "انتظر..." : phase === "go" ? "الآن! ⚡" : "مبكر جداً — أعد"}
      </button>
      {times.length > 0 && (
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs text-white/70">
          {times.map((t, i) => <span key={i} className="rounded-full bg-white/10 px-2 py-1">{Math.round(t)}ms</span>)}
        </div>
      )}
    </div>
  );
}
