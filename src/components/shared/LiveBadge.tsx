"use client";

import { cn } from "@/lib/utils";

export default function LiveBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-fp-red font-bold uppercase text-white",
        size === "sm" && "px-1.5 py-0.5 text-[9px]",
        size === "md" && "px-2.5 py-1 text-xs",
        size === "lg" && "px-3 py-1.5 text-sm"
      )}
    >
      <span className={cn(
        "rounded-full bg-white fp-live-pulse",
        size === "sm" && "h-1.5 w-1.5",
        size === "md" && "h-2 w-2",
        size === "lg" && "h-2.5 w-2.5",
      )} />
      LIVE
    </span>
  );
}
