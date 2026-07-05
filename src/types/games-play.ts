export type GameId = "anime-quiz" | "emoji-guess" | "manga-memory" | "reaction-race" | "word-scramble";
export type GameMode = "solo" | "pvp-bot" | "daily";

export interface GameMeta {
  id: GameId;
  name: string;
  emoji: string;
  color: string;
  short: string;
  difficulty: 1 | 2 | 3;
  rewardCoins: number;
  rewardGems?: number;
}

export interface QuizQuestion {
  id: string;
  category: "anime" | "manga" | "opening" | "character" | "studio";
  question: string;
  choices: string[];
  answer: number; // index
  difficulty: 1 | 2 | 3;
}

export interface EmojiPuzzle {
  emojis: string;
  answer: string;
  hint?: string;
  difficulty: 1 | 2 | 3;
}

export interface GameResult {
  id: string;
  gameId: GameId;
  score: number;
  correct: number;
  total: number;
  timeMs: number;
  playedAt: number;
  mode: GameMode;
  won?: boolean; // pvp
}

export interface LeaderRow {
  userId: string;
  name: string;
  avatar: string;
  totalScore: number;
  wins: number;
  games: number;
}
