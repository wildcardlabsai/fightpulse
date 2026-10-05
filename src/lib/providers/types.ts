import type {
  Fighter,
  Fight,
  Event,
  OddsSnapshot,
  MomentumSnapshot,
  RoundStats,
  FightSignal,
  LiveFeedEntry,
  Promotion,
  Bookmaker,
  NewsItem,
} from "@/lib/types";

export interface FighterDataProvider {
  id: string;
  name: string;
  getFighter(id: string): Promise<Fighter | null>;
  searchFighters(query: string): Promise<Fighter[]>;
  getFightersByDivision(division: string): Promise<Fighter[]>;
}

export interface FightDataProvider {
  id: string;
  name: string;
  getFight(id: string): Promise<Fight | null>;
  getFightsByEvent(eventId: string): Promise<Fight[]>;
  getUpcomingFights(limit?: number): Promise<Fight[]>;
  getRecentResults(limit?: number): Promise<Fight[]>;
  getLiveFights(): Promise<Fight[]>;
}

export interface EventDataProvider {
  id: string;
  name: string;
  getEvent(id: string): Promise<Event | null>;
  getUpcomingEvents(limit?: number): Promise<Event[]>;
  getRecentEvents(limit?: number): Promise<Event[]>;
}

export interface OddsDataProvider {
  id: string;
  name: string;
  getOddsForFight(fightId: string): Promise<OddsSnapshot[]>;
  getLatestOdds(fightId: string): Promise<OddsSnapshot[]>;
  getOddsHistory(
    fightId: string,
    bookmakerId?: string,
  ): Promise<OddsSnapshot[]>;
}

export interface LiveDataProvider {
  id: string;
  name: string;
  getLiveFeed(fightId: string): Promise<LiveFeedEntry[]>;
  getRoundStats(fightId: string): Promise<RoundStats[]>;
  getMomentum(fightId: string): Promise<MomentumSnapshot[]>;
  getSignals(fightId: string): Promise<FightSignal[]>;
}

export interface PromotionDataProvider {
  id: string;
  name: string;
  getPromotion(id: string): Promise<Promotion | null>;
  getAllPromotions(): Promise<Promotion[]>;
}

export interface BookmakerDataProvider {
  id: string;
  name: string;
  getBookmaker(id: string): Promise<Bookmaker | null>;
  getAllBookmakers(): Promise<Bookmaker[]>;
}
