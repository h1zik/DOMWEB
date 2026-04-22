/** Untuk metadata / OG: gabungkan path relatif dengan origin publik. */
export function publicAssetUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return pathOrUrl;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!base) return pathOrUrl;
  const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${p}`;
}
