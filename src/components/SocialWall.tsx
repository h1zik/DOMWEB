"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/site-config-schema";

type Props = {
  socialWall: SiteConfig["socialWall"];
  socialPosts: SiteConfig["socialPosts"];
};

export function SocialWall({ socialWall, socialPosts }: Props) {
  return (
    <section className="bg-zinc-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">
            {socialWall.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {socialWall.title}
          </h2>
          <p className="mt-4 text-muted">{socialWall.subtitle}</p>
        </div>
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {socialPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.97, rotate: i % 2 ? -1 : 1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
              whileHover={{ y: -6, rotate: 0 }}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border-2 border-zinc-900 bg-white shadow-[4px_4px_0_0_rgba(24,24,27,0.12)]"
            >
              {post.sourceUrl ? (
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                  unoptimized
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <span className="absolute right-2 top-2 rounded-full border border-white/20 bg-black/65 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                      {post.platform}
                    </span>
                  </div>
                </a>
              ) : (
                <div className="relative aspect-square">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <span className="absolute right-2 top-2 rounded-full border border-white/20 bg-black/65 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                    {post.platform}
                  </span>
                </div>
              )}
              <p className="p-3 text-sm font-medium text-foreground">{post.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
