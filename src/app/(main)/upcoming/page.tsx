"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import { FIXTURE_FIGHTS, FIXTURE_EVENTS, FIXTURE_ODDS } from "@/lib/data/fixtures";
import { getCountryFlag } from "@/lib/utils";

export default function UpcomingPage() {
  const [activeTab, setActiveTab] = useState("All Upcoming");
  const upcomingFights = FIXTURE_FIGHTS.filter((f) => f.status === "SCHEDULED");

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
            const event = FIXTURE_EVENTS.find((e) => e.id === fight.eventId);
            const odds = FIXTURE_ODDS.filter((o) => o.fightId === fight.id);

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
                    {odds.length > 0 && (
                      <div className="flex gap-3">
                        <span className="text-sm font-bold text-white">{odds[0].fighterAOdds.toFixed(2)}</span>
                        <span className="text-xs text-muted">vs</span>
                        <span className="text-sm font-bold text-white">{odds[0].fighterBOdds.toFixed(2)}</span>
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
