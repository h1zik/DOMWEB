"use client";

import { usePathname } from "next/navigation";
import type { SiteConfig } from "@/lib/site-config-schema";
import { GenZChrome } from "./GenZChrome";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type Props = {
  config: SiteConfig;
  children: React.ReactNode;
};

export function SiteShell({ config, children }: Props) {
  const path = usePathname();
  const isAdmin = path.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <GenZChrome genZ={config.genZ} />
      <Navbar
        site={config.site}
        nav={config.nav}
        marquee={config.marquee}
        marqueeDurationSec={config.genZ.marqueeDurationSec}
      />
      <main
        className="min-h-screen bg-background"
        style={{ color: "var(--color-fg)" }}
      >
        {children}
      </main>
      <Footer site={config.site} footer={config.footer} />
    </>
  );
}
