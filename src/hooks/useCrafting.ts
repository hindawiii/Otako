import { useCallback } from "react";
import type { Gift, Rarity } from "@/types/games";
import { findRecipe } from "@/lib/craftingRecipes";
import { GIFTS, pickRandom } from "@/lib/giftData";
import { useGifts } from "./useGifts";
import { useCoins } from "./useCoins";

export function useCrafting() {
  const { removeGift, addGift, gender } = useGifts();
  const { addCoins } = useCoins();

  const craft = useCallback((giftIds: string[]): { success: boolean; result?: Gift; refund?: number; message: string } => {
    if (giftIds.length < 3) return { success: false, message: "تحتاج 3 هدايا على الأقل" };
    const first = GIFTS.find(g => g.id === giftIds[0]);
    if (!first) return { success: false, message: "هدية غير صالحة" };
    const rarity: Rarity = first.rarity;
    const allSame = giftIds.every(id => GIFTS.find(g => g.id === id)?.rarity === rarity);
    if (!allSame) return { success: false, message: "يجب أن تكون كل الهدايا بنفس المستوى" };

    const recipe = findRecipe(rarity);
    if (!recipe) return { success: false, message: "لا يمكن ترقية هذا المستوى" };

    // consume
    for (const id of giftIds.slice(0, recipe.inputCount)) {
      if (!removeGift(id, 1)) return { success: false, message: "فشل استهلاك الهدايا" };
    }

    const success = Math.random() < recipe.successRate;
    if (success) {
      const pool = GIFTS.filter(g => g.rarity === recipe.outputRarity && (g.gender === gender || g.gender === "neutral"));
      const result = pickRandom(pool.length ? pool : GIFTS.filter(g => g.rarity === recipe.outputRarity));
      addGift(result.id);
      return { success: true, result, message: `🎉 نجحت! حصلت على ${result.name}` };
    } else {
      const refund = Math.floor(giftIds.slice(0, recipe.inputCount).reduce((s, id) => {
        const g = GIFTS.find(x => x.id === id);
        return s + (g?.value ?? 0) * 0.5;
      }, 0));
      addCoins(refund);
      return { success: false, refund, message: `💔 فشلت الصياغة. استرداد ${refund} عملة` };
    }
  }, [removeGift, addGift, addCoins, gender]);

  return { craft };
}
