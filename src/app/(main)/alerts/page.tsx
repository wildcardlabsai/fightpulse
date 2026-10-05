"use client";

import { useState, useEffect } from "react";
import { Bell, Calendar, TrendingUp, Newspaper, Zap, Settings, Plus } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import Card from "@/components/shared/Card";
import { alerts as alertsService } from "@/lib/services/alerts";
import { timeAgo } from "@/lib/utils";
import type { Alert } from "@/lib/types";

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [alertType, setAlertType] = useState("Fight Alerts");
  const [alertList, setAlertList] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    alertsService.getAll().then((data) => {
      setAlertList(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <PageHero
          title="Alerts Centre"
          subtitle="Stay ahead. Never miss what matters. Get real-time alerts for fights, odds, news, and key Fight Pulse signals."
          badges={[
            { icon: <Bell className="h-4 w-4" />, label: "Real-Time Alerts", sublabel: "Be first to know" },
            { icon: <TrendingUp className="h-4 w-4" />, label: "Personalised To You", sublabel: "Follow fighters, events and more" },
            { icon: <Zap className="h-4 w-4" />, label: "More Than Odds", sublabel: "Get alerts for Fight Pulse signals, news and key moments" },
          ]}
        />
        <div className="flex items-center justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-fp-red" /></div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title="Alerts Centre"
        subtitle="Stay ahead. Never miss what matters. Get real-time alerts for fights, odds, news, and key Fight Pulse signals."
        badges={[
          { icon: <Bell className="h-4 w-4" />, label: "Real-Time Alerts", sublabel: "Be first to know" },
          { icon: <TrendingUp className="h-4 w-4" />, label: "Personalised To You", sublabel: "Follow fighters, events and more" },
          { icon: <Zap className="h-4 w-4" />, label: "More Than Odds", sublabel: "Get alerts for Fight Pulse signals, news and key moments" },
        ]}
      />

      <div className="px-4 py-4 lg:px-6">
        <TabBar
          tabs={["Overview", "My Alerts", "Create Alert", "Alert History", "Notification Settings"]}
          active={activeTab}
          onChange={setActiveTab}
        />

        {/* Alert Summary Cards */}
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { count: alertList.length, label: "Recent Alerts", sublabel: "From your alert feed", icon: <Bell className="h-5 w-5" /> },
            { count: alertList.filter(a => a.type === "fight").length, label: "Fight Alerts", sublabel: "Upcoming fight reminders", icon: <Calendar className="h-5 w-5" /> },
            { count: alertList.filter(a => a.type === "odds").length, label: "Odds Alerts", sublabel: "Price movement alerts", icon: <TrendingUp className="h-5 w-5" /> },
            { count: alertList.filter(a => a.type === "signal").length, label: "Signal Alerts", sublabel: "Momentum & insights", icon: <Zap className="h-5 w-5" /> },
          ].map((card, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-fp-red">{card.icon}</div>
              <p className="mt-2 text-2xl font-black text-white">{card.count}</p>
              <p className="text-[10px] font-bold uppercase text-white">{card.label}</p>
              <p className="text-[9px] text-muted">{card.sublabel}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Create Alert */}
          <div className="lg:col-span-8">
            <Card title="Create a New Alert" titleIcon={<Plus className="h-4 w-4" />}>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Fight Alerts", "Odds Alerts", "Fighter Alerts", "Fight Pulse Signals", "News Alerts"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setAlertType(type)}
                    className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                      alertType === type ? "bg-fp-red text-white" : "border border-border text-muted hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <p className="mb-2 text-xs font-medium text-white">Choose what you want to be alerted about:</p>
                  <div className="space-y-2">
                    {["Upcoming fights", "Fight start reminders", "Live fight updates", "Fight results"].map((option) => (
                      <label key={option} className="flex items-center gap-2 text-xs text-muted">
                        <input type="checkbox" className="rounded border-border accent-fp-red" />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium text-white">Select fighters (optional):</p>
                  <input
                    placeholder="Search fighters..."
                    className="h-9 w-full rounded-md border border-border bg-surface px-3 text-xs text-foreground placeholder:text-muted focus:border-fp-red focus:outline-none"
                  />
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium text-white">Notification method:</p>
                  <div className="space-y-2">
                    {["In-app notification", "Email", "Push notification"].map((method) => (
                      <label key={method} className="flex items-center gap-2 text-xs text-muted">
                        <input type="checkbox" defaultChecked className="rounded border-border accent-fp-red" />
                        {method}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <button className="mt-4 rounded-md bg-fp-red px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-fp-red-dark">
                <Bell className="mr-1 inline h-3 w-3" /> Create Alert
              </button>
            </Card>

            {/* Recent Alerts */}
            <div className="mt-4">
              <Card title="Recent Alerts" titleIcon={<Bell className="h-4 w-4" />} action={{ label: "View All" }}>
                {alertList.length > 0 ? (
                  <div className="space-y-3">
                    {alertList.map((alert) => (
                      <div key={alert.id} className="flex items-center gap-3 rounded-md border border-border bg-surface p-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fp-red/20">
                          {alert.type === "odds" && <TrendingUp className="h-3 w-3 text-fp-red" />}
                          {alert.type === "fight" && <Calendar className="h-3 w-3 text-fp-red" />}
                          {alert.type === "signal" && <Zap className="h-3 w-3 text-fp-red" />}
                          {alert.type === "news" && <Newspaper className="h-3 w-3 text-fp-red" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-white">{alert.title}</p>
                          <p className="truncate text-[10px] text-muted">{alert.description}</p>
                        </div>
                        <span className="shrink-0 text-[9px] text-muted">{timeAgo(new Date(alert.timestamp))}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-4 text-center text-xs text-muted">No alerts yet. Create an alert to get started.</p>
                )}
              </Card>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4 lg:col-span-4">
            <Card title="My Active Alerts" titleIcon={<Bell className="h-4 w-4" />}>
              <p className="py-4 text-center text-xs text-muted">No active alerts. Use the form to create your first alert.</p>
            </Card>

            <Card title="Alert Settings" titleIcon={<Settings className="h-4 w-4" />}>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-bold text-white">Notification Preferences</p>
                  {["In-app notifications", "Email notifications", "Push notifications"].map((pref) => (
                    <div key={pref} className="flex items-center justify-between py-1.5">
                      <span className="text-xs text-muted">{pref}</span>
                      <div className="h-5 w-9 rounded-full bg-fp-red p-0.5">
                        <div className="h-4 w-4 translate-x-4 rounded-full bg-white" />
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold text-white">Alert Timing</p>
                  {[
                    { label: "Fight start reminder", value: "24 hours before" },
                    { label: "Odds movement threshold", value: "10%" },
                    { label: "News alerts frequency", value: "Instant" },
                    { label: "Quiet hours", value: "22:00 - 08:00" },
                  ].map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between py-1.5">
                      <span className="text-xs text-muted">{setting.label}</span>
                      <span className="rounded border border-border bg-surface px-2 py-1 text-[10px] text-white">
                        {setting.value} ▾
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
