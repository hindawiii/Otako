import { useMemo, useState } from "react";
import { useAniListSearch } from "@/lib/hooks/useAniListData";
import { useUserLists, type ListStatus, type TrackedItem } from "@/lib/hooks/useUserLists";
import { HUB_COLORS, HubCard, SectionHeader, StatsGrid } from "./shared";

const STATUSES: { id: ListStatus; label: string; emoji: string; color: string }[] = [
  { id: "watching", label: "أشاهد الآن", emoji: "▶️", color: "#00d9ff" },
  { id: "completed", label: "أكملت", emoji: "✅", color: "#2ecc71" },
  { id: "planning", label: "أخطط", emoji: "📌", color: "#f39c12" },
  { id: "dropped", label: "أوقفت", emoji: "⏸️", color: "#e74c3c" },
];

export function ListsTab() {
  const { items, upsert, setStatus, increment, setScore, remove } = useUserLists();
  const [tab, setTab] = useState<ListStatus>("watching");
  const [showAdd, setShowAdd] = useState(false);

  const stats = useMemo(
    () => [
      { label: "المجموع", value: items.length, color: HUB_COLORS.primary },
      { label: "أشاهد", value: items.filter((x) => x.status === "watching").length, color: "#00d9ff" },
      { label: "أكملت", value: items.filter((x) => x.status === "completed").length, color: "#2ecc71" },
      {
        label: "المتوسط",
        value: (() => {
          const scored = items.filter((x) => x.score != null);
          if (!scored.length) return "—";
          return (scored.reduce((s, x) => s + (x.score ?? 0), 0) / scored.length).toFixed(1);
        })(),
        color: HUB_COLORS.secondary,
      },
    ],
    [items],
  );

  const filtered = items.filter((x) => x.status === tab);

  return (
    <div className="space-y-5">
      <SectionHeader
        icon="⭐"
        title="قوائم المتابعة"
        subtitle="محفوظة محلياً · جاهزة لمزامنة AniList لاحقاً"
        action={
          <button
            onClick={() => setShowAdd((v) => !v)}
            className="rounded-lg px-3 py-1.5 text-xs font-bold text-white"
            style={{ background: HUB_COLORS.primary }}
          >
            {showAdd ? "إغلاق" : "+ إضافة"}
          </button>
        }
      />

      <StatsGrid items={stats} />

      {showAdd && <AddPanel onAdd={(t) => { upsert(t); setShowAdd(false); }} />}

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => {
          const count = items.filter((x) => x.status === s.id).length;
          const active = tab === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setTab(s.id)}
              className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition"
              style={{
                background: active ? s.color : HUB_COLORS.card,
                borderColor: active ? s.color : HUB_COLORS.border,
                color: active ? "white" : "rgba(255,255,255,0.75)",
              }}
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
              <span
                className="rounded-full px-1.5 text-[9px]"
                style={{ background: active ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)" }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <HubCard>
            <div className="py-6 text-center">
              <div className="mb-1 text-2xl">📭</div>
              <div className="text-xs text-white/60">لا يوجد شيء هنا بعد.</div>
            </div>
          </HubCard>
        )}
        {filtered.map((it) => (
          <TrackedRow
            key={it.id}
            item={it}
            onInc={(d) => increment(it.id, d)}
            onScore={(s) => setScore(it.id, s)}
            onMove={(s) => setStatus(it.id, s)}
            onRemove={() => remove(it.id)}
          />
        ))}
      </div>

      <HubCard>
        <div className="flex items-center gap-2 text-[11px] text-white/60">
          <span className="text-base">🔄</span>
          <span>
            المزامنة مع حسابك في AniList قادمة قريباً — بياناتك الحالية ستبقى محفوظة محلياً.
          </span>
        </div>
      </HubCard>
    </div>
  );
}

function TrackedRow({
  item,
  onInc,
  onScore,
  onMove,
  onRemove,
}: {
  item: TrackedItem;
  onInc: (d: number) => void;
  onScore: (s: number | null) => void;
  onMove: (s: ListStatus) => void;
  onRemove: () => void;
}) {
  const pct = item.total ? Math.round((item.progress / item.total) * 100) : 0;
  return (
    <HubCard className="!p-3">
      <div className="flex gap-3">
        <img
          src={item.cover}
          alt={item.title}
          loading="lazy"
          className="h-20 w-14 flex-shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="line-clamp-1 text-sm font-bold text-white">{item.title}</div>
            <button
              onClick={onRemove}
              className="text-[11px] text-white/40 hover:text-red-400"
              aria-label="حذف"
            >
              ✕
            </button>
          </div>

          <div className="mt-1 flex items-center gap-2 text-[11px] text-white/70">
            <span>
              {item.progress} / {item.total ?? "؟"}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: HUB_COLORS.primary }}
              />
            </div>
            <span>{pct}%</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => onInc(1)}
              className="rounded-md px-2 py-1 text-[11px] font-bold text-white"
              style={{ background: HUB_COLORS.primary }}
            >
              +1
            </button>
            <button
              onClick={() => onInc(-1)}
              className="rounded-md border px-2 py-1 text-[11px] font-bold text-white/80"
              style={{ borderColor: HUB_COLORS.border }}
            >
              −1
            </button>
            <select
              value={item.status}
              onChange={(e) => onMove(e.target.value as ListStatus)}
              className="rounded-md border bg-transparent px-1.5 py-1 text-[11px] text-white/80"
              style={{ borderColor: HUB_COLORS.border, background: HUB_COLORS.card }}
            >
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#14141a]">
                  {s.emoji} {s.label}
                </option>
              ))}
            </select>
            <select
              value={item.score ?? ""}
              onChange={(e) => onScore(e.target.value === "" ? null : Number(e.target.value))}
              className="rounded-md border bg-transparent px-1.5 py-1 text-[11px] text-white/80"
              style={{ borderColor: HUB_COLORS.border, background: HUB_COLORS.card }}
            >
              <option value="" className="bg-[#14141a]">تقييم…</option>
              {Array.from({ length: 10 }).map((_, i) => (
                <option key={i + 1} value={i + 1} className="bg-[#14141a]">
                  ⭐ {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </HubCard>
  );
}

function AddPanel({ onAdd }: { onAdd: (item: Omit<TrackedItem, "updatedAt">) => void }) {
  const [q, setQ] = useState("");
  const { data, loading } = useAniListSearch(q);

  return (
    <HubCard>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="ابحث لإضافة أنمي…"
        className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
        style={{ borderColor: HUB_COLORS.border, background: HUB_COLORS.bg }}
      />
      {loading && <div className="mt-2 text-[11px] text-white/50">جارٍ البحث…</div>}
      {data.length > 0 && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {data.slice(0, 6).map((m) => {
            const title = m.title.english || m.title.romaji || "—";
            return (
              <button
                key={m.id}
                onClick={() =>
                  onAdd({
                    id: m.id,
                    title,
                    cover: m.coverImage.large,
                    status: "watching",
                    progress: 0,
                    total: m.episodes ?? null,
                    score: null,
                    siteUrl: m.siteUrl,
                  })
                }
                className="flex items-center gap-2 rounded-lg border p-2 text-start transition hover:bg-white/5"
                style={{ borderColor: HUB_COLORS.border }}
              >
                <img src={m.coverImage.large} alt="" className="h-12 w-8 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="line-clamp-1 text-xs font-bold text-white">{title}</div>
                  <div className="text-[10px] text-white/50">
                    {m.episodes ? `${m.episodes} حلقة` : m.format ?? ""}
                  </div>
                </div>
                <span className="text-lg" style={{ color: HUB_COLORS.primary }}>+</span>
              </button>
            );
          })}
        </div>
      )}
    </HubCard>
  );
}
