import { useState } from "react";
import { ArrowRight, Swords } from "lucide-react";
import type { GameId } from "@/types/games-play";
import { GAMES } from "./games";
import { GameCard } from "./GameCard";
import { AnimeQuizGame } from "./AnimeQuizGame";
import { EmojiGuessGame } from "./EmojiGuessGame";
import { MangaMemoryGame } from "./MangaMemoryGame";
import { ReactionRaceGame } from "./ReactionRaceGame";
import { WordScrambleGame } from "./WordScrambleGame";
import { VoiceGuessGame } from "./VoiceGuessGame";
import { PvPLobby } from "./PvPLobby";
import { SeasonalEventBanner } from "./SeasonalEvents";

export function GamesHub() {
  const [active, setActive] = useState<GameId | null>(null);
  const [showPvP, setShowPvP] = useState(false);

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
        {active === "voice-guess"   && <VoiceGuessGame   onExit={() => setActive(null)} />}
      </div>
    );
  }

  if (showPvP) {
    return (
      <div className="space-y-3">
        <button onClick={() => setShowPvP(false)} className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white">
          <ArrowRight className="size-3" /> عودة
        </button>
        <PvPLobby />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SeasonalEventBanner compact />
      <button onClick={() => setShowPvP(true)}
        className="flex w-full items-center justify-between rounded-3xl border border-[#e94560]/40 bg-gradient-to-r from-[#e9456033] to-[#c084fc22] p-4 text-right transition hover:scale-[1.01]">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-white"><Swords className="size-4" /> مباراة PvP مباشرة</div>
          <p className="mt-0.5 text-[11px] text-white/70">تحدّى لاعباً حقيقياً — 200 🪙 + 3 💎 للفائز</p>
        </div>
        <ArrowRight className="size-4 rotate-180 text-white/60" />
      </button>
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
