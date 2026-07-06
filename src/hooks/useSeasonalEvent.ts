import { useEffect, useState } from "react";
import type { SeasonalEvent } from "@/types/games-play";

// Rolling events driven by month — always has an active one so users see rewards.
const MS_DAY = 86_400_000;

function currentEvent(now = Date.now()): SeasonalEvent {
  const d = new Date(now);
  const m = d.getMonth(); // 0..11
  const start = new Date(d.getFullYear(), m, 1).getTime();
  const end = new Date(d.getFullYear(), m + 1, 1).getTime();

  const events: Omit<SeasonalEvent, "startAt" | "endAt">[] = [
    { id: "new-year",    name: "احتفال رأس السنة",       emoji: "🎆", theme: "#ffd700", rewardMultiplier: 2.0, bonusGems: 5, description: "ضاعف عملاتك في كل لعبة طوال شهر يناير!" },
    { id: "valentines",  name: "شهر الشوجو",              emoji: "💖", theme: "#ff69b4", rewardMultiplier: 1.5, bonusGems: 3, description: "هدايا الرومانسية بأسعار مخفضة." },
    { id: "spring",      name: "مهرجان الساكورا",         emoji: "🌸", theme: "#ffb6c1", rewardMultiplier: 1.5, bonusGems: 3, description: "زهور خاصة وإطارات ربيعية حصرية." },
    { id: "golden-week", name: "الأسبوع الذهبي",           emoji: "🏯", theme: "#f59e0b", rewardMultiplier: 1.75, bonusGems: 4, description: "أسبوع مثالي للتجميع — بونص إضافي!" },
    { id: "kids-day",    name: "يوم الأطفال",             emoji: "🎏", theme: "#00d9ff", rewardMultiplier: 1.5, bonusGems: 3, description: "احتفل مع أسماك الكوي الطائرة." },
    { id: "tanabata",    name: "مهرجان تاناباتا",         emoji: "🎋", theme: "#a78bfa", rewardMultiplier: 1.75, bonusGems: 4, description: "تمنّى أمنية على النجوم." },
    { id: "obon",        name: "مهرجان أوبون",            emoji: "🏮", theme: "#f97316", rewardMultiplier: 1.5, bonusGems: 3, description: "فوانيس وأنمي كلاسيكي." },
    { id: "moon-fest",   name: "مهرجان القمر",            emoji: "🌕", theme: "#e5e7eb", rewardMultiplier: 1.5, bonusGems: 3, description: "ليالي القمر والدانغو." },
    { id: "sports-day",  name: "يوم الرياضة",             emoji: "🏅", theme: "#10b981", rewardMultiplier: 1.5, bonusGems: 3, description: "ألعاب سبورتس أنمي مميزة." },
    { id: "halloween",   name: "هالوين الأنمي",           emoji: "🎃", theme: "#ff7518", rewardMultiplier: 2.0, bonusGems: 5, description: "أنمي رعب وإطارات مخيفة!" },
    { id: "manga-month", name: "شهر المانجا",             emoji: "📚", theme: "#8b5cf6", rewardMultiplier: 1.5, bonusGems: 3, description: "لعبة ذاكرة المانجا بمكافآت مضاعفة." },
    { id: "winter-fest", name: "مهرجان الشتاء",           emoji: "❄️", theme: "#38bdf8", rewardMultiplier: 2.0, bonusGems: 5, description: "أنمي شتوي وهدايا نادرة." },
  ];

  const e = events[m];
  return { ...e, startAt: start, endAt: end };
}

export function useSeasonalEvent() {
  const [event, setEvent] = useState<SeasonalEvent>(() => currentEvent());
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { setEvent(currentEvent(now)); }, [now]);

  const msLeft = Math.max(0, event.endAt - now);
  const daysLeft = Math.ceil(msLeft / MS_DAY);
  return { event, daysLeft, msLeft, isActive: msLeft > 0 };
}
