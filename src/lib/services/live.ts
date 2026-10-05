import { fixtureLiveProvider } from "@/lib/providers/fixture-provider";
import type { LiveFeedEntry, RoundStats, MomentumSnapshot, FightSignal } from "@/lib/types";

const provider = fixtureLiveProvider;

export const live = {
  async getFeed(fightId: string): Promise<LiveFeedEntry[]> {
    return provider.getLiveFeed(fightId);
  },

  async getRoundStats(fightId: string): Promise<RoundStats[]> {
    return provider.getRoundStats(fightId);
  },

  async getMomentum(fightId: string): Promise<MomentumSnapshot[]> {
    return provider.getMomentum(fightId);
  },

  async getSignals(fightId: string): Promise<FightSignal[]> {
    return provider.getSignals(fightId);
  },
};
