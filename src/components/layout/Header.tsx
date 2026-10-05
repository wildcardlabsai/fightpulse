"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-header/95 px-4 backdrop-blur-sm lg:px-6">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-muted hover:text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <span className="text-sm font-bold tracking-tight text-white">
            FIGHT <span className="text-fp-red">PULSE</span>
          </span>
        </Link>

        <div className="hidden flex-1 lg:block">
          <nav className="flex items-center gap-6">
            {["Dashboard", "Live", "Upcoming", "Results", "Fighters", "Events", "Odds", "Intelligence"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-medium text-muted transition-colors hover:text-white"
                >
                  {item}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search fighters, events, promotions..."
              className="h-9 w-64 rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-fp-red focus:outline-none focus:ring-1 focus:ring-fp-red/50"
            />
          </div>
          <button className="relative rounded-md p-2 text-muted transition-colors hover:bg-card hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-fp-red text-[9px] font-bold text-white">
              3
            </span>
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-xs font-bold text-muted">
            MT
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
