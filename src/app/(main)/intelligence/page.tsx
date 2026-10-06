"use client";

import { useState, useEffect } from "react";
import { Brain, Zap, BarChart3, Target, Activity } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import Card from "@/components/shared/Card";
import LiveBadge from "@/components/shared/LiveBadge";
import { fights as fightsService } from "@/lib/services/fights";
import { live } from "@/lib/services/live";
import type { Fight, MomentumSnapshot, RoundStats, FightSignal } from "@/lib/types";

export default function IntelligencePage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [fight, setFight] = useState<Fight | null>(null);
  const [momentum, setMomentum] = useState<MomentumSnapshot[]>([]);
  const [roundStats, setRoundStats] = useState<RoundStats[]>([]);
  const [signals, setSignals] = useState<FightSignal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fightsService.getAll().then(async (allFights) => {
      const firstFight = allFights[0];
      if (!firstFight) {
        setLoading(false);
        return;
      }
      setFight(firstFight);

      const [momentumData, roundStatsData, signalsData] = await Promise.all([
        live.getMomentum(firstFight.id),
        live.getRoundStats(firstFight.id),
        live.getSignals(firstFight.id),
      ]);

      setMomentum(momentumData);
      setRoundStats(roundStatsData);
      setSignals(signalsData);
      setLoading(false);
    });
  }, []);

  if (loading || !fight) {
    return (
      <div>
        <PageHero
          title="Intelligence Centre"
          subtitle="Real data. Deeper insights. Smarter decisions."
          badges={[
            { icon: <Activity className="h-4 w-4" />, label: "Fight Pulse Momentum", sublabel: "Live and historical momentum analysis" },
            { icon: <BarChart3 className="h-4 w-4" />, label: "Data Driven Insights", sublabel: "Key trends, patterns and performance data" },
            { icon: <Brain className="h-4 w-4" />, label: "Explained Analysis", sublabel: "Understand why momentum changes" },
          ]}
        />
        <div className="flex items-center justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-fp-red" /></div>
      </div>
    );
  }

  const latestMomentum = momentum[momentum.length - 1];

  return (
    <div>
      <PageHero
        title="Intelligence Centre"
        subtitle="Real data. Deeper insights. Smarter decisions."
        badges={[
          { icon: <Activity className="h-4 w-4" />, label: "Fight Pulse Momentum", sublabel: "Live and historical momentum analysis" },
          { icon: <BarChart3 className="h-4 w-4" />, label: "Data Driven Insights", sublabel: "Key trends, patterns and performance data" },
          { icon: <Brain className="h-4 w-4" />, label: "Explained Analysis", sublabel: "Understand why momentum changes" },
        ]}
      />

      <div className="px-4 py-4 lg:px-6">
        <TabBar
          tabs={["Overview", "Fight Pulse Signals", "Momentum Analysis", "Statistical Trends", "Odds Intelligence", "Fighter Insights", "Event Intelligence"]}
          active={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Live Momentum */}
          <div className="lg:col-span-5">
            <Card title="Live Momentum" titleIcon={<Activity className="h-4 w-4" />} liveBadge>
              <p className="mb-2 text-xs text-muted">
                {fight.fighterA.name} vs {fight.fighterB.name} | Round {fight.currentRound} of {fight.scheduledRounds}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-xs text-muted">{fight.fighterA.name.split(" ").pop()}</p>
                  <div className="mt-1 flex h-16 w-16 items-center justify-center rounded-lg bg-fp-red/20">
                    <span className="text-2xl font-black text-fp-red">{latestMomentum?.fighterAMomentum}</span>
                  </div>
                  <p className="mt-1 text-[9px] text-muted">Momentum Score</p>
                </div>
                <div className="flex-1 px-4">
                  <div className="flex h-32 items-end justify-between gap-1">
                    {momentum.map((m, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <div className="w-full rounded-t bg-fp-red/60" style={{ height: `${m.fighterAMomentum * 0.8}%` }} />
                        <div className="w-full rounded-b bg-fp-blue/60" style={{ height: `${m.fighterBMomentum * 0.8}%` }} />
                        <span className="text-[8px] text-muted">R{m.round}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted">{fight.fighterB.name.split(" ").pop()}</p>
                  <div className="mt-1 flex h-16 w-16 items-center justify-center rounded-lg bg-fp-blue/20">
                    <span className="text-2xl font-black text-fp-blue">{latestMomentum?.fighterBMomentum}</span>
                  </div>
                  <p className="mt-1 text-[9px] text-muted">Momentum Score</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Momentum Breakdown */}
          <div className="lg:col-span-4">
            <Card title="Momentum Breakdown" titleIcon={<Target className="h-4 w-4" />}>
              <p className="py-4 text-center text-xs text-muted">Detailed momentum breakdown unavailable</p>
            </Card>
          </div>

          {/* Key Signals */}
          <div className="lg:col-span-3">
            <Card title="Key Signals" titleIcon={<Zap className="h-4 w-4" />} liveBadge>
              {signals.length > 0 ? (
                <div className="space-y-3">
                  {signals.map((signal, i) => (
                    <div key={i} className="flex gap-2 rounded-md border border-border bg-surface p-2">
                      <div className="mt-0.5 text-fp-red"><Zap className="h-3 w-3" /></div>
                      <div className="flex-1">
                        <p className="text-[10px] font-medium text-white">{signal.name}</p>
                        <p className="text-[9px] text-muted">{signal.status} — {signal.confidence} confidence</p>
                      </div>
                      <span className="text-[9px] text-muted">{signal.lastUpdated}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-xs text-muted">No signals available</p>
              )}
            </Card>
          </div>
        </div>

        {/* Second row */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card title="Round by Round Momentum" titleIcon={<BarChart3 className="h-4 w-4" />}>
            <div className="flex h-40 items-end justify-between gap-2">
              {momentum.map((m, i) => (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="mb-1 w-full space-y-0.5">
                    <div className="w-full rounded-sm bg-fp-red/60" style={{ height: `${m.fighterAMomentum * 1.2}px` }} />
                    <div className="w-full rounded-sm bg-fp-blue/60" style={{ height: `${m.fighterBMomentum * 1.2}px` }} />
                  </div>
                  <span className="text-[9px] text-muted">R{m.round}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Round Statistics" titleIcon={<BarChart3 className="h-4 w-4" />}>
            {roundStats.slice(-1).map((r) => (
              <div key={r.round} className="overflow-hidden rounded-md border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="px-3 py-2 text-left font-bold text-fp-red">{fight.fighterA.name.split(" ").pop()}</th>
                      <th className="px-3 py-2 text-center text-muted">Round {r.round}</th>
                      <th className="px-3 py-2 text-right font-bold text-fp-blue">{fight.fighterB.name.split(" ").pop()}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Total Punches", r.fighterAStats.totalPunchesThrown, r.fighterBStats.totalPunchesThrown],
                      ["Punches Landed", r.fighterAStats.totalPunchesLanded, r.fighterBStats.totalPunchesLanded],
                      ["Jabs Thrown", r.fighterAStats.jabsThrown, r.fighterBStats.jabsThrown],
                      ["Jabs Landed", r.fighterAStats.jabsLanded, r.fighterBStats.jabsLanded],
                      ["Power Thrown", r.fighterAStats.powerPunchesThrown, r.fighterBStats.powerPunchesThrown],
                      ["Power Landed", r.fighterAStats.powerPunchesLanded, r.fighterBStats.powerPunchesLanded],
                    ].map(([label, a, b], i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-3 py-1.5 font-bold text-white">{a}</td>
                        <td className="px-3 py-1.5 text-center text-muted">{label}</td>
                        <td className="px-3 py-1.5 text-right font-bold text-white">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </Card>

          <Card title="Momentum Explanation" titleIcon={<Brain className="h-4 w-4" />}>
            <p className="py-4 text-center text-xs text-muted">Momentum analysis unavailable</p>
          </Card>
        </div>

        {/* Signals table */}
        <div className="mt-4">
          <Card title="Fight Pulse Signals" titleIcon={<Zap className="h-4 w-4" />} noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-4 py-2.5 text-left font-medium text-muted">Signal</th>
                    <th className="px-4 py-2.5 text-center font-medium text-muted">Status</th>
                    <th className="px-4 py-2.5 text-center font-medium text-muted">Confidence</th>
                    <th className="px-4 py-2.5 text-right font-medium text-muted">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {signals.map((signal, i) => (
                    <tr key={i} className="border-b border-border hover:bg-card-hover">
                      <td className="px-4 py-2.5 font-medium text-white">{signal.name}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`font-bold ${signal.fighter === "Stevenson" ? "text-fp-red" : signal.fighter ? "text-fp-blue" : "text-success"}`}>
                          {signal.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${signal.confidence === "High" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                          {signal.confidence}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right text-muted">{signal.lastUpdated}</td>
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
