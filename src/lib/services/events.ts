import { fixtureEventProvider } from "@/lib/providers/fixture-provider";
import type { Event } from "@/lib/types";

const provider = fixtureEventProvider;

export const events = {
  async getById(id: string): Promise<Event | null> {
    return provider.getEvent(id);
  },

  async getUpcoming(limit?: number): Promise<Event[]> {
    return provider.getUpcomingEvents(limit);
  },

  async getRecent(limit?: number): Promise<Event[]> {
    return provider.getRecentEvents(limit);
  },

  async getAll(): Promise<Event[]> {
    const [upcoming, recent] = await Promise.all([
      provider.getUpcomingEvents(50),
      provider.getRecentEvents(50),
    ]);
    const seen = new Set<string>();
    const all: Event[] = [];
    for (const e of [...upcoming, ...recent]) {
      if (!seen.has(e.id)) {
        seen.add(e.id);
        all.push(e);
      }
    }
    return all;
  },
};
