import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Send, EyeOff } from "lucide-react";
import type { Gift } from "@/types/games";
import { RARITY_META } from "@/lib/giftData";
import { useGifts } from "@/hooks/useGifts";

const MOCK_FRIENDS = [
  { id: "f1", name: "أكيرا", avatar: "🦊" },
  { id: "f2", name: "ساكورا", avatar: "🌸" },
  { id: "f3", name: "ريو", avatar: "🐺" },
  { id: "f4", name: "يوكي", avatar: "❄️" },
];

interface Props {
  gift: Gift | null;
  open: boolean;
  onClose: () => void;
}

export function ReGiftModal({ gift, open, onClose }: Props) {
  const { removeGift } = useGifts();
  const [friendId, setFriendId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [sent, setSent] = useState(false);

  if (!open || !gift) return null;
  const meta = RARITY_META[gift.rarity];

  const send = () => {
    if (!friendId) return;
    if (!removeGift(gift.id, 1)) return;
    setSent(true);
    setTimeout(() => { setSent(false); setFriendId(null); setMessage(""); onClose(); }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur"
      >
        <motion.div
          initial={{ scale: 0.9 }} animate={{ scale: 1 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0f0f1f] p-6 text-white"
        >
          <button onClick={onClose} className="absolute end-4 top-4 grid size-8 place-items-center rounded-full bg-white/10">
            <X className="size-4" />
          </button>

          {sent ? (
            <div className="py-8 text-center">
              <div className="text-5xl">✅</div>
              <p className="mt-3 font-bold">تم إرسال الهدية!</p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-center">
                <div className="text-5xl">{gift.emoji}</div>
                <div className="mt-2 font-bold">{gift.name}</div>
                <div className="text-xs" style={{ color: meta.color }}>{meta.label}</div>
              </div>

              <div className="mb-3 text-xs text-white/70">اختر صديقاً:</div>
              <div className="mb-4 grid grid-cols-4 gap-2">
                {MOCK_FRIENDS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFriendId(f.id)}
                    className={`rounded-2xl border p-2 text-center transition ${friendId === f.id ? "border-[#e94560] bg-[#e94560]/15" : "border-white/10 bg-white/5"}`}
                  >
                    <div className="text-2xl">{f.avatar}</div>
                    <div className="text-[10px]">{f.name}</div>
                  </button>
                ))}
              </div>

              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="اكتب رسالة (اختياري)..."
                rows={2}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[#e94560]"
              />

              <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs text-white/80">
                <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} className="accent-[#e94560]" />
                <EyeOff className="size-3.5" /> إهداء مجهول
              </label>

              <button
                onClick={send}
                disabled={!friendId}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold text-white disabled:opacity-40"
                style={{ background: "linear-gradient(135deg,#e94560,#c81d43)" }}
              >
                <Send className="size-4" /> إرسال
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
