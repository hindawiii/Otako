import type { CraftingRecipe, Rarity } from "@/types/games";

export const RECIPES: CraftingRecipe[] = [
  { id: "c1", inputRarity: "common",    outputRarity: "rare",      successRate: 0.75, inputCount: 3 },
  { id: "c2", inputRarity: "rare",      outputRarity: "epic",      successRate: 0.55, inputCount: 3 },
  { id: "c3", inputRarity: "epic",      outputRarity: "legendary", successRate: 0.35, inputCount: 3 },
  { id: "c4", inputRarity: "legendary", outputRarity: "mythic",    successRate: 0.15, inputCount: 3 },
];

export function findRecipe(rarity: Rarity): CraftingRecipe | undefined {
  return RECIPES.find(r => r.inputRarity === rarity);
}
