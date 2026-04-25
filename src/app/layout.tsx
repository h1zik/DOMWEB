import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { getSiteConfig } from "@/lib/get-site-config";
import { publicAssetUrl } from "@/lib/site-url";
import { themeToCssVars } from "@/lib/theme-css-vars";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteConfig();
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const icons =
    c.site.faviconUrl.trim() !== ""
      ? [{ url: publicAssetUrl(c.site.faviconUrl) }]
      : undefined;
  const canonicalUrl = base || "https://dominatus.id";
  const ogImage = c.hero.imageUrl ? publicAssetUrl(c.hero.imageUrl) : undefined;

  return {
    metadataBase: base ? new URL(base) : undefined,
    title: {
      default: `${c.site.name} — ${c.site.titleSuffix}`,
      template: `%s · ${c.site.name}`,
    },
    description: c.site.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: c.site.name,
      title: `${c.site.name} — ${c.site.titleSuffix}`,
      description: c.site.description,
      url: canonicalUrl,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.site.name} — ${c.site.titleSuffix}`,
      description: c.site.description,
      images: ogImage ? [ogImage] : undefined,
    },
    icons,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();

  return (
    <html
      lang="id"
      className={plusJakarta.variable}
      style={themeToCssVars(config.theme)}
    >
      <body
        className={`${plusJakarta.className} min-h-screen antialiased`}
        style={{
          backgroundColor: config.theme.background,
          color: config.theme.foreground,
        }}
      >
        <SiteShell config={config}>{children}</SiteShell>
      </body>
    </html>
  );
}
