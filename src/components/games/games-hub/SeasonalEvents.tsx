import { useSeasonalEvent } from "@/hooks/useSeasonalEvent";
import { Sparkles, Clock, Gift } from "lucide-react";

export function SeasonalEventBanner({ compact = false }: { compact?: boolean }) {
  const { event, daysLeft, isActive } = useSeasonalEvent();
  if (!isActive) return null;

  return (
    <div
      className="relative overflow-hidden rounded-3xl border p-4"
      style={{
        borderColor: `${event.theme}55`,
        background: `linear-gradient(135deg, ${event.theme}22 0%, transparent 70%)`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="text-4xl">{event.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white">{event.name}</h3>
            <Sparkles className="size-3" style={{ color: event.theme }} />
          </div>
          {!compact && <p className="mt-1 text-xs text-white/70">{event.description}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-full px-2 py-0.5 font-bold text-black" style={{ background: event.theme }}>
              ×{event.rewardMultiplier} مكافآت
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-white">
              <Gift className="size-3" /> +{event.bonusGems} 💎 يومياً
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-white/80">
              <Clock className="size-3" /> {daysLeft} يوم متبقّي
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SeasonalEventsPage() {
  const { event, daysLeft } = useSeasonalEvent();
  return (
    <div className="space-y-4">
      <SeasonalEventBanner />
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h4 className="mb-3 text-sm font-bold text-white">🎁 مكافآت الحدث الحالي</h4>
        <ul className="space-y-2 text-xs text-white/80">
          <li className="flex items-center gap-2"><span>✦</span> كل انتصار في الألعاب: ×{event.rewardMultiplier} عملات</li>
          <li className="flex items-center gap-2"><span>✦</span> صناديق يومية: +{event.bonusGems} 💎 مجانية</li>
          <li className="flex items-center gap-2"><span>✦</span> إطار ملف حصري "{event.name}" عند إكمال 10 ألعاب</li>
          <li className="flex items-center gap-2"><span>✦</span> هدايا نادرة بلون الحدث ({event.theme}) في المتجر</li>
        </ul>
        <p className="mt-4 text-[11px] text-white/50">ينتهي بعد {daysLeft} يوم — لا تفوّت الفرصة!</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h4 className="mb-3 text-sm font-bold text-white">📅 الأحداث القادمة</h4>
        <div className="space-y-2 text-xs text-white/70">
          {["🎋 تاناباتا","🎃 هالوين الأنمي","❄️ مهرجان الشتاء","🎆 رأس السنة"].map(t => (
            <div key={t} className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
              <span>{t}</span>
              <span className="text-white/50">قريباً</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
