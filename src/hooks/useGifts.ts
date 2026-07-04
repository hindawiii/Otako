import { useCallback, useEffect, useState } from "react";
import type { Gender, InventoryItem } from "@/types/games";
import { getGiftById } from "@/lib/giftData";

const INV_KEY = "otako_inventory_v1";
const FRAMES_KEY = "otako_frames_v1";
const GENDER_KEY = "otako_gender_v1";
const GENDER_CHANGE_KEY = "otako_gender_changed_v1";

function readInv(): InventoryItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(INV_KEY) || "[]"); } catch { return []; }
}
function readFrames(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(FRAMES_KEY) || "[]"); } catch { return []; }
}

export function useGifts() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [frames, setFrames] = useState<string[]>([]);
  const [gender, setGenderState] = useState<Gender>("neutral");

  useEffect(() => {
    setInventory(readInv());
    setFrames(readFrames());
    const g = (localStorage.getItem(GENDER_KEY) as Gender) || "neutral";
    setGenderState(g);
  }, []);

  const persistInv = (next: InventoryItem[]) => {
    setInventory(next);
    localStorage.setItem(INV_KEY, JSON.stringify(next));
  };
  const persistFrames = (next: string[]) => {
    setFrames(next);
    localStorage.setItem(FRAMES_KEY, JSON.stringify(next));
  };

  const addGift = useCallback((giftId: string) => {
    const inv = readInv();
    const idx = inv.findIndex(i => i.giftId === giftId);
    if (idx >= 0) inv[idx] = { ...inv[idx], count: inv[idx].count + 1 };
    else inv.push({ giftId, count: 1, acquiredAt: Date.now() });
    persistInv(inv);
  }, []);

  const removeGift = useCallback((giftId: string, count = 1): boolean => {
    const inv = readInv();
    const idx = inv.findIndex(i => i.giftId === giftId);
    if (idx < 0 || inv[idx].count < count) return false;
    inv[idx].count -= count;
    if (inv[idx].count <= 0) inv.splice(idx, 1);
    persistInv(inv);
    return true;
  }, []);

  const sellGift = useCallback((giftId: string): number => {
    const g = getGiftById(giftId);
    if (!g) return 0;
    if (!removeGift(giftId, 1)) return 0;
    return Math.floor(g.value * 0.5);
  }, [removeGift]);

  const ownsGift = useCallback((giftId: string) => readInv().some(i => i.giftId === giftId), []);

  const addFrame = useCallback((frameId: string) => {
    const f = readFrames();
    if (!f.includes(frameId)) persistFrames([...f, frameId]);
  }, []);

  const canChangeGender = useCallback(() => {
    const last = Number(localStorage.getItem(GENDER_CHANGE_KEY) || 0);
    return Date.now() - last > 30 * 24 * 3600 * 1000;
  }, []);

  const setGender = useCallback((g: Gender) => {
    setGenderState(g);
    localStorage.setItem(GENDER_KEY, g);
    localStorage.setItem(GENDER_CHANGE_KEY, String(Date.now()));
  }, []);

  return { inventory, frames, gender, addGift, removeGift, sellGift, ownsGift, addFrame, canChangeGender, setGender };
}
