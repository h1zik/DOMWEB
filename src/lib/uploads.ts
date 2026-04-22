import { mkdir } from "fs/promises";
import path from "path";

const DEFAULT_RELATIVE = path.join("data", "uploads");

export function getUploadsDir(): string {
  const fromEnv = process.env.UPLOADS_DIR?.trim();
  if (fromEnv) {
    return path.isAbsolute(fromEnv) ? fromEnv : path.join(process.cwd(), fromEnv);
  }
  return path.join(process.cwd(), DEFAULT_RELATIVE);
}

export async function ensureUploadsDir(): Promise<string> {
  const dir = getUploadsDir();
  await mkdir(dir, { recursive: true });
  return dir;
}

/** Nama file aman (tanpa path). */
export function safeBasename(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]/g, "_");
  return base.length > 200 ? base.slice(0, 200) : base;
}

export function resolveUploadPath(segments: string[]): string | null {
  const root = path.resolve(getUploadsDir());
  for (const s of segments) {
    if (s === ".." || s.includes("..") || s.includes("/") || s.includes("\\")) {
      return null;
    }
  }
  const safeSegs = segments.map((s) => path.basename(s));
  const joined = path.resolve(root, ...safeSegs);
  if (!joined.startsWith(root + path.sep) && joined !== root) {
    return null;
  }
  return joined;
}

export const UPLOAD_MAX_BYTES = 12 * 1024 * 1024;

export const ALLOWED_UPLOAD_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "application/pdf": ".pdf",
};

export function extForMime(mime: string): string | null {
  return ALLOWED_UPLOAD_MIME[mime] ?? null;
}

export function contentTypeForFile(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
  };
  return map[ext] ?? "application/octet-stream";
}
