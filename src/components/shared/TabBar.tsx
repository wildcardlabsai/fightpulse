"use client";

import { cn } from "@/lib/utils";

interface TabBarProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export default function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            tab === active ? "fp-tab-active" : "fp-tab-inactive"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
