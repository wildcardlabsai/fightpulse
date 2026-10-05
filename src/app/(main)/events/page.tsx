"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Tv } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import { FIXTURE_EVENTS } from "@/lib/data/fixtures";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <div>
      <PageHero title="Events" subtitle="All major boxing events worldwide." />

      <div className="px-4 py-4 lg:px-6">
        <TabBar
          tabs={["Upcoming", "Live", "Past Events", "By Promotion"]}
          active={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FIXTURE_EVENTS.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-border-bright hover:bg-card-hover"
            >
              <div className="relative h-40 bg-gradient-to-br from-fp-red/20 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <CalendarDays className="h-16 w-16 text-border" />
                </div>
                <div className="absolute left-3 top-3">
                  <div className="rounded bg-fp-red px-2 py-1 text-center">
                    <p className="text-[10px] font-bold uppercase text-white">
                      {new Date(event.date).toLocaleDateString("en-GB", { month: "short" }).toUpperCase()}
                    </p>
                    <p className="text-xl font-black text-white">{new Date(event.date).getDate()}</p>
                    <p className="text-[10px] text-white/70">{new Date(event.date).getFullYear()}</p>
                  </div>
                </div>
                {event.status === "live" && (
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-fp-red px-2 py-0.5 text-[10px] font-bold text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white fp-live-pulse" /> LIVE
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold text-white group-hover:text-fp-red">{event.name}</h3>
                {event.promotion && (
                  <p className="mt-1 text-[10px] font-medium text-fp-red">{event.promotion.name}</p>
                )}
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-1 text-[10px] text-muted">
                    <MapPin className="h-3 w-3" /> {event.venue.name}, {event.venue.city}
                  </div>
                  {event.broadcast && (
                    <div className="flex items-center gap-1 text-[10px] text-muted">
                      <Tv className="h-3 w-3" /> {event.broadcast}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
