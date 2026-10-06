import type { DataFreshness } from "@/lib/types";

const statusConfig = {
  live: { label: "Live", dotClass: "bg-success animate-pulse" },
  delayed: { label: "Delayed", dotClass: "bg-yellow-500" },
  stale: { label: "Stale", dotClass: "bg-orange-500" },
  unavailable: { label: "Unavailable", dotClass: "bg-muted" },
} as const;

export default function DataFreshnessIndicator({ freshness }: { freshness: DataFreshness }) {
  const config = statusConfig[freshness.status];
  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
      <span className="text-[10px] text-muted">{config.label}</span>
    </div>
  );
}
