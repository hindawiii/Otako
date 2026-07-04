import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, RefreshCw, Sparkles } from "lucide-react";
import type { Gift, GiftBoxTier } from "@/types/games";
import { RARITY_META, rollThreeGifts } from "@/lib/giftData";
import { useCoins } from "@/hooks/useCoins";
import { useGifts } from "@/hooks/useGifts";

interface Props {
  box: GiftBoxTier;
  open: boolean;
  onClose: () => void;
}

const REROLL_COST = 50;

export function SmartGiftBox({ box, open, onClose }: Props) {
  const { wallet, spendCoins, addCoins } = useCoins();
  const { gender, addGift, ownsGift } = useGifts();
  const [choices, setChoices] = useState<Gift[]>(() => rollThreeGifts(box.rarityPool, gender));
  const [picked, setPicked] = useState<Gift | null>(null);

  const reroll = () => {
    if (!spendCoins(REROLL_COST)) return;
    setChoices(rollThreeGifts(box.rarityPool, gender));
  };
  const pick = (g: Gift) => {
    addGift(g.id);
    setPicked(g);
  };
  const sell = (g: Gift) => {
    const refund = Math.floor(g.value * 0.5);
    addCoins(refund);
    // replace this slot with new roll
    const next = [...choices];
    const idx = next.findIndex(x => x.id === g.id);
    if (idx >= 0) next[idx] = rollThreeGifts(box.rarityPool, gender)[0];
    setChoices(next);
  };
  const reset = () => {
    setPicked(null);
    setChoices(rollThreeGifts(box.rarityPool, gender));
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0f0f1f] p-6 text-white shadow-2xl"
          style={{ boxShadow: `0 20px 80px -20px ${box.color}66` }}
        >
          <button onClick={onClose} className="absolute end-4 top-4 grid size-8 place-items-center rounded-full bg-white/10 hover:bg-white/20">
            <X className="size-4" />
          </button>

          <div className="mb-5 text-center">
            <div className="text-4xl">{box.emoji}</div>
            <h3 className="mt-2 text-xl font-bold">{box.name}</h3>
            <p className="text-xs text-white/60">اختر واحدة من ثلاث هدايا</p>
          </div>

          {!picked ? (
            <>
              <div className="grid grid-cols-3 gap-3">
                {choices.map((g, i) => {
                  const meta = RARITY_META[g.rarity];
                  const owned = ownsGift(g.id);
                  return (
                    <motion.div
                      key={`${g.id}-${i}`}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="rounded-2xl border p-3 text-center"
                      style={{ borderColor: meta.color + "66", background: `linear-gradient(180deg,${meta.color}18,${meta.color}05)`, boxShadow: `0 8px 30px -10px ${meta.glow}` }}
                    >
                      <div className="text-5xl">{g.emoji}</div>
                      <div className="mt-2 text-sm font-bold">{g.name}</div>
                      <div className="text-[10px] font-semibold" style={{ color: meta.color }}>{meta.label}</div>
                      <div className="text-[10px] text-white/50">{g.value} 🪙</div>
                      {owned ? (
                        <div className="mt-2 flex flex-col gap-1">
                          <span className="rounded-full bg-white/10 py-1 text-[10px] text-white/70">تمتلكها</span>
                          <button onClick={() => sell(g)} className="rounded-full bg-emerald-500/20 py-1 text-[10px] font-semibold text-emerald-300 hover:bg-emerald-500/30">
                            بيع +{Math.floor(g.value * 0.5)}
                          </button>
                          <button onClick={() => pick(g)} className="rounded-full py-1 text-[10px] font-semibold text-white" style={{ background: meta.color }}>
                            اختر
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => pick(g)} className="mt-2 w-full rounded-full py-1.5 text-xs font-bold text-white" style={{ background: `linear-gradient(135deg,${meta.color},${meta.color}aa)` }}>
                          اختر
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <button
                onClick={reroll}
                disabled={wallet.coins < REROLL_COST}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-2.5 text-sm font-bold text-white hover:bg-white/10 disabled:opacity-40"
              >
                <RefreshCw className="size-4" />
                إعادة الدوران — {REROLL_COST} 🪙
              </button>
            </>
          ) : (
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <div className="mx-auto grid size-32 place-items-center rounded-full text-7xl"
                   style={{ background: `radial-gradient(circle, ${RARITY_META[picked.rarity].glow}, transparent 70%)` }}>
                {picked.emoji}
              </div>
              <div className="mt-4 flex items-center justify-center gap-1 text-lg font-black" style={{ color: RARITY_META[picked.rarity].color }}>
                <Sparkles className="size-4" /> {picked.name}
              </div>
              <p className="text-xs text-white/60">أُضيفت إلى مخزنك</p>
              <div className="mt-4 flex gap-2">
                <button onClick={reset} className="flex-1 rounded-full bg-white/10 py-2 text-sm font-bold hover:bg-white/20">فتح مرة أخرى</button>
                <button onClick={onClose} className="flex-1 rounded-full py-2 text-sm font-bold text-white" style={{ background: "#e94560" }}>تم</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
