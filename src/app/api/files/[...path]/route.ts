import { NextRequest, NextResponse } from "next/server";
import { getPublicStorageUrl } from "@/lib/supabase-storage";

export const runtime = "nodejs";

type Ctx = { params: { path: string[] } };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const segments = (params.path ?? []).map((s) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  });
  if (!segments.length) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const safePath = segments
      .filter((s) => s !== ".." && !s.includes("\\"))
      .join("/");
    if (!safePath) return new NextResponse("Not found", { status: 404 });
    const publicUrl = getPublicStorageUrl(safePath);
    return NextResponse.redirect(publicUrl, {
      status: 307,
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
