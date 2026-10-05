"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  Clock,
  MessageCircle,
  TrendingUp,
  Shield,
  Zap,
  Target,
} from "lucide-react";
import Card from "@/components/shared/Card";
import LiveBadge from "@/components/shared/LiveBadge";
import TabBar from "@/components/shared/TabBar";
import StatBar from "@/components/shared/StatBar";
import OddsDisplay from "@/components/shared/OddsDisplay";
import { fights } from "@/lib/services/fights";
import { odds as oddsService } from "@/lib/services/odds";
import { live } from "@/lib/services/live";
import { getTotalStats } from "@/lib/data/fixtures";
import { getCountryFlag } from "@/lib/utils";
import type { Fight, RoundStats, MomentumSnapshot, OddsSnapshot, LiveFeedEntry, FightSignal } from "@/lib/types";

export default function LiveFightPage() {
  const params = useParams();
  const [fight, setFight] = useState<Fight | null>(null);
  const [roundStats, setRoundStats] = useState<RoundStats[]>([]);
  const [momentum, setMomentum] = useState<MomentumSnapshot[]>([]);
  const [odds, setOdds] = useState<OddsSnapshot[]>([]);
  const [liveFeed, setLiveFeed] = useState<LiveFeedEntry[]>([]);
  const [signals, setSignals] = useState<FightSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Live Stats");

  useEffect(() => {
    async function loadData() {
      const fightId = params.id as string;
      const [fightData, roundStatsData, momentumData, oddsData, feedData, signalsData] = await Promise.all([
        fights.getById(fightId),
        live.getRoundStats(fightId),
        live.getMomentum(fightId),
        oddsService.getForFight(fightId),
        live.getFeed(fightId),
        live.getSignals(fightId),
      ]);

      if (fightData) {
        setFight(fightData);
      } else {
        // Fallback: get first live fight
        const allLive = await fights.getLive();
        if (allLive.length > 0) setFight(allLive[0]);
      }

      setRoundStats(roundStatsData);
      setMomentum(momentumData);
      setOdds(oddsData);
      setLiveFeed(feedData);
      setSignals(signalsData);
      setLoading(false);
    }
    loadData();
  }, [params.id]);

  if (loading || !fight) {
    return (
      <div className="flex items-center justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-fp-red" /></div>
    );
  }

  const totalStats = getTotalStats(roundStats);
  const latestMomentum = momentum[momentum.length - 1];

  return (
    <div>
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-3 lg:px-6">
        <LiveBadge size="lg" />
        <span className="text-sm font-medium text-white">{fight.title}</span>
        <span className="rounded bg-surface px-3 py-1 font-mono text-sm font-bold text-white">
          ROUND {fight.currentRound} OF {fight.scheduledRounds}
        </span>
        <span className="font-mono text-lg font-bold text-fp-red">2:15</span>
        <span className="ml-auto text-xs text-muted">
          Prudential Center, Newark, USA
        </span>
      </div>

      {/* Fighter header */}
      <div className="border-b border-border bg-gradient-to-b from-card to-background px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-fp-red/30 bg-card text-2xl font-bold text-muted lg:h-28 lg:w-28">
              {fight.fighterA.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="text-xs text-muted">{getCountryFlag(fight.fighterA.countryCode)}</p>
              <p className="text-xl font-black uppercase text-white lg:text-3xl">{fight.fighterA.name}</p>
              <p className="text-xs text-muted">{fight.fighterA.wins}-{fight.fighterA.losses}-{fight.fighterA.draws}</p>
            </div>
          </div>

          {latestMomentum && (
            <div className="hidden flex-col items-center gap-2 md:flex">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Fight Pulse Momentum</p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-fp-red">{latestMomentum.fighterAMomentum}%</span>
                <div className="h-4 w-48 overflow-hidden rounded-full bg-fp-blue/20">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-fp-red to-fp-red/80"
                    animate={{ width: `${latestMomentum.fighterAMomentum}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="text-3xl font-black text-fp-blue">{latestMomentum.fighterBMomentum}%</span>
              </div>
              <div className="flex gap-4">
                {odds.slice(0, 1).map(o => (
                  <div key={o.id} className="flex gap-4">
                    <OddsDisplay odds={o.fighterAOdds} label="Favourite" movement={-0.08} />
                    <OddsDisplay odds={o.fighterBOdds} label="Underdog" movement={0.62} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-row-reverse items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-fp-blue/30 bg-card text-2xl font-bold text-muted lg:h-28 lg:w-28">
              {fight.fighterB.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="text-right">
              <p className="text-xs text-muted">{getCountryFlag(fight.fighterB.countryCode)}</p>
              <p className="text-xl font-black uppercase text-white lg:text-3xl">{fight.fighterB.name}</p>
              <p className="text-xs text-muted">{fight.fighterB.wins}-{fight.fighterB.losses}-{fight.fighterB.draws}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-border px-4 py-3 lg:px-6">
        <TabBar
          tabs={["Live Stats", "Round by Round", "Odds", "Analysis", "Tale of the Tape", "Live Feed"]}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-12 lg:p-6">
        <div className="space-y-4 lg:col-span-4">
          <Card title="Live Fight Statistics" titleIcon={<BarChart3 className="h-4 w-4" />}>
            <div className="space-y-4">
              <StatBar label="Total Punches" valueA={totalStats.fighterA.totalPunchesThrown} valueB={totalStats.fighterB.totalPunchesThrown} />
              <StatBar label="Punches Landed" valueA={totalStats.fighterA.totalPunchesLanded} valueB={totalStats.fighterB.totalPunchesLanded} />
              <StatBar
                label="Accuracy"
                valueA={`${Math.round((totalStats.fighterA.totalPunchesLanded / totalStats.fighterA.totalPunchesThrown) * 100)}%`}
                valueB={`${Math.round((totalStats.fighterB.totalPunchesLanded / totalStats.fighterB.totalPunchesThrown) * 100)}%`}
              />
              <StatBar label="Jabs Landed" valueA={totalStats.fighterA.jabsLanded} valueB={totalStats.fighterB.jabsLanded} />
              <StatBar label="Power Landed" valueA={totalStats.fighterA.powerPunchesLanded} valueB={totalStats.fighterB.powerPunchesLanded} />
              <StatBar label="Knockdowns" valueA={totalStats.fighterA.knockdowns} valueB={totalStats.fighterB.knockdowns} />
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-4">
          <Card title={`Round ${fight.currentRound} Statistics`} titleIcon={<Target className="h-4 w-4" />}>
            {roundStats.length > 0 && (
              <div className="space-y-3">
                {(() => {
                  const r = roundStats[roundStats.length - 1];
                  return (
                    <div className="overflow-hidden rounded-md border border-border">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border bg-surface">
                            <th className="px-3 py-2 text-left font-bold text-fp-red">{fight.fighterA.name.split(" ").pop()}</th>
                            <th className="px-3 py-2 text-center font-medium text-muted">Stat</th>
                            <th className="px-3 py-2 text-right font-bold text-fp-blue">{fight.fighterB.name.split(" ").pop()}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["Total Punches", r.fighterAStats.totalPunchesThrown, r.fighterBStats.totalPunchesThrown],
                            ["Landed", r.fighterAStats.totalPunchesLanded, r.fighterBStats.totalPunchesLanded],
                            ["Accuracy", `${Math.round((r.fighterAStats.totalPunchesLanded / r.fighterAStats.totalPunchesThrown) * 100)}%`, `${Math.round((r.fighterBStats.totalPunchesLanded / r.fighterBStats.totalPunchesThrown) * 100)}%`],
                            ["Jabs Thrown", r.fighterAStats.jabsThrown, r.fighterBStats.jabsThrown],
                            ["Jabs Landed", r.fighterAStats.jabsLanded, r.fighterBStats.jabsLanded],
                            ["Power Thrown", r.fighterAStats.powerPunchesThrown, r.fighterBStats.powerPunchesThrown],
                            ["Power Landed", r.fighterAStats.powerPunchesLanded, r.fighterBStats.powerPunchesLanded],
                          ].map(([label, a, b], i) => (
                            <tr key={i} className="border-b border-border last:border-0">
                              <td className="px-3 py-2 font-bold text-white">{a}</td>
                              <td className="px-3 py-2 text-center text-muted">{label}</td>
                              <td className="px-3 py-2 text-right font-bold text-white">{b}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            )}
          </Card>

          <Card title="Judges Scorecard" titleIcon={<Shield className="h-4 w-4" />}>
            <p className="text-center text-xs text-muted">(Unofficial)</p>
            <div className="mt-2 overflow-hidden rounded-md border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-2 py-2 text-left text-muted">Round</th>
                    <th className="px-2 py-2 text-center text-muted">Judge 1</th>
                    <th className="px-2 py-2 text-center text-muted">Judge 2</th>
                    <th className="px-2 py-2 text-center text-muted">Judge 3</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6].map((round) => (
                    <tr key={round} className="border-b border-border last:border-0">
                      <td className="px-2 py-1.5 font-bold text-white">{round}</td>
                      <td className="px-2 py-1.5 text-center text-muted">10 - 9</td>
                      <td className="px-2 py-1.5 text-center text-muted">10 - 9</td>
                      <td className="px-2 py-1.5 text-center text-muted">{round === 3 ? "9 - 10" : "10 - 9"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-4">
          <Card title="Live Feed" titleIcon={<MessageCircle className="h-4 w-4" />} liveBadge>
            <div className="space-y-3">
              {liveFeed.map((entry) => (
                <div key={entry.id} className="flex gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-fp-red/20">
                      {entry.type === "commentary" ? (
                        <MessageCircle className="h-3 w-3 text-fp-red" />
                      ) : (
                        <Zap className="h-3 w-3 text-fp-red" />
                      )}
                    </div>
                    <span className="text-[9px] text-muted">
                      {new Date(entry.timestamp).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{entry.content.split(".")[0]}.</p>
                    {entry.content.split(".").length > 1 && (
                      <p className="mt-0.5 text-[10px] text-muted">{entry.content.split(".").slice(1).join(".").trim()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Betting Odds (Live)" titleIcon={<TrendingUp className="h-4 w-4" />} action={{ label: "View All Odds" }}>
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
                      <td className="px-3 py-2 text-center">
                        <span className="rounded bg-success/10 px-2 py-0.5 font-bold text-success">
                          {o.fighterAOdds.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <span className="font-bold text-fp-red">{o.fighterBOdds.toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Fight Pulse Signals" titleIcon={<Zap className="h-4 w-4" />}>
            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-3 py-2 text-left text-muted">Signal</th>
                    <th className="px-3 py-2 text-center text-muted">Status</th>
                    <th className="px-3 py-2 text-center text-muted">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {signals.map((signal, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-3 py-2 text-white">{signal.name}</td>
                      <td className="px-3 py-2 text-center">
                        <span className={`font-medium ${signal.fighter === fight.fighterA.name.split(" ").pop() ? "text-fp-red" : signal.fighter ? "text-fp-blue" : "text-success"}`}>
                          {signal.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          signal.confidence === "High" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                        }`}>
                          {signal.confidence}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
