"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Radio, Calendar, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Live", href: "/live", icon: Radio },
  { label: "Upcoming", href: "/upcoming", icon: Calendar },
  { label: "Fighters", href: "/fighters", icon: Users },
  { label: "Odds", href: "/odds", icon: BarChart3 },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-sidebar/95 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom,0px)]">
        {ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-2",
                isActive ? "text-fp-red" : "text-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[9px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
