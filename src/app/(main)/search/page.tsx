"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search as SearchIcon, ChevronRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import { fighters as fightersService } from "@/lib/services/fighters";
import { fights as fightsService } from "@/lib/services/fights";
import { events as eventsService } from "@/lib/services/events";
import { promotions as promotionsService } from "@/lib/services/promotions";
import { getCountryFlag, formatRecord } from "@/lib/utils";
import type { Fighter, Fight, Event, Promotion } from "@/lib/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Results");
  const [allFighters, setAllFighters] = useState<Fighter[]>([]);
  const [allFights, setAllFights] = useState<Fight[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [allPromotions, setAllPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fightersService.getAll(),
      fightsService.getAll(),
      eventsService.getAll(),
      promotionsService.getAll(),
    ]).then(([fightersData, fightsData, eventsData, promotionsData]) => {
      setAllFighters(fightersData);
      setAllFights(fightsData);
      setAllEvents(eventsData);
      setAllPromotions(promotionsData);
      setLoading(false);
    });
  }, []);

  const filteredFighters = allFighters.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredFights = query
    ? allFights.filter(
        (f) =>
          f.fighterA.name.toLowerCase().includes(query.toLowerCase()) ||
          f.fighterB.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  const filteredEvents = query
    ? allEvents.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const totalResults = filteredFighters.length + filteredFights.length + filteredEvents.length;

  if (loading) {
    return (
      <div>
        <PageHero title="Search" subtitle="Find fighters, events, promotions and more." />
        <div className="flex items-center justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-fp-red" /></div>
      </div>
    );
  }

  return (
    <div>
      <PageHero title="Search" subtitle="Find fighters, events, promotions and more." />

      <div className="px-4 py-4 lg:px-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fighters, events, promotions..."
              className="h-12 w-full rounded-md border border-border bg-card pl-12 pr-4 text-sm text-foreground placeholder:text-muted focus:border-fp-red focus:outline-none focus:ring-1 focus:ring-fp-red/50"
              autoFocus
            />
          </div>
          <button className="rounded-md bg-fp-red px-6 text-sm font-bold text-white transition-colors hover:bg-fp-red-dark">
            Search
          </button>
        </div>

        {query && (
          <>
            <div className="mt-4">
              <TabBar
                tabs={[
                  `All Results (${totalResults})`,
                  `Fighters (${filteredFighters.length})`,
                  `Fights (${filteredFights.length})`,
                  `Events (${filteredEvents.length})`,
                  "Promotions (0)",
                  "News (0)",
                ]}
                active={activeTab}
                onChange={setActiveTab}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-8">
                {/* Fighters */}
                {filteredFighters.length > 0 && (
                  <section>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                        Fighters ({filteredFighters.length})
                      </h3>
                      <button className="text-[10px] text-muted hover:text-white">View All Fighters →</button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {filteredFighters.slice(0, 5).map((fighter) => (
                        <Link
                          key={fighter.id}
                          href={`/fighters/${fighter.id}`}
                          className="group flex w-32 shrink-0 flex-col items-center rounded-lg border border-border bg-card p-3 transition-colors hover:border-fp-red/30 hover:bg-card-hover"
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-sm font-bold text-muted group-hover:border-fp-red/30">
                            {fighter.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <p className="mt-2 text-center text-xs font-bold text-white">{fighter.name}</p>
                          <p className="text-[9px] text-muted">
                            {getCountryFlag(fighter.countryCode)} {formatRecord(fighter.wins, fighter.losses, fighter.draws)}
                          </p>
                          <p className="text-[9px] text-muted">{fighter.division}</p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Fights */}
                {filteredFights.length > 0 && (
                  <section>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                        Fights ({filteredFights.length})
                      </h3>
                      <button className="text-[10px] text-muted hover:text-white">View All Fights →</button>
                    </div>
                    <div className="space-y-2">
                      {filteredFights.map((fight) => (
                        <Link
                          key={fight.id}
                          href={`/fights/${fight.id}`}
                          className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 transition-colors hover:bg-card-hover"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-bold text-muted">
                              {fight.fighterA.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white">
                                {fight.fighterA.name} vs {fight.fighterB.name}
                              </p>
                              <p className="text-[10px] text-muted">{fight.weightClass}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {fight.result && (
                              <span className="rounded bg-success/20 px-1.5 py-0.5 text-[10px] font-bold text-success">
                                {fight.result.method}
                              </span>
                            )}
                            <ChevronRight className="h-4 w-4 text-muted" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Events */}
                {filteredEvents.length > 0 && (
                  <section>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                        Events ({filteredEvents.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {filteredEvents.map((event) => (
                        <Link
                          key={event.id}
                          href={`/events/${event.id}`}
                          className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-card-hover"
                        >
                          <h4 className="text-xs font-bold text-white">{event.name}</h4>
                          <p className="mt-1 text-[10px] text-muted">
                            {new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                          <p className="text-[10px] text-muted">{event.venue.name}, {event.venue.city}</p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Promotions */}
                <section>
                  <div className="mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Promotions</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {allPromotions.map((promo) => (
                      <div key={promo.id} className="flex h-16 w-32 items-center justify-center rounded-md border border-border bg-card text-xs font-bold text-muted transition-colors hover:bg-card-hover hover:text-white">
                        {promo.name}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right preview panel */}
              {filteredFighters.length > 0 && (
                <div className="lg:col-span-4">
                  <div className="sticky top-20 rounded-lg border border-border bg-card p-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-border bg-surface text-2xl font-bold text-muted">
                        {filteredFighters[0].name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <h3 className="mt-3 text-xl font-black uppercase text-white">
                        {filteredFighters[0].name}
                      </h3>
                      {filteredFighters[0].nickname && (
                        <p className="text-xs text-muted">&quot;{filteredFighters[0].nickname}&quot;</p>
                      )}
                      <p className="text-xs text-muted">{filteredFighters[0].division} | {filteredFighters[0].stance}</p>
                      <div className="mt-3 flex gap-4 text-center text-xs">
                        <div><span className="text-lg font-black text-white">{formatRecord(filteredFighters[0].wins, filteredFighters[0].losses, filteredFighters[0].draws)}</span><br /><span className="text-[10px] text-muted">Record</span></div>
                        <div><span className="text-lg font-black text-white">{filteredFighters[0].kos}</span><br /><span className="text-[10px] text-muted">KOs</span></div>
                      </div>
                      <Link
                        href={`/fighters/${filteredFighters[0].id}`}
                        className="mt-4 w-full rounded-md bg-fp-red px-4 py-2 text-center text-xs font-bold text-white transition-colors hover:bg-fp-red-dark"
                      >
                        View Fighter Profile →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Related searches */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-bold uppercase text-muted">Related Searches</p>
              <div className="flex flex-wrap gap-2">
                {["Devin Haney", "Tyson Fury", "Wilder", "Ngannou", "Heavyweight", "Matchroom Boxing"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted transition-colors hover:border-fp-red hover:text-white"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {!query && (
          <div className="mt-16 flex flex-col items-center text-center">
            <SearchIcon className="mb-4 h-12 w-12 text-muted" />
            <h3 className="text-lg font-bold text-white">Search Fight Pulse</h3>
            <p className="mt-1 text-sm text-muted">Find fighters, fights, events, promotions and more.</p>
          </div>
        )}
      </div>
    </div>
  );
}
