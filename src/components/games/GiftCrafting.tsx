import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Hammer, Sparkles } from "lucide-react";
import { useGifts } from "@/hooks/useGifts";
import { useCrafting } from "@/hooks/useCrafting";
import { getGiftById, RARITY_META } from "@/lib/giftData";
import { findRecipe } from "@/lib/craftingRecipes";

export function GiftCrafting() {
  const { inventory } = useGifts();
  const { craft } = useCrafting();
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const rarityOfSelected = useMemo(() => {
    if (!selected.length) return null;
    return getGiftById(selected[0])?.rarity ?? null;
  }, [selected]);

  const recipe = rarityOfSelected ? findRecipe(rarityOfSelected) : null;

  const toggle = (id: string) => {
    const g = getGiftById(id);
    if (!g) return;
    if (selected.includes(id)) return setSelected(selected.filter(s => s !== id));
    if (rarityOfSelected && g.rarity !== rarityOfSelected) return;
    if (selected.length >= 3) return;
    setSelected([...selected, id]);
  };

  const doCraft = () => {
    if (selected.length < 3) return;
    const res = craft(selected);
    setResult({ success: res.success, message: res.message });
    setSelected([]);
  };

  const groups = useMemo(() => {
    return inventory.map(i => ({ item: i, gift: getGiftById(i.giftId)! })).filter(x => x.gift);
  }, [inventory]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500"><Hammer className="size-5" /></div>
        <div>
          <h3 className="text-base font-bold text-white">ورشة الصياغة</h3>
          <p className="text-xs text-white/60">ادمج 3 هدايا بنفس المستوى للحصول على مستوى أعلى</p>
        </div>
      </div>

      {/* Slots */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map(i => {
          const id = selected[i];
          const g = id ? getGiftById(id) : undefined;
          const meta = g ? RARITY_META[g.rarity] : null;
          return (
            <div key={i} className="aspect-square rounded-2xl border border-dashed border-white/15 p-2 text-center"
                 style={g && meta ? { borderColor: meta.color, background: `linear-gradient(180deg,${meta.color}15,transparent)` } : {}}>
              {g ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="text-3xl">{g.emoji}</div>
                  <div className="text-[10px] text-white/80">{g.name}</div>
                </div>
              ) : (
                <div className="grid h-full place-items-center text-white/30 text-xs">فارغ</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recipe preview */}
      {recipe && (
        <div className="mb-4 rounded-2xl bg-white/5 p-3 text-center text-xs">
          <span className="text-white/70">النتيجة المحتملة: </span>
          <span className="font-bold" style={{ color: RARITY_META[recipe.outputRarity].color }}>
            {RARITY_META[recipe.outputRarity].label}
          </span>
          <span className="text-white/50"> · نسبة النجاح: </span>
          <span className="font-bold text-emerald-300">{Math.round(recipe.successRate * 100)}%</span>
        </div>
      )}

      <button
        onClick={doCraft}
        disabled={selected.length < 3}
        className="mb-4 w-full rounded-full py-2.5 text-sm font-bold text-white disabled:opacity-40"
        style={{ background: "linear-gradient(135deg,#ff8c00,#e94560)" }}
      >
        <Sparkles className="me-1 inline size-4" />
        صياغة
      </button>

      {result && (
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
          className={`mb-4 rounded-2xl p-3 text-center text-sm font-bold ${result.success ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"}`}>
          {result.message}
        </motion.div>
      )}

      {/* Inventory picker */}
      <div className="text-xs text-white/70 mb-2">اختر من مخزنك:</div>
      {groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-white/50">
          مخزنك فارغ. افتح صندوق هدايا أولاً.
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
          {groups.map(({ item, gift }) => {
            const meta = RARITY_META[gift.rarity];
            const active = selected.includes(gift.id);
            const disabled = rarityOfSelected != null && gift.rarity !== rarityOfSelected;
            return (
              <button
                key={gift.id}
                onClick={() => toggle(gift.id)}
                disabled={disabled}
                className={`relative rounded-2xl border p-2 text-center transition ${active ? "scale-95" : "hover:scale-105"} disabled:opacity-30`}
                style={{ borderColor: active ? meta.color : "rgba(255,255,255,0.08)", background: active ? `${meta.color}22` : "rgba(255,255,255,0.03)" }}
              >
                <div className="text-2xl">{gift.emoji}</div>
                <div className="text-[9px] font-bold" style={{ color: meta.color }}>×{item.count}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
