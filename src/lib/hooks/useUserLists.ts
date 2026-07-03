import { useCallback, useEffect, useState } from "react";
import { guestStorage } from "@/lib/guest-storage";

export type ListStatus = "watching" | "completed" | "planning" | "dropped";

export type TrackedItem = {
  id: number;
  title: string;
  cover: string;
  status: ListStatus;
  progress: number;      // episodes/chapters watched/read
  total: number | null;  // total episodes/chapters (null if unknown)
  score?: number | null; // 0-10
  updatedAt: number;
  siteUrl?: string;
};

const KEY = "anime_lists_v1";

function readAll(): TrackedItem[] {
  return guestStorage.get<TrackedItem[]>(KEY, []) ?? [];
}

function writeAll(items: TrackedItem[]) {
  guestStorage.set(KEY, items);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("anime-lists-changed"));
  }
}

export function useUserLists() {
  const [items, setItems] = useState<TrackedItem[]>([]);

  useEffect(() => {
    setItems(readAll());
    const handler = () => setItems(readAll());
    window.addEventListener("anime-lists-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("anime-lists-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const upsert = useCallback((item: Omit<TrackedItem, "updatedAt">) => {
    const all = readAll();
    const idx = all.findIndex((x) => x.id === item.id);
    const next: TrackedItem = { ...item, updatedAt: Date.now() };
    if (idx >= 0) all[idx] = { ...all[idx], ...next };
    else all.push(next);
    writeAll(all);
  }, []);

  const setStatus = useCallback((id: number, status: ListStatus) => {
    const all = readAll();
    const idx = all.findIndex((x) => x.id === id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], status, updatedAt: Date.now() };
      writeAll(all);
    }
  }, []);

  const increment = useCallback((id: number, delta = 1) => {
    const all = readAll();
    const idx = all.findIndex((x) => x.id === id);
    if (idx >= 0) {
      const total = all[idx].total;
      const next = Math.max(0, all[idx].progress + delta);
      all[idx] = {
        ...all[idx],
        progress: total ? Math.min(total, next) : next,
        updatedAt: Date.now(),
      };
      writeAll(all);
    }
  }, []);

  const setScore = useCallback((id: number, score: number | null) => {
    const all = readAll();
    const idx = all.findIndex((x) => x.id === id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], score, updatedAt: Date.now() };
      writeAll(all);
    }
  }, []);

  const remove = useCallback((id: number) => {
    writeAll(readAll().filter((x) => x.id !== id));
  }, []);

  return { items, upsert, setStatus, increment, setScore, remove };
}
