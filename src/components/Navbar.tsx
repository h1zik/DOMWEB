"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config-schema";

const insideLinks = [
  { href: "/inside", label: "Overview" },
  { href: "/inside/culture", label: "Culture" },
  { href: "/inside/careers", label: "Karir" },
  { href: "/inside/insights", label: "Blog & Press" },
];

type Props = {
  site: SiteConfig["site"];
  nav: SiteConfig["nav"];
  marquee: string[];
  marqueeDurationSec: number;
};

export function Navbar({ site, nav, marquee, marqueeDurationSec }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [insideOpen, setInsideOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "text-sm font-medium transition-colors hover:text-accent " +
    (scrolled ? "text-foreground" : "text-foreground/90");

  const loop = marquee.length ? [...marquee, ...marquee] : [];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/80 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-white/80 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 max-w-[65vw] items-center gap-2 sm:max-w-none md:gap-3"
        >
          {site.logoUrl ? (
            <Image
              src={site.logoUrl}
              alt={site.logoAlt || site.name}
              width={200}
              height={48}
              unoptimized
              className="h-9 w-auto max-h-10 max-w-[140px] shrink-0 object-contain sm:max-w-[180px]"
            />
          ) : null}
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-1">
            <span className="text-lg font-black tracking-tight text-foreground">
              {site.name}
            </span>
            <span className="hidden text-xs font-semibold text-accent sm:inline">
              ·
            </span>
            <span className="hidden text-xs text-muted sm:inline">
              {site.holdingLabel}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          <Link href="/about" className={linkClass}>
            About Us
          </Link>
          <Link href="/brands" className={linkClass}>
            Our Brands
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setInsideOpen(true)}
            onMouseLeave={() => setInsideOpen(false)}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1 ${linkClass}`}
              aria-expanded={insideOpen}
            >
              Inside Dominatus
              <ChevronDown
                className={`h-4 w-4 transition-transform ${insideOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {insideOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full pt-2"
                >
                  <div className="min-w-[200px] rounded-2xl border-2 border-zinc-900 bg-white py-2 shadow-[4px_4px_0_0_rgba(24,24,27,0.12)]">
                    {insideLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block px-4 py-2 text-sm text-foreground transition hover:bg-accent-soft hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/inside/careers"
              className="inline-block rounded-full border-2 border-zinc-900 bg-accent px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(24,24,27,1)] transition hover:bg-accent-hover hover:shadow-[2px_2px_0_0_rgba(24,24,27,1)]"
            >
              {nav.joinLabel}
            </Link>
          </motion.span>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {loop.length > 0 && (
        <div className="overflow-hidden border-t border-zinc-900/10 bg-zinc-950">
          <motion.div
            className="flex whitespace-nowrap py-1.5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: marqueeDurationSec,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {loop.map((t, i) => (
              <span
                key={`${i}-${t}`}
                className="px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/90"
              >
                {t}
                <span className="ml-3 text-accent">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-zinc-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/brands"
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                Our Brands
              </Link>
              <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Inside Dominatus
              </p>
              {insideLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm hover:bg-accent-soft"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/inside/careers"
                className="mt-2 rounded-full bg-accent px-3 py-3 text-center text-sm font-bold text-white"
                onClick={() => setOpen(false)}
              >
                {nav.joinLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
