"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Radio } from "lucide-react";
import Card from "@/components/shared/Card";
import LiveBadge from "@/components/shared/LiveBadge";
import TabBar from "@/components/shared/TabBar";
import PageHero from "@/components/shared/PageHero";
import { fights } from "@/lib/services/fights";
import { odds as oddsService } from "@/lib/services/odds";
import { live } from "@/lib/services/live";
import { getCountryFlag } from "@/lib/utils";
import type { Fight, OddsSnapshot, MomentumSnapshot } from "@/lib/types";

export default function LivePage() {
  const [liveFights, setLiveFights] = useState<Fight[]>([]);
  const [momentumMap, setMomentumMap] = useState<Record<string, MomentumSnapshot[]>>({});
  const [oddsMap, setOddsMap] = useState<Record<string, OddsSnapshot[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Live Fights");

  useEffect(() => {
    async function loadData() {
      const liveFightsData = await fights.getLive();
      setLiveFights(liveFightsData);

      const [momentumResults, oddsResults] = await Promise.all([
        Promise.all(liveFightsData.map(async (f) => ({ id: f.id, data: await live.getMomentum(f.id) }))),
        Promise.all(liveFightsData.map(async (f) => ({ id: f.id, data: await oddsService.getForFight(f.id) }))),
      ]);

      const mMap: Record<string, MomentumSnapshot[]> = {};
      for (const m of momentumResults) mMap[m.id] = m.data;
      setMomentumMap(mMap);

      const oMap: Record<string, OddsSnapshot[]> = {};
      for (const o of oddsResults) oMap[o.id] = o.data;
      setOddsMap(oMap);

      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div>
        <PageHero title="Live" subtitle="Real-time fight coverage as it happens." />
        <div className="flex items-center justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-fp-red" /></div>
      </div>
    );
  }

  return (
    <div>
      <PageHero title="Live" subtitle="Real-time fight coverage as it happens." />

      <div className="p-4 lg:p-6">
        <TabBar
          tabs={["Live Fights", "Completed Today", "Schedule"]}
          active={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-6">
          {liveFights.length > 0 ? (
            <div className="space-y-4">
              {liveFights.map((fight) => {
                const momentum = momentumMap[fight.id] ?? [];
                const latest = momentum[momentum.length - 1];
                const fightOdds = oddsMap[fight.id] ?? [];

                return (
                  <Link
                    key={fight.id}
                    href={`/live/${fight.id}`}
                    className="block rounded-lg border border-fp-red/30 bg-card transition-colors hover:bg-card-hover"
                  >
                    <div className="p-4 lg:p-6">
                      <div className="flex items-center gap-3">
                        <LiveBadge />
                        <span className="text-xs font-medium text-muted">{fight.title}</span>
                        <span className="rounded bg-surface px-2 py-0.5 text-xs font-bold text-white">
                          Round {fight.currentRound} of {fight.scheduledRounds}
                        </span>
                        <span className="font-mono text-sm font-bold text-fp-red">2:15</span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface text-lg font-bold text-muted">
                            {fight.fighterA.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm text-muted">{getCountryFlag(fight.fighterA.countryCode)}</p>
                            <p className="text-lg font-black uppercase text-white">{fight.fighterA.name}</p>
                            <p className="text-xs text-muted">{fight.fighterA.wins}-{fight.fighterA.losses}-{fight.fighterA.draws}</p>
                          </div>
                        </div>

                        {latest && (
                          <div className="hidden flex-col items-center gap-1 md:flex">
                            <p className="text-[10px] font-bold uppercase text-muted">Momentum</p>
                            <div className="flex items-center gap-4">
                              <span className="text-2xl font-black text-fp-red">{latest.fighterAMomentum}%</span>
                              <span className="text-xs text-muted">vs</span>
                              <span className="text-2xl font-black text-fp-blue">{latest.fighterBMomentum}%</span>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-row-reverse items-center gap-3">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface text-lg font-bold text-muted">
                            {fight.fighterB.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted">{getCountryFlag(fight.fighterB.countryCode)}</p>
                            <p className="text-lg font-black uppercase text-white">{fight.fighterB.name}</p>
                            <p className="text-xs text-muted">{fight.fighterB.wins}-{fight.fighterB.losses}-{fight.fighterB.draws}</p>
                          </div>
                        </div>
                      </div>

                      {fightOdds.length > 0 && (
                        <div className="mt-4 flex justify-center gap-4">
                          <div className="rounded border border-border bg-surface px-4 py-2 text-center">
                            <span className="text-lg font-bold text-white">{fightOdds[0].fighterAOdds.toFixed(2)}</span>
                            <p className="text-[10px] text-muted">Favourite</p>
                          </div>
                          <div className="rounded border border-border bg-surface px-4 py-2 text-center">
                            <span className="text-lg font-bold text-white">{fightOdds[0].fighterBOdds.toFixed(2)}</span>
                            <p className="text-[10px] text-muted">Underdog</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-16">
              <Radio className="mb-3 h-10 w-10 text-muted" />
              <h3 className="text-lg font-bold text-white">No Live Fights</h3>
              <p className="mt-1 text-sm text-muted">Check back during scheduled fight times.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
