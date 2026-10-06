import { fixtureOddsProvider, fixtureBookmakerProvider } from "@/lib/providers/fixture-provider";
import type { OddsSnapshot, Bookmaker } from "@/lib/types";

const oddsProvider = fixtureOddsProvider;
const bookmakerProvider = fixtureBookmakerProvider;

export const odds = {
  async getForFight(fightId: string): Promise<OddsSnapshot[]> {
    return oddsProvider.getOddsForFight(fightId);
  },

  async getLatest(fightId: string): Promise<OddsSnapshot[]> {
    return oddsProvider.getLatestOdds(fightId);
  },

  async getHistory(fightId: string, bookmakerId?: string): Promise<OddsSnapshot[]> {
    return oddsProvider.getOddsHistory(fightId, bookmakerId);
  },

  async getAllBookmakers(): Promise<Bookmaker[]> {
    return bookmakerProvider.getAllBookmakers();
  },
};
