import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminCookie } from "@/lib/admin-auth";
import { safeBasename } from "@/lib/uploads";
import {
  getPublicStorageUrl,
  getStorageBucket,
  getSupabaseStorageClient,
} from "@/lib/supabase-storage";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminCookie(cookie)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const storage = getSupabaseStorageClient();
    const bucket = getStorageBucket();
    const { data, error } = await storage.storage
      .from(bucket)
      .list("", { limit: 1000, sortBy: { column: "updated_at", order: "desc" } });
    if (error) {
      return NextResponse.json({ error: error.message, files: [] }, { status: 500 });
    }
    const list = (data ?? []).map((entry) => {
      const modified = entry.updated_at || entry.created_at || new Date().toISOString();
      const size = entry.metadata?.size;
      return {
        name: entry.name,
        url: `/api/files/${encodeURIComponent(entry.name)}`,
        publicUrl: getPublicStorageUrl(entry.name),
        size: typeof size === "number" ? size : 0,
        modified,
      };
    }) as {
      name: string;
      url: string;
      publicUrl: string;
      size: number;
      modified: string;
    }[];
    list.sort((a, b) => (a.modified < b.modified ? 1 : -1));
    return NextResponse.json({ files: list });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gagal memuat daftar file", files: [] },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminCookie(cookie)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const name = req.nextUrl.searchParams.get("name");
  if (!name) {
    return NextResponse.json({ error: "Parameter name wajib" }, { status: 400 });
  }

  const safe = safeBasename(name);
  try {
    const storage = getSupabaseStorageClient();
    const bucket = getStorageBucket();
    const { error } = await storage.storage.from(bucket).remove([safe]);
    if (error) {
      return NextResponse.json({ error: `Gagal menghapus: ${error.message}` }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 404 });
  }
}
