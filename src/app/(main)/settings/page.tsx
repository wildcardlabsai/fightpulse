"use client";

import { useState } from "react";
import { Settings, Bell, User, Shield, Eye } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import TabBar from "@/components/shared/TabBar";
import Card from "@/components/shared/Card";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Account");

  return (
    <div>
      <PageHero title="Settings" subtitle="Manage your Fight Pulse account and preferences." />

      <div className="px-4 py-4 lg:px-6">
        <TabBar
          tabs={["Account", "Notifications", "Privacy", "Display"]}
          active={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <Card title="Account" titleIcon={<User className="h-4 w-4" />}>
              <div className="space-y-4">
                {[
                  { label: "Display Name", value: "—" },
                  { label: "Email", value: "—" },
                  { label: "Time Zone", value: "Auto-detect" },
                  { label: "Odds Format", value: "Decimal" },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-white">{setting.label}</p>
                    </div>
                    <span className="rounded border border-border bg-surface px-3 py-1.5 text-xs text-muted">
                      {setting.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Notification Preferences" titleIcon={<Bell className="h-4 w-4" />}>
              <div className="space-y-3">
                {[
                  { label: "Fight start reminders", desc: "Get notified when followed fights begin", enabled: true },
                  { label: "Odds movement alerts", desc: "Notify on significant odds changes", enabled: true },
                  { label: "News alerts", desc: "Breaking news for followed fighters", enabled: false },
                  { label: "Fight Pulse signals", desc: "Key momentum and analysis signals", enabled: true },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{pref.label}</p>
                      <p className="text-[10px] text-muted">{pref.desc}</p>
                    </div>
                    <div className={`h-5 w-9 rounded-full p-0.5 ${pref.enabled ? "bg-fp-red" : "bg-border"}`}>
                      <div className={`h-4 w-4 rounded-full bg-white transition-transform ${pref.enabled ? "translate-x-4" : ""}`} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4 lg:col-span-4">
            <Card title="Privacy" titleIcon={<Shield className="h-4 w-4" />}>
              <div className="space-y-3">
                {[
                  { label: "Public profile", enabled: false },
                  { label: "Show followed fighters", enabled: true },
                  { label: "Activity visible to others", enabled: false },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between">
                    <p className="text-xs text-white">{pref.label}</p>
                    <div className={`h-5 w-9 rounded-full p-0.5 ${pref.enabled ? "bg-fp-red" : "bg-border"}`}>
                      <div className={`h-4 w-4 rounded-full bg-white transition-transform ${pref.enabled ? "translate-x-4" : ""}`} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Display" titleIcon={<Eye className="h-4 w-4" />}>
              <div className="space-y-3">
                {[
                  { label: "Theme", value: "Dark" },
                  { label: "Odds format", value: "Decimal" },
                  { label: "Date format", value: "DD/MM/YYYY" },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <p className="text-xs text-white">{setting.label}</p>
                    <span className="rounded border border-border bg-surface px-2 py-1 text-[10px] text-white">
                      {setting.value} ▾
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
