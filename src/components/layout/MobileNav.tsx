"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { X, LayoutDashboard, Radio, Calendar, CheckSquare, Users, CalendarDays, BarChart3, Brain, Bell, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 h-full w-72 border-r border-border bg-sidebar"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="text-lg font-bold tracking-tight text-white">
                FIGHT <span className="text-fp-red">PULSE</span>
              </span>
              <button onClick={onClose} className="text-muted hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="px-3 py-2">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors",
                          isActive ? "bg-fp-red/10 text-fp-red" : "text-muted hover:bg-card-hover hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
