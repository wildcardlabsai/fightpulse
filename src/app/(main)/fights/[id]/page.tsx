"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Swords, BarChart3, TrendingUp, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Card from "@/components/shared/Card";
import TabBar from "@/components/shared/TabBar";
import StatBar from "@/components/shared/StatBar";
import OddsDisplay from "@/components/shared/OddsDisplay";
import { FIXTURE_FIGHTS, FIXTURE_ODDS, FIXTURE_EVENTS, FIXTURE_BOOKMAKERS } from "@/lib/data/fixtures";
import { getCountryFlag, formatRecord } from "@/lib/utils";

export default function FightDetailPage() {
  const params = useParams();
  const fight = FIXTURE_FIGHTS.find((f) => f.id === params.id) ?? FIXTURE_FIGHTS[1];
  const event = FIXTURE_EVENTS.find((e) => e.id === fight.eventId);
  const odds = FIXTURE_ODDS.filter((o) => o.fightId === fight.id);
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div>
      {/* Fight header */}
      <div className="border-b border-border bg-gradient-to-b from-card to-background">
        <div className="px-4 py-3 lg:px-6">
          <Link href="/upcoming" className="inline-flex items-center gap-1 text-xs text-muted hover:text-white">
            <ArrowLeft className="h-3 w-3" /> Upcoming &gt; {fight.fighterA.name} vs {fight.fighterB.name}
          </Link>
        </div>

        <div className="px-4 py-2 text-center lg:px-6">
          {fight.title && (
            <p className="text-xs font-bold uppercase text-fp-red">{fight.title}</p>
          )}
          <p className="text-xs text-muted">{fight.scheduledRounds} Rounds</p>
          {event && (
            <p className="mt-1 text-sm font-bold text-white">
              {new Date(event.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
            </p>
          )}
          {event && (
            <p className="text-xs text-muted">{event.venue.name}, {event.venue.city}</p>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-6 lg:px-16">
          <div className="flex items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-border bg-card text-2xl font-bold text-muted lg:h-32 lg:w-32">
              {fight.fighterA.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="text-xs">{getCountryFlag(fight.fighterA.countryCode)}</p>
              <p className="text-2xl font-black uppercase text-white lg:text-3xl">{fight.fighterA.name}</p>
              <p className="text-xs text-muted">{formatRecord(fight.fighterA.wins, fight.fighterA.losses, fight.fighterA.draws)}</p>
              <p className="text-[10px] text-muted">{fight.fighterA.kos} KO ({Math.round((fight.fighterA.kos / fight.fighterA.wins) * 100)}%)</p>
            </div>
          </div>

          <div className="hidden flex-col items-center gap-2 md:flex">
            {odds.length > 0 && (
              <div className="flex gap-4">
                <OddsDisplay odds={odds[0].fighterAOdds} label="Favourite" size="lg" />
                <OddsDisplay odds={odds[0].fighterBOdds} label="Underdog" size="lg" />
              </div>
            )}
          </div>

          <div className="flex flex-row-reverse items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-border bg-card text-2xl font-bold text-muted lg:h-32 lg:w-32">
              {fight.fighterB.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="text-right">
              <p className="text-xs">{getCountryFlag(fight.fighterB.countryCode)}</p>
              <p className="text-2xl font-black uppercase text-white lg:text-3xl">{fight.fighterB.name}</p>
              <p className="text-xs text-muted">{formatRecord(fight.fighterB.wins, fight.fighterB.losses, fight.fighterB.draws)}</p>
              <p className="text-[10px] text-muted">{fight.fighterB.kos} KO ({Math.round((fight.fighterB.kos / fight.fighterB.wins) * 100)}%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-4 py-3 lg:px-6">
        <TabBar
          tabs={["Overview", "Tale of the Tape", "Odds", "Form", "Analysis", "Previous Fights", "News"]}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-12 lg:p-6">
        <div className="space-y-4 lg:col-span-4">
          <Card title="Tale of the Tape" titleIcon={<Swords className="h-4 w-4" />}>
            <div className="space-y-3">
              {[
                ["Age", "25", "25"],
                ["Height", fight.fighterA.height ?? "-", fight.fighterB.height ?? "-"],
                ["Reach", fight.fighterA.reach ?? "-", fight.fighterB.reach ?? "-"],
                ["Stance", fight.fighterA.stance, fight.fighterB.stance],
                ["Division", fight.fighterA.division, fight.fighterB.division],
                ["Rounds", String(fight.scheduledRounds), String(fight.scheduledRounds)],
              ].map(([label, a, b], i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{a}</span>
                  <span className="text-[10px] uppercase text-muted">{label}</span>
                  <span className="font-bold text-white">{b}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recent Form" titleIcon={<TrendingUp className="h-4 w-4" />}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase text-muted">Last 5 Fights - {fight.fighterA.name.split(" ").pop()}</p>
                <div className="space-y-1">
                  {["W", "W", "L", "W", "W"].map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <span className={`flex h-4 w-4 items-center justify-center rounded text-[8px] font-bold text-white ${r === "W" ? "bg-success" : "bg-fp-red"}`}>{r}</span>
                      <span className="text-muted">vs Opponent</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase text-muted">Last 5 Fights - {fight.fighterB.name.split(" ").pop()}</p>
                <div className="space-y-1">
                  {["W", "W", "W", "W", "W"].map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-success text-[8px] font-bold text-white">{r}</span>
                      <span className="text-muted">vs Opponent</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-4">
          <Card title="Key Stats Comparison" titleIcon={<BarChart3 className="h-4 w-4" />}>
            <p className="mb-3 text-[10px] uppercase text-muted">Career Averages</p>
            <div className="space-y-4">
              <StatBar label="Punches Landed / Round" valueA="6.8" valueB="6.1" />
              <StatBar label="Punches Thrown / Round" valueA="15.2" valueB="11.8" />
              <StatBar label="Accuracy" valueA="44%" valueB="52%" />
              <StatBar label="Power Punches / Round" valueA="4.2" valueB="3.1" />
              <StatBar label="Power Punch Accuracy" valueA="62%" valueB="41%" />
              <StatBar label="Knockdowns / Fight" valueA="0.8" valueB="0.4" />
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-4">
          <Card title="Odds Comparison" titleIcon={<TrendingUp className="h-4 w-4" />} action={{ label: "View All Odds" }}>
            {odds.length > 0 ? (
              <div className="overflow-hidden rounded-md border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="px-3 py-2 text-left text-muted">Bookmaker</th>
                      <th className="px-3 py-2 text-center text-muted">{fight.fighterA.name.split(" ").pop()}</th>
                      <th className="px-3 py-2 text-right text-muted">{fight.fighterB.name.split(" ").pop()}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {odds.map((o) => (
                      <tr key={o.id} className="border-b border-border last:border-0">
                        <td className="px-3 py-2 font-medium text-white">{o.bookmaker.name}</td>
                        <td className="px-3 py-2 text-center font-bold text-white">{o.fighterAOdds.toFixed(2)}</td>
                        <td className="px-3 py-2 text-right font-bold text-white">{o.fighterBOdds.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-xs text-muted">Odds data unavailable</p>
            )}
          </Card>

          {event && (
            <Card title="Event Context" titleIcon={<MapPin className="h-4 w-4" />}>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Venue</span>
                  <span className="text-white">{event.venue.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Location</span>
                  <span className="text-white">{event.venue.city}, {event.venue.country}</span>
                </div>
                {event.broadcast && (
                  <div className="flex justify-between">
                    <span className="text-muted">Broadcast</span>
                    <span className="text-white">{event.broadcast}</span>
                  </div>
                )}
                {event.promotion && (
                  <div className="flex justify-between">
                    <span className="text-muted">Promotion</span>
                    <span className="text-white">{event.promotion.name}</span>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
