import type { Metadata } from "next";
import Link from "next/link";
import { Coffee, Music, Users } from "lucide-react";
import { getSiteConfig } from "@/lib/get-site-config";

const iconMap = {
  users: Users,
  coffee: Coffee,
  music: Music,
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteConfig();
  return {
    title: "Culture",
    description: c.culture.intro,
  };
}

export default async function CulturePage() {
  const c = await getSiteConfig();
  const { culture } = c;
  const top = c.marquee.length > 0 ? "pt-36 sm:pt-40" : "pt-28 sm:pt-32";

  return (
    <div className={`bg-background pb-20 ${top}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/inside"
          className="text-sm font-bold text-accent hover:text-accent-hover"
        >
          ← Inside Dominatus
        </Link>
        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-accent">
          {culture.introEyebrow}
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-foreground">
          {culture.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{culture.intro}</p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {culture.cards.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-2xl border-2 border-zinc-900 p-8 shadow-[3px_3px_0_0_rgba(24,24,27,0.08)] transition hover:border-accent/60"
              >
                <Icon className="h-10 w-10 text-accent" />
                <h2 className="mt-4 text-lg font-black text-foreground">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
