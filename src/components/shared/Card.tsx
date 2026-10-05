"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface CardProps {
  title?: string;
  titleIcon?: React.ReactNode;
  action?: { label: string; href?: string; onClick?: () => void };
  className?: string;
  children: React.ReactNode;
  noPadding?: boolean;
  liveBadge?: boolean;
}

export default function Card({ title, titleIcon, action, className, children, noPadding, liveBadge }: CardProps) {
  return (
    <div className={cn("fp-card", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            {titleIcon && <span className="text-fp-red">{titleIcon}</span>}
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">{title}</h3>
            {liveBadge && (
              <span className="flex items-center gap-1 rounded bg-fp-red/20 px-1.5 py-0.5 text-[10px] font-bold text-fp-red">
                <span className="h-1.5 w-1.5 rounded-full bg-fp-red fp-live-pulse" />
                Live
              </span>
            )}
          </div>
          {action && (
            <button
              onClick={action.onClick}
              className="flex items-center gap-1 rounded border border-border px-2 py-1 text-[10px] font-medium text-muted transition-colors hover:border-border-bright hover:text-white"
            >
              {action.label}
              <ChevronRight className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
      <div className={cn(!noPadding && "p-4")}>{children}</div>
    </div>
  );
}
