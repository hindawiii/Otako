import { useCallback, useEffect, useState } from "react";
import type { GameId, GameResult, LeaderRow } from "@/types/games-play";

const RESULTS_KEY = "otako_game_results_v1";
const LEADER_KEY = "otako_leaderboard_v1";

const MOCK_LEADERS: LeaderRow[] = [
  { userId: "b1", name: "أكيرا",   avatar: "🦊", totalScore: 4820, wins: 42, games: 60 },
  { userId: "b2", name: "ساكورا",  avatar: "🌸", totalScore: 4210, wins: 38, games: 55 },
  { userId: "b3", name: "ريو",     avatar: "🐺", totalScore: 3980, wins: 33, games: 50 },
  { userId: "b4", name: "يوكي",    avatar: "❄️", totalScore: 3540, wins: 29, games: 48 },
  { userId: "b5", name: "هارو",    avatar: "🌊", totalScore: 3100, wins: 25, games: 45 },
  { userId: "b6", name: "كايتو",   avatar: "🌟", totalScore: 2870, wins: 22, games: 42 },
];

function readResults(): GameResult[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(RESULTS_KEY) || "[]"); } catch { return []; }
}
function readLeaders(): LeaderRow[] {
  if (typeof window === "undefined") return MOCK_LEADERS;
  try {
    const raw = localStorage.getItem(LEADER_KEY);
    if (!raw) return MOCK_LEADERS;
    return JSON.parse(raw);
  } catch { return MOCK_LEADERS; }
}

export function useGameStats() {
  const [results, setResults] = useState<GameResult[]>([]);
  const [leaders, setLeaders] = useState<LeaderRow[]>(MOCK_LEADERS);

  useEffect(() => {
    setResults(readResults());
    setLeaders(readLeaders());
  }, []);

  const record = useCallback((r: Omit<GameResult, "id" | "playedAt">) => {
    const entry: GameResult = { ...r, id: crypto.randomUUID?.() ?? String(Math.random()), playedAt: Date.now() };
    const all = [entry, ...readResults()].slice(0, 200);
    try { localStorage.setItem(RESULTS_KEY, JSON.stringify(all)); } catch {}
    setResults(all);

    // Update "you" in leaderboard
    const list = readLeaders();
    const meIdx = list.findIndex(l => l.userId === "me");
    const me: LeaderRow = meIdx >= 0 ? list[meIdx] : { userId: "me", name: "أنت", avatar: "🎌", totalScore: 0, wins: 0, games: 0 };
    me.totalScore += r.score;
    me.games += 1;
    if (r.won || (r.total > 0 && r.correct / r.total >= 0.7)) me.wins += 1;
    const next = [...list.filter(l => l.userId !== "me"), me].sort((a, b) => b.totalScore - a.totalScore);
    try { localStorage.setItem(LEADER_KEY, JSON.stringify(next)); } catch {}
    setLeaders(next);
    return entry;
  }, []);

  const byGame = (id: GameId) => results.filter(r => r.gameId === id);
  const stats = {
    total: results.length,
    totalScore: results.reduce((s, r) => s + r.score, 0),
    wins: results.filter(r => r.won || (r.total && r.correct / r.total >= 0.7)).length,
    bestScore: results.reduce((m, r) => Math.max(m, r.score), 0),
  };

  return { results, leaders, record, byGame, stats };
}
