"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, GitCompare, Trophy, Swords, TrendingUp, Award, Newspaper } from "lucide-react";
import Link from "next/link";
import Card from "@/components/shared/Card";
import TabBar from "@/components/shared/TabBar";
import { FIXTURE_FIGHTERS, FIXTURE_FIGHTS, FIXTURE_ODDS } from "@/lib/data/fixtures";
import { getCountryFlag, formatRecord } from "@/lib/utils";

export default function FighterProfilePage() {
  const params = useParams();
  const fighter = FIXTURE_FIGHTERS.find((f) => f.id === params.id) ?? FIXTURE_FIGHTERS[0];
  const [activeTab, setActiveTab] = useState("Overview");
  const totalFights = fighter.wins + fighter.losses + fighter.draws;
  const koPercent = totalFights > 0 ? Math.round((fighter.kos / fighter.wins) * 100) : 0;

  return (
    <div>
      {/* Hero */}
      <div className="relative border-b border-border bg-gradient-to-r from-card via-surface to-card">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="relative px-4 py-6 lg:px-8">
          <Link href="/fighters" className="mb-4 inline-flex items-center gap-1 text-xs text-muted hover:text-white">
            <ArrowLeft className="h-3 w-3" /> Fighters &gt; {fighter.name}
          </Link>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-border bg-card text-3xl font-bold text-muted lg:h-36 lg:w-36">
              {fighter.name.split(" ").map(n => n[0]).join("")}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">{getCountryFlag(fighter.countryCode)}</span>
                <h1 className="text-3xl font-black uppercase text-white lg:text-4xl">{fighter.name}</h1>
              </div>
              {fighter.nickname && (
                <p className="mt-1 text-sm text-muted">&quot;{fighter.nickname}&quot;</p>
              )}
              <p className="mt-1 text-sm text-muted">{fighter.division} | {fighter.stance}</p>

              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
                <div>
                  <span className="text-2xl font-black text-white">{formatRecord(fighter.wins, fighter.losses, fighter.draws)}</span>
                  <p className="text-[10px] uppercase text-muted">Record</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-white">{fighter.kos}</span>
                  <p className="text-[10px] uppercase text-muted">KOs</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-white">{koPercent}%</span>
                  <p className="text-[10px] uppercase text-muted">KO %</p>
                </div>
                {fighter.height && (
                  <div>
                    <span className="text-2xl font-black text-white">{fighter.height}</span>
                    <p className="text-[10px] uppercase text-muted">Height</p>
                  </div>
                )}
                {fighter.weight && (
                  <div>
                    <span className="text-2xl font-black text-white">{fighter.weight}</span>
                    <p className="text-[10px] uppercase text-muted">Weight</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-md bg-fp-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-fp-red-dark">
                <Bell className="h-4 w-4" /> Follow
              </button>
              <button className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-card-hover hover:text-white">
                <GitCompare className="h-4 w-4" /> Compare
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-4 py-3 lg:px-6">
        <TabBar
          tabs={["Overview", "Fight History", "Stats", "Analysis", "News", "Media"]}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-12 lg:p-6">
        <div className="space-y-4 lg:col-span-4">
          <Card title="Next Fight" titleIcon={<Swords className="h-4 w-4" />}>
            <div className="rounded-md border border-border bg-surface p-4">
              <h4 className="text-sm font-bold text-white">
                {fighter.name} vs {FIXTURE_FIGHTERS[1].name}
              </h4>
              <p className="mt-1 text-xs text-muted">{fighter.division}</p>
              <p className="mt-1 text-xs text-muted">Sat 21 Dec 2025 · Kingdom Arena, Riyadh</p>
              <div className="mt-3 flex justify-center gap-4">
                <div className="text-center">
                  <span className="text-lg font-bold text-white">1.44</span>
                  <p className="text-[10px] text-muted">Favourite</p>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold text-white">3.00</span>
                  <p className="text-[10px] text-muted">Underdog</p>
                </div>
              </div>
              <Link
                href={`/fights/fight-4`}
                className="mt-3 flex w-full items-center justify-center gap-1 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-white"
              >
                View Fight →
              </Link>
            </div>
          </Card>

          <Card title="Career Record" titleIcon={<Trophy className="h-4 w-4" />}>
            <div className="flex items-center justify-center gap-4">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3"
                    strokeDasharray={`${(fighter.wins / totalFights) * 100} ${100 - (fighter.wins / totalFights) * 100}`}
                    className="text-success"
                  />
                  {fighter.losses > 0 && (
                    <circle
                      cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3"
                      strokeDasharray={`${(fighter.losses / totalFights) * 100} ${100 - (fighter.losses / totalFights) * 100}`}
                      strokeDashoffset={`-${(fighter.wins / totalFights) * 100}`}
                      className="text-fp-red"
                    />
                  )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-white">{totalFights}</span>
                  <span className="text-[9px] text-muted">FIGHTS</span>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-white">{fighter.wins} Wins</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-fp-red" />
                  <span className="text-white">{fighter.losses} Losses</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-muted" />
                  <span className="text-white">{fighter.draws} Draws</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">KO / TKO</span>
                <span className="text-white">{fighter.kos} ({koPercent}%)</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full rounded-full bg-success"
                  initial={{ width: 0 }}
                  animate={{ width: `${koPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Decision</span>
                <span className="text-white">{fighter.wins - fighter.kos} ({100 - koPercent}%)</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full rounded-full bg-fp-red"
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - koPercent}%` }}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-4">
          <Card title="Recent Fights" titleIcon={<Swords className="h-4 w-4" />} action={{ label: "View All Fights" }}>
            <div className="space-y-2">
              {[
                { opponent: "Francis Ngannou", date: "8 Mar 2024", result: "W", method: "KO", round: "R2" },
                { opponent: "Otto Wallin", date: "23 Dec 2023", result: "W", method: "UD", round: "R12" },
                { opponent: "Robert Helenius", date: "12 Aug 2023", result: "W", method: "TKO", round: "R7" },
                { opponent: "Jermaine Franklin", date: "1 Apr 2023", result: "W", method: "UD", round: "R12" },
                { opponent: "Oleksandr Usyk", date: "20 Aug 2022", result: "L", method: "SD", round: "R12" },
              ].map((fight, i) => (
                <div key={i} className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2">
                  <span className="text-[10px] text-muted w-20">{fight.date}</span>
                  <span className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white ${fight.result === "W" ? "bg-success" : "bg-fp-red"}`}>
                    {fight.result}
                  </span>
                  <span className="flex-1 text-xs text-white">{fight.opponent}</span>
                  <span className="text-xs text-muted">{fight.method}</span>
                  <span className="text-xs text-muted">{fight.round}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-4">
          <Card title="Fighter Bio" titleIcon={<Award className="h-4 w-4" />}>
            <p className="text-xs leading-relaxed text-muted">
              Fighter biography and detailed information would be populated from verified data sources.
              This section would contain career highlights, fighting style analysis, and biographical details.
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Nationality</span>
                <span className="text-white">{getCountryFlag(fighter.countryCode)} {fighter.nationality}</span>
              </div>
              {fighter.dateOfBirth && (
                <div className="flex justify-between">
                  <span className="text-muted">Born</span>
                  <span className="text-white">{new Date(fighter.dateOfBirth).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted">Stance</span>
                <span className="text-white">{fighter.stance}</span>
              </div>
              {fighter.height && (
                <div className="flex justify-between">
                  <span className="text-muted">Height</span>
                  <span className="text-white">{fighter.height}</span>
                </div>
              )}
              {fighter.reach && (
                <div className="flex justify-between">
                  <span className="text-muted">Reach</span>
                  <span className="text-white">{fighter.reach}</span>
                </div>
              )}
            </div>
          </Card>

          <Card title="Key Achievements" titleIcon={<Award className="h-4 w-4" />}>
            <div className="space-y-2">
              {[
                "Unified World Heavyweight Champion",
                "Olympic Gold Medalist (London 2012)",
                "Commonwealth Heavyweight Champion",
              ].map((achievement, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <Trophy className="h-3 w-3 text-yellow-500" />
                  <span className="text-white">{achievement}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Latest News" titleIcon={<Newspaper className="h-4 w-4" />} action={{ label: "View All News" }}>
            <div className="space-y-3">
              {[
                { title: "Training camp preparations underway", time: "2 days ago" },
                { title: "Fight officially confirmed for December", time: "1 week ago" },
              ].map((news, i) => (
                <div key={i} className="cursor-pointer rounded-md border border-border bg-surface p-3 transition-colors hover:bg-card-hover">
                  <p className="text-xs font-medium text-white">{news.title}</p>
                  <p className="mt-1 text-[10px] text-muted">{news.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
