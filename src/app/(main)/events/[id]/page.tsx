"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CalendarDays, MapPin, Tv, Clock, Share2 } from "lucide-react";
import Card from "@/components/shared/Card";
import TabBar from "@/components/shared/TabBar";
import { events } from "@/lib/services/events";
import { fights as fightsService } from "@/lib/services/fights";
import { odds as oddsService } from "@/lib/services/odds";
import { getCountryFlag } from "@/lib/utils";
import type { Event, Fight, OddsSnapshot } from "@/lib/types";

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [fightList, setFightList] = useState<Fight[]>([]);
  const [oddsMap, setOddsMap] = useState<Record<string, OddsSnapshot[]>>({});
  const [activeTab, setActiveTab] = useState("Fight Card");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    Promise.all([
      events.getById(id),
      fightsService.getByEvent(id),
    ]).then(async ([eventData, fightsData]) => {
      if (!eventData) {
        // Fallback to first event
        const allEvents = await events.getAll();
        setEvent(allEvents[0] ?? null);
        if (allEvents[0]) {
          const fallbackFights = await fightsService.getByEvent(allEvents[0].id);
          setFightList(fallbackFights);
          const oddsResults: Record<string, OddsSnapshot[]> = {};
          await Promise.all(fallbackFights.map(async (f) => {
            oddsResults[f.id] = await oddsService.getForFight(f.id);
          }));
          setOddsMap(oddsResults);
        }
      } else {
        setEvent(eventData);
        setFightList(fightsData);
        const oddsResults: Record<string, OddsSnapshot[]> = {};
        await Promise.all(fightsData.map(async (f) => {
          oddsResults[f.id] = await oddsService.getForFight(f.id);
        }));
        setOddsMap(oddsResults);
      }
      setLoading(false);
    });
  }, [params.id]);

  if (loading || !event) {
    return (
      <div className="flex items-center justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-fp-red" /></div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative border-b border-border bg-gradient-to-r from-card via-surface to-card">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="relative px-4 py-8 lg:px-8">
          <div className="flex items-start justify-between">
            <div>
              {event.promotion && (
                <span className="text-xs font-medium text-fp-red">{event.promotion.name}</span>
              )}
              <h1 className="mt-1 text-3xl font-black uppercase text-white lg:text-4xl" style={{ fontStyle: "italic" }}>
                {event.name}
              </h1>
              <p className="mt-2 text-sm text-muted">
                {new Date(event.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <button className="rounded-md border border-border p-2 text-muted hover:text-white">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-4 py-3 lg:px-6">
        <TabBar
          tabs={["Fight Card", "Event Info", "News", "Weigh-in", "Videos", "Tickets"]}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-12 lg:p-6">
        <div className="space-y-4 lg:col-span-8">
          <Card title={`Fight Card · ${fightList.length} Fights`} titleIcon={<CalendarDays className="h-4 w-4" />}>
            <div className="space-y-3">
              {fightList.map((fight) => {
                const fightOdds = oddsMap[fight.id] ?? [];
                const label = fight.isMainEvent ? "MAIN EVENT" : fight.isCoMain ? "CO-MAIN EVENT" : `${fight.orderOnCard}`;

                return (
                  <div
                    key={fight.id}
                    className={`rounded-lg border p-4 transition-colors hover:bg-card-hover ${
                      fight.isMainEvent ? "border-fp-red/30 bg-fp-red/5" : "border-border bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className={`rounded px-1.5 py-0.5 font-bold text-white ${fight.isMainEvent ? "bg-fp-red" : "bg-card"}`}>
                        {label}
                      </span>
                      {fight.title && <span className="text-muted">{fight.title}</span>}
                      <span className="text-muted">· {fight.scheduledRounds} Rounds</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-sm font-bold text-muted">
                          {fight.fighterA.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-xs">{getCountryFlag(fight.fighterA.countryCode)}</p>
                          <p className="text-sm font-bold text-white">{fight.fighterA.name}</p>
                          <p className="text-[10px] text-muted">{fight.fighterA.wins}-{fight.fighterA.losses}-{fight.fighterA.draws}</p>
                        </div>
                      </div>

                      {fightOdds.length > 0 && (
                        <div className="hidden items-center gap-3 md:flex">
                          <div className="rounded border border-border bg-card px-3 py-1 text-center">
                            <span className="text-sm font-bold text-white">{fightOdds[0].fighterAOdds.toFixed(2)}</span>
                            <p className="text-[9px] text-success">Favourite</p>
                          </div>
                          <div className="rounded border border-border bg-card px-3 py-1 text-center">
                            <span className="text-sm font-bold text-white">{fightOdds[0].fighterBOdds.toFixed(2)}</span>
                            <p className="text-[9px] text-fp-red">Underdog</p>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-row-reverse items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-sm font-bold text-muted">
                          {fight.fighterB.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="text-right">
                          <p className="text-xs">{getCountryFlag(fight.fighterB.countryCode)}</p>
                          <p className="text-sm font-bold text-white">{fight.fighterB.name}</p>
                          <p className="text-[10px] text-muted">{fight.fighterB.wins}-{fight.fighterB.losses}-{fight.fighterB.draws}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-4">
          <Card title="Event Details" titleIcon={<CalendarDays className="h-4 w-4" />}>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-fp-red" />
                <div>
                  <p className="font-bold text-white">{event.name}</p>
                  {event.promotion && <p className="text-muted">{event.promotion.name}</p>}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-fp-red" />
                <div>
                  <p className="text-white">{event.venue.name}</p>
                  <p className="text-muted">{event.venue.city}, {event.venue.country}</p>
                </div>
              </div>
              {event.broadcast && (
                <div className="flex items-start gap-3">
                  <Tv className="mt-0.5 h-4 w-4 shrink-0 text-fp-red" />
                  <div>
                    <p className="text-white">Live on {event.broadcast}</p>
                    <p className="text-muted">Worldwide</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-fp-red" />
                <div>
                  <p className="text-white">
                    Main Card: {new Date(event.date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} BST
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Event Countdown" titleIcon={<Clock className="h-4 w-4" />}>
            <div className="flex justify-center gap-3">
              {[
                { value: "12", label: "DAYS" },
                { value: "06", label: "HOURS" },
                { value: "24", label: "MINS" },
                { value: "18", label: "SECS" },
              ].map((unit) => (
                <div key={unit.label} className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md border border-border bg-surface">
                    <span className="text-xl font-black text-white">{unit.value}</span>
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-muted">{unit.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <button className="w-full rounded-md bg-fp-red px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-fp-red-dark">
            Get Tickets →
          </button>
        </div>
      </div>
    </div>
  );
}
