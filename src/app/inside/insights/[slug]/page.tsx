import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/get-site-config";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getSiteConfig();
  const post = c.insights.articles.find((a) => a.slug === params.slug);
  if (!post) return { title: "Artikel" };
  return { title: post.title };
}

export default async function InsightArticlePage({ params }: Props) {
  const c = await getSiteConfig();
  const post = c.insights.articles.find((a) => a.slug === params.slug);
  if (!post) notFound();

  const top = c.marquee.length > 0 ? "pt-36 sm:pt-40" : "pt-28 sm:pt-32";

  return (
    <article className={`bg-background pb-20 ${top}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/inside/insights"
          className="text-sm font-bold text-accent hover:text-accent-hover"
        >
          ← Blog & Press
        </Link>
        <div className="mt-8 flex flex-wrap items-baseline gap-3">
          <span className="rounded-full border border-zinc-200 bg-accent-soft px-3 py-0.5 text-xs font-black text-accent">
            {post.tag}
          </span>
          <span className="text-sm text-muted">{post.date}</span>
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-muted">{post.body}</p>
      </div>
    </article>
  );
}
