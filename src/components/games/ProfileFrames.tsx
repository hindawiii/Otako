import { FRAMES, RARITY_META } from "@/lib/giftData";
import { useCoins } from "@/hooks/useCoins";
import { useGifts } from "@/hooks/useGifts";
import { Check, Lock } from "lucide-react";

const FRAME_EFFECT_CLASS: Record<string, string> = {
  none: "",
  glow: "shadow-[0_0_20px_rgba(0,217,255,0.55)]",
  shimmer: "animate-pulse shadow-[0_0_25px_rgba(255,215,0,0.6)]",
  pulse: "animate-pulse shadow-[0_0_30px_rgba(192,132,252,0.6)]",
  fire: "animate-pulse shadow-[0_0_35px_rgba(255,77,109,0.75)]",
};

export function ProfileFrames() {
  const { wallet, spendCoins } = useCoins();
  const { frames, addFrame } = useGifts();

  const buy = (frameId: string, price: number) => {
    if (frames.includes(frameId)) return;
    if (spendCoins(price)) addFrame(frameId);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="mb-1 text-base font-bold text-white">🖼️ الإطارات المميزة</h3>
      <p className="mb-4 text-xs text-white/60">اجعل ملفك الشخصي مميزاً بإطار حصري</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {FRAMES.map(f => {
          const meta = RARITY_META[f.rarity];
          const owned = frames.includes(f.id);
          const canBuy = wallet.coins >= f.price;
          return (
            <div key={f.id} className="rounded-2xl border p-3 text-center"
                 style={{ borderColor: meta.color + "55", background: `${meta.color}0d` }}>
              <div className={`mx-auto grid size-20 place-items-center rounded-full text-3xl ${FRAME_EFFECT_CLASS[f.effect]}`}
                   style={{ background: f.preview, padding: 4 }}>
                <div className="grid size-full place-items-center rounded-full bg-[#0f0f1f]">🎌</div>
              </div>
              <div className="mt-2 text-sm font-bold text-white">{f.name}</div>
              <div className="text-[10px]" style={{ color: meta.color }}>{meta.label}</div>
              {owned ? (
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-bold text-emerald-300">
                  <Check className="size-3" /> تمتلكها
                </div>
              ) : (
                <button
                  onClick={() => buy(f.id, f.price)}
                  disabled={!canBuy}
                  className="mt-2 inline-flex w-full items-center justify-center gap-1 rounded-full py-1.5 text-[11px] font-bold text-white disabled:opacity-40"
                  style={{ background: canBuy ? meta.color : "#333" }}
                >
                  {!canBuy && <Lock className="size-3" />}
                  {f.price} 🪙
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
