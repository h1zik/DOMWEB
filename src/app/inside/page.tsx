import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteConfig } from "@/lib/get-site-config";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteConfig();
  return {
    title: "Inside Dominatus",
    description: c.insideHub.subtitle,
  };
}

export default async function InsideHubPage() {
  const c = await getSiteConfig();
  const { insideHub } = c;
  const top = c.marquee.length > 0 ? "pt-36 sm:pt-40" : "pt-28 sm:pt-32";

  return (
    <div className={`bg-background pb-20 ${top}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wider text-accent">
          {insideHub.eyebrow}
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          {insideHub.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{insideHub.subtitle}</p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {insideHub.cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-2xl border-2 border-zinc-900 bg-zinc-50/50 p-8 shadow-[3px_3px_0_0_rgba(24,24,27,0.1)] transition hover:-translate-y-1 hover:bg-white hover:shadow-[5px_5px_0_0_rgba(24,24,27,0.12)]"
            >
              <h2 className="text-xl font-black text-foreground group-hover:text-accent">
                {card.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {card.desc}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-accent">
                Buka
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
