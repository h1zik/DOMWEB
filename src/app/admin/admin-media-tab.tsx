"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AdminCard,
  BtnDanger,
  BtnSecondary,
  Field,
  TextInput,
} from "./admin-ui";

type FileRow = { name: string; url: string; size: number; modified: string };

export async function uploadAsset(file: File): Promise<{ url: string } | { error: string }> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: fd,
    credentials: "include",
  });
  const data = (await res.json().catch(() => ({}))) as {
    url?: string;
    error?: string;
  };
  if (!res.ok) return { error: data.error ?? "Upload gagal" };
  if (!data.url) return { error: "Respons tidak valid" };
  return { url: data.url };
}

function formatSize(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

/** Input URL + tombol upload file ke volume (UPLOADS_DIR). */
export function MediaUrlField({
  label,
  hint,
  value,
  onUrl,
  accept = "image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf",
}: {
  label: string;
  hint?: string;
  value: string;
  onUrl: (v: string) => void;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setErr(null);
    setBusy(true);
    try {
      const r = await uploadAsset(f);
      if ("error" in r) {
        setErr(r.error);
        return;
      }
      onUrl(r.url);
    } finally {
      setBusy(false);
    }
  }

  const isImg =
    /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(value) || value.includes("/api/files/");

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <TextInput value={value} onChange={onUrl} placeholder="/api/files/… atau https://…" />
        <BtnSecondary onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? "Mengunggah…" : "Upload file"}
        </BtnSecondary>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={onPick}
        />
      </div>
      {err && <p className="text-sm font-medium text-red-600">{err}</p>}
      {value && isImg && (
        <Image
          src={value}
          alt=""
          width={320}
          height={120}
          unoptimized
          className="mt-3 h-20 w-auto max-w-full rounded-lg border border-zinc-200 object-contain p-1"
        />
      )}
    </Field>
  );
}

export function MediaTab() {
  const [files, setFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/files", { credentials: "include" });
      const data = (await res.json()) as { files?: FileRow[] };
      setFiles(data.files ?? []);
    } catch {
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function uploadMany(list: FileList | null) {
    if (!list?.length) return;
    setMsg(null);
    for (const f of Array.from(list)) {
      const r = await uploadAsset(f);
      if ("error" in r) {
        setMsg(r.error);
        return;
      }
    }
    setMsg(`${list.length} file berhasil diunggah.`);
    await load();
  }

  async function remove(name: string) {
    if (!confirm(`Hapus ${name}?`)) return;
    const res = await fetch(
      `/api/admin/files?name=${encodeURIComponent(name)}`,
      { method: "DELETE", credentials: "include" },
    );
    if (!res.ok) {
      setMsg("Gagal menghapus.");
      return;
    }
    await load();
  }

  function copy(url: string) {
    void navigator.clipboard.writeText(url);
    setMsg("URL disalin ke clipboard.");
  }

  return (
    <div className="space-y-6">
      <AdminCard
        title="Perpustakaan file"
        description="File disimpan di folder yang ditentukan env UPLOADS_DIR (di Railway, mount volume ke path yang sama). Salin URL lalu tempel di logo, hero, brand, atau field gambar lain di tab lain."
      >
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/80 p-6 text-center">
          <p className="text-sm font-medium text-zinc-700">
            Seret file ke sini atau pilih beberapa file
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf"
            className="hidden"
            onChange={(e) => void uploadMany(e.target.files)}
          />
          <BtnSecondary
            className="mt-3"
            onClick={() => inputRef.current?.click()}
          >
            Pilih file…
          </BtnSecondary>
          <p className="mt-4 text-left text-xs leading-relaxed text-zinc-500">
            Maks ~12 MB per file. Format: gambar (JPEG, PNG, WebP, GIF, SVG) dan PDF.
            URL publik berbentuk <code className="rounded bg-zinc-200 px-1">/api/files/namafile</code>
            — tempel nilai itu di formulir gambar di tab Beranda, Brand, dll.
          </p>
        </div>

        {msg && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{msg}</p>
        )}

        <div
          className="rounded-xl border border-zinc-200 bg-white"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            void uploadMany(e.dataTransfer.files);
          }}
        >
          <p className="border-b border-zinc-100 px-4 py-3 text-sm font-bold text-zinc-800">
            File di server {loading ? "(memuat…)" : `(${files.length})`}
          </p>
          <ul className="divide-y divide-zinc-100">
            {files.length === 0 && !loading && (
              <li className="px-4 py-8 text-center text-sm text-zinc-500">
                Belum ada file. Upload dari kotak di atas.
              </li>
            )}
            {files.map((f) => (
              <li
                key={f.name}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex items-start gap-3">
                  <FileThumb url={f.url} name={f.name} />
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm font-semibold text-zinc-900">
                      {f.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatSize(f.size)} · {new Date(f.modified).toLocaleString("id-ID")}
                    </p>
                    <p className="mt-1 truncate font-mono text-xs text-accent">{f.url}</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <BtnSecondary onClick={() => copy(f.url)}>Salin URL</BtnSecondary>
                  <BtnDanger onClick={() => void remove(f.name)}>Hapus</BtnDanger>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </AdminCard>

      <AdminCard
        title="Railway & volume"
        description="Agar file tidak hilang saat deploy ulang, pasang volume persisten."
      >
        <ul className="list-inside list-disc space-y-2 text-sm text-zinc-600">
          <li>
            Set variabel{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs">
              UPLOADS_DIR
            </code>{" "}
            misalnya{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs">
              /data/uploads
            </code>
          </li>
          <li>
            Di Railway: <strong>Add Volume</strong> → mount path sama persis dengan{" "}
            <code className="font-mono text-xs">UPLOADS_DIR</code> (folder dalam volume).
          </li>
          <li>
            Set juga{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs">
              NEXT_PUBLIC_SITE_URL
            </code>{" "}
            ke URL publik (mis. https://app.up.railway.app) agar favicon & metadata absolut benar.
          </li>
        </ul>
      </AdminCard>
    </div>
  );
}

function FileThumb({ url, name }: { url: string; name: string }) {
  const isImg = /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(name);
  if (!isImg) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 text-xs font-bold text-zinc-500">
        FILE
      </div>
    );
  }
  return (
    <Image
      src={url}
      alt=""
      width={56}
      height={56}
      unoptimized
      className="h-14 w-14 shrink-0 rounded-lg border border-zinc-200 object-cover"
    />
  );
}
