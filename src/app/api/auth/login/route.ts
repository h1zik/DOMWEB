import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { ADMIN_COOKIE, getExpectedAdminToken } from "@/lib/admin-auth";

function timingSafeStringEqual(a: string, b: string): boolean {
  try {
    const x = Buffer.from(a, "utf8");
    const y = Buffer.from(b, "utf8");
    if (x.length !== y.length) return false;
    return timingSafeEqual(x, y);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const expectedAdmin = getExpectedAdminToken();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!expectedAdmin || !adminPassword) {
    return NextResponse.json(
      { error: "Admin belum dikonfigurasi (ADMIN_PASSWORD & ADMIN_SESSION_SECRET)." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  if (!timingSafeStringEqual(password, adminPassword)) {
    return NextResponse.json({ error: "Password salah." }, { status: 401 });
  }

  const token = expectedAdmin;
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
