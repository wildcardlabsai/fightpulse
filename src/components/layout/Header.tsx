"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MobileNav from "./MobileNav";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/search");
    }
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-header/95 px-4 backdrop-blur-sm lg:h-16 lg:px-6">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-muted hover:text-foreground lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <span className="text-sm font-bold tracking-tight text-white">
            FIGHT <span className="text-fp-red">PULSE</span>
          </span>
        </Link>

        <div className="flex-1" />

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fighters, events..."
              className="h-9 w-48 rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-fp-red focus:outline-none focus:ring-1 focus:ring-fp-red/50 lg:w-64"
            />
          </form>
          <Link
            href="/search"
            className="rounded-md p-2 text-muted transition-colors hover:bg-card hover:text-foreground sm:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/alerts"
            className="rounded-md p-2 text-muted transition-colors hover:bg-card hover:text-foreground"
            aria-label="Alerts"
          >
            <Bell className="h-5 w-5" />
          </Link>
          <Link
            href="/settings"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-xs font-bold text-muted transition-colors hover:bg-card-hover"
          >
            MT
          </Link>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
