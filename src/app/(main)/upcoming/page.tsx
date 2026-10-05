"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import { fights as fightsService } from "@/lib/services/fights";
import { events as eventsService } from "@/lib/services/events";
import { odds as oddsService } from "@/lib/services/odds";
import { getCountryFlag } from "@/lib/utils";
import type { Fight, Event, OddsSnapshot } from "@/lib/types";

export default function UpcomingPage() {
  const [activeTab, setActiveTab] = useState("All Upcoming");
  const [upcomingFights, setUpcomingFights] = useState<Fight[]>([]);
  const [eventMap, setEventMap] = useState<Record<string, Event>>({});
  const [oddsMap, setOddsMap] = useState<Record<string, OddsSnapshot[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fightsService.getUpcoming().then(async (fightsData) => {
      setUpcomingFights(fightsData);

      // Load events and odds for each fight
      const eventsResult: Record<string, Event> = {};
      const oddsResult: Record<string, OddsSnapshot[]> = {};

      await Promise.all(fightsData.map(async (fight) => {
        const [eventData, oddsData] = await Promise.all([
          fight.eventId ? eventsService.getById(fight.eventId) : Promise.resolve(null),
          oddsService.getForFight(fight.id),
        ]);
        if (eventData) eventsResult[fight.eventId] = eventData;
        oddsResult[fight.id] = oddsData;
      }));

      setEventMap(eventsResult);
      setOddsMap(oddsResult);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <PageHero title="Upcoming" subtitle="All confirmed upcoming boxing fights and events." />
        <div className="flex items-center justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-fp-red" /></div>
      </div>
    );
  }

  return (
    <div>
      <PageHero title="Upcoming" subtitle="All confirmed upcoming boxing fights and events." />

      <div className="px-4 py-4 lg:px-6">
        <TabBar
          tabs={["All Upcoming", "This Week", "This Month", "Title Fights", "By Division"]}
          active={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-6 space-y-3">
          {upcomingFights.map((fight) => {
            const event = eventMap[fight.eventId];
            const fightOdds = oddsMap[fight.id] ?? [];

            return (
              <Link
                key={fight.id}
                href={`/fights/${fight.id}`}
                className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-border-bright hover:bg-card-hover lg:p-5"
              >
                <div className="flex items-center gap-2 text-[10px]">
                  {fight.isMainEvent && (
                    <span className="rounded bg-fp-red px-1.5 py-0.5 font-bold text-white">MAIN EVENT</span>
                  )}
                  {fight.title && <span className="text-muted">{fight.title}</span>}
                  <span className="text-muted">· {fight.scheduledRounds} Rounds</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-sm font-bold text-muted">
                      {fight.fighterA.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-xs">{getCountryFlag(fight.fighterA.countryCode)}</p>
                      <p className="text-sm font-bold text-white">{fight.fighterA.name}</p>
                      <p className="text-[10px] text-muted">{fight.fighterA.wins}-{fight.fighterA.losses}-{fight.fighterA.draws}</p>
                    </div>
                  </div>

                  <div className="hidden flex-col items-center gap-1 md:flex">
                    {fightOdds.length > 0 && (
                      <div className="flex gap-3">
                        <span className="text-sm font-bold text-white">{fightOdds[0].fighterAOdds.toFixed(2)}</span>
                        <span className="text-xs text-muted">vs</span>
                        <span className="text-sm font-bold text-white">{fightOdds[0].fighterBOdds.toFixed(2)}</span>
                      </div>
                    )}
                    {event && (
                      <p className="text-[10px] text-muted">
                        {new Date(event.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-row-reverse items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-sm font-bold text-muted">
                      {fight.fighterB.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="text-right">
                      <p className="text-xs">{getCountryFlag(fight.fighterB.countryCode)}</p>
                      <p className="text-sm font-bold text-white">{fight.fighterB.name}</p>
                      <p className="text-[10px] text-muted">{fight.fighterB.wins}-{fight.fighterB.losses}-{fight.fighterB.draws}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile odds & date */}
                <div className="mt-3 flex items-center justify-between md:hidden">
                  {fightOdds.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-surface px-2 py-1 text-xs font-bold text-white">{fightOdds[0].fighterAOdds.toFixed(2)}</span>
                      <span className="text-[10px] text-muted">vs</span>
                      <span className="rounded bg-surface px-2 py-1 text-xs font-bold text-white">{fightOdds[0].fighterBOdds.toFixed(2)}</span>
                    </div>
                  )}
                  {event && (
                    <span className="text-[10px] text-muted">
                      {new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  )}
                </div>

                {event && (
                  <div className="mt-3 flex items-center gap-4 text-[10px] text-muted">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.venue.name}, {event.venue.city}</span>
                    {event.broadcast && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.broadcast}</span>}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
