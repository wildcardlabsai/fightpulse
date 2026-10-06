import { fixturePromotionProvider } from "@/lib/providers/fixture-provider";
import type { Promotion } from "@/lib/types";

const provider = fixturePromotionProvider;

export const promotions = {
  async getById(id: string): Promise<Promotion | null> {
    return provider.getPromotion(id);
  },

  async getAll(): Promise<Promotion[]> {
    return provider.getAllPromotions();
  },
};
