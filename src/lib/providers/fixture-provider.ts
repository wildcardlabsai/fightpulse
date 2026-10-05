import type {
  FighterDataProvider,
  FightDataProvider,
  EventDataProvider,
  OddsDataProvider,
  LiveDataProvider,
  PromotionDataProvider,
  BookmakerDataProvider,
} from "./types";
import {
  FIXTURE_FIGHTERS,
  FIXTURE_FIGHTS,
  FIXTURE_EVENTS,
  FIXTURE_ODDS,
  FIXTURE_ROUND_STATS,
  FIXTURE_MOMENTUM,
  FIXTURE_LIVE_FEED,
  FIXTURE_SIGNALS,
  FIXTURE_PROMOTIONS,
  FIXTURE_BOOKMAKERS,
} from "@/lib/data/fixtures";

export const fixtureFighterProvider: FighterDataProvider = {
  id: "fixture",
  name: "Fixture Data",
  async getFighter(id) {
    return FIXTURE_FIGHTERS.find((f) => f.id === id) ?? null;
  },
  async searchFighters(query) {
    const q = query.toLowerCase();
    return FIXTURE_FIGHTERS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.nickname?.toLowerCase().includes(q),
    );
  },
  async getFightersByDivision(division) {
    return FIXTURE_FIGHTERS.filter((f) => f.division === division);
  },
};

export const fixtureFightProvider: FightDataProvider = {
  id: "fixture",
  name: "Fixture Data",
  async getFight(id) {
    return FIXTURE_FIGHTS.find((f) => f.id === id) ?? null;
  },
  async getFightsByEvent(eventId) {
    return FIXTURE_FIGHTS.filter((f) => f.eventId === eventId);
  },
  async getUpcomingFights(limit = 10) {
    return FIXTURE_FIGHTS.filter((f) => f.status === "SCHEDULED").slice(0, limit);
  },
  async getRecentResults(limit = 10) {
    return FIXTURE_FIGHTS.filter((f) => f.status === "FINISHED").slice(0, limit);
  },
  async getLiveFights() {
    return FIXTURE_FIGHTS.filter((f) => f.status === "LIVE");
  },
};

export const fixtureEventProvider: EventDataProvider = {
  id: "fixture",
  name: "Fixture Data",
  async getEvent(id) {
    return FIXTURE_EVENTS.find((e) => e.id === id) ?? null;
  },
  async getUpcomingEvents(limit = 10) {
    return FIXTURE_EVENTS.filter((e) => e.status === "upcoming").slice(0, limit);
  },
  async getRecentEvents(limit = 10) {
    return FIXTURE_EVENTS.filter((e) => e.status === "completed").slice(0, limit);
  },
};

export const fixtureOddsProvider: OddsDataProvider = {
  id: "fixture",
  name: "Fixture Data",
  async getOddsForFight(fightId) {
    return FIXTURE_ODDS.filter((o) => o.fightId === fightId);
  },
  async getLatestOdds(fightId) {
    const odds = FIXTURE_ODDS.filter((o) => o.fightId === fightId);
    const byBookmaker = new Map<string, (typeof odds)[0]>();
    for (const o of odds) {
      const existing = byBookmaker.get(o.bookmaker.id);
      if (!existing || o.timestamp > existing.timestamp) {
        byBookmaker.set(o.bookmaker.id, o);
      }
    }
    return Array.from(byBookmaker.values());
  },
  async getOddsHistory(fightId, bookmakerId) {
    return FIXTURE_ODDS.filter(
      (o) =>
        o.fightId === fightId &&
        (!bookmakerId || o.bookmaker.id === bookmakerId),
    );
  },
};

export const fixtureLiveProvider: LiveDataProvider = {
  id: "fixture",
  name: "Fixture Data",
  async getLiveFeed(fightId) {
    return FIXTURE_LIVE_FEED;
  },
  async getRoundStats(fightId) {
    return FIXTURE_ROUND_STATS;
  },
  async getMomentum(fightId) {
    return FIXTURE_MOMENTUM.filter((m) => m.fightId === fightId);
  },
  async getSignals(fightId) {
    return FIXTURE_SIGNALS;
  },
};

export const fixturePromotionProvider: PromotionDataProvider = {
  id: "fixture",
  name: "Fixture Data",
  async getPromotion(id) {
    return FIXTURE_PROMOTIONS.find((p) => p.id === id) ?? null;
  },
  async getAllPromotions() {
    return FIXTURE_PROMOTIONS;
  },
};

export const fixtureBookmakerProvider: BookmakerDataProvider = {
  id: "fixture",
  name: "Fixture Data",
  async getBookmaker(id) {
    return FIXTURE_BOOKMAKERS.find((b) => b.id === id) ?? null;
  },
  async getAllBookmakers() {
    return FIXTURE_BOOKMAKERS;
  },
};
