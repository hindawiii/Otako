import { useEffect, useMemo, useState } from "react";
import { VOICE_CLIPS } from "@/lib/data/voiceClips";
import { shuffle } from "@/lib/data/gameQuestions";
import { useCoins } from "@/hooks/useCoins";
import { useGameStats } from "@/hooks/useGameStats";
import { useSeasonalEvent } from "@/hooks/useSeasonalEvent";
import { Volume2, Lightbulb, SkipForward } from "lucide-react";

const ROUND = 5;

function speak(text: string, lang = "en-US") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang; u.rate = 0.95; u.pitch = 1.05;
  window.speechSynthesis.speak(u);
}

export function VoiceGuessGame({ onExit }: { onExit: () => void }) {
  const clips = useMemo(() => shuffle(VOICE_CLIPS).slice(0, ROUND), []);
  const { addCoins } = useCoins();
  const { record } = useGameStats();
  const { event } = useSeasonalEvent();
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(0);
  const [hint, setHint] = useState(false);
  const [feedback, setFeedback] = useState<"ok" | "no" | null>(null);
  const [done, setDone] = useState(false);
  const [startedAt] = useState(Date.now());
  const [supported] = useState(typeof window !== "undefined" && "speechSynthesis" in window);

  const c = clips[idx];

  useEffect(() => {
    if (!supported || !c) return;
    const t = setTimeout(() => speak(c.say, c.lang), 400);
    return () => { clearTimeout(t); window.speechSynthesis?.cancel(); };
  }, [idx, c, supported]);

  const check = () => {
    const clean = input.trim().toLowerCase();
    if (!clean) return;
    const targets = [c.answer, ...(c.aliases ?? [])].map(s => s.toLowerCase());
    if (targets.some(t => t.includes(clean) || clean.includes(t))) {
      setFeedback("ok");
      setTimeout(() => next(true), 700);
    } else { setFeedback("no"); setTimeout(() => setFeedback(null), 700); }
  };

  const next = (won: boolean) => {
    if (won) setCorrect(v => v + 1);
    setInput(""); setHint(false); setFeedback(null);
    if (idx + 1 < clips.length) setIdx(idx + 1);
    else {
      const finalC = won ? correct + 1 : correct;
      const base = finalC * 25;
      const score = Math.round(base * event.rewardMultiplier);
      addCoins(score);
      record({ gameId: "voice-guess", score, correct: finalC, total: ROUND, timeMs: Date.now() - startedAt, mode: "solo" });
      setDone(true);
    }
  };

  if (!supported) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="text-4xl">🔇</div>
        <p className="mt-2 text-sm text-white/70">متصفحك لا يدعم تركيب الكلام. جرّب Chrome/Safari.</p>
        <button onClick={onExit} className="mt-4 rounded-full bg-[#e94560] px-6 py-2 text-sm font-bold text-white">عودة</button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="text-6xl">🎙️</div>
        <h3 className="mt-3 text-lg font-bold text-white">أصبت {correct}/{ROUND}</h3>
        <p className="mt-1 text-sm text-white/60">
          {event.rewardMultiplier > 1 && <span className="text-[#ffd700]">×{event.rewardMultiplier} حدث موسمي! </span>}
          حصلت على {Math.round(correct * 25 * event.rewardMultiplier)} 🪙
        </p>
        <button onClick={onExit} className="mt-4 rounded-full bg-[#e94560] px-6 py-2 text-sm font-bold text-white">عودة</button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex justify-between text-xs text-white/60">
        <span>{idx + 1}/{ROUND}</span><span>✅ {correct}</span>
      </div>
      <div className="rounded-2xl bg-black/40 py-10 text-center">
        <button
          onClick={() => speak(c.say, c.lang)}
          className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#e94560] to-[#c81d43] text-white shadow-lg transition hover:scale-105"
        >
          <Volume2 className="size-8" />
        </button>
        <p className="mt-3 text-xs text-white/50">اضغط لإعادة الاستماع</p>
        {hint && c.hint && <p className="mt-2 text-xs text-[#ffd700]">💡 {c.hint}</p>}
      </div>
      <input
        value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && check()}
        placeholder="خمّن الأنمي أو الشخصية..."
        className={`mt-4 w-full rounded-2xl border bg-white/5 px-4 py-3 text-center text-white outline-none transition ${
          feedback === "ok" ? "border-emerald-400" : feedback === "no" ? "border-red-400" : "border-white/10 focus:border-[#e94560]"
        }`}
      />
      <div className="mt-3 flex gap-2">
        <button onClick={check} className="flex-1 rounded-full bg-[#e94560] py-2 text-sm font-bold text-white">تحقق</button>
        <button onClick={() => setHint(true)} disabled={hint} className="rounded-full bg-white/10 px-4 text-xs font-bold text-white disabled:opacity-40">
          <Lightbulb className="inline size-3" /> تلميح
        </button>
        <button onClick={() => next(false)} className="rounded-full bg-white/10 px-4 text-xs font-bold text-white">
          <SkipForward className="inline size-3" /> تخطي
        </button>
      </div>
    </div>
  );
}
