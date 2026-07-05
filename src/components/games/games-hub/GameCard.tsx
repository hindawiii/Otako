import { motion } from "framer-motion";
import type { GameMeta } from "@/types/games-play";
import { Coins, Play } from "lucide-react";

interface Props { game: GameMeta; onPlay: () => void; }

export function GameCard({ game, onPlay }: Props) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onPlay}
      className="group relative overflow-hidden rounded-3xl border p-4 text-start"
      style={{ borderColor: game.color + "55", background: `linear-gradient(160deg,${game.color}22,${game.color}05 60%,transparent)` }}
    >
      <div className="flex items-start justify-between">
        <div className="grid size-14 place-items-center rounded-2xl text-3xl" style={{ background: game.color + "33" }}>
          {game.emoji}
        </div>
        <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold" style={{ color: game.color }}>
          {"⭐".repeat(game.difficulty)}
        </span>
      </div>
      <h4 className="mt-3 text-base font-bold text-white">{game.name}</h4>
      <p className="mt-1 text-xs leading-relaxed text-white/60">{game.short}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ffd700]">
          <Coins className="size-3.5" /> +{game.rewardCoins}
          {game.rewardGems ? <span className="ms-1 text-[#00d9ff]">+{game.rewardGems}💎</span> : null}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: game.color }}>
          <Play className="size-3" /> العب
        </span>
      </div>
    </motion.button>
  );
}
