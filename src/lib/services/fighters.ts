import { fixtureFighterProvider } from "@/lib/providers/fixture-provider";
import type { Fighter, WeightClass } from "@/lib/types";

const provider = fixtureFighterProvider;

export const fighters = {
  async getById(id: string): Promise<Fighter | null> {
    return provider.getFighter(id);
  },

  async search(query: string): Promise<Fighter[]> {
    return provider.searchFighters(query);
  },

  async getByDivision(division: WeightClass): Promise<Fighter[]> {
    return provider.getFightersByDivision(division);
  },

  async getAll(): Promise<Fighter[]> {
    return provider.searchFighters("");
  },
};
