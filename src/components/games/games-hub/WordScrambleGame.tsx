import { useMemo, useState } from "react";
import { WORD_BANK, shuffle } from "@/lib/data/gameQuestions";
import { useCoins } from "@/hooks/useCoins";
import { useGameStats } from "@/hooks/useGameStats";
import { SkipForward } from "lucide-react";

const ROUND = 5;

function scramble(word: string): string {
  const chars = word.split("");
  for (let i = 0; i < 10; i++) {
    const s = shuffle(chars).join("");
    if (s !== word) return s;
  }
  return chars.reverse().join("");
}

export function WordScrambleGame({ onExit }: { onExit: () => void }) {
  const words = useMemo(() => shuffle(WORD_BANK).slice(0, ROUND), []);
  const scrambled = useMemo(() => words.map(scramble), [words]);
  const { addCoins } = useCoins();
  const { record } = useGameStats();
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [startedAt] = useState(Date.now());

  const next = (won: boolean) => {
    if (won) setCorrect(c => c + 1);
    setInput("");
    if (idx + 1 < ROUND) setIdx(idx + 1);
    else {
      const finalC = won ? correct + 1 : correct;
      const score = finalC * 25;
      addCoins(score);
      record({ gameId: "word-scramble", score, correct: finalC, total: ROUND, timeMs: Date.now() - startedAt, mode: "solo" });
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="text-6xl">🔤</div>
        <h3 className="mt-3 text-lg font-bold text-white">أصبت {correct}/{ROUND}</h3>
        <button onClick={onExit} className="mt-4 rounded-full bg-[#e94560] px-6 py-2 text-sm font-bold text-white">عودة</button>
      </div>
    );
  }

  const check = () => next(input.trim() === words[idx]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex justify-between text-xs text-white/60">
        <span>{idx + 1}/{ROUND}</span><span>✅ {correct}</span>
      </div>
      <div className="rounded-2xl bg-black/40 py-10 text-center text-4xl font-black tracking-widest text-[#00d9ff]">
        {scrambled[idx]}
      </div>
      <input
        value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && check()}
        placeholder="رتّب الحروف..."
        className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-white outline-none focus:border-[#e94560]"
      />
      <div className="mt-3 flex gap-2">
        <button onClick={check} className="flex-1 rounded-full bg-[#e94560] py-2 text-sm font-bold text-white">تحقق</button>
        <button onClick={() => next(false)} className="rounded-full bg-white/10 px-4 text-xs font-bold text-white">
          <SkipForward className="inline size-3" /> تخطي
        </button>
      </div>
    </div>
  );
}
