import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { writeFile } from "fs/promises";
import path from "path";
import { ADMIN_COOKIE, verifyAdminCookie } from "@/lib/admin-auth";
import { ensureUploadsDir, extForMime, safeBasename, UPLOAD_MAX_BYTES } from "@/lib/uploads";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminCookie(cookie)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Form tidak valid" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "File wajib diisi" }, { status: 400 });
  }

  if (file.size > UPLOAD_MAX_BYTES) {
    return NextResponse.json(
      { error: `File terlalu besar (maks ${UPLOAD_MAX_BYTES / 1024 / 1024} MB)` },
      { status: 400 },
    );
  }

  const mime = file.type || "application/octet-stream";
  const extFromMime = extForMime(mime);
  if (!extFromMime) {
    return NextResponse.json(
      { error: "Tipe file tidak diizinkan. Gunakan gambar (JPEG, PNG, Webp, GIF, SVG) atau PDF." },
      { status: 400 },
    );
  }

  const original = safeBasename(file.name || "upload");
  const baseName = path.basename(original, path.extname(original)) || "file";
  const stamp = `${Date.now()}-${randomBytes(6).toString("hex")}`;
  const filename = `${baseName.slice(0, 40)}-${stamp}${extFromMime}`;

  const dir = await ensureUploadsDir();
  const dest = path.join(dir, filename);
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(dest, buf);

  const publicPath = `/api/files/${encodeURIComponent(filename)}`;
  return NextResponse.json({
    ok: true,
    url: publicPath,
    filename,
    size: file.size,
    mime,
  });
}
