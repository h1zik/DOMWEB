import { defaultSiteConfig } from "./default-site-config";
import { siteConfigSchema, type SiteConfig } from "./site-config-schema";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Gabungkan patch dari DB ke default; array diganti utuh jika ada di patch. */
export function mergeSiteConfig(patch: unknown): SiteConfig {
  const base = structuredClone(defaultSiteConfig) as Record<string, unknown>;
  if (!isPlainObject(patch)) {
    return siteConfigSchema.parse(base);
  }

  for (const key of Object.keys(base) as (keyof SiteConfig)[]) {
    if (!(key in patch)) continue;
    const pv = (patch as Record<string, unknown>)[key];
    const dv = base[key];
    if (Array.isArray(dv)) {
      if (Array.isArray(pv)) base[key] = pv;
    } else if (isPlainObject(dv) && isPlainObject(pv)) {
      base[key] = { ...dv, ...pv };
    } else if (pv !== undefined) {
      base[key] = pv;
    }
  }

  return siteConfigSchema.parse(base);
}
