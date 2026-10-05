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
      <div className="relative px-6 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl"
          style={{ fontStyle: "italic" }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        )}
        {badges && (
          <div className="mt-4 flex flex-wrap gap-4">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2">
                <span className="text-fp-red">{badge.icon}</span>
                <div>
                  <p className="text-xs font-bold uppercase text-white">{badge.label}</p>
                  <p className="text-[10px] text-muted">{badge.sublabel}</p>
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
