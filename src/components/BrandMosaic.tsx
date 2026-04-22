"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/site-config-schema";

type Props = {
  mosaic: SiteConfig["mosaic"];
  brands: SiteConfig["brands"];
};

export function BrandMosaic({ mosaic, brands }: Props) {
  return (
    <section className="border-y-2 border-zinc-900 bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              {mosaic.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">
              {mosaic.title}
            </h2>
            <p className="mt-3 max-w-xl text-muted">{mosaic.subtitle}</p>
          </div>
          <Link
            href="/brands"
            className="text-sm font-bold text-accent hover:text-accent-hover"
          >
            {mosaic.catalogLinkLabel}
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {brands.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-2xl border-2 border-zinc-900 bg-zinc-50 shadow-[3px_3px_0_0_rgba(24,24,27,0.1)] ${
                i === 0
                  ? "col-span-2 row-span-2 aspect-square sm:aspect-auto sm:min-h-[280px]"
                  : "aspect-square"
              }`}
            >
              <Link href="/brands" className="group block h-full w-full">
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">
                    {b.category}
                  </p>
                  <p className="mt-1 text-lg font-black text-white">{b.name}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
