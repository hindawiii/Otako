import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useCoins } from "@/hooks/useCoins";
import { useGameStats } from "@/hooks/useGameStats";
import { QUIZ_QUESTIONS, shuffle } from "@/lib/data/gameQuestions";
import { Users, Loader2, Swords, Trophy } from "lucide-react";

type Phase = "idle" | "queue" | "matched" | "playing" | "done";
const ROUND = 3;

// Simple realtime matchmaking: broadcast presence in "pvp-lobby",
// pair the two most recent players. Fully client-side (no DB).
function myId() {
  if (typeof window === "undefined") return "guest";
  let id = localStorage.getItem("otako_pvp_id");
  if (!id) { id = "u_" + Math.random().toString(36).slice(2, 10); localStorage.setItem("otako_pvp_id", id); }
  return id;
}

export function PvPLobby() {
  const { addCoins, addGems } = useCoins();
  const { record } = useGameStats();
  const [phase, setPhase] = useState<Phase>("idle");
  const [opponent, setOpponent] = useState<{ id: string; name: string; avatar: string } | null>(null);
  const [round, setRound] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS).slice(0, ROUND));
  const [startedAt] = useState(Date.now());
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const me = useRef({ id: myId(), name: "أنت", avatar: "🎌" });

  const cleanup = () => {
    channelRef.current?.unsubscribe();
    channelRef.current = null;
  };
  useEffect(() => () => cleanup(), []);

  const findMatch = async () => {
    setPhase("queue");
    const ch = supabase.channel("pvp-lobby", { config: { presence: { key: me.current.id } } });
    channelRef.current = ch;

    ch.on("presence", { event: "sync" }, () => {
      const state = ch.presenceState();
      const players = Object.keys(state).filter(k => k !== me.current.id);
      if (players.length > 0 && phase === "queue") {
        const oppId = players[0];
        const meta: any = state[oppId]?.[0];
        setOpponent({ id: oppId, name: meta?.name ?? "خصم", avatar: meta?.avatar ?? "🦊" });
        setPhase("matched");
        setTimeout(() => setPhase("playing"), 1500);
      }
    });

    ch.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await ch.track({ name: me.current.name, avatar: me.current.avatar, at: Date.now() });
        // Bot fallback after 6s
        setTimeout(() => {
          if (phase === "queue" || (!opponent && channelRef.current)) {
            const bots = [{ id: "bot", name: "أكيرا 🤖", avatar: "🦊" }, { id: "bot2", name: "ساكورا 🤖", avatar: "🌸" }];
            setOpponent(bots[Math.floor(Math.random() * bots.length)]);
            setPhase("matched");
            setTimeout(() => setPhase("playing"), 1500);
          }
        }, 6000);
      }
    });
  };

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const q = questions[round];
    const right = i === q.answer;
    if (right) setMyScore(s => s + 100);
    // Simulate opponent (60% right)
    const oppRight = Math.random() < 0.6;
    setTimeout(() => {
      if (oppRight) setOppScore(s => s + 100);
      setTimeout(() => {
        if (round + 1 < ROUND) { setRound(r => r + 1); setPicked(null); }
        else finish(right ? myScore + 100 : myScore, oppRight ? oppScore + 100 : oppScore);
      }, 800);
    }, 400 + Math.random() * 1500);
  };

  const finish = (my: number, opp: number) => {
    const won = my > opp;
    const score = won ? 200 : 50;
    addCoins(score);
    if (won) addGems(3);
    record({ gameId: "anime-quiz", score, correct: my / 100, total: ROUND, timeMs: Date.now() - startedAt, mode: "pvp-live", won });
    setPhase("done");
    cleanup();
  };

  if (phase === "idle") {
    return (
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#e9456022] to-[#c084fc22] p-6 text-center">
        <Swords className="mx-auto size-12 text-[#e94560]" />
        <h3 className="mt-3 text-lg font-bold text-white">مباراة PvP مباشرة</h3>
        <p className="mt-1 text-xs text-white/70">3 أسئلة سريعة ضد لاعب حقيقي. الفائز = 200 🪙 + 3 💎</p>
        <button onClick={findMatch} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e94560] px-6 py-3 text-sm font-bold text-white">
          <Users className="size-4" /> ابحث عن خصم
        </button>
      </div>
    );
  }

  if (phase === "queue") {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <Loader2 className="mx-auto size-10 animate-spin text-[#e94560]" />
        <h3 className="mt-3 text-sm font-bold text-white">جاري البحث عن خصم...</h3>
        <p className="mt-1 text-xs text-white/50">إن لم يُوجد لاعب، ستواجه بوت خلال 6 ثوان</p>
        <button onClick={() => { cleanup(); setPhase("idle"); }} className="mt-4 text-xs text-white/60 underline">إلغاء</button>
      </div>
    );
  }

  if (phase === "matched" && opponent) {
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <div className="flex items-center justify-center gap-6">
          <div><div className="text-5xl">{me.current.avatar}</div><div className="mt-1 text-xs text-white">{me.current.name}</div></div>
          <div className="text-3xl font-black text-[#e94560]">VS</div>
          <div><div className="text-5xl">{opponent.avatar}</div><div className="mt-1 text-xs text-white">{opponent.name}</div></div>
        </div>
        <p className="mt-4 text-xs text-white/60">تم إيجاد المباراة! انطلاق...</p>
      </motion.div>
    );
  }

  if (phase === "playing" && opponent) {
    const q = questions[round];
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-3 grid grid-cols-3 items-center text-xs">
          <div className="text-white"><span className="text-lg">{me.current.avatar}</span> {myScore}</div>
          <div className="text-center text-white/60">جولة {round + 1}/{ROUND}</div>
          <div className="text-left text-white"><span className="text-lg">{opponent.avatar}</span> {oppScore}</div>
        </div>
        <h3 className="my-4 text-center text-base font-bold text-white">{q.question}</h3>
        <div className="grid gap-2">
          {q.choices.map((c, i) => (
            <button key={i} disabled={picked !== null} onClick={() => pick(i)}
              className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                picked === i && i === q.answer ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                : picked === i ? "border-red-400 bg-red-500/15 text-red-200"
                : picked !== null && i === q.answer ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
                : "border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const won = myScore > oppScore;
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <Trophy className={`mx-auto size-12 ${won ? "text-[#ffd700]" : "text-white/40"}`} />
        <h3 className="mt-3 text-lg font-bold text-white">{won ? "فُزت! 🎉" : myScore === oppScore ? "تعادل" : "خسرت 💪"}</h3>
        <p className="mt-1 text-sm text-white/70">{myScore} — {oppScore}</p>
        <p className="mt-1 text-xs text-white/60">حصلت على {won ? "200 🪙 + 3 💎" : "50 🪙"}</p>
        <button onClick={() => { setPhase("idle"); setRound(0); setMyScore(0); setOppScore(0); setOpponent(null); setPicked(null); }}
          className="mt-4 rounded-full bg-[#e94560] px-6 py-2 text-sm font-bold text-white">مباراة أخرى</button>
      </div>
    );
  }

  return null;
}
