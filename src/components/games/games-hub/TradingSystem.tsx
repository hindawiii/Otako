import { useState } from "react";
import { useTrading } from "@/hooks/useTrading";
import { useGifts } from "@/hooks/useGifts";
import { GIFTS } from "@/lib/giftData";
import { ArrowLeftRight, Check, X, Trash2, Plus } from "lucide-react";

export function TradingSystem() {
  const { offers, propose, respond, remove, friends } = useTrading();
  const { inventory, addGift, removeGift } = useGifts();
  const [showNew, setShowNew] = useState(false);
  const [friendId, setFriendId] = useState(friends[0]?.id ?? "");
  const [offering, setOffering] = useState("");
  const [wants, setWants] = useState("");

  const countOf = (id: string) => inventory.find(i => i.giftId === id)?.count ?? 0;
  const ownedGiftIds = inventory.filter(i => i.count > 0).map(i => i.giftId);
  const allGifts = GIFTS;

  const submit = () => {
    if (!friendId || !offering || !wants) return;
    propose(friendId, offering, wants);
    setShowNew(false); setOffering(""); setWants("");
  };

  const accept = (id: string, off: string, want: string) => {
    if (countOf(want) < 1) { respond(id, "declined"); return; }
    removeGift(want, 1); addGift(off);
    respond(id, "accepted");
  };

  const gift = (id: string) => allGifts.find(g => g.id === id);

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#00d9ff22] to-[#c084fc22] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="size-5 text-[#00d9ff]" />
            <div>
              <h3 className="text-sm font-bold text-white">نظام التبادل</h3>
              <p className="text-[11px] text-white/60">قايض هداياك مع الأصدقاء</p>
            </div>
          </div>
          <button onClick={() => setShowNew(v => !v)} className="inline-flex items-center gap-1 rounded-full bg-[#00d9ff] px-3 py-1.5 text-xs font-bold text-black">
            <Plus className="size-3" /> عرض جديد
          </button>
        </div>
      </div>

      {showNew && (
        <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
          <div>
            <label className="mb-1 block text-xs text-white/70">الصديق</label>
            <select value={friendId} onChange={e => setFriendId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none">
              {friends.map(f => <option key={f.id} value={f.id} className="bg-[#1a0a1e]">{f.avatar} {f.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/70">أعرض (من مخزنك)</label>
            <select value={offering} onChange={e => setOffering(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none">
              <option value="" className="bg-[#1a0a1e]">— اختر —</option>
              {ownedGiftIds.map(id => { const g = gift(id); if (!g) return null;
                return <option key={id} value={id} className="bg-[#1a0a1e]">{g.emoji} {g.name} ({countOf(id)})</option>;
              })}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/70">أريد</label>
            <select value={wants} onChange={e => setWants(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none">
              <option value="" className="bg-[#1a0a1e]">— اختر —</option>
              {allGifts.map(g => <option key={g.id} value={g.id} className="bg-[#1a0a1e]">{g.emoji} {g.name}</option>)}
            </select>
          </div>
          <button onClick={submit} disabled={!offering || !wants}
            className="w-full rounded-full bg-[#00d9ff] py-2 text-sm font-bold text-black disabled:opacity-40">
            إرسال العرض
          </button>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-white/70">العروض ({offers.length})</h4>
        {offers.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-white/50">
            لا توجد عروض بعد. ابدأ بإرسال عرض جديد!
          </div>
        )}
        {offers.map(o => {
          const off = gift(o.offering); const want = gift(o.wants);
          return (
            <div key={o.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-white">
                  <span className="text-lg">{o.from.avatar}</span>{o.from.name}
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                  o.status === "pending" ? "bg-white/10 text-white/80"
                  : o.status === "accepted" ? "bg-emerald-500/20 text-emerald-200"
                  : "bg-red-500/20 text-red-200"
                }`}>{o.status === "pending" ? "قيد الانتظار" : o.status === "accepted" ? "مقبول" : "مرفوض"}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-black/30 p-2 text-center text-xs text-white">
                <div className="flex-1">
                  <div className="text-xl">{off?.emoji ?? "🎁"}</div>
                  <div className="mt-1 text-[10px] text-white/60">يعرض</div>
                  <div className="text-[11px]">{off?.name ?? "؟"}</div>
                </div>
                <ArrowLeftRight className="size-4 text-[#00d9ff]" />
                <div className="flex-1">
                  <div className="text-xl">{want?.emoji ?? "🎁"}</div>
                  <div className="mt-1 text-[10px] text-white/60">يريد</div>
                  <div className="text-[11px]">{want?.name ?? "؟"}</div>
                </div>
              </div>
              {o.status === "pending" && (
                <div className="mt-2 flex gap-2">
                  <button onClick={() => accept(o.id, o.offering, o.wants)}
                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-full bg-emerald-500 py-1.5 text-xs font-bold text-white">
                    <Check className="size-3" /> قبول
                  </button>
                  <button onClick={() => respond(o.id, "declined")}
                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-full bg-white/10 py-1.5 text-xs font-bold text-white">
                    <X className="size-3" /> رفض
                  </button>
                  <button onClick={() => remove(o.id)} className="rounded-full bg-white/10 px-3 text-white/60">
                    <Trash2 className="size-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
