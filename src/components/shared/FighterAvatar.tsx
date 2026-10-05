"use client";

import { cn } from "@/lib/utils";
import { getCountryFlag } from "@/lib/utils";
import type { Fighter } from "@/lib/types";

interface FighterAvatarProps {
  fighter: Fighter;
  size?: "sm" | "md" | "lg" | "xl";
  showFlag?: boolean;
  showRecord?: boolean;
}

export default function FighterAvatar({ fighter, size = "md", showFlag, showRecord }: FighterAvatarProps) {
  const initials = fighter.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-card border border-border font-bold text-muted",
          size === "sm" && "h-8 w-8 text-xs",
          size === "md" && "h-12 w-12 text-sm",
          size === "lg" && "h-16 w-16 text-lg",
          size === "xl" && "h-24 w-24 text-2xl",
        )}
      >
        {initials}
      </div>
      {showFlag && (
        <span className="text-sm">{getCountryFlag(fighter.countryCode)}</span>
      )}
      {showRecord && (
        <span className="text-[10px] text-muted">
          {fighter.wins}-{fighter.losses}-{fighter.draws}
        </span>
      )}
    </div>
  );
}
