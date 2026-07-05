import { useMemo, useState } from "react";
import { EMOJI_PUZZLES, shuffle } from "@/lib/data/gameQuestions";
import { useCoins } from "@/hooks/useCoins";
import { useGameStats } from "@/hooks/useGameStats";
import { Lightbulb, SkipForward } from "lucide-react";

const ROUND = 6;

export function EmojiGuessGame({ onExit }: { onExit: () => void }) {
  const puzzles = useMemo(() => shuffle(EMOJI_PUZZLES).slice(0, ROUND), []);
  const { addCoins } = useCoins();
  const { record } = useGameStats();
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(0);
  const [hintShown, setHintShown] = useState(false);
  const [feedback, setFeedback] = useState<"ok" | "no" | null>(null);
  const [done, setDone] = useState(false);
  const [startedAt] = useState(Date.now());

  const p = puzzles[idx];

  const next = (won: boolean) => {
    if (won) setCorrect(c => c + 1);
    setInput(""); setHintShown(false); setFeedback(null);
    if (idx + 1 < puzzles.length) setIdx(idx + 1);
    else finish(won ? correct + 1 : correct);
  };

  const check = () => {
    const clean = input.trim().replace(/\s+/g, "");
    const answer = p.answer.replace(/\s+/g, "");
    if (clean && (clean === answer || answer.includes(clean) || clean.includes(answer))) {
      setFeedback("ok"); setTimeout(() => next(true), 700);
    } else { setFeedback("no"); setTimeout(() => setFeedback(null), 700); }
  };

  const finish = (finalCorrect: number) => {
    const score = finalCorrect * 15;
    addCoins(score);
    record({ gameId: "emoji-guess", score, correct: finalCorrect, total: ROUND, timeMs: Date.now() - startedAt, mode: "solo" });
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="text-6xl">🎯</div>
        <h3 className="mt-3 text-lg font-bold text-white">أصبت {correct}/{ROUND}</h3>
        <p className="mt-1 text-sm text-white/60">حصلت على {correct * 15} 🪙</p>
        <button onClick={onExit} className="mt-4 rounded-full bg-[#e94560] px-6 py-2 text-sm font-bold text-white">عودة</button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex justify-between text-xs text-white/60">
        <span>{idx + 1}/{ROUND}</span><span>✅ {correct}</span>
      </div>
      <div className="rounded-2xl bg-black/40 py-8 text-center text-6xl">{p.emojis}</div>
      {hintShown && p.hint && <p className="mt-3 text-center text-xs text-[#ffd700]">💡 {p.hint}</p>}
      <input
        value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && check()}
        placeholder="اكتب اسم الأنمي..."
        className={`mt-4 w-full rounded-2xl border bg-white/5 px-4 py-3 text-center text-white outline-none transition ${
          feedback === "ok" ? "border-emerald-400" : feedback === "no" ? "border-red-400" : "border-white/10 focus:border-[#e94560]"
        }`}
      />
      <div className="mt-3 flex gap-2">
        <button onClick={check} className="flex-1 rounded-full bg-[#e94560] py-2 text-sm font-bold text-white">تحقق</button>
        <button onClick={() => setHintShown(true)} disabled={hintShown} className="rounded-full bg-white/10 px-4 text-xs font-bold text-white disabled:opacity-40">
          <Lightbulb className="inline size-3" /> تلميح
        </button>
        <button onClick={() => next(false)} className="rounded-full bg-white/10 px-4 text-xs font-bold text-white">
          <SkipForward className="inline size-3" /> تخطي
        </button>
      </div>
    </div>
  );
}
