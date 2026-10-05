"use client";

import { useState } from "react";
import { CheckSquare, Filter, Search, Trophy, Users, CalendarDays, Globe } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import Card from "@/components/shared/Card";

const FIXTURE_RESULTS = [
  { date: "20 Apr 2024", fight: "Catterall vs Prograis", weightClass: "Super Lightweight", result: "WIN", method: "UD", round: "12/12", score: 78 },
  { date: "20 Apr 2024", fight: "Dubois vs Hrgovic", weightClass: "Heavyweight", result: "WIN", method: "KO", round: "8/12", score: 85 },
  { date: "20 Apr 2024", fight: "Stevenson vs Zepeda", weightClass: "Lightweight", result: "WIN", method: "UD", round: "12/12", score: 72 },
  { date: "20 Apr 2024", fight: "Opetaia vs Zorro", weightClass: "Cruiserweight", result: "WIN", method: "KO", round: "4/12", score: 88 },
  { date: "20 Apr 2024", fight: "Garcia vs Haney", weightClass: "Super Lightweight", result: "WIN", method: "MD", round: "12/12", score: 81 },
  { date: "16 Mar 2024", fight: "Joshua vs Ngannou", weightClass: "Heavyweight", result: "WIN", method: "KO", round: "2/10", score: 79 },
  { date: "8 Mar 2024", fight: "Taylor vs Cameron", weightClass: "Super Lightweight", result: "WIN", method: "SD", round: "10/10", score: 76 },
  { date: "23 Dec 2023", fight: "Nakatani vs Astrolabio", weightClass: "Bantamweight", result: "WIN", method: "TKO", round: "1/12", score: 69 },
  { date: "23 Dec 2023", fight: "Bivol vs Arthur", weightClass: "Light Heavyweight", result: "WIN", method: "UD", round: "12/12", score: 80 },
  { date: "12 Aug 2023", fight: "Crawford vs Spence", weightClass: "Welterweight", result: "WIN", method: "TKO", round: "9/12", score: 91 },
];

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("All Results");

  return (
    <div>
      <PageHero
        title="Results"
        subtitle="Complete fight history. Real results. Detailed analysis."
        badges={[
          { icon: <Trophy className="h-4 w-4" />, label: "12,487", sublabel: "Total Fights" },
          { icon: <Users className="h-4 w-4" />, label: "3,842", sublabel: "Fighters" },
          { icon: <CalendarDays className="h-4 w-4" />, label: "186", sublabel: "Events" },
          { icon: <Globe className="h-4 w-4" />, label: "42", sublabel: "Promotions" },
        ]}
      />

      <div className="px-4 py-4 lg:px-6">
        <TabBar
          tabs={["All Results", "Recent Results", "Results by Event", "Results by Fighter", "KO/TKO", "Decisions", "By Weight Class", "By Promotion"]}
          active={activeTab}
          onChange={setActiveTab}
        />

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["1 Jan 2020 - Present", "All Promotions", "All Weight Classes", "All Result Types"].map((filter) => (
            <button key={filter} className="rounded-md border border-border bg-card px-3 py-2 text-xs text-muted transition-colors hover:border-border-bright hover:text-white">
              {filter} ▾
            </button>
          ))}
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-muted" />
            <input
              placeholder="Search fighters, events..."
              className="h-9 w-48 rounded-md border border-border bg-card pl-8 pr-3 text-xs text-foreground placeholder:text-muted focus:border-fp-red focus:outline-none"
            />
          </div>
        </div>

        {/* Results Table */}
        <div className="mt-4">
          <Card title="Latest Results" titleIcon={<CheckSquare className="h-4 w-4" />} noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-4 py-3 text-left font-medium text-muted">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Fight</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Weight Class</th>
                    <th className="px-4 py-3 text-center font-medium text-muted">Result</th>
                    <th className="px-4 py-3 text-center font-medium text-muted">Method</th>
                    <th className="px-4 py-3 text-center font-medium text-muted">Round</th>
                    <th className="px-4 py-3 text-center font-medium text-muted">Fight Pulse</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {FIXTURE_RESULTS.map((result, i) => (
                    <tr key={i} className="border-b border-border transition-colors hover:bg-card-hover">
                      <td className="px-4 py-3 text-muted">{result.date}</td>
                      <td className="px-4 py-3 font-medium text-white">{result.fight}</td>
                      <td className="px-4 py-3 text-muted">{result.weightClass}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="rounded bg-success/20 px-1.5 py-0.5 text-[10px] font-bold text-success">
                          {result.result}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-medium text-white">{result.method}</td>
                      <td className="px-4 py-3 text-center text-muted">{result.round}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-bold text-white">{result.score}</span>
                          <div className="flex gap-px">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <div
                                key={j}
                                className={`h-3 w-1 rounded-sm ${j < Math.round(result.score / 20) ? "bg-fp-red" : "bg-border"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-muted">›</td>
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
