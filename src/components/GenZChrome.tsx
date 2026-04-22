"use client";

import { useEffect, useState } from "react";
import type { SiteConfig } from "@/lib/site-config-schema";

type Props = {
  genZ: SiteConfig["genZ"];
};

export function GenZChrome({ genZ }: Props) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (!genZ.showScrollProgress) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScroll(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [genZ.showScrollProgress]);

  return (
    <>
      {genZ.showScrollProgress && (
        <div
          className="pointer-events-none fixed left-0 top-0 z-[60] h-0.5 w-full bg-zinc-200/80"
          aria-hidden
        >
          <div
            className="h-full origin-left bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${scroll}%` }}
          />
        </div>
      )}

      {genZ.showNoise && (
        <div
          className="pointer-events-none fixed inset-0 z-[45] opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
      )}
    </>
  );
}
