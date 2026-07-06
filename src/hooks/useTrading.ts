import { useCallback, useEffect, useState } from "react";
import type { TradeOffer } from "@/types/games-play";

const KEY = "otako_trades_v1";

const MOCK_FRIENDS = [
  { id: "f1", name: "أكيرا", avatar: "🦊" },
  { id: "f2", name: "ساكورا", avatar: "🌸" },
  { id: "f3", name: "ريو", avatar: "🐺" },
];

function read(): TradeOffer[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(list: TradeOffer[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
}

export function useTrading() {
  const [offers, setOffers] = useState<TradeOffer[]>([]);

  useEffect(() => { setOffers(read()); }, []);

  const propose = useCallback((toFriendId: string, offering: string, wants: string) => {
    const friend = MOCK_FRIENDS.find(f => f.id === toFriendId) ?? MOCK_FRIENDS[0];
    const offer: TradeOffer = {
      id: crypto.randomUUID?.() ?? String(Math.random()),
      from: friend,
      offering, wants,
      status: "pending",
      createdAt: Date.now(),
    };
    const next = [offer, ...read()].slice(0, 50);
    write(next); setOffers(next);
    return offer;
  }, []);

  const respond = useCallback((id: string, status: "accepted" | "declined") => {
    const next = read().map(o => o.id === id ? { ...o, status } : o);
    write(next); setOffers(next);
  }, []);

  const remove = useCallback((id: string) => {
    const next = read().filter(o => o.id !== id);
    write(next); setOffers(next);
  }, []);

  return { offers, propose, respond, remove, friends: MOCK_FRIENDS };
}
