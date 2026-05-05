import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/** Cek koneksi PostgreSQL (set `DATABASE_URL` di .env). */
let healthCache:
  | {
      expiresAt: number;
      response: { ok: boolean; database?: string; error?: string };
      status: number;
    }
  | undefined;

const HEALTH_CACHE_TTL_MS = 30_000;

export async function GET() {
  const now = Date.now();
  if (healthCache && healthCache.expiresAt > now) {
    return NextResponse.json(healthCache.response, { status: healthCache.status });
  }

  if (!process.env.DATABASE_URL) {
    const response = { ok: false, error: "DATABASE_URL belum di-set." };
    healthCache = {
      expiresAt: now + HEALTH_CACHE_TTL_MS,
      response,
      status: 503,
    };
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL belum di-set." },
      { status: 503 },
    );
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    const response = { ok: true, database: "postgresql" };
    healthCache = {
      expiresAt: now + HEALTH_CACHE_TTL_MS,
      response,
      status: 200,
    };
    return NextResponse.json(response);
  } catch (e) {
    const response = { ok: false, error: e instanceof Error ? e.message : String(e) };
    healthCache = {
      expiresAt: now + HEALTH_CACHE_TTL_MS,
      response,
      status: 503,
    };
    return NextResponse.json(response, { status: 503 });
  }
}
