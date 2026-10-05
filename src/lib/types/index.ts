export type FightStatus =
  | "SCHEDULED"
  | "ANNOUNCED"
  | "NOT_STARTED"
  | "WALKOUT"
  | "LIVE"
  | "ROUND_BREAK"
  | "FINISHED"
  | "CANCELLED"
  | "POSTPONED"
  | "NO_CONTEST";

export type ResultMethod =
  | "KO"
  | "TKO"
  | "UD"
  | "SD"
  | "MD"
  | "TD"
  | "RTD"
  | "DQ"
  | "NC"
  | "DRAW";

export type WeightClass =
  | "Heavyweight"
  | "Cruiserweight"
  | "Light Heavyweight"
  | "Super Middleweight"
  | "Middleweight"
  | "Super Welterweight"
  | "Welterweight"
  | "Super Lightweight"
  | "Lightweight"
  | "Super Featherweight"
  | "Featherweight"
  | "Super Bantamweight"
  | "Bantamweight"
  | "Super Flyweight"
  | "Flyweight"
  | "Light Flyweight"
  | "Minimumweight";

export type Stance = "Orthodox" | "Southpaw" | "Switch";

export interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  nationality: string;
  countryCode: string;
  dateOfBirth?: string;
  division: WeightClass;
  stance: Stance;
  height?: string;
  reach?: string;
  weight?: string;
  wins: number;
  losses: number;
  draws: number;
  kos: number;
  imageUrl?: string;
  status: "active" | "retired" | "inactive";
}

export interface Promotion {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
}

export interface Venue {
  name: string;
  city: string;
  country: string;
  countryCode: string;
}

export interface Event {
  id: string;
  name: string;
  promotion?: Promotion;
  date: string;
  venue: Venue;
  broadcast?: string;
  status: "upcoming" | "live" | "completed" | "cancelled" | "postponed";
  imageUrl?: string;
  fights: Fight[];
}

export interface Fight {
  id: string;
  eventId: string;
  fighterA: Fighter;
  fighterB: Fighter;
  weightClass: WeightClass;
  scheduledRounds: number;
  title?: string;
  status: FightStatus;
  currentRound?: number;
  result?: FightResult;
  isMainEvent?: boolean;
  isCoMain?: boolean;
  orderOnCard?: number;
}

export interface FightResult {
  winner?: string;
  method: ResultMethod;
  round: number;
  time?: string;
}

export interface RoundStats {
  round: number;
  fighterAStats: PunchStats;
  fighterBStats: PunchStats;
}

export interface PunchStats {
  totalPunchesThrown: number;
  totalPunchesLanded: number;
  jabsThrown: number;
  jabsLanded: number;
  powerPunchesThrown: number;
  powerPunchesLanded: number;
  knockdowns: number;
}

export interface OddsSnapshot {
  id: string;
  fightId: string;
  bookmaker: Bookmaker;
  fighterAOdds: number;
  fighterBOdds: number;
  drawOdds?: number;
  timestamp: string;
}

export interface Bookmaker {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface MomentumSnapshot {
  fightId: string;
  round: number;
  timestamp: string;
  fighterAMomentum: number;
  fighterBMomentum: number;
}

export interface Alert {
  id: string;
  type: "fight" | "odds" | "fighter" | "signal" | "news";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  fightId?: string;
  fighterIds?: string[];
}

export interface LiveFeedEntry {
  id: string;
  timestamp: string;
  type: "commentary" | "stat" | "knockdown" | "round_start" | "round_end";
  content: string;
  round?: number;
}

export interface FightSignal {
  name: string;
  status: string;
  fighter?: string;
  confidence: "High" | "Medium" | "Low";
  lastUpdated: string;
}
