export type Rarity = "common" | "rare" | "epic" | "legendary" | "mythic";
export type Gender = "male" | "female" | "neutral";

export interface Gift {
  id: string;
  name: string;
  emoji: string;
  rarity: Rarity;
  gender: Gender;
  value: number; // coin value
  description?: string;
}

export interface InventoryItem {
  giftId: string;
  count: number;
  acquiredAt: number;
}

export interface Frame {
  id: string;
  name: string;
  rarity: Rarity;
  effect: "none" | "glow" | "shimmer" | "pulse" | "fire";
  price: number;
  preview: string; // css gradient
}

export interface CraftingRecipe {
  id: string;
  inputRarity: Rarity;
  outputRarity: Rarity;
  successRate: number; // 0-1
  inputCount: number;
}

export interface Wallet {
  coins: number;
  gems: number;
}

export interface GiftBoxTier {
  id: "common" | "rare" | "epic" | "legendary";
  name: string;
  price: number;
  rarityPool: Rarity[];
  color: string;
  emoji: string;
}
