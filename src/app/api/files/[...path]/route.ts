import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import {
  contentTypeForFile,
  resolveUploadPath,
} from "@/lib/uploads";

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

  const filePath = resolveUploadPath(segments);
  if (!filePath) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const st = await stat(filePath);
    if (!st.isFile()) {
      return new NextResponse("Not found", { status: 404 });
    }
    const buf = await readFile(filePath);
    const name = segments[segments.length - 1] ?? "file";
    const ct = contentTypeForFile(name);
    return new NextResponse(buf, {
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
