import { useCallback, useEffect, useState } from "react";
import type { Wallet } from "@/types/games";

const KEY = "otako_wallet_v1";
const DEFAULT: Wallet = { coins: 500, gems: 10 };

function read(): Wallet {
  if (typeof window === "undefined") return DEFAULT;
  try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }
  catch { return DEFAULT; }
}

export function useCoins() {
  const [wallet, setWallet] = useState<Wallet>(DEFAULT);

  useEffect(() => { setWallet(read()); }, []);

  const save = useCallback((w: Wallet) => {
    setWallet(w);
    try { localStorage.setItem(KEY, JSON.stringify(w)); } catch {}
    window.dispatchEvent(new CustomEvent("otako:wallet", { detail: w }));
  }, []);

  const addCoins = useCallback((n: number) => save({ ...read(), coins: read().coins + n }), [save]);
  const spendCoins = useCallback((n: number): boolean => {
    const w = read();
    if (w.coins < n) return false;
    save({ ...w, coins: w.coins - n });
    return true;
  }, [save]);
  const addGems = useCallback((n: number) => save({ ...read(), gems: read().gems + n }), [save]);

  useEffect(() => {
    const handler = (e: Event) => setWallet((e as CustomEvent<Wallet>).detail);
    window.addEventListener("otako:wallet", handler);
    return () => window.removeEventListener("otako:wallet", handler);
  }, []);

  return { wallet, addCoins, spendCoins, addGems };
}
