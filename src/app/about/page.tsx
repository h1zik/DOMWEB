import type { Metadata } from "next";
import { Target, Eye, Heart } from "lucide-react";
import { getSiteConfig } from "@/lib/get-site-config";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteConfig();
  return {
    title: "About Us",
    description: c.about.intro,
  };
}

export default async function AboutPage() {
  const c = await getSiteConfig();
  const { about, coreValues, leadership } = c;
  const top = c.marquee.length > 0 ? "pt-36 sm:pt-40" : "pt-28 sm:pt-32";

  return (
    <div className={`bg-background pb-20 ${top}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wider text-accent">
          {about.pageEyebrow}
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          {about.pageTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{about.intro}</p>

        <section className="mt-16 rounded-3xl border-2 border-zinc-900 bg-accent-soft/50 p-8 sm:p-12">
          <h2 className="text-2xl font-black text-foreground">
            {about.philosophyTitle}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            {about.philosophyBody}
          </p>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-zinc-900 p-8 shadow-[4px_4px_0_0_rgba(24,24,27,0.08)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-zinc-900 bg-accent text-white">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-black text-foreground">
              {about.visionTitle}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{about.visionBody}</p>
          </div>
          <div className="rounded-2xl border-2 border-zinc-900 p-8 shadow-[4px_4px_0_0_rgba(24,24,27,0.08)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-zinc-900 bg-accent text-white">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-black text-foreground">
              {about.missionTitle}
            </h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-muted">
              {about.missionBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-accent" />
            <h2 className="text-2xl font-black text-foreground">
              {about.coreValuesTitle}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {coreValues.map((v, i) => (
              <div
                key={v.title}
                className="rounded-2xl border-2 border-zinc-100 bg-zinc-50/80 p-6 transition hover:border-accent/40"
              >
                <p className="text-xs font-black text-accent">0{i + 1}</p>
                <h3 className="mt-2 font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-black text-foreground">
            {about.leadershipSectionTitle}
          </h2>
          <p className="mt-2 text-muted">{about.leadershipSubtitle}</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="rounded-2xl border-2 border-zinc-900 bg-white p-6 shadow-[3px_3px_0_0_rgba(24,24,27,0.1)]"
              >
                <div className="h-12 w-12 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-accent to-orange-300" />
                <h3 className="mt-4 font-bold text-foreground">{person.name}</h3>
                <p className="text-sm font-bold text-accent">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{person.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
