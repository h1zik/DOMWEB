import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import path from "path";
import { writeFile } from "fs/promises";
import { ADMIN_COOKIE, verifyAdminCookie } from "@/lib/admin-auth";
import { ensureUploadsDir, extForMime } from "@/lib/uploads";

export const runtime = "nodejs";

function isInstagramUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return /(^|\.)instagram\.com$/i.test(u.hostname);
  } catch {
    return false;
  }
}

async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const html = await res.text();
    const m =
      html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i) ??
      html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/i);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
}

function extractShortcode(input: string): {
  shortcode: string;
  kind: "p" | "reel" | "tv";
} | null {
  try {
    const u = new URL(input);
    const parts = u.pathname.split("/").filter(Boolean);
    for (let i = 0; i < parts.length - 1; i += 1) {
      const head = parts[i]?.toLowerCase();
      const code = parts[i + 1];
      if (!code) continue;
      if (head === "p") return { shortcode: code, kind: "p" };
      if (head === "reel" || head === "reels") return { shortcode: code, kind: "reel" };
      if (head === "tv") return { shortcode: code, kind: "tv" };
    }
    return null;
  } catch {
    return null;
  }
}

async function probeImageUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      },
      cache: "no-store",
    });
    const ct = res.headers.get("content-type") ?? "";
    return res.ok && ct.toLowerCase().startsWith("image/");
  } catch {
    return false;
  }
}

async function persistThumbnailToUploads(remoteUrl: string): Promise<string | null> {
  try {
    const res = await fetch(remoteUrl, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const ct = (res.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
    const ext = extForMime(ct) ?? ".jpg";
    if (!(ct.startsWith("image/") || ct === "")) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (!buf.length) return null;

    const dir = await ensureUploadsDir();
    const filename = `ig-thumb-${Date.now()}-${randomBytes(5).toString("hex")}${ext}`;
    const dest = path.join(dir, filename);
    await writeFile(dest, buf);
    return `/api/files/${encodeURIComponent(filename)}`;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminCookie(cookie)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.searchParams.get("url")?.trim() ?? "";
  if (!url) {
    return NextResponse.json({ error: "Parameter url wajib." }, { status: 400 });
  }
  if (!isInstagramUrl(url)) {
    return NextResponse.json(
      { error: "URL harus berasal dari instagram.com" },
      { status: 400 },
    );
  }

  // Coba endpoint noembed terlebih dahulu, fallback ke parsing og:image.
  try {
    const oembed = await fetch(
      `https://noembed.com/embed?url=${encodeURIComponent(url)}`,
      { cache: "no-store" },
    );
    if (oembed.ok) {
      const data = (await oembed.json().catch(() => ({}))) as {
        thumbnail_url?: string;
      };
      if (data.thumbnail_url) {
        const localUrl = await persistThumbnailToUploads(data.thumbnail_url);
        if (localUrl) {
          return NextResponse.json({
            ok: true,
            thumbnailUrl: localUrl,
            originalUrl: data.thumbnail_url,
            persisted: true,
          });
        }
        return NextResponse.json({ ok: true, thumbnailUrl: data.thumbnail_url });
      }
    }
  } catch {
    // lanjut fallback
  }

  const parsed = extractShortcode(url);
  if (parsed) {
    const candidates = [
      `https://www.instagram.com/${parsed.kind}/${parsed.shortcode}/media/?size=l`,
      `https://www.instagram.com/p/${parsed.shortcode}/media/?size=l`,
      `https://www.instagram.com/reel/${parsed.shortcode}/media/?size=l`,
      `https://www.instagram.com/tv/${parsed.shortcode}/media/?size=l`,
    ];
    for (const c of candidates) {
      if (await probeImageUrl(c)) {
        const localUrl = await persistThumbnailToUploads(c);
        if (localUrl) {
          return NextResponse.json({
            ok: true,
            thumbnailUrl: localUrl,
            originalUrl: c,
            persisted: true,
          });
        }
        return NextResponse.json({ ok: true, thumbnailUrl: c });
      }
    }
    // Last resort: kembalikan kandidat pertama agar user tetap bisa coba render.
    const localUrl = await persistThumbnailToUploads(candidates[0]);
    if (localUrl) {
      return NextResponse.json({
        ok: true,
        thumbnailUrl: localUrl,
        originalUrl: candidates[0],
        guessed: true,
        persisted: true,
      });
    }
    return NextResponse.json({ ok: true, thumbnailUrl: candidates[0], guessed: true });
  }

  const og = await fetchOgImage(url);
  if (og) {
    const localUrl = await persistThumbnailToUploads(og);
    if (localUrl) {
      return NextResponse.json({
        ok: true,
        thumbnailUrl: localUrl,
        originalUrl: og,
        persisted: true,
      });
    }
    return NextResponse.json({ ok: true, thumbnailUrl: og });
  }

  return NextResponse.json(
    {
      error:
        "Thumbnail tidak bisa diambil otomatis dari link ini. Silakan upload gambar manual.",
    },
    { status: 422 },
  );
}
