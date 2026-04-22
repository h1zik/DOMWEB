import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/** Cek koneksi PostgreSQL (set `DATABASE_URL` di .env). */
export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL belum di-set." },
      { status: 503 },
    );
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, database: "postgresql" });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 503 },
    );
  }
}
