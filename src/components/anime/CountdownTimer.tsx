import { useCountdown } from "@/lib/hooks/useCountdown";
import { HUB_COLORS } from "./shared";

export function CountdownTimer({ target, label }: { target: number | null | undefined; label?: string }) {
  const { d, h, m, s, done } = useCountdown(target);
  if (!target || done) {
    return <div className="text-[11px] text-white/50">{label ?? "متاح الآن"}</div>;
  }
  const cell = (n: number, u: string) => (
    <div className="flex flex-col items-center rounded-md px-1.5 py-1" style={{ background: "rgba(233,69,96,0.12)" }}>
      <span className="text-sm font-black tabular-nums" style={{ color: HUB_COLORS.primary }}>
        {String(n).padStart(2, "0")}
      </span>
      <span className="text-[9px] uppercase text-white/50">{u}</span>
    </div>
  );
  return (
    <div className="flex items-center gap-1">
      {cell(d, "ي")}
      {cell(h, "س")}
      {cell(m, "د")}
      {cell(s, "ث")}
    </div>
  );
}
