import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { defaultSiteConfig } from "@/lib/default-site-config";
import { getSiteConfig } from "@/lib/get-site-config";
import { siteConfigSchema } from "@/lib/site-config-schema";
import { verifyAdminCookie, ADMIN_COOKIE } from "@/lib/admin-auth";

export async function GET() {
  const config = await getSiteConfig();
  return NextResponse.json(config);
}

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminCookie(cookie)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "DATABASE_URL tidak di-set." },
      { status: 503 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON tidak valid" }, { status: 400 });
  }

  const parsed = siteConfigSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validasi gagal", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    await prisma.appConfig.upsert({
      where: { id: 1 },
      create: { id: 1, data: parsed.data as object },
      update: { data: parsed.data as object },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gagal menyimpan" },
      { status: 500 },
    );
  }
}

/** Reset konten ke default bawaan (butuh admin). */
export async function DELETE(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminCookie(cookie)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL tidak di-set." }, { status: 503 });
  }
  try {
    await prisma.appConfig.upsert({
      where: { id: 1 },
      create: { id: 1, data: defaultSiteConfig as object },
      update: { data: defaultSiteConfig as object },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gagal reset" },
      { status: 500 },
    );
  }
}
