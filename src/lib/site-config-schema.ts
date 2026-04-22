import { z } from "zod";

export const themeSchema = z.object({
  accent: z.string(),
  accentHover: z.string(),
  accentSoft: z.string(),
  background: z.string(),
  foreground: z.string(),
  mutedFg: z.string(),
});

export const brandSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  tagline: z.string(),
  dna: z.string(),
  image: z.string(),
  shopeeUrl: z.string(),
  tiktokShopUrl: z.string(),
});

export const statSchema = z.object({
  label: z.string(),
  value: z.string(),
  suffix: z.string(),
});

export const coreValueSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export const leadershipSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string(),
});

export const socialPostSchema = z.object({
  id: z.string(),
  platform: z.enum(["Instagram", "TikTok"]),
  caption: z.string(),
  image: z.string(),
});

export const siteSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  holdingLabel: z.string(),
  titleSuffix: z.string(),
  /** URL logo (mis. /api/files/... setelah upload, atau CDN https://...) */
  logoUrl: z.string(),
  logoAlt: z.string(),
  /** Favicon — path relatif atau URL absolut */
  faviconUrl: z.string(),
});

export const navSchema = z.object({
  joinLabel: z.string(),
});

export const heroSchema = z.object({
  eyebrow: z.string(),
  titleLine1: z.string(),
  titleLine2: z.string(),
  body: z.string(),
  imageUrl: z.string(),
  badgeEyebrow: z.string(),
  badgeTitle: z.string(),
  primaryCtaLabel: z.string(),
  secondaryCtaLabel: z.string(),
});

export const mosaicSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  catalogLinkLabel: z.string(),
});

export const missionSchema = z.object({
  lead: z.string(),
  highlight1: z.string(),
  highlight2: z.string(),
  highlight3: z.string(),
  footer: z.string(),
});

export const socialWallSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
});

export const aboutSchema = z.object({
  pageEyebrow: z.string(),
  pageTitle: z.string(),
  intro: z.string(),
  philosophyTitle: z.string(),
  philosophyBody: z.string(),
  visionTitle: z.string(),
  visionBody: z.string(),
  missionTitle: z.string(),
  missionBullets: z.array(z.string()),
  coreValuesTitle: z.string(),
  leadershipSectionTitle: z.string(),
  leadershipSubtitle: z.string(),
});

export const cultureCardSchema = z.object({
  title: z.string(),
  body: z.string(),
  icon: z.enum(["users", "coffee", "music"]),
});

export const cultureSchema = z.object({
  introEyebrow: z.string(),
  title: z.string(),
  intro: z.string(),
  cards: z.array(cultureCardSchema),
});

export const jobSchema = z.object({
  title: z.string(),
  type: z.string(),
  desc: z.string(),
});

export const careersSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  intro: z.string(),
  email: z.string(),
  applyLabel: z.string(),
  cultureLinkText: z.string(),
  openings: z.array(jobSchema),
});

export const insightArticleSchema = z.object({
  slug: z.string(),
  date: z.string(),
  title: z.string(),
  tag: z.string(),
  teaser: z.string(),
  body: z.string(),
});

export const insightsSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  articles: z.array(insightArticleSchema),
});

export const insideHubCardSchema = z.object({
  href: z.string(),
  title: z.string(),
  desc: z.string(),
});

export const insideHubSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  cards: z.array(insideHubCardSchema),
});

export const footerSchema = z.object({
  navigateHeading: z.string(),
  connectHeading: z.string(),
  copyright: z.string(),
  socialLinkedin: z.string(),
  socialInstagram: z.string(),
  email: z.string(),
});

export const genZSchema = z.object({
  showNoise: z.boolean(),
  showScrollProgress: z.boolean(),
  marqueeDurationSec: z.number().min(8).max(120),
});

export const siteConfigSchema = z.object({
  theme: themeSchema,
  site: siteSchema,
  nav: navSchema,
  hero: heroSchema,
  /** Teks berjalan di bawah navbar — vibe Gen Z */
  marquee: z.array(z.string()),
  mosaic: mosaicSchema,
  mission: missionSchema,
  stats: z.array(statSchema),
  brands: z.array(brandSchema),
  coreValues: z.array(coreValueSchema),
  leadership: z.array(leadershipSchema),
  socialPosts: z.array(socialPostSchema),
  socialWall: socialWallSchema,
  about: aboutSchema,
  culture: cultureSchema,
  careers: careersSchema,
  insights: insightsSchema,
  insideHub: insideHubSchema,
  footer: footerSchema,
  genZ: genZSchema,
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type Brand = z.infer<typeof brandSchema>;
