import { GIFT_BOXES } from "@/lib/giftData";
import { useCoins } from "@/hooks/useCoins";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface Props {
  onOpen: (boxId: typeof GIFT_BOXES[number]["id"]) => void;
}

export function CoinStore({ onOpen }: Props) {
  const { wallet, spendCoins } = useCoins();

  const buy = (id: typeof GIFT_BOXES[number]["id"], price: number) => {
    if (spendCoins(price)) onOpen(id);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="mb-1 text-base font-bold text-white">🛒 متجر الصناديق</h3>
      <p className="mb-4 text-xs text-white/60">اشترِ صندوقاً وافتح 3 هدايا للاختيار</p>

      <div className="grid grid-cols-2 gap-3">
        {GIFT_BOXES.map(b => {
          const affordable = wallet.coins >= b.price;
          return (
            <motion.button
              key={b.id}
              whileHover={{ y: -4 }}
              onClick={() => buy(b.id, b.price)}
              disabled={!affordable}
              className="rounded-2xl border p-4 text-center transition disabled:opacity-40"
              style={{ borderColor: b.color + "66", background: `linear-gradient(180deg,${b.color}22,${b.color}05)`, boxShadow: affordable ? `0 10px 30px -12px ${b.color}88` : undefined }}
            >
              <div className="text-4xl">{b.emoji}</div>
              <div className="mt-2 text-sm font-bold text-white">{b.name}</div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs font-bold" style={{ color: b.color }}>
                {!affordable && <Lock className="size-3" />}
                {b.price} 🪙
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
