import type { Gift, Frame, GiftBoxTier, Rarity } from "@/types/games";

export const RARITY_META: Record<Rarity, { label: string; color: string; glow: string; order: number }> = {
  common:    { label: "عادي",    color: "#9ca3af", glow: "rgba(156,163,175,.4)", order: 1 },
  rare:      { label: "نادر",    color: "#00d9ff", glow: "rgba(0,217,255,.5)",   order: 2 },
  epic:      { label: "ملحمي",   color: "#c084fc", glow: "rgba(192,132,252,.55)",order: 3 },
  legendary: { label: "أسطوري",  color: "#ffd700", glow: "rgba(255,215,0,.6)",   order: 4 },
  mythic:    { label: "خرافي",   color: "#ff4d6d", glow: "rgba(255,77,109,.7)",  order: 5 },
};

export const GIFTS: Gift[] = [
  // Male
  { id: "m_ruler",    name: "الحاكم",   emoji: "👑", rarity: "legendary", gender: "male",   value: 500 },
  { id: "m_knight",   name: "الفارس",   emoji: "⚔️", rarity: "epic",      gender: "male",   value: 200 },
  { id: "m_destroyer",name: "المدمر",   emoji: "💥", rarity: "epic",      gender: "male",   value: 220 },
  { id: "m_assassin", name: "السفاح",   emoji: "🔪", rarity: "rare",      gender: "male",   value: 80  },
  { id: "m_king",     name: "الملك",    emoji: "🤴", rarity: "legendary", gender: "male",   value: 550 },
  { id: "m_ninja_m",  name: "النينجا",  emoji: "🥷", rarity: "rare",      gender: "male",   value: 90  },
  { id: "m_pirate",   name: "القرصان",  emoji: "☠️", rarity: "epic",      gender: "male",   value: 240 },
  { id: "m_dragon",   name: "التنين",   emoji: "🐉", rarity: "mythic",    gender: "male",   value: 1200 },
  { id: "m_warrior",  name: "المحارب",  emoji: "🛡️", rarity: "common",    gender: "male",   value: 25  },
  // Female
  { id: "f_princess", name: "الأميرة",  emoji: "👸", rarity: "legendary", gender: "female", value: 500 },
  { id: "f_charmer",  name: "الفاتنة",  emoji: "💃", rarity: "epic",      gender: "female", value: 210 },
  { id: "f_beauty",   name: "الجميلة",  emoji: "🌹", rarity: "rare",      gender: "female", value: 85  },
  { id: "f_witch",    name: "الساحرة",  emoji: "🔮", rarity: "epic",      gender: "female", value: 230 },
  { id: "f_queen",    name: "الملكة",   emoji: "👑", rarity: "legendary", gender: "female", value: 560 },
  { id: "f_ninja",    name: "النينجا",  emoji: "🥷", rarity: "rare",      gender: "female", value: 90  },
  { id: "f_pirate",   name: "القرصانة", emoji: "☠️", rarity: "epic",      gender: "female", value: 240 },
  { id: "f_dragoness",name: "التنينة",  emoji: "🐉", rarity: "mythic",    gender: "female", value: 1200 },
  { id: "f_mermaid",  name: "الحورية",  emoji: "🧜‍♀️", rarity: "common",   gender: "female", value: 30  },
  { id: "f_butterfly",name: "الفراشة",  emoji: "🦋", rarity: "common",    gender: "female", value: 25  },
  // Neutral
  { id: "n_dragon",   name: "التنين",   emoji: "🐉", rarity: "mythic",    gender: "neutral",value: 1100 },
  { id: "n_ninja",    name: "النينجا",  emoji: "🥷", rarity: "rare",      gender: "neutral",value: 85  },
  { id: "n_pirate",   name: "القرصان",  emoji: "☠️", rarity: "epic",      gender: "neutral",value: 220 },
  { id: "n_warrior",  name: "المحارب",  emoji: "🛡️", rarity: "common",    gender: "neutral",value: 25  },
  { id: "n_wizard",   name: "الساحر",   emoji: "🧙", rarity: "epic",      gender: "neutral",value: 225 },
  { id: "n_ghost",    name: "الروح",    emoji: "👻", rarity: "rare",      gender: "neutral",value: 75  },
];

export const GIFT_BOXES: GiftBoxTier[] = [
  { id: "common",    name: "صندوق عادي",    price: 5,   rarityPool: ["common","common","rare"],           color: "#9ca3af", emoji: "📦" },
  { id: "rare",      name: "صندوق نادر",    price: 50,  rarityPool: ["rare","rare","epic"],               color: "#00d9ff", emoji: "🎁" },
  { id: "epic",      name: "صندوق ملحمي",   price: 200, rarityPool: ["epic","epic","legendary"],          color: "#c084fc", emoji: "💜" },
  { id: "legendary", name: "صندوق أسطوري",  price: 800, rarityPool: ["legendary","legendary","mythic"],   color: "#ffd700", emoji: "🌟" },
];

export const FRAMES: Frame[] = [
  { id: "fr_wood",   name: "خشبي",       rarity: "common",    effect: "none",     price: 100,  preview: "linear-gradient(135deg,#8b6f47,#5a4530)" },
  { id: "fr_silver", name: "فضي",        rarity: "rare",      effect: "glow",     price: 300,  preview: "linear-gradient(135deg,#e5e7eb,#9ca3af)" },
  { id: "fr_gold",   name: "ذهبي",       rarity: "epic",      effect: "shimmer",  price: 800,  preview: "linear-gradient(135deg,#ffd700,#ff8c00)" },
  { id: "fr_diamond",name: "ألماسي",     rarity: "legendary", effect: "pulse",    price: 2000, preview: "linear-gradient(135deg,#00d9ff,#c084fc,#ffd700)" },
  { id: "fr_fire",   name: "لهب أزلي",   rarity: "mythic",    effect: "fire",     price: 5000, preview: "linear-gradient(135deg,#ff4d6d,#ff8c00,#ffd700)" },
];

export function pickRandom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function getGiftById(id: string): Gift | undefined {
  return GIFTS.find(g => g.id === id);
}

export function rollThreeGifts(pool: Rarity[], gender: "male"|"female"|"neutral"): Gift[] {
  const eligible = GIFTS.filter(g => g.gender === gender || g.gender === "neutral");
  const chosen: Gift[] = [];
  const used = new Set<string>();
  for (let i = 0; i < 3; i++) {
    const targetRarity = pool[i % pool.length];
    const candidates = eligible.filter(g => g.rarity === targetRarity && !used.has(g.id));
    const list = candidates.length ? candidates : eligible.filter(g => !used.has(g.id));
    const g = pickRandom(list);
    used.add(g.id);
    chosen.push(g);
  }
  return chosen;
}
