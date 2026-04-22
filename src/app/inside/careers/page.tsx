import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteConfig } from "@/lib/get-site-config";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteConfig();
  return {
    title: "Karir",
    description: c.careers.intro,
  };
}

export default async function CareersPage() {
  const c = await getSiteConfig();
  const { careers } = c;
  const top = c.marquee.length > 0 ? "pt-36 sm:pt-40" : "pt-28 sm:pt-32";
  const mailApply = `mailto:${careers.email}?subject=${encodeURIComponent("Lamaran ")}`;

  return (
    <div className={`bg-background pb-20 ${top}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wider text-accent">
          {careers.eyebrow}
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          {careers.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          {careers.intro}{" "}
          <a
            href={`mailto:${careers.email}`}
            className="font-bold text-accent hover:underline"
          >
            {careers.email}
          </a>
          .
        </p>

        <div className="mt-12 space-y-4">
          {careers.openings.map((job) => (
            <div
              key={job.title}
              className="flex flex-col gap-4 rounded-2xl border-2 border-zinc-900 p-6 transition hover:border-accent sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-foreground">{job.title}</h2>
                <p className="text-sm font-bold text-accent">{job.type}</p>
                <p className="mt-2 text-sm text-muted">{job.desc}</p>
              </div>
              <a
                href={mailApply}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-zinc-900 bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-hover"
              >
                {careers.applyLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted">
          <Link href="/inside/culture" className="font-bold text-accent">
            {careers.cultureLinkText}
          </Link>{" "}
          sebelum melamar.
        </p>
      </div>
    </div>
  );
}
