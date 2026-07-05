import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { shuffle } from "@/lib/data/gameQuestions";
import { useCoins } from "@/hooks/useCoins";
import { useGameStats } from "@/hooks/useGameStats";

const ICONS = ["🍥","☠️","⚔️","🌸","🔥","⚡","🐉","🌙"];

interface Card { id: number; icon: string; flipped: boolean; matched: boolean; }

export function MangaMemoryGame({ onExit }: { onExit: () => void }) {
  const { addCoins } = useCoins();
  const { record } = useGameStats();
  const [cards, setCards] = useState<Card[]>(() =>
    shuffle([...ICONS, ...ICONS]).map((icon, i) => ({ id: i, icon, flipped: false, matched: false }))
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [startedAt] = useState(Date.now());
  const [done, setDone] = useState(false);

  const allMatched = cards.every(c => c.matched);

  useEffect(() => {
    if (allMatched && !done) {
      const time = Math.round((Date.now() - startedAt) / 1000);
      const score = Math.max(50, 300 - moves * 5 - time * 2);
      addCoins(score);
      record({ gameId: "manga-memory", score, correct: 8, total: 8, timeMs: Date.now() - startedAt, mode: "solo" });
      setDone(true);
    }
  }, [allMatched]);

  const flip = (id: number) => {
    if (flipped.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;
    const next = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    const nf = [...flipped, id];
    setCards(next);
    setFlipped(nf);
    if (nf.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = nf.map(i => next.find(c => c.id === i)!);
      setTimeout(() => {
        if (a.icon === b.icon) {
          setCards(cs => cs.map(c => c.id === a.id || c.id === b.id ? { ...c, matched: true } : c));
        } else {
          setCards(cs => cs.map(c => c.id === a.id || c.id === b.id ? { ...c, flipped: false } : c));
        }
        setFlipped([]);
      }, 700);
    }
  };

  if (done) {
    const time = Math.round((Date.now() - startedAt) / 1000);
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="text-6xl">🧠</div>
        <h3 className="mt-3 text-lg font-bold text-white">أحسنت! ({moves} حركة، {time}ث)</h3>
        <button onClick={onExit} className="mt-4 rounded-full bg-[#e94560] px-6 py-2 text-sm font-bold text-white">عودة</button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex justify-between text-xs text-white/60">
        <span>حركات: {moves}</span><span>مطابقات: {cards.filter(c => c.matched).length / 2}/{ICONS.length}</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map(c => (
          <motion.button
            key={c.id}
            onClick={() => flip(c.id)}
            whileTap={{ scale: 0.95 }}
            className="aspect-square rounded-2xl border border-white/10 text-3xl transition"
            style={{
              background: c.flipped || c.matched
                ? "linear-gradient(135deg,#e9456055,#c81d4333)"
                : "linear-gradient(135deg,#1a1a2e,#0f0f1f)",
              opacity: c.matched ? 0.5 : 1,
            }}
          >
            {c.flipped || c.matched ? c.icon : "❓"}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
