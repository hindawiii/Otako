import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { GameId } from "@/types/games-play";
import { GAMES } from "./games";
import { GameCard } from "./GameCard";
import { AnimeQuizGame } from "./AnimeQuizGame";
import { EmojiGuessGame } from "./EmojiGuessGame";
import { MangaMemoryGame } from "./MangaMemoryGame";
import { ReactionRaceGame } from "./ReactionRaceGame";
import { WordScrambleGame } from "./WordScrambleGame";

export function GamesHub() {
  const [active, setActive] = useState<GameId | null>(null);

  if (active) {
    const meta = GAMES.find(g => g.id === active)!;
    return (
      <div className="space-y-3">
        <button onClick={() => setActive(null)} className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white">
          <ArrowRight className="size-3" /> عودة لكل الألعاب
        </button>
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <span className="text-2xl">{meta.emoji}</span>{meta.name}
        </div>
        {active === "anime-quiz"    && <AnimeQuizGame    onExit={() => setActive(null)} />}
        {active === "emoji-guess"   && <EmojiGuessGame   onExit={() => setActive(null)} />}
        {active === "manga-memory"  && <MangaMemoryGame  onExit={() => setActive(null)} />}
        {active === "reaction-race" && <ReactionRaceGame onExit={() => setActive(null)} />}
        {active === "word-scramble" && <WordScrambleGame onExit={() => setActive(null)} />}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#e9456022] to-[#00d9ff11] p-4">
        <h3 className="text-base font-bold text-white">🎮 مركز الألعاب</h3>
        <p className="mt-1 text-xs text-white/60">اختر لعبة، اربح 🪙 عملات، وتسلّق لوحة المتصدرين</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {GAMES.map(g => <GameCard key={g.id} game={g} onPlay={() => setActive(g.id)} />)}
      </div>
    </div>
  );
}
