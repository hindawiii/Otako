import { createFileRoute } from "@tanstack/react-router";
import { GiftSystem } from "@/components/games/GiftSystem";

export const Route = createFileRoute("/games-hub")({
  head: () => ({ meta: [{ title: "الألعاب والهدايا — أوتاكو" }] }),
  component: () => (
    <div className="min-h-screen pb-24" style={{ background: "radial-gradient(ellipse at top,#1a0a1e 0%,#0a0a1a 60%)" }}>
      <GiftSystem />
    </div>
  ),
});
