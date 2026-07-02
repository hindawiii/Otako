import { useEffect, useState } from "react";

export function useCountdown(targetUnixSeconds: number | null | undefined) {
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  if (!targetUnixSeconds) return { d: 0, h: 0, m: 0, s: 0, done: true, total: 0 };
  const total = Math.max(0, targetUnixSeconds - now);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return { d, h, m, s, done: total === 0, total };
}
