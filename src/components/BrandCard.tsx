"use client";

import Image from "next/image";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Brand } from "@/lib/site-config-schema";

type Props = {
  brand: Brand;
  index?: number;
};

export function BrandCard({ brand, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border-2 border-zinc-900 bg-white shadow-[4px_4px_0_0_rgba(24,24,27,0.12)] transition hover:shadow-[6px_6px_0_0_rgba(24,24,27,0.15)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="absolute left-3 top-3 rounded-full border border-zinc-900 bg-white/95 px-3 py-1 text-xs font-bold text-accent shadow-sm">
          {brand.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-black text-foreground">{brand.name}</h3>
        <p className="mt-1 text-sm font-bold text-accent">{brand.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          <span className="font-bold text-foreground">DNA brand: </span>
          {brand.dna}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={brand.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-zinc-900 bg-white px-3 py-2.5 text-xs font-bold text-foreground transition hover:bg-accent-soft hover:text-accent sm:flex-none sm:px-4"
          >
            <ShoppingBag className="h-4 w-4" />
            Shopee
          </a>
          <a
            href={brand.tiktokShopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-zinc-900 bg-accent px-3 py-2.5 text-xs font-bold text-white transition hover:bg-accent-hover sm:flex-none sm:px-4"
          >
            TikTok Shop
            <ExternalLink className="h-4 w-4 opacity-90" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
