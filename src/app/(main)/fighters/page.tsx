"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Search } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import { fighters as fightersService } from "@/lib/services/fighters";
import { getCountryFlag, formatRecord } from "@/lib/utils";
import type { Fighter } from "@/lib/types";

export default function FightersPage() {
  const [activeTab, setActiveTab] = useState("All Fighters");
  const [search, setSearch] = useState("");
  const [allFighters, setAllFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fightersService.getAll();
      setAllFighters(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const fighters = allFighters.filter(
    (f) => f.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <PageHero
          title="Fighters"
          subtitle="Complete fighter database with records, stats and intelligence."
        />
        <div className="flex items-center justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-fp-red" /></div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title="Fighters"
        subtitle="Complete fighter database with records, stats and intelligence."
        badges={[
          { icon: <Users className="h-4 w-4" />, label: `${allFighters.length}`, sublabel: "Fighters" },
        ]}
      />

      <div className="px-4 py-4 lg:px-6">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fighters..."
              className="h-9 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-fp-red focus:outline-none sm:w-60"
            />
          </div>
          <TabBar
            tabs={["All Fighters", "Active", "By Division", "By Nationality", "Rankings"]}
            active={activeTab}
            onChange={setActiveTab}
          />
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
