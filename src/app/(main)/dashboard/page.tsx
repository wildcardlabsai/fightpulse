"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Radio,
  Calendar,
  TrendingUp,
  Trophy,
  ChevronRight,
  Clock,
  MapPin,
  Tv,
  Star,
  Brain,
} from "lucide-react";
import Card from "@/components/shared/Card";
import LiveBadge from "@/components/shared/LiveBadge";
import StatBar from "@/components/shared/StatBar";
import OddsDisplay from "@/components/shared/OddsDisplay";
import {
  FIXTURE_FIGHTS,
  FIXTURE_EVENTS,
  FIXTURE_FIGHTERS,
  FIXTURE_MOMENTUM,
  FIXTURE_ODDS,
  FIXTURE_ALERTS,
  FIXTURE_PROMOTIONS,
} from "@/lib/data/fixtures";
import { getCountryFlag } from "@/lib/utils";

export default function DashboardPage() {
  const liveFight = FIXTURE_FIGHTS.find((f) => f.status === "LIVE");
  const upcomingFights = FIXTURE_FIGHTS.filter((f) => f.status === "SCHEDULED");
  const upcomingEvents = FIXTURE_EVENTS.filter((e) => e.status === "upcoming");
  const latestMomentum = FIXTURE_MOMENTUM[FIXTURE_MOMENTUM.length - 1];

  return (
    <div className="space-y-0">
      {liveFight && (
        <LiveFightHero fight={liveFight} momentum={latestMomentum} />
      )}

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-12 lg:p-6">
        {/* Left column */}
        <div className="space-y-4 lg:col-span-8">
          <UpcomingEventsSection events={upcomingEvents} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <OddsMoversSection />
            <LatestResultsSection />
          </div>
          <IntelligenceSection />
        </div>

        {/* Right column */}
        <div className="space-y-4 lg:col-span-4">
          <TodaysLiveFightsCard />
          <UpcomingNextCard fights={upcomingFights} />
          <FollowedFightersCard />
          <PromotionsCard />
        </div>
      </div>
    </div>
  );
}

function LiveFightHero({
  fight,
  momentum,
}: {
  fight: (typeof FIXTURE_FIGHTS)[0];
  momentum: (typeof FIXTURE_MOMENTUM)[0];
}) {
  const odds = FIXTURE_ODDS.filter((o) => o.fightId === fight.id);
  const bestA = odds.length > 0 ? Math.min(...odds.map((o) => o.fighterAOdds)) : null;
  const bestB = odds.length > 0 ? Math.max(...odds.map((o) => o.fighterBOdds)) : null;

  return (
    <div className="relative overflow-hidden border-b border-border bg-gradient-to-r from-card via-surface to-card">
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/40" />
      <div className="relative px-4 py-6 lg:px-8 lg:py-8">
        <div className="mb-2 flex items-center gap-3">
          <LiveBadge size="md" />
          <span className="text-xs font-medium text-muted">{fight.title}</span>
          <span className="rounded bg-surface px-2 py-0.5 text-xs font-bold text-white">
            ROUND {fight.currentRound} OF {fight.scheduledRounds}
          </span>
          <span className="text-sm font-mono font-bold text-fp-red">2:15</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          {/* Fighter A */}
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-border bg-card text-2xl font-bold text-muted lg:h-28 lg:w-28">
              {fight.fighterA.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="text-xs text-muted">{getCountryFlag(fight.fighterA.countryCode)}</p>
              <p className="text-xl font-black uppercase text-white lg:text-3xl">
                {fight.fighterA.name.split(" ").pop()}
              </p>
              <p className="text-xs text-muted">
                {fight.fighterA.wins}-{fight.fighterA.losses}-{fight.fighterA.draws}
              </p>
            </div>
          </div>

          {/* Center - Momentum */}
          <div className="hidden flex-col items-center gap-2 md:flex">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Fight Pulse Momentum</p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="text-3xl font-black text-fp-red">{momentum.fighterAMomentum}%</span>
              </div>
              <div className="h-3 w-48 overflow-hidden rounded-full bg-fp-blue/30">
                <motion.div
                  className="h-full rounded-full bg-fp-red"
                  initial={{ width: 0 }}
                  animate={{ width: `${momentum.fighterAMomentum}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="text-center">
                <span className="text-3xl font-black text-fp-blue">{momentum.fighterBMomentum}%</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {bestA && <OddsDisplay odds={bestA} label="Favourite" movement={-0.08} size="sm" />}
              <div className="flex h-8 w-16 items-center justify-center">
                <span className="text-xs font-bold text-muted">VS</span>
              </div>
              {bestB && <OddsDisplay odds={bestB} label="Underdog" movement={0.62} size="sm" />}
            </div>
          </div>

          {/* Fighter B */}
          <div className="flex flex-row-reverse items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-border bg-card text-2xl font-bold text-muted lg:h-28 lg:w-28">
              {fight.fighterB.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="text-right">
              <p className="text-xs text-muted">{getCountryFlag(fight.fighterB.countryCode)}</p>
              <p className="text-xl font-black uppercase text-white lg:text-3xl">
                {fight.fighterB.name.split(" ").pop()}
              </p>
              <p className="text-xs text-muted">
                {fight.fighterB.wins}-{fight.fighterB.losses}-{fight.fighterB.draws}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpcomingEventsSection({ events }: { events: typeof FIXTURE_EVENTS }) {
  return (
    <Card title="Upcoming Major Events" titleIcon={<Calendar className="h-4 w-4" />} action={{ label: "View All Events" }}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="group rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border-bright hover:bg-card-hover"
          >
            <div className="mb-2 flex items-start justify-between">
              <div className="rounded bg-fp-red/20 px-2 py-1">
                <p className="text-[10px] font-bold uppercase text-fp-red">
                  {new Date(event.date).toLocaleDateString("en-GB", { month: "short" }).toUpperCase()}
                </p>
                <p className="text-lg font-black text-white">
                  {new Date(event.date).getDate()}
                </p>
              </div>
              {event.promotion && (
                <span className="text-[10px] text-muted">{event.promotion.name}</span>
              )}
            </div>
            <h4 className="mt-2 text-sm font-bold text-white group-hover:text-fp-red">
              {event.name}
            </h4>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-muted">
              <MapPin className="h-3 w-3" />
              {event.venue.name}, {event.venue.city}
            </div>
            {event.broadcast && (
              <div className="mt-1 flex items-center gap-1 text-[10px] text-muted">
                <Tv className="h-3 w-3" />
                {event.broadcast}
              </div>
            )}
          </Link>
        ))}
      </div>
    </Card>
  );
}

function OddsMoversSection() {
  const movers = [
    { fight: "Catterall vs Prograis", change: "+26%", from: "1.90", to: "2.40", direction: "up" as const },
    { fight: "Dubois vs Hrgovic", change: "-24%", from: "1.70", to: "1.36", direction: "down" as const },
    { fight: "Stevenson vs Zepeda", change: "+22%", from: "1.75", to: "2.15", direction: "up" as const },
  ];

  return (
    <Card title="Biggest Odds Movers" titleIcon={<TrendingUp className="h-4 w-4" />} action={{ label: "View Odds Centre" }}>
      <div className="space-y-3">
        {movers.map((m, i) => (
          <div key={i} className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 transition-colors hover:bg-card-hover">
            <div>
              <p className="text-xs font-medium text-white">{m.fight}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold ${m.direction === "up" ? "text-fp-red" : "text-success"}`}>
                {m.direction === "up" ? <TrendingUp className="inline h-3 w-3" /> : null} {m.change}
              </span>
              <span className="text-[10px] text-muted">{m.from} → {m.to}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function LatestResultsSection() {
  const results = [
    { date: "Sat 6 Apr", fighters: "Ryan Garcia vs Devin Haney", method: "TKO R7", methodColor: "text-fp-red" },
    { date: "Sat 6 Apr", fighters: "Liam Smith vs Chris Eubank Jr.", method: "UD", methodColor: "text-muted" },
    { date: "Fri 5 Apr", fighters: "Mikaela Mayer vs Sandy Ryan", method: "UD", methodColor: "text-muted" },
    { date: "Fri 5 Apr", fighters: "Jai Opetaia vs Ellis Zorro", method: "TKO R4", methodColor: "text-fp-red" },
  ];

  return (
    <Card title="Latest Results" titleIcon={<Trophy className="h-4 w-4" />} action={{ label: "View All" }}>
      <div className="space-y-2">
        {results.map((r, i) => (
          <div key={i} className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-xs">
            <span className="w-16 text-muted">{r.date}</span>
            <span className="flex-1 font-medium text-white">{r.fighters}</span>
            <span className={`font-bold ${r.methodColor}`}>{r.method}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TodaysLiveFightsCard() {
  return (
    <Card title="Today's Live Fights" titleIcon={<Radio className="h-4 w-4" />} liveBadge action={{ label: "View All" }}>
      <div className="space-y-3">
        <div className="rounded-md border border-fp-red/30 bg-fp-red/5 p-3">
          <div className="flex items-center gap-2 text-[10px]">
            <span className="rounded bg-fp-red px-1 py-0.5 font-bold text-white">R6</span>
            <span className="font-mono text-fp-red">2:15</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Shakur Stevenson</p>
              <p className="text-[10px] text-muted">vs Harutyunyan</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-white">1.22</span>
              <span className="mx-2 text-muted">·</span>
              <span className="text-xs font-bold text-white">4.20</span>
            </div>
          </div>
          <p className="mt-1 text-[10px] text-muted">WBC Lightweight</p>
        </div>
      </div>
    </Card>
  );
}

function UpcomingNextCard({ fights }: { fights: typeof FIXTURE_FIGHTS }) {
  return (
    <Card title="Upcoming Next" titleIcon={<Clock className="h-4 w-4" />} action={{ label: "View All" }}>
      <div className="space-y-3">
        {fights.slice(0, 3).map((fight) => (
          <Link
            key={fight.id}
            href={`/fights/${fight.id}`}
            className="flex items-center justify-between rounded-md border border-border bg-surface p-3 transition-colors hover:bg-card-hover"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-card text-[10px] font-bold text-muted">
                {fight.fighterA.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  {fight.fighterA.name.split(" ").pop()} vs {fight.fighterB.name.split(" ").pop()}
                </p>
                <p className="text-[10px] text-muted">{fight.weightClass}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                {FIXTURE_ODDS.filter(o => o.fightId === fight.id).slice(0, 1).map(o => (
                  <span key={o.id} className="text-[10px] text-muted">
                    <span className="font-bold text-white">{o.fighterAOdds.toFixed(2)}</span>
                    <span className="mx-1">·</span>
                    <span className="font-bold text-white">{o.fighterBOdds.toFixed(2)}</span>
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}

function FollowedFightersCard() {
  const followed = FIXTURE_FIGHTERS.slice(0, 4);
  return (
    <Card title="Followed Fighters" titleIcon={<Star className="h-4 w-4" />} action={{ label: "Manage" }}>
      <div className="grid grid-cols-4 gap-2">
        {followed.map((fighter) => (
          <Link
            key={fighter.id}
            href={`/fighters/${fighter.id}`}
            className="flex flex-col items-center gap-1 rounded-md p-2 transition-colors hover:bg-card-hover"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-xs font-bold text-muted">
              {fighter.name.split(" ").map(n => n[0]).join("")}
            </div>
            <span className="text-center text-[9px] font-medium text-white leading-tight">
              {fighter.name.split(" ").pop()}
            </span>
            <span className="text-[8px] text-muted">
              {getCountryFlag(fighter.countryCode)} {fighter.wins}-{fighter.losses}-{fighter.draws}
            </span>
          </Link>
        ))}
      </div>
    </Card>
  );
}

function PromotionsCard() {
  return (
    <Card title="Promotions" titleIcon={<Tv className="h-4 w-4" />} action={{ label: "View All" }}>
      <div className="grid grid-cols-3 gap-2">
        {FIXTURE_PROMOTIONS.slice(0, 6).map((promo) => (
          <div
            key={promo.id}
            className="flex h-12 items-center justify-center rounded-md border border-border bg-surface text-[10px] font-bold text-muted transition-colors hover:bg-card-hover hover:text-white"
          >
            {promo.name.split(" ")[0]}
          </div>
        ))}
      </div>
    </Card>
  );
}

function IntelligenceSection() {
  const insights = [
    { title: "Why Stevenson is in control through 5 rounds", tag: "Live Analysis", tagColor: "bg-fp-red" },
    { title: "Joshua vs Wilder: Key stats and comparison", tag: "Pre-Fight", tagColor: "bg-fp-blue" },
    { title: "Best value bets for this weekend's fights", tag: "Odds Insight", tagColor: "bg-yellow-600" },
  ];

  return (
    <Card title="Fight Pulse Intelligence" titleIcon={<Brain className="h-4 w-4" />} action={{ label: "View All" }}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {insights.map((insight, i) => (
          <div key={i} className="group cursor-pointer rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border-bright hover:bg-card-hover">
            <span className={`inline-block rounded px-2 py-0.5 text-[9px] font-bold text-white ${insight.tagColor}`}>
              {insight.tag}
            </span>
            <h4 className="mt-2 text-sm font-medium text-white group-hover:text-fp-red">
              {insight.title}
            </h4>
          </div>
        ))}
      </div>
    </Card>
  );
}
