-- Fight Pulse — Initial Database Schema
-- All timestamps stored as timestamptz (UTC)

-- Enums
CREATE TYPE fight_status AS ENUM (
  'SCHEDULED', 'ANNOUNCED', 'NOT_STARTED', 'WALKOUT',
  'LIVE', 'ROUND_BREAK', 'FINISHED', 'CANCELLED',
  'POSTPONED', 'NO_CONTEST'
);

CREATE TYPE result_method AS ENUM (
  'KO', 'TKO', 'UD', 'SD', 'MD', 'TD', 'RTD', 'DQ', 'NC', 'DRAW'
);

CREATE TYPE stance_type AS ENUM ('Orthodox', 'Southpaw', 'Switch');

CREATE TYPE verification_status AS ENUM ('verified', 'unverified', 'pending');

CREATE TYPE odds_market AS ENUM (
  'moneyline', 'over_under_rounds', 'method_of_victory',
  'round_betting', 'prop'
);

CREATE TYPE data_freshness_status AS ENUM ('live', 'delayed', 'stale', 'unavailable');

CREATE TYPE alert_type AS ENUM ('fight', 'odds', 'fighter', 'signal', 'news');

CREATE TYPE feed_entry_type AS ENUM (
  'commentary', 'stat', 'knockdown', 'round_start', 'round_end'
);

CREATE TYPE event_status AS ENUM (
  'upcoming', 'live', 'completed', 'cancelled', 'postponed'
);

CREATE TYPE fighter_status AS ENUM ('active', 'retired', 'inactive');

-- Data sources (provider tracking)
CREATE TABLE data_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  provider_id text NOT NULL,
  source text NOT NULL,
  retrieved_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  verification verification_status NOT NULL DEFAULT 'unverified',
  UNIQUE (provider, provider_id)
);

-- Promotions
CREATE TABLE promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  logo_url text,
  website text,
  country text,
  founded_year int,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Fighters
CREATE TABLE fighters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  nickname text,
  nationality text NOT NULL,
  country_code text NOT NULL,
  date_of_birth date,
  division text NOT NULL,
  stance stance_type NOT NULL,
  height text,
  reach text,
  weight text,
  wins int NOT NULL DEFAULT 0,
  losses int NOT NULL DEFAULT 0,
  draws int NOT NULL DEFAULT 0,
  kos int NOT NULL DEFAULT 0,
  image_url text,
  status fighter_status NOT NULL DEFAULT 'active',
  verification verification_status NOT NULL DEFAULT 'unverified',
  source_id uuid REFERENCES data_sources(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_fighters_name ON fighters USING gin (name gin_trgm_ops);
CREATE INDEX idx_fighters_division ON fighters (division);
CREATE INDEX idx_fighters_country ON fighters (country_code);

-- Fighter aliases (entity resolution across providers)
CREATE TABLE fighter_aliases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fighter_id uuid NOT NULL REFERENCES fighters(id) ON DELETE CASCADE,
  alias text NOT NULL,
  provider text NOT NULL,
  provider_id text,
  UNIQUE (provider, alias)
);

-- Venues
CREATE TABLE venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  country_code text NOT NULL,
  UNIQUE (name, city)
);

-- Events
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  promotion_id uuid REFERENCES promotions(id),
  date timestamptz NOT NULL,
  venue_id uuid REFERENCES venues(id),
  broadcast text,
  status event_status NOT NULL DEFAULT 'upcoming',
  image_url text,
  total_fights int,
  main_card_fights int,
  under_card_fights int,
  source_id uuid REFERENCES data_sources(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_date ON events (date);
CREATE INDEX idx_events_status ON events (status);

-- Fights
CREATE TABLE fights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  fighter_a_id uuid NOT NULL REFERENCES fighters(id),
  fighter_b_id uuid NOT NULL REFERENCES fighters(id),
  weight_class text NOT NULL,
  scheduled_rounds int NOT NULL DEFAULT 12,
  title text,
  status fight_status NOT NULL DEFAULT 'SCHEDULED',
  current_round int,
  is_main_event boolean NOT NULL DEFAULT false,
  is_co_main boolean NOT NULL DEFAULT false,
  order_on_card int,
  source_id uuid REFERENCES data_sources(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_fights_event ON fights (event_id);
CREATE INDEX idx_fights_status ON fights (status);
CREATE INDEX idx_fights_fighters ON fights (fighter_a_id, fighter_b_id);

-- Fight results
CREATE TABLE fight_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id uuid NOT NULL UNIQUE REFERENCES fights(id) ON DELETE CASCADE,
  winner_id uuid REFERENCES fighters(id),
  method result_method NOT NULL,
  round int NOT NULL,
  time text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Official scorecards
CREATE TABLE scorecards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_result_id uuid NOT NULL REFERENCES fight_results(id) ON DELETE CASCADE,
  judge text NOT NULL,
  fighter_a_score int NOT NULL,
  fighter_b_score int NOT NULL
);

-- Fight status history
CREATE TABLE fight_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id uuid NOT NULL REFERENCES fights(id) ON DELETE CASCADE,
  from_status fight_status,
  to_status fight_status NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT now(),
  source text
);

CREATE INDEX idx_fight_status_history ON fight_status_history (fight_id, changed_at);

-- Bookmakers
CREATE TABLE bookmakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  logo_url text
);

-- Odds snapshots (append-only — never overwrite)
CREATE TABLE odds_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id uuid NOT NULL REFERENCES fights(id) ON DELETE CASCADE,
  bookmaker_id uuid NOT NULL REFERENCES bookmakers(id),
  fighter_a_odds numeric(6,3) NOT NULL,
  fighter_b_odds numeric(6,3) NOT NULL,
  draw_odds numeric(6,3),
  market odds_market NOT NULL DEFAULT 'moneyline',
  recorded_at timestamptz NOT NULL DEFAULT now(),
  source_id uuid REFERENCES data_sources(id)
);

CREATE INDEX idx_odds_fight ON odds_snapshots (fight_id, recorded_at DESC);
CREATE INDEX idx_odds_bookmaker ON odds_snapshots (bookmaker_id);

-- Round statistics
CREATE TABLE round_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id uuid NOT NULL REFERENCES fights(id) ON DELETE CASCADE,
  round int NOT NULL,
  -- Fighter A
  a_punches_thrown int NOT NULL DEFAULT 0,
  a_punches_landed int NOT NULL DEFAULT 0,
  a_jabs_thrown int NOT NULL DEFAULT 0,
  a_jabs_landed int NOT NULL DEFAULT 0,
  a_power_thrown int NOT NULL DEFAULT 0,
  a_power_landed int NOT NULL DEFAULT 0,
  a_knockdowns int NOT NULL DEFAULT 0,
  -- Fighter B
  b_punches_thrown int NOT NULL DEFAULT 0,
  b_punches_landed int NOT NULL DEFAULT 0,
  b_jabs_thrown int NOT NULL DEFAULT 0,
  b_jabs_landed int NOT NULL DEFAULT 0,
  b_power_thrown int NOT NULL DEFAULT 0,
  b_power_landed int NOT NULL DEFAULT 0,
  b_knockdowns int NOT NULL DEFAULT 0,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (fight_id, round)
);

-- Momentum snapshots (proprietary calculated signal)
CREATE TABLE momentum_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id uuid NOT NULL REFERENCES fights(id) ON DELETE CASCADE,
  round int NOT NULL,
  fighter_a_momentum numeric(5,2) NOT NULL,
  fighter_b_momentum numeric(5,2) NOT NULL,
  -- Components
  punch_output numeric(5,2),
  accuracy numeric(5,2),
  power_punches numeric(5,2),
  defence numeric(5,2),
  ring_control numeric(5,2),
  recent_rounds numeric(5,2),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  source_id uuid REFERENCES data_sources(id)
);

CREATE INDEX idx_momentum_fight ON momentum_snapshots (fight_id, round);

-- Fight signals
CREATE TABLE fight_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id uuid NOT NULL REFERENCES fights(id) ON DELETE CASCADE,
  name text NOT NULL,
  status text NOT NULL,
  fighter text,
  confidence text NOT NULL CHECK (confidence IN ('High', 'Medium', 'Low')),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  source_id uuid REFERENCES data_sources(id)
);

-- Live feed entries
CREATE TABLE live_feed_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id uuid NOT NULL REFERENCES fights(id) ON DELETE CASCADE,
  entry_type feed_entry_type NOT NULL,
  content text NOT NULL,
  round int,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_live_feed_fight ON live_feed_entries (fight_id, recorded_at DESC);

-- Alerts
CREATE TABLE alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  alert_type alert_type NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  fight_id uuid REFERENCES fights(id),
  fighter_ids uuid[],
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_alerts_user ON alerts (user_id, read, created_at DESC);

-- News items
CREATE TABLE news_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  summary text,
  source text NOT NULL,
  url text,
  published_at timestamptz NOT NULL,
  fighter_ids uuid[],
  fight_ids uuid[],
  event_ids uuid[],
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_news_published ON news_items (published_at DESC);

-- Data sync tracking
CREATE TABLE data_sync_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  records_processed int DEFAULT 0,
  records_created int DEFAULT 0,
  records_updated int DEFAULT 0,
  errors int DEFAULT 0,
  status text NOT NULL DEFAULT 'running'
);

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
