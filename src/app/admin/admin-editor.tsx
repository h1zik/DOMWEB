"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteConfig } from "@/lib/site-config-schema";
import { siteConfigSchema } from "@/lib/site-config-schema";
import {
  AdminPanels,
  ADMIN_TABS,
  type AdminTabId,
} from "./admin-panels";
import { BtnDanger, BtnPrimary, BtnSecondary, TabBar } from "./admin-ui";

export function AdminEditor() {
  const router = useRouter();
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [tab, setTab] = useState<AdminTabId>("theme");
  const [jsonDraft, setJsonDraft] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/site-config", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal memuat konfigurasi");
      const data = (await res.json()) as SiteConfig;
      setConfig(data);
      setJsonDraft(JSON.stringify(data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const prevTab = useRef<AdminTabId | null>(null);
  useEffect(() => {
    if (tab === "json" && config && prevTab.current !== "json") {
      setJsonDraft(JSON.stringify(config, null, 2));
      setJsonError(null);
    }
    prevTab.current = tab;
  }, [tab, config]);

  function applyJson() {
    setJsonError(null);
    try {
      const raw = JSON.parse(jsonDraft) as unknown;
      const parsed = siteConfigSchema.safeParse(raw);
      if (!parsed.success) {
        setJsonError(parsed.error.message);
        return;
      }
      setConfig(parsed.data);
      setMessage("JSON diterapkan ke formulir. Jangan lupa klik Simpan.");
    } catch {
      setJsonError("JSON tidak valid (syntax error).");
    }
  }

  async function save() {
    if (!config) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/site-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        details?: unknown;
      };
      if (!res.ok) {
        setError(
          (body.error ?? "Gagal menyimpan") +
            (body.details ? `\n${JSON.stringify(body.details, null, 2)}` : ""),
        );
        return;
      }
      setMessage("Semua perubahan tersimpan ke database.");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function resetDefaults() {
    if (!confirm("Reset semua konten ke default bawaan? Tindakan ini tidak bisa dibatalkan.")) {
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/site-config", { method: "DELETE" });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error ?? "Reset gagal");
        return;
      }
      await load();
      setMessage("Konten di-reset ke default.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (loading || !config) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gradient-to-b from-zinc-100 to-zinc-50 text-zinc-500">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="text-sm font-medium">Memuat panel…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 via-zinc-50 to-white pb-24 pt-20">
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent">
              Dominatus
            </p>
            <h1 className="text-xl font-black text-zinc-900 sm:text-2xl">
              Panel konten situs
            </h1>
            <p className="mt-0.5 text-sm text-zinc-500">
              Edit tanpa kode — simpan ke PostgreSQL. Perubahan tampil di situs dalam ±60 detik.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <BtnPrimary disabled={saving} onClick={() => void save()}>
              {saving ? "Menyimpan…" : "Simpan semua"}
            </BtnPrimary>
            <BtnSecondary disabled={saving} onClick={() => void load()}>
              Muat ulang
            </BtnSecondary>
            <BtnSecondary onClick={() => void logout()}>Keluar</BtnSecondary>
          </div>
        </div>
        <div className="mx-auto max-w-6xl border-t border-zinc-100 px-4 py-3">
          <TabBar
            tabs={ADMIN_TABS as unknown as { id: string; label: string }[]}
            active={tab}
            onChange={(id) => setTab(id as AdminTabId)}
          />
        </div>
      </header>

      <div className="mx-auto mt-6 max-w-6xl px-4">
        {message && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            {message}
          </div>
        )}
        {error && (
          <pre className="mb-4 max-h-40 overflow-auto rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-900">
            {error}
          </pre>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <p className="text-sm text-zinc-500">
            Pilih tab di atas. Isian tersimpan setelah Anda menekan{" "}
            <strong className="text-zinc-800">Simpan semua</strong>.
          </p>
          <BtnDanger disabled={saving} onClick={() => void resetDefaults()}>
            Reset ke default
          </BtnDanger>
        </div>

        <AdminPanels
          tab={tab}
          config={config}
          setConfig={setConfig}
          jsonDraft={jsonDraft}
          setJsonDraft={setJsonDraft}
          onApplyJson={applyJson}
          jsonError={jsonError}
        />
      </div>
    </div>
  );
}
