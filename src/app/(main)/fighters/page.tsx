"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Search, Filter } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import { FIXTURE_FIGHTERS } from "@/lib/data/fixtures";
import { getCountryFlag, formatRecord } from "@/lib/utils";

export default function FightersPage() {
  const [activeTab, setActiveTab] = useState("All Fighters");
  const [search, setSearch] = useState("");
  const fighters = FIXTURE_FIGHTERS.filter(
    (f) => f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHero
        title="Fighters"
        subtitle="Complete fighter database with records, stats and intelligence."
        badges={[
          { icon: <Users className="h-4 w-4" />, label: `${FIXTURE_FIGHTERS.length}`, sublabel: "Fighters" },
        ]}
      />

      <div className="px-4 py-4 lg:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <TabBar
            tabs={["All Fighters", "Active", "By Division", "By Nationality", "Rankings"]}
            active={activeTab}
            onChange={setActiveTab}
          />
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fighters..."
              className="h-9 w-60 rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-fp-red focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fighters.map((fighter) => (
            <Link
              key={fighter.id}
              href={`/fighters/${fighter.id}`}
              className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-border-bright hover:bg-card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-lg font-bold text-muted">
                  {fighter.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getCountryFlag(fighter.countryCode)}</span>
                    <h3 className="truncate text-sm font-bold uppercase text-white group-hover:text-fp-red">
                      {fighter.name}
                    </h3>
                  </div>
                  {fighter.nickname && (
                    <p className="text-[10px] text-muted">&quot;{fighter.nickname}&quot;</p>
                  )}
                  <p className="mt-1 text-xs text-muted">{fighter.division} | {fighter.stance}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-sm font-bold text-white">
                      {formatRecord(fighter.wins, fighter.losses, fighter.draws)}
                    </span>
                    <span className="text-[10px] text-muted">
                      {fighter.kos} KOs ({Math.round((fighter.kos / (fighter.wins || 1)) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
