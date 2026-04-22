"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config-schema";

type Props = {
  hero: SiteConfig["hero"];
  hasMarquee: boolean;
};

export function HomeHero({ hero, hasMarquee }: Props) {
  const top = hasMarquee ? "pt-32 sm:pt-36" : "pt-24 sm:pt-28";

  return (
    <section
      className={`relative overflow-hidden bg-background pb-16 sm:pb-24 ${top}`}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block rotate-[-1deg] rounded-full border-2 border-zinc-900 bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent shadow-[2px_2px_0_0_rgba(24,24,27,1)]"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            <span className="inline-block">{hero.titleLine1}</span>
            <span className="mt-1 block rotate-[-0.5deg] text-accent">
              {hero.titleLine2}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {hero.body}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/brands"
                className="inline-flex items-center justify-center rounded-full border-2 border-zinc-900 bg-accent px-6 py-3 text-sm font-bold text-white shadow-[4px_4px_0_0_rgba(24,24,27,1)] transition hover:bg-accent-hover hover:shadow-[3px_3px_0_0_rgba(24,24,27,1)]"
              >
                {hero.primaryCtaLabel}
              </Link>
            </motion.span>
            <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border-2 border-zinc-900 bg-white px-6 py-3 text-sm font-bold text-foreground transition hover:bg-zinc-50"
              >
                {hero.secondaryCtaLabel}
              </Link>
            </motion.span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 18 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-100 shadow-[8px_8px_0_0_rgba(24,24,27,0.12)] sm:aspect-video lg:aspect-[4/5]">
            <motion.div
              className="h-full w-full"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={hero.imageUrl}
                alt="Hero visual"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border-2 border-zinc-900 bg-white/95 px-4 py-3 shadow-[3px_3px_0_0_rgba(24,24,27,0.2)] backdrop-blur-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-zinc-900 bg-accent text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-accent">
                  {hero.badgeEyebrow}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {hero.badgeTitle}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
