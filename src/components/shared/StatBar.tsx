"use client";

import { motion } from "framer-motion";

interface StatBarProps {
  label: string;
  valueA: number | string;
  valueB: number | string;
  maxA?: number;
  maxB?: number;
  reverseColor?: boolean;
}

export default function StatBar({ label, valueA, valueB, maxA, maxB, reverseColor }: StatBarProps) {
  const numA = typeof valueA === "number" ? valueA : parseFloat(valueA);
  const numB = typeof valueB === "number" ? valueB : parseFloat(valueB);
  const total = (maxA ?? numA) + (maxB ?? numB);
  const pctA = total > 0 ? ((maxA ?? numA) / total) * 100 : 50;
  const pctB = total > 0 ? ((maxB ?? numB) / total) * 100 : 50;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-white">{valueA}</span>
        <span className="text-[10px] uppercase text-muted">{label}</span>
        <span className="font-bold text-white">{valueB}</span>
      </div>
      <div className="flex gap-1">
        <div className="flex h-1.5 flex-1 justify-end overflow-hidden rounded-full bg-border">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pctA}%` }}
            transition={{ duration: 0.6 }}
            className={reverseColor ? "rounded-full bg-fp-blue" : "rounded-full bg-fp-red"}
          />
        </div>
        <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-border">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pctB}%` }}
            transition={{ duration: 0.6 }}
            className={reverseColor ? "rounded-full bg-fp-red" : "rounded-full bg-fp-blue"}
          />
        </div>
      </div>
    </div>
  );
}
