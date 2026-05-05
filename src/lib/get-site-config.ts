import { unstable_cache } from "next/cache";
import { prisma } from "./db";
import { defaultSiteConfig } from "./default-site-config";
import { mergeSiteConfig } from "./merge-site-config";
import type { SiteConfig } from "./site-config-schema";

async function loadSiteConfig(): Promise<SiteConfig> {
  if (!process.env.DATABASE_URL) {
    return defaultSiteConfig;
  }

  try {
    const row = await prisma.appConfig.findUnique({ where: { id: 1 } });
    const raw = row?.data;
    if (
      raw === null ||
      raw === undefined ||
      (typeof raw === "object" && Object.keys(raw as object).length === 0)
    ) {
      return defaultSiteConfig;
    }
    return mergeSiteConfig(raw);
  } catch {
    return defaultSiteConfig;
  }
}

const getCachedSiteConfig = unstable_cache(loadSiteConfig, ["site-config"], {
  revalidate: 900,
  tags: ["site-config"],
});

export async function getSiteConfig(): Promise<SiteConfig> {
  return getCachedSiteConfig();
}
