"use client";

import { cn } from "@/lib/utils";

interface TabBarProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export default function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className="-mx-4 px-4 lg:mx-0 lg:px-0">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={cn(
              "shrink-0 whitespace-nowrap",
              tab === active ? "fp-tab-active" : "fp-tab-inactive"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
