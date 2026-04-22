import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "dominatus_admin";

export function getExpectedAdminToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) return null;
  return createHmac("sha256", secret).update(password).digest("hex");
}

export function verifyAdminCookie(value: string | undefined): boolean {
  const expected = getExpectedAdminToken();
  if (!expected || !value) return false;
  try {
    const a = Buffer.from(value, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(): boolean {
  const v = cookies().get(ADMIN_COOKIE)?.value;
  return verifyAdminCookie(v);
}
