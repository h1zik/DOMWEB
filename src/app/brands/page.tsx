import type { Metadata } from "next";
import { BrandCard } from "@/components/BrandCard";
import { getSiteConfig } from "@/lib/get-site-config";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteConfig();
  return {
    title: "Our Brands",
    description: c.mosaic.subtitle,
  };
}

export default async function BrandsPage() {
  const c = await getSiteConfig();
  const top = c.marquee.length > 0 ? "pt-36 sm:pt-40" : "pt-28 sm:pt-32";

  return (
    <div className={`bg-background pb-20 ${top}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wider text-accent">
          Our Brands
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          {c.mosaic.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{c.mosaic.subtitle}</p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {c.brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
