"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, TrendingDown, Bell, Gem, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import Card from "@/components/shared/Card";
import { odds as oddsService } from "@/lib/services/odds";
import { fights as fightsService } from "@/lib/services/fights";
import { impliedProbability, getCountryFlag } from "@/lib/utils";
import type { Fight, OddsSnapshot, Bookmaker } from "@/lib/types";

export default function OddsCentrePage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [upcomingFights, setUpcomingFights] = useState<Fight[]>([]);
  const [allFights, setAllFights] = useState<Fight[]>([]);
  const [oddsMap, setOddsMap] = useState<Record<string, OddsSnapshot[]>>({});
  const [bookmakers, setBookmakers] = useState<Bookmaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fightsService.getUpcoming(),
      fightsService.getAll(),
      oddsService.getAllBookmakers(),
    ]).then(async ([upcoming, all, bks]) => {
      setUpcomingFights(upcoming);
      setAllFights(all);
      setBookmakers(bks);

      const oddsResults: Record<string, OddsSnapshot[]> = {};
      await Promise.all(all.map(async (fight) => {
        oddsResults[fight.id] = await oddsService.getForFight(fight.id);
      }));
      setOddsMap(oddsResults);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <PageHero
          title="Odds Centre"
          subtitle="Live and historical boxing odds from leading bookmakers. Track movements. Find value. Stay ahead."
        />
        <div className="flex items-center justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-fp-red" /></div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title="Odds Centre"
        subtitle="Live and historical boxing odds from leading bookmakers. Track movements. Find value. Stay ahead."
        badges={[
          { icon: <Clock className="h-4 w-4" />, label: `${upcomingFights.length}`, sublabel: "Upcoming Fights" },
          { icon: <BarChart3 className="h-4 w-4" />, label: `${bookmakers.length}`, sublabel: "Tracked Bookmakers" },
        ]}
      />

      <div className="px-4 py-4 lg:px-6">
        <TabBar
          tabs={["Overview", "Live Odds", "Upcoming", "Biggest Movers", "Bookmakers", "Market Trends", "Value Bets"]}
          active={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Biggest Movers */}
          <Card title="Biggest Odds Movers (24H)" titleIcon={<TrendingUp className="h-4 w-4" />} action={{ label: "View All" }}>
            <div className="space-y-3">
              {[
                { fight: "Zepeda vs Farmer", change: "+42%", from: 1.62, to: 2.30, up: true },
                { fight: "Joshua vs Wilder", change: "-28%", from: 1.45, to: 1.04, up: false },
                { fight: "Catterall vs Prograis", change: "+26%", from: 1.90, to: 2.40, up: true },
                { fight: "Dubois vs Hrgovic", change: "-24%", from: 1.36, to: 1.03, up: false },
                { fight: "Stevenson vs Zepeda", change: "+22%", from: 1.75, to: 2.15, up: true },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2">
                  <div>
                    <p className="text-xs font-medium text-white">{m.fight}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-0.5 text-xs font-bold ${m.up ? "text-fp-red" : "text-success"}`}>
                      {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {m.change}
                    </span>
                    <span className="text-[10px] text-muted">{m.from.toFixed(2)} → {m.to.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Value Opportunities */}
          <Card title="Value Opportunities" titleIcon={<Gem className="h-4 w-4" />} action={{ label: "View All" }}>
            <div className="space-y-3">
              {[
                { fight: "Liam Smith vs Eubank Jr.", value: "12.4%", odds: 2.10, bookmaker: "Sky Bet" },
                { fight: "Catterall vs Prograis", value: "8.7%", odds: 2.40, bookmaker: "bet365" },
                { fight: "Dubois vs Hrgovic", value: "7.9%", odds: 3.60, bookmaker: "William Hill" },
                { fight: "Zepeda vs Farmer", value: "6.8%", odds: 2.30, bookmaker: "Unibet" },
              ].map((v, i) => (
                <div key={i} className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2">
                  <div>
                    <p className="text-xs font-medium text-white">{v.fight}</p>
                    <p className="text-[10px] text-muted">
                      Value <span className="font-bold text-success">{v.value}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">{v.odds.toFixed(2)}</span>
                    <p className="text-[9px] text-muted">{v.bookmaker}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Odds Alerts */}
          <Card title="Odds Alerts" titleIcon={<Bell className="h-4 w-4" />} action={{ label: "View All" }}>
            <div className="space-y-3">
              {[
                { fight: "Zepeda vs Farmer", time: "2m", change: "+18% (1.95 → 2.30)" },
                { fight: "Joshua vs Wilder", time: "8m", change: "-12% (1.18 → 1.04)" },
                { fight: "Catterall vs Prograis", time: "12m", change: "+15% (2.10 → 2.40)" },
                { fight: "Dubois vs Hrgovic", time: "28m", change: "-20% (1.70 → 1.36)" },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2">
                  <span className="text-[10px] text-muted">{a.time}</span>
                  <div>
                    <p className="text-xs font-medium text-white">{a.fight}</p>
                    <p className="text-[10px] text-muted">Odds moved {a.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Odds Comparison Table */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {["All Fights", "Live & Upcoming", "All Weight Classes", "All Bookmakers"].map((filter) => (
              <button key={filter} className="rounded-md border border-border bg-card px-3 py-2 text-xs text-muted hover:text-white first:bg-fp-red first:text-white first:border-fp-red">
                {filter} ▾
              </button>
            ))}
            <div className="ml-auto flex rounded-md border border-border">
              <button className="bg-fp-red px-3 py-1.5 text-xs font-medium text-white rounded-l-md">Decimal</button>
              <button className="px-3 py-1.5 text-xs text-muted hover:text-white rounded-r-md">Fractional</button>
            </div>
          </div>

          <Card title="Upcoming Fights" noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-3 py-2.5 text-left font-medium text-muted">Date</th>
                    <th className="px-3 py-2.5 text-left font-medium text-muted">Fight</th>
                    <th className="px-3 py-2.5 text-left font-medium text-muted">Weight Class</th>
                    {bookmakers.slice(0, 5).map((b) => (
                      <th key={b.id} className="px-3 py-2.5 text-center font-bold text-white">{b.name}</th>
                    ))}
                    <th className="px-3 py-2.5 text-center font-medium text-muted">Best</th>
                    <th className="px-3 py-2.5 text-center font-medium text-muted">Movement</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingFights.map((fight) => {
                    const fightOdds = oddsMap[fight.id] ?? [];
                    return (
                      <tr key={fight.id} className="border-b border-border hover:bg-card-hover">
                        <td className="px-3 py-2.5 text-muted">
                          {allFights.find(f => f.eventId)
                            ? "Sat 20 Apr"
                            : "-"}
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{getCountryFlag(fight.fighterA.countryCode)}</span>
                            <span className="font-medium text-white">
                              {fight.fighterA.name.split(" ").pop()} vs {fight.fighterB.name.split(" ").pop()}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-muted">{fight.weightClass}</td>
                        {bookmakers.slice(0, 5).map((b) => {
                          const o = fightOdds.find((fo) => fo.bookmaker.id === b.id);
                          return (
                            <td key={b.id} className="px-3 py-2.5 text-center font-medium text-white">
                              {o ? o.fighterAOdds.toFixed(2) : "-"}
                            </td>
                          );
                        })}
                        <td className="px-3 py-2.5 text-center font-bold text-success">
                          {fightOdds.length > 0 ? Math.min(...fightOdds.map(o => o.fighterAOdds)).toFixed(2) : "-"}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <span className="text-xs text-muted">—</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Implied Probability */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card title="Odds Movement" titleIcon={<TrendingUp className="h-4 w-4" />} className="lg:col-span-2">
            <div className="flex h-48 items-center justify-center rounded-md border border-border bg-surface">
              <p className="text-xs text-muted">Odds movement chart would render here with Recharts</p>
            </div>
          </Card>

          <Card title="Implied Probability" titleIcon={<BarChart3 className="h-4 w-4" />}>
            {allFights.slice(1, 2).map((fight) => {
              const fightOdds = oddsMap[fight.id] ?? [];
              if (fightOdds.length === 0) return null;
              const probA = impliedProbability(fightOdds[0].fighterAOdds);
              const probB = impliedProbability(fightOdds[0].fighterBOdds);
              return (
                <div key={fight.id} className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${probA} ${100 - probA}`} className="text-fp-red" />
                      </svg>
                      <span className="absolute text-lg font-black text-fp-red">{Math.round(probA)}%</span>
                    </div>
                    <p className="mt-1 text-[10px] text-muted">{fight.fighterA.name.split(" ").pop()}</p>
                  </div>
                  <div className="text-center">
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${probB} ${100 - probB}`} className="text-fp-blue" />
                      </svg>
                      <span className="absolute text-lg font-black text-fp-blue">{Math.round(probB)}%</span>
                    </div>
                    <p className="mt-1 text-[10px] text-muted">{fight.fighterB.name.split(" ").pop()}</p>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  );
}
