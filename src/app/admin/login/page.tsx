"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Login gagal");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
          Dominatus
        </p>
        <h1 className="mt-2 text-2xl font-bold">Admin</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Masuk untuk mengedit konten situs (tersimpan di PostgreSQL).
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-zinc-300">
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none ring-accent focus:ring-2"
            />
          </label>
          {error && (
            <p className="text-sm font-medium text-red-400" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent py-3 text-sm font-bold text-white transition hover:bg-accent-hover disabled:opacity-60"
          >
            {loading ? "Memproses…" : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
