import Link from "next/link";
import { Globe, Share2, Mail } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config-schema";

type Props = {
  site: SiteConfig["site"];
  footer: SiteConfig["footer"];
};

export function Footer({ site, footer }: Props) {
  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace("{year}", String(year));

  return (
    <footer className="border-t-2 border-zinc-900 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-black text-foreground">{site.name}</p>
            <p className="mt-2 max-w-xs text-sm text-muted">{site.tagline}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-accent">
              {footer.navigateHeading}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-muted hover:text-accent">
                  Our Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/inside/careers"
                  className="text-muted hover:text-accent"
                >
                  Karir
                </Link>
              </li>
              <li>
                <Link
                  href="/inside/insights"
                  className="text-muted hover:text-accent"
                >
                  Blog & Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-accent">
              {footer.connectHeading}
            </p>
            <div className="mt-3 flex gap-3">
              <a
                href={footer.socialLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-900 text-muted shadow-[2px_2px_0_0_rgba(24,24,27,0.15)] transition hover:border-accent hover:text-accent"
                aria-label="LinkedIn"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href={footer.socialInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-900 text-muted shadow-[2px_2px_0_0_rgba(24,24,27,0.15)] transition hover:border-accent hover:text-accent"
                aria-label="Social"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${footer.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-900 text-muted shadow-[2px_2px_0_0_rgba(24,24,27,0.15)] transition hover:border-accent hover:text-accent"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-zinc-200 pt-8 text-center text-xs text-muted">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
