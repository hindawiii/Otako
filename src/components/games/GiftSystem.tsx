import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Coins, Gem, Gift as GiftIcon, User } from "lucide-react";
import { GIFT_BOXES, RARITY_META, getGiftById } from "@/lib/giftData";
import type { Gender } from "@/types/games";
import { useCoins } from "@/hooks/useCoins";
import { useGifts } from "@/hooks/useGifts";
import { CoinStore } from "./CoinStore";
import { SmartGiftBox } from "./SmartGiftBox";
import { GiftCrafting } from "./GiftCrafting";
import { ProfileFrames } from "./ProfileFrames";
import { ReGiftModal } from "./ReGiftModal";

type Tab = "shop" | "inventory" | "craft" | "frames";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "shop",      label: "المتجر",     icon: "🛒" },
  { id: "inventory", label: "المخزن",     icon: "🎒" },
  { id: "craft",     label: "الصياغة",    icon: "⚒️" },
  { id: "frames",    label: "الإطارات",   icon: "🖼️" },
];

const GENDER_LABEL: Record<Gender, string> = { male: "ذكر", female: "أنثى", neutral: "محايد" };

export function GiftSystem() {
  const { wallet } = useCoins();
  const { inventory, gender, setGender, canChangeGender, sellGift } = useGifts();
  const [tab, setTab] = useState<Tab>("shop");
  const [openBox, setOpenBox] = useState<null | typeof GIFT_BOXES[number]>(null);
  const [giftFor, setGiftFor] = useState<ReturnType<typeof getGiftById> | null>(null);
  const [genderMenu, setGenderMenu] = useState(false);

  const inventoryItems = useMemo(
    () => inventory.map(i => ({ item: i, gift: getGiftById(i.giftId)! })).filter(x => x.gift),
    [inventory]
  );

  const handleGender = (g: Gender) => {
    if (!canChangeGender()) return;
    setGender(g);
    setGenderMenu(false);
  };

  return (
    <div dir="rtl" className="mx-auto max-w-3xl px-4 py-6 text-white" style={{ fontFamily: '"Cairo",system-ui' }}>
      {/* Wallet */}
      <div className="mb-4 flex items-center justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-[#e9456022] to-[#00d9ff11] p-4">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#e94560] to-[#c81d43] text-2xl">🎁</div>
          <div>
            <h2 className="text-lg font-bold">الألعاب والهدايا</h2>
            <button onClick={() => setGenderMenu(v => !v)} className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80 hover:bg-white/20">
              <User className="size-3" /> {GENDER_LABEL[gender]}
            </button>
            {genderMenu && (
              <div className="absolute z-10 mt-1 flex gap-1 rounded-xl bg-black/80 p-1 backdrop-blur">
                {(["male","female","neutral"] as Gender[]).map(g => (
                  <button key={g} onClick={() => handleGender(g)}
                    disabled={!canChangeGender() && g !== gender}
                    className={`rounded-lg px-2 py-1 text-[10px] font-bold ${gender === g ? "bg-[#e94560]" : "hover:bg-white/10"} disabled:opacity-40`}>
                    {GENDER_LABEL[g]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="rounded-2xl bg-black/40 px-3 py-2 text-center">
            <div className="flex items-center gap-1 text-lg font-black text-[#ffd700]"><Coins className="size-4" />{wallet.coins}</div>
            <div className="text-[9px] text-white/50">عملات</div>
          </div>
          <div className="rounded-2xl bg-black/40 px-3 py-2 text-center">
            <div className="flex items-center gap-1 text-lg font-black text-[#00d9ff]"><Gem className="size-4" />{wallet.gems}</div>
            <div className="text-[9px] text-white/50">جواهر</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5 grid grid-cols-4 gap-2">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-2xl border py-2.5 text-xs font-bold transition ${
              tab === t.id ? "border-[#e94560] bg-[#e94560]/15 text-white" : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/10"
            }`}
          >
            <div className="text-lg">{t.icon}</div>
            <div>{t.label}</div>
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "shop" && <CoinStore onOpen={(id) => setOpenBox(GIFT_BOXES.find(b => b.id === id)!)} />}

      {tab === "inventory" && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="mb-4 text-base font-bold">🎒 مخزنك ({inventoryItems.length})</h3>
          {inventoryItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-white/50">
              مخزنك فارغ. افتح صناديق للحصول على هدايا.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {inventoryItems.map(({ item, gift }) => {
                const meta = RARITY_META[gift.rarity];
                return (
                  <motion.div
                    key={gift.id}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border p-3 text-center"
                    style={{ borderColor: meta.color + "66", background: `${meta.color}0d`, boxShadow: `0 6px 20px -10px ${meta.glow}` }}
                  >
                    <div className="relative">
                      <div className="text-4xl">{gift.emoji}</div>
                      <span className="absolute -end-1 -top-1 rounded-full bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">×{item.count}</span>
                    </div>
                    <div className="mt-2 text-sm font-bold text-white">{gift.name}</div>
                    <div className="text-[10px]" style={{ color: meta.color }}>{meta.label}</div>
                    <div className="mt-2 flex gap-1">
                      <button onClick={() => setGiftFor(gift)} className="flex-1 rounded-full bg-[#e94560] py-1 text-[10px] font-bold">
                        <GiftIcon className="me-0.5 inline size-3" /> أهدِ
                      </button>
                      <button onClick={() => sellGift(gift.id)} className="flex-1 rounded-full bg-emerald-500/20 py-1 text-[10px] font-bold text-emerald-300">
                        بيع {Math.floor(gift.value * 0.5)}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "craft"  && <GiftCrafting />}
      {tab === "frames" && <ProfileFrames />}

      {openBox && <SmartGiftBox box={openBox} open={!!openBox} onClose={() => setOpenBox(null)} />}
      <ReGiftModal gift={giftFor ?? null} open={!!giftFor} onClose={() => setGiftFor(null)} />
    </div>
  );
}
