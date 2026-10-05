"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badges?: { icon: React.ReactNode; label: string; sublabel: string }[];
  children?: React.ReactNode;
}

export default function PageHero({ title, subtitle, badges, children }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-gradient-to-r from-card via-card to-transparent">
      <div className="absolute inset-0 bg-gradient-to-r from-fp-red/5 to-transparent" />
      <div className="relative px-4 py-6 lg:px-6 lg:py-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black uppercase tracking-tight text-white md:text-3xl lg:text-4xl"
          style={{ fontStyle: "italic" }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <p className="mt-1 text-xs text-muted sm:mt-2 sm:text-sm">{subtitle}</p>
        )}
        {badges && (
          <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:gap-4">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-border bg-surface px-2 py-1.5 sm:px-3 sm:py-2">
                <span className="text-fp-red">{badge.icon}</span>
                <div>
                  <p className="text-[10px] font-bold uppercase text-white sm:text-xs">{badge.label}</p>
                  <p className="text-[8px] text-muted sm:text-[10px]">{badge.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
