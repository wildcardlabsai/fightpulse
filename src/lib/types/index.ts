// ---------------------------------------------------------------------------
// Fight Pulse — Canonical Data Model
// ---------------------------------------------------------------------------

// ---- Enums / union types --------------------------------------------------

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

export type VerificationStatus = "verified" | "unverified" | "pending";

export type OddsMarket =
  | "moneyline"
  | "over_under_rounds"
  | "method_of_victory"
  | "round_betting"
  | "prop";

// ---- Source tracking -------------------------------------------------------

export interface DataSource {
  id: string;
  provider: string;
  providerId: string;
  source: string;
  retrievedAt: string;
  updatedAt: string;
  verificationStatus: VerificationStatus;
}

export interface DataFreshness {
  status: "live" | "delayed" | "stale" | "unavailable";
  lastUpdatedAt?: string;
  delaySeconds?: number;
}

export interface FightStatusTransition {
  from: FightStatus;
  to: FightStatus;
  timestamp: string;
  source?: string;
}

// ---- Core entities ---------------------------------------------------------

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
  // extended fields
  providerId?: string;
  source?: DataSource;
  aliases?: string[];
  verificationStatus?: VerificationStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface Promotion {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  // extended fields
  country?: string;
  foundedYear?: number;
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
  // extended fields
  source?: DataSource;
  totalFights?: number;
  mainCardFights?: number;
  underCardFights?: number;
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
  // extended fields
  source?: DataSource;
}

export interface ScoreCard {
  judge: string;
  fighterAScore: number;
  fighterBScore: number;
}

export interface FightResult {
  winner?: string;
  method: ResultMethod;
  round: number;
  time?: string;
  // extended fields
  officialScoreCards?: ScoreCard[];
}

// ---- Stats -----------------------------------------------------------------

export interface PunchStats {
  totalPunchesThrown: number;
  totalPunchesLanded: number;
  jabsThrown: number;
  jabsLanded: number;
  powerPunchesThrown: number;
  powerPunchesLanded: number;
  knockdowns: number;
}

export interface RoundStats {
  round: number;
  fighterAStats: PunchStats;
  fighterBStats: PunchStats;
}

// ---- Odds ------------------------------------------------------------------

export interface Bookmaker {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface OddsSnapshot {
  id: string;
  fightId: string;
  bookmaker: Bookmaker;
  fighterAOdds: number;
  fighterBOdds: number;
  drawOdds?: number;
  timestamp: string;
  // extended fields
  market?: OddsMarket;
  source?: DataSource;
}

// ---- Momentum --------------------------------------------------------------

export interface MomentumComponents {
  punchOutput: number;
  accuracy: number;
  powerPunches: number;
  defence: number;
  ringControl: number;
  recentRounds: number;
}

export interface MomentumSnapshot {
  fightId: string;
  round: number;
  timestamp: string;
  fighterAMomentum: number;
  fighterBMomentum: number;
  // extended fields
  source?: DataSource;
  components?: MomentumComponents;
}

// ---- Alerts & feed ---------------------------------------------------------

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

// ---- Signals ---------------------------------------------------------------

export interface FightSignal {
  name: string;
  status: string;
  fighter?: string;
  confidence: "High" | "Medium" | "Low";
  lastUpdated: string;
  // extended fields
  id?: string;
  fightId?: string;
  timestamp?: string;
  source?: DataSource;
}

// ---- News ------------------------------------------------------------------

export interface NewsItem {
  id: string;
  title: string;
  content?: string;
  summary?: string;
  source: string;
  url?: string;
  publishedAt: string;
  fighterIds?: string[];
  fightIds?: string[];
  eventIds?: string[];
}
