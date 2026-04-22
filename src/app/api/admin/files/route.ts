import { NextRequest, NextResponse } from "next/server";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";
import { ADMIN_COOKIE, verifyAdminCookie } from "@/lib/admin-auth";
import { getUploadsDir, resolveUploadPath, safeBasename } from "@/lib/uploads";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminCookie(cookie)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dir = getUploadsDir();
  try {
    const names = await readdir(dir);
    const items = await Promise.all(
      names.map(async (name) => {
        const fp = path.join(dir, name);
        try {
          const st = await stat(fp);
          if (!st.isFile()) return null;
          return {
            name,
            url: `/api/files/${encodeURIComponent(name)}`,
            size: st.size,
            modified: st.mtime.toISOString(),
          };
        } catch {
          return null;
        }
      }),
    );
    const list = items.filter(Boolean) as {
      name: string;
      url: string;
      size: number;
      modified: string;
    }[];
    list.sort((a, b) => (a.modified < b.modified ? 1 : -1));
    return NextResponse.json({ files: list });
  } catch {
    return NextResponse.json({ files: [] });
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
  const fp = resolveUploadPath([safe]);
  if (!fp) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    await unlink(fp);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 404 });
  }
}
