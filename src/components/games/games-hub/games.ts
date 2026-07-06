import type { GameMeta } from "@/types/games-play";

export const GAMES: GameMeta[] = [
  { id: "anime-quiz",    name: "تحدي الأنمي",     emoji: "🎯", color: "#e94560", short: "5 أسئلة عن عالم الأنمي", difficulty: 2, rewardCoins: 100, rewardGems: 2 },
  { id: "emoji-guess",   name: "خمّن بالإيموجي",  emoji: "😀", color: "#c084fc", short: "خمّن اسم الأنمي من الرموز", difficulty: 2, rewardCoins: 90 },
  { id: "manga-memory",  name: "ذاكرة المانجا",   emoji: "🧠", color: "#00d9ff", short: "طابق البطاقات المتشابهة", difficulty: 1, rewardCoins: 80 },
  { id: "reaction-race", name: "سرعة الرد",       emoji: "⚡", color: "#ffd700", short: "اختبر سرعة انعكاسك", difficulty: 1, rewardCoins: 60 },
  { id: "word-scramble", name: "ترتيب الحروف",    emoji: "🔤", color: "#10b981", short: "رتّب الحروف لأسماء الشخصيات", difficulty: 2, rewardCoins: 120 },
  { id: "voice-guess",   name: "خمّن بالصوت",     emoji: "🎙️", color: "#a78bfa", short: "استمع للاقتباس وخمّن الأنمي", difficulty: 3, rewardCoins: 125 },
];
