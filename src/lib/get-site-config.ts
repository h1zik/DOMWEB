import { cache } from "react";
import { prisma } from "./db";
import { defaultSiteConfig } from "./default-site-config";
import { mergeSiteConfig } from "./merge-site-config";
import type { SiteConfig } from "./site-config-schema";

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
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
});
