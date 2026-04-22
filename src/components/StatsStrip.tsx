"use client";

import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/site-config-schema";

type Props = {
  stats: SiteConfig["stats"];
};

export function StatsStrip({ stats }: Props) {
  return (
    <section className="border-y-2 border-zinc-900 bg-accent py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="text-center lg:text-left"
            >
              <p className="text-3xl font-black tracking-tight sm:text-4xl">
                {s.value}
                <span className="text-lg font-bold text-white/90">{s.suffix}</span>
              </p>
              <p className="mt-2 text-sm font-semibold text-white/85">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
