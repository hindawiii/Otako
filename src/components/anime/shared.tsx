import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const HUB_COLORS = {
  bg: "#0a0a0f",
  card: "#14141a",
  border: "#2a2a3a",
  primary: "#e94560",
  secondary: "#00d9ff",
};

export function SectionHeader({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <div>
          <h3 className="text-sm font-bold text-white">{title}</h3>
          {subtitle && <p className="text-[11px] text-white/50">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

export function ExternalButton({
  href,
  children,
  color = HUB_COLORS.primary,
  small = false,
}: {
  href: string;
  children: ReactNode;
  color?: string;
  small?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg font-bold text-white transition-transform hover:-translate-y-0.5",
        small ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
      )}
      style={{ background: color }}
    >
      {children}
      <span aria-hidden>↗</span>
    </a>
  );
}

export function HubCard({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all duration-200",
        hover && "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50",
        className,
      )}
      style={{ background: HUB_COLORS.card, borderColor: HUB_COLORS.border }}
    >
      {children}
    </div>
  );
}

export function StatsGrid({ items }: { items: { label: string; value: string | number; color?: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-xl border p-3 text-center"
          style={{ background: HUB_COLORS.card, borderColor: HUB_COLORS.border }}
        >
          <div className="text-lg font-black" style={{ color: it.color ?? HUB_COLORS.primary }}>
            {it.value}
          </div>
          <div className="mt-0.5 text-[10px] text-white/60">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

export function LegalBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold"
      style={{
        background: "rgba(0,217,255,0.1)",
        borderColor: HUB_COLORS.secondary,
        color: HUB_COLORS.secondary,
      }}
    >
      ✅ محتوى قانوني 100%
    </span>
  );
}
