import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS, shuffle } from "@/lib/data/gameQuestions";
import { useCoins } from "@/hooks/useCoins";
import { useGameStats } from "@/hooks/useGameStats";
import { Check, X, Trophy } from "lucide-react";

const ROUND = 5;

export function AnimeQuizGame({ onExit }: { onExit: () => void }) {
  const { addCoins, addGems } = useCoins();
  const { record } = useGameStats();
  const questions = useMemo(() => shuffle(QUIZ_QUESTIONS).slice(0, ROUND), []);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [startedAt] = useState(Date.now());

  const q = questions[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const right = i === q.answer;
    if (right) setCorrect(c => c + 1);
    setTimeout(() => {
      if (idx + 1 < questions.length) { setIdx(idx + 1); setPicked(null); }
      else finish(right ? correct + 1 : correct);
    }, 900);
  };

  const finish = (finalCorrect: number) => {
    const score = finalCorrect * 20;
    const gems = finalCorrect === ROUND ? 2 : 0;
    addCoins(score);
    if (gems) addGems(gems);
    record({ gameId: "anime-quiz", score, correct: finalCorrect, total: ROUND, timeMs: Date.now() - startedAt, mode: "solo" });
    setDone(true);
  };

  if (done) {
    const perfect = correct === ROUND;
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="text-6xl">{perfect ? "🏆" : correct >= 3 ? "🎉" : "💪"}</div>
        <h3 className="mt-3 text-lg font-bold text-white">النتيجة: {correct}/{ROUND}</h3>
        <p className="mt-1 text-sm text-white/60">حصلت على {correct * 20} 🪙 {perfect && "+ 2 💎"}</p>
        <button onClick={onExit} className="mt-4 rounded-full bg-[#e94560] px-6 py-2 text-sm font-bold text-white">عودة</button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex items-center justify-between text-xs text-white/60">
        <span>سؤال {idx + 1}/{ROUND}</span>
        <span className="inline-flex items-center gap-1"><Trophy className="size-3" /> {correct}</span>
      </div>
      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-[#e94560] transition-all" style={{ width: `${((idx) / ROUND) * 100}%` }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <h3 className="my-4 text-center text-lg font-bold text-white">{q.question}</h3>
          <div className="grid gap-2">
            {q.choices.map((c, i) => {
              const isPicked = picked === i;
              const isRight = i === q.answer;
              const show = picked !== null;
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  disabled={picked !== null}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                    show && isRight ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                    : show && isPicked ? "border-red-400 bg-red-500/15 text-red-200"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <span>{c}</span>
                  {show && isRight && <Check className="size-4" />}
                  {show && isPicked && !isRight && <X className="size-4" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
