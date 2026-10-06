"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Radio,
  Calendar,
  CheckSquare,
  Users,
  CalendarDays,
  BarChart3,
  Brain,
  Bell,
  Search,
  Star,
  Settings,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Live", href: "/live", icon: Radio },
  { label: "Upcoming", href: "/upcoming", icon: Calendar },
  { label: "Results", href: "/results", icon: CheckSquare },
  { label: "Fighters", href: "/fighters", icon: Users },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Odds Centre", href: "/odds", icon: BarChart3 },
  { label: "Intelligence", href: "/intelligence", icon: Brain },
  { label: "Alerts", href: "/alerts", icon: Bell },
  { label: "Search", href: "/search", icon: Search },
];

const MY_ITEMS = [
  { label: "Followed Fighters", href: "/fighters?followed=true", icon: Star },
  { label: "Notifications", href: "/alerts?tab=notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2 px-5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <FightPulseLogo />
          <span className="text-lg font-bold tracking-tight text-white">
            FIGHT <span className="text-fp-red">PULSE</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-fp-red/10 text-fp-red border-l-2 border-fp-red"
                      : "text-muted hover:bg-card-hover hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 border-t border-border pt-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
            My Fight Pulse
          </p>
          <ul className="space-y-0.5">
            {MY_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "text-fp-red"
                        : "text-muted hover:bg-card-hover hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="border-t border-border p-4">
        <div className="fp-card overflow-hidden">
          <div className="bg-gradient-to-b from-fp-red/20 to-transparent p-4 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Real Fights.</p>
            <p className="text-xs font-bold uppercase tracking-wider text-white">Real Data.</p>
            <p className="text-xs font-bold uppercase tracking-wider text-white">Real-Time Intelligence.</p>
            <button className="mt-3 w-full rounded-md bg-fp-red px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-fp-red-dark">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

function FightPulseLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2L4 8v12l10 6 10-6V8L14 2z" fill="#e63946" fillOpacity="0.2" />
      <path d="M14 2L4 8l10 6 10-6L14 2z" fill="#e63946" />
      <path d="M10 12l4 8 4-8" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11l6 12 6-12" stroke="#e63946" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}
