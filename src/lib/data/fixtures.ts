/**
 * FIXTURE DATA — for development UI purposes only.
 * This data is NOT verified boxing data and must NOT be used in production.
 * It will be replaced by real provider integrations.
 */

import type {
  Fighter,
  Fight,
  Event,
  Promotion,
  OddsSnapshot,
  Bookmaker,
  RoundStats,
  MomentumSnapshot,
  Alert,
  LiveFeedEntry,
  FightSignal,
} from "@/lib/types";

export const FIXTURE_BOOKMAKERS: Bookmaker[] = [
  { id: "b365", name: "bet365" },
  { id: "whill", name: "William Hill" },
  { id: "ppower", name: "Paddy Power" },
  { id: "unibet", name: "Unibet" },
  { id: "skybet", name: "Sky Bet" },
  { id: "betfred", name: "Betfred" },
];

export const FIXTURE_PROMOTIONS: Promotion[] = [
  { id: "matchroom", name: "Matchroom Boxing", logoUrl: "/promotions/matchroom.png" },
  { id: "queensberry", name: "Queensberry Promotions", logoUrl: "/promotions/queensberry.png" },
  { id: "boxxer", name: "BOXXER", logoUrl: "/promotions/boxxer.png" },
  { id: "toprank", name: "Top Rank", logoUrl: "/promotions/toprank.png" },
  { id: "pbc", name: "PBC", logoUrl: "/promotions/pbc.png" },
  { id: "goldenboy", name: "Golden Boy", logoUrl: "/promotions/goldenboy.png" },
];

export const FIXTURE_FIGHTERS: Fighter[] = [
  {
    id: "f1",
    name: "Anthony Joshua",
    nickname: "AJ",
    nationality: "British",
    countryCode: "GB",
    dateOfBirth: "1989-10-15",
    division: "Heavyweight",
    stance: "Orthodox",
    height: "6'6\"",
    reach: "82\"",
    weight: "17st 6lb",
    wins: 28,
    losses: 3,
    draws: 0,
    kos: 25,
    imageUrl: "/fighters/joshua.jpg",
    status: "active",
  },
  {
    id: "f2",
    name: "Deontay Wilder",
    nickname: "The Bronze Bomber",
    nationality: "American",
    countryCode: "US",
    dateOfBirth: "1985-10-22",
    division: "Heavyweight",
    stance: "Orthodox",
    height: "6'7\"",
    reach: "83\"",
    wins: 43,
    losses: 2,
    draws: 1,
    kos: 42,
    imageUrl: "/fighters/wilder.jpg",
    status: "active",
  },
  {
    id: "f3",
    name: "Shakur Stevenson",
    nickname: "",
    nationality: "American",
    countryCode: "US",
    division: "Lightweight",
    stance: "Southpaw",
    height: "5'8\"",
    reach: "68\"",
    wins: 22,
    losses: 0,
    draws: 0,
    kos: 10,
    imageUrl: "/fighters/stevenson.jpg",
    status: "active",
  },
  {
    id: "f4",
    name: "Artem Harutyunyan",
    nationality: "German",
    countryCode: "DE",
    division: "Lightweight",
    stance: "Orthodox",
    height: "5'7\"",
    reach: "67\"",
    wins: 12,
    losses: 1,
    draws: 0,
    kos: 7,
    imageUrl: "/fighters/harutyunyan.jpg",
    status: "active",
  },
  {
    id: "f5",
    name: "Jack Catterall",
    nationality: "British",
    countryCode: "GB",
    division: "Super Lightweight",
    stance: "Southpaw",
    height: "5'10\"",
    reach: "71\"",
    wins: 29,
    losses: 1,
    draws: 0,
    kos: 13,
    status: "active",
  },
  {
    id: "f6",
    name: "Regis Prograis",
    nationality: "American",
    countryCode: "US",
    division: "Super Lightweight",
    stance: "Southpaw",
    height: "5'8\"",
    reach: "69\"",
    wins: 29,
    losses: 2,
    draws: 0,
    kos: 24,
    status: "active",
  },
  {
    id: "f7",
    name: "Daniel Dubois",
    nickname: "Dynamite",
    nationality: "British",
    countryCode: "GB",
    division: "Heavyweight",
    stance: "Orthodox",
    height: "6'5\"",
    reach: "78\"",
    wins: 20,
    losses: 2,
    draws: 0,
    kos: 19,
    status: "active",
  },
  {
    id: "f8",
    name: "Filip Hrgovic",
    nationality: "Croatian",
    countryCode: "HR",
    division: "Heavyweight",
    stance: "Orthodox",
    height: "6'5\"",
    reach: "81\"",
    wins: 17,
    losses: 0,
    draws: 0,
    kos: 14,
    status: "active",
  },
];

export const FIXTURE_EVENTS: Event[] = [
  {
    id: "e1",
    name: "Catterall vs Prograis",
    promotion: FIXTURE_PROMOTIONS[0],
    date: "2025-04-20T22:00:00Z",
    venue: { name: "Co-op Live", city: "Manchester", country: "UK", countryCode: "GB" },
    broadcast: "DAZN",
    status: "upcoming",
    fights: [],
  },
  {
    id: "e2",
    name: "Dubois vs Hrgovic",
    promotion: FIXTURE_PROMOTIONS[1],
    date: "2025-04-27T21:00:00Z",
    venue: { name: "Wembley Stadium", city: "London", country: "UK", countryCode: "GB" },
    broadcast: "TNT Sports",
    status: "upcoming",
    fights: [],
  },
  {
    id: "e3",
    name: "Stevenson vs Harutyunyan",
    promotion: FIXTURE_PROMOTIONS[3],
    date: "2025-04-12T23:00:00Z",
    venue: { name: "Prudential Center", city: "Newark", country: "USA", countryCode: "US" },
    broadcast: "ESPN",
    status: "live",
    fights: [],
  },
];

export const FIXTURE_FIGHTS: Fight[] = [
  {
    id: "fight-1",
    eventId: "e3",
    fighterA: FIXTURE_FIGHTERS[2],
    fighterB: FIXTURE_FIGHTERS[3],
    weightClass: "Lightweight",
    scheduledRounds: 12,
    title: "WBC Lightweight Title",
    status: "LIVE",
    currentRound: 6,
    isMainEvent: true,
    orderOnCard: 1,
  },
  {
    id: "fight-2",
    eventId: "e1",
    fighterA: FIXTURE_FIGHTERS[4],
    fighterB: FIXTURE_FIGHTERS[5],
    weightClass: "Super Lightweight",
    scheduledRounds: 12,
    title: "WBO Super Lightweight Title",
    status: "SCHEDULED",
    isMainEvent: true,
    orderOnCard: 1,
  },
  {
    id: "fight-3",
    eventId: "e2",
    fighterA: FIXTURE_FIGHTERS[6],
    fighterB: FIXTURE_FIGHTERS[7],
    weightClass: "Heavyweight",
    scheduledRounds: 12,
    title: "WBA Interim Heavyweight Title",
    status: "SCHEDULED",
    isMainEvent: true,
    orderOnCard: 1,
  },
  {
    id: "fight-4",
    eventId: "e1",
    fighterA: FIXTURE_FIGHTERS[0],
    fighterB: FIXTURE_FIGHTERS[1],
    weightClass: "Heavyweight",
    scheduledRounds: 12,
    status: "SCHEDULED",
    isMainEvent: false,
    orderOnCard: 2,
  },
];

export const FIXTURE_ODDS: OddsSnapshot[] = [
  { id: "o1", fightId: "fight-1", bookmaker: FIXTURE_BOOKMAKERS[0], fighterAOdds: 1.22, fighterBOdds: 4.20, timestamp: "2025-04-12T23:30:00Z" },
  { id: "o2", fightId: "fight-1", bookmaker: FIXTURE_BOOKMAKERS[1], fighterAOdds: 1.25, fighterBOdds: 4.00, timestamp: "2025-04-12T23:30:00Z" },
  { id: "o3", fightId: "fight-1", bookmaker: FIXTURE_BOOKMAKERS[2], fighterAOdds: 1.20, fighterBOdds: 4.33, timestamp: "2025-04-12T23:30:00Z" },
  { id: "o4", fightId: "fight-1", bookmaker: FIXTURE_BOOKMAKERS[3], fighterAOdds: 1.24, fighterBOdds: 4.10, timestamp: "2025-04-12T23:30:00Z" },
  { id: "o5", fightId: "fight-1", bookmaker: FIXTURE_BOOKMAKERS[4], fighterAOdds: 1.22, fighterBOdds: 4.20, timestamp: "2025-04-12T23:30:00Z" },
  { id: "o6", fightId: "fight-2", bookmaker: FIXTURE_BOOKMAKERS[0], fighterAOdds: 1.62, fighterBOdds: 2.30, timestamp: "2025-04-10T12:00:00Z" },
  { id: "o7", fightId: "fight-2", bookmaker: FIXTURE_BOOKMAKERS[1], fighterAOdds: 1.60, fighterBOdds: 2.35, timestamp: "2025-04-10T12:00:00Z" },
  { id: "o8", fightId: "fight-3", bookmaker: FIXTURE_BOOKMAKERS[0], fighterAOdds: 1.44, fighterBOdds: 2.75, timestamp: "2025-04-10T12:00:00Z" },
  { id: "o9", fightId: "fight-3", bookmaker: FIXTURE_BOOKMAKERS[1], fighterAOdds: 1.40, fighterBOdds: 2.80, timestamp: "2025-04-10T12:00:00Z" },
  { id: "o10", fightId: "fight-4", bookmaker: FIXTURE_BOOKMAKERS[0], fighterAOdds: 1.36, fighterBOdds: 3.50, timestamp: "2025-04-10T12:00:00Z" },
];

export const FIXTURE_ROUND_STATS: RoundStats[] = [
  {
    round: 1,
    fighterAStats: { totalPunchesThrown: 22, totalPunchesLanded: 10, jabsThrown: 12, jabsLanded: 6, powerPunchesThrown: 10, powerPunchesLanded: 4, knockdowns: 0 },
    fighterBStats: { totalPunchesThrown: 15, totalPunchesLanded: 5, jabsThrown: 8, jabsLanded: 2, powerPunchesThrown: 7, powerPunchesLanded: 3, knockdowns: 0 },
  },
  {
    round: 2,
    fighterAStats: { totalPunchesThrown: 25, totalPunchesLanded: 12, jabsThrown: 14, jabsLanded: 7, powerPunchesThrown: 11, powerPunchesLanded: 5, knockdowns: 0 },
    fighterBStats: { totalPunchesThrown: 18, totalPunchesLanded: 6, jabsThrown: 10, jabsLanded: 3, powerPunchesThrown: 8, powerPunchesLanded: 3, knockdowns: 0 },
  },
  {
    round: 3,
    fighterAStats: { totalPunchesThrown: 20, totalPunchesLanded: 9, jabsThrown: 11, jabsLanded: 5, powerPunchesThrown: 9, powerPunchesLanded: 4, knockdowns: 0 },
    fighterBStats: { totalPunchesThrown: 14, totalPunchesLanded: 4, jabsThrown: 7, jabsLanded: 2, powerPunchesThrown: 7, powerPunchesLanded: 2, knockdowns: 0 },
  },
  {
    round: 4,
    fighterAStats: { totalPunchesThrown: 28, totalPunchesLanded: 13, jabsThrown: 16, jabsLanded: 8, powerPunchesThrown: 12, powerPunchesLanded: 5, knockdowns: 0 },
    fighterBStats: { totalPunchesThrown: 16, totalPunchesLanded: 5, jabsThrown: 9, jabsLanded: 3, powerPunchesThrown: 7, powerPunchesLanded: 2, knockdowns: 0 },
  },
  {
    round: 5,
    fighterAStats: { totalPunchesThrown: 30, totalPunchesLanded: 14, jabsThrown: 18, jabsLanded: 9, powerPunchesThrown: 12, powerPunchesLanded: 5, knockdowns: 0 },
    fighterBStats: { totalPunchesThrown: 13, totalPunchesLanded: 4, jabsThrown: 6, jabsLanded: 2, powerPunchesThrown: 7, powerPunchesLanded: 2, knockdowns: 0 },
  },
  {
    round: 6,
    fighterAStats: { totalPunchesThrown: 24, totalPunchesLanded: 11, jabsThrown: 14, jabsLanded: 7, powerPunchesThrown: 10, powerPunchesLanded: 4, knockdowns: 0 },
    fighterBStats: { totalPunchesThrown: 12, totalPunchesLanded: 4, jabsThrown: 4, jabsLanded: 1, powerPunchesThrown: 8, powerPunchesLanded: 3, knockdowns: 0 },
  },
];

export const FIXTURE_MOMENTUM: MomentumSnapshot[] = [
  { fightId: "fight-1", round: 1, timestamp: "2025-04-12T23:05:00Z", fighterAMomentum: 55, fighterBMomentum: 45 },
  { fightId: "fight-1", round: 2, timestamp: "2025-04-12T23:10:00Z", fighterAMomentum: 58, fighterBMomentum: 42 },
  { fightId: "fight-1", round: 3, timestamp: "2025-04-12T23:15:00Z", fighterAMomentum: 54, fighterBMomentum: 46 },
  { fightId: "fight-1", round: 4, timestamp: "2025-04-12T23:20:00Z", fighterAMomentum: 62, fighterBMomentum: 38 },
  { fightId: "fight-1", round: 5, timestamp: "2025-04-12T23:25:00Z", fighterAMomentum: 65, fighterBMomentum: 35 },
  { fightId: "fight-1", round: 6, timestamp: "2025-04-12T23:30:00Z", fighterAMomentum: 68, fighterBMomentum: 32 },
];

export const FIXTURE_LIVE_FEED: LiveFeedEntry[] = [
  { id: "lf1", timestamp: "2025-04-12T23:30:15Z", type: "commentary", content: "Round 6 in progress. Stevenson controlling the centre of the ring early in the round.", round: 6 },
  { id: "lf2", timestamp: "2025-04-12T23:29:48Z", type: "stat", content: "Clean right hand from Stevenson. Stevenson lands a crisp right hand to the head.", round: 6 },
  { id: "lf3", timestamp: "2025-04-12T23:29:32Z", type: "commentary", content: "Stevenson increases output. Higher punch volume in the last 30 seconds.", round: 6 },
  { id: "lf4", timestamp: "2025-04-12T23:28:58Z", type: "commentary", content: "Harutyunyan on the back foot. Stevenson applying consistent pressure.", round: 6 },
  { id: "lf5", timestamp: "2025-04-12T23:28:21Z", type: "stat", content: "Good combination from Stevenson. 1-2 lands clean. Harutyunyan covering up.", round: 6 },
];

export const FIXTURE_SIGNALS: FightSignal[] = [
  { name: "Momentum Leader", status: "Stevenson", fighter: "Stevenson", confidence: "High", lastUpdated: "2:15" },
  { name: "Output Trend", status: "Increasing", confidence: "High", lastUpdated: "2:15" },
  { name: "Power Punch Impact", status: "Strong", confidence: "Medium", lastUpdated: "1:58" },
  { name: "Defence Effectiveness", status: "High", confidence: "High", lastUpdated: "2:15" },
  { name: "Ring Control", status: "Stevenson", fighter: "Stevenson", confidence: "High", lastUpdated: "2:15" },
  { name: "Fatigue Indicators", status: "Harutyunyan", fighter: "Harutyunyan", confidence: "Medium", lastUpdated: "1:32" },
];

export const FIXTURE_ALERTS: Alert[] = [
  { id: "a1", type: "odds", title: "Odds Drop Detected", description: "Haney odds shortened from 1.92 to 1.75 (-9%)", timestamp: "2025-04-12T23:28:00Z", read: false, fightId: "fight-2" },
  { id: "a2", type: "fight", title: "Fight Confirmed", description: "Catterall vs Prograis officially announced for 20 Apr 2025", timestamp: "2025-04-12T23:16:00Z", read: false, fightId: "fight-2" },
  { id: "a3", type: "signal", title: "Fight Pulse Signal", description: "Strong early momentum for Stevenson", timestamp: "2025-04-12T22:58:00Z", read: false, fightId: "fight-1" },
  { id: "a4", type: "news", title: "News Update", description: "Joshua discusses potential Wilder fight in latest interview", timestamp: "2025-04-12T22:30:00Z", read: true },
  { id: "a5", type: "odds", title: "Odds Movement", description: "Dubois odds drifted from 1.28 to 1.36 (+6%)", timestamp: "2025-04-12T20:00:00Z", read: true, fightId: "fight-3" },
];

export function getFixtureFighter(id: string): Fighter | undefined {
  return FIXTURE_FIGHTERS.find((f) => f.id === id);
}

export function getFixtureFight(id: string): Fight | undefined {
  return FIXTURE_FIGHTS.find((f) => f.id === id);
}

export function getFixtureEvent(id: string): Event | undefined {
  return FIXTURE_EVENTS.find((e) => e.id === id);
}

export function getFixtureOddsForFight(fightId: string): OddsSnapshot[] {
  return FIXTURE_ODDS.filter((o) => o.fightId === fightId);
}

export function getTotalStats(stats: RoundStats[]): { fighterA: import("@/lib/types").PunchStats; fighterB: import("@/lib/types").PunchStats } {
  const sum = (arr: RoundStats[], key: keyof import("@/lib/types").PunchStats, side: "fighterAStats" | "fighterBStats") =>
    arr.reduce((acc, r) => acc + r[side][key], 0);

  return {
    fighterA: {
      totalPunchesThrown: sum(stats, "totalPunchesThrown", "fighterAStats"),
      totalPunchesLanded: sum(stats, "totalPunchesLanded", "fighterAStats"),
      jabsThrown: sum(stats, "jabsThrown", "fighterAStats"),
      jabsLanded: sum(stats, "jabsLanded", "fighterAStats"),
      powerPunchesThrown: sum(stats, "powerPunchesThrown", "fighterAStats"),
      powerPunchesLanded: sum(stats, "powerPunchesLanded", "fighterAStats"),
      knockdowns: sum(stats, "knockdowns", "fighterAStats"),
    },
    fighterB: {
      totalPunchesThrown: sum(stats, "totalPunchesThrown", "fighterBStats"),
      totalPunchesLanded: sum(stats, "totalPunchesLanded", "fighterBStats"),
      jabsThrown: sum(stats, "jabsThrown", "fighterBStats"),
      jabsLanded: sum(stats, "jabsLanded", "fighterBStats"),
      powerPunchesThrown: sum(stats, "powerPunchesThrown", "fighterBStats"),
      powerPunchesLanded: sum(stats, "powerPunchesLanded", "fighterBStats"),
      knockdowns: sum(stats, "knockdowns", "fighterBStats"),
    },
  };
}
