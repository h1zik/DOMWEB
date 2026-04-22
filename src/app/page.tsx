import { HomeHero } from "@/components/HomeHero";
import { BrandMosaic } from "@/components/BrandMosaic";
import { MissionStatement } from "@/components/MissionStatement";
import { StatsStrip } from "@/components/StatsStrip";
import { SocialWall } from "@/components/SocialWall";
import { getSiteConfig } from "@/lib/get-site-config";

export default async function HomePage() {
  const c = await getSiteConfig();
  const hasMarquee = c.marquee.length > 0;

  return (
    <>
      <HomeHero hero={c.hero} hasMarquee={hasMarquee} />
      <BrandMosaic mosaic={c.mosaic} brands={c.brands} />
      <MissionStatement mission={c.mission} />
      <StatsStrip stats={c.stats} />
      <SocialWall socialWall={c.socialWall} socialPosts={c.socialPosts} />
    </>
  );
}
