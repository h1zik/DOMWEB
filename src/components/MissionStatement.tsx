"use client";

import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/site-config-schema";

type Props = {
  mission: SiteConfig["mission"];
};

export function MissionStatement({ mission }: Props) {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <span
            className="absolute -left-2 -top-4 text-6xl font-serif text-accent/30 sm:-left-6"
            aria-hidden
          >
            “
          </span>
          <p className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
            {mission.lead}{" "}
            <span className="text-accent">{mission.highlight1}</span>,{" "}
            <span className="text-accent">{mission.highlight2}</span>, dan{" "}
            <span className="text-accent">{mission.highlight3}</span> di kanal
            digital Indonesia.
          </p>
          <footer className="mt-8 text-sm font-semibold text-muted">
            {mission.footer}
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
