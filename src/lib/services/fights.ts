import { fixtureFightProvider } from "@/lib/providers/fixture-provider";
import type { Fight } from "@/lib/types";

const provider = fixtureFightProvider;

export const fights = {
  async getById(id: string): Promise<Fight | null> {
    return provider.getFight(id);
  },

  async getByEvent(eventId: string): Promise<Fight[]> {
    return provider.getFightsByEvent(eventId);
  },

  async getUpcoming(limit?: number): Promise<Fight[]> {
    return provider.getUpcomingFights(limit);
  },

  async getRecentResults(limit?: number): Promise<Fight[]> {
    return provider.getRecentResults(limit);
  },

  async getLive(): Promise<Fight[]> {
    return provider.getLiveFights();
  },

  async getAll(): Promise<Fight[]> {
    const [live, upcoming, results] = await Promise.all([
      provider.getLiveFights(),
      provider.getUpcomingFights(50),
      provider.getRecentResults(50),
    ]);
    const seen = new Set<string>();
    const all: Fight[] = [];
    for (const f of [...live, ...upcoming, ...results]) {
      if (!seen.has(f.id)) {
        seen.add(f.id);
        all.push(f);
      }
    }
    return all;
  },
};
