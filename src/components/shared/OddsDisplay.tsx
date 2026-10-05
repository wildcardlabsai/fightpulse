"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface OddsDisplayProps {
  odds: number;
  label?: string;
  movement?: number;
  size?: "sm" | "md" | "lg";
  isFavourite?: boolean;
}

export default function OddsDisplay({ odds, label, movement, size = "md", isFavourite }: OddsDisplayProps) {
  return (
    <div className={cn(
      "flex flex-col items-center gap-0.5 rounded-md border border-border bg-surface px-3 py-2",
      size === "lg" && "px-5 py-3",
    )}>
      <span className={cn(
        "font-bold text-white",
        size === "sm" && "text-sm",
        size === "md" && "text-lg",
        size === "lg" && "text-2xl",
      )}>
        {odds.toFixed(2)}
      </span>
      {movement !== undefined && movement !== 0 && (
        <span className={cn(
          "flex items-center gap-0.5 text-[10px] font-medium",
          movement < 0 ? "text-success" : "text-fp-red"
        )}>
          {movement < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
          {movement > 0 ? "+" : ""}{movement.toFixed(2)}
        </span>
      )}
      {label && (
        <span className="text-[10px] font-medium uppercase text-muted">{label}</span>
      )}
    </div>
  );
}
