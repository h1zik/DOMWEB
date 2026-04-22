import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/get-site-config";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteConfig();
  return {
    title: "Blog & Press",
    description: c.insights.subtitle,
  };
}

export default async function InsightsPage() {
  const c = await getSiteConfig();
  const { insights } = c;
  const top = c.marquee.length > 0 ? "pt-36 sm:pt-40" : "pt-28 sm:pt-32";

  return (
    <div className={`bg-background pb-20 ${top}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wider text-accent">
          {insights.eyebrow}
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          {insights.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{insights.subtitle}</p>

        <ul className="mt-14 divide-y divide-zinc-200 border-t border-zinc-200">
          {insights.articles.map((a) => (
            <li key={a.slug} className="py-8">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="rounded-full border border-zinc-200 bg-accent-soft px-3 py-0.5 text-xs font-black text-accent">
                  {a.tag}
                </span>
                <span className="text-sm text-muted">{a.date}</span>
              </div>
              <h2 className="mt-3 text-xl font-black text-foreground sm:text-2xl">
                <Link
                  href={`/inside/insights/${a.slug}`}
                  className="hover:text-accent"
                >
                  {a.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted">{a.teaser}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
