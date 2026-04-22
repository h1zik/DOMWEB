"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { SiteConfig } from "@/lib/site-config-schema";
import type { Brand } from "@/lib/site-config-schema";
import {
  AdminCard,
  BtnDanger,
  BtnSecondary,
  ColorRow,
  Field,
  NumberInput,
  TextArea,
  TextInput,
  Toggle,
} from "./admin-ui";
import { MediaTab, MediaUrlField } from "./admin-media-tab";

export const ADMIN_TABS = [
  { id: "theme", label: "Tema" },
  { id: "site", label: "Situs & navigasi" },
  { id: "media", label: "Media & file" },
  { id: "home", label: "Beranda" },
  { id: "brands", label: "Brand" },
  { id: "social", label: "Feed sosial" },
  { id: "about", label: "Tentang kami" },
  { id: "inside", label: "Inside & karir" },
  { id: "footer", label: "Footer & tampilan" },
  { id: "json", label: "JSON lanjutan" },
] as const;

export type AdminTabId = (typeof ADMIN_TABS)[number]["id"];

type SetConfig = Dispatch<SetStateAction<SiteConfig | null>>;

function emptyBrand(): Brand {
  return {
    id: `brand-${Date.now()}`,
    name: "Brand baru",
    category: "Kategori",
    tagline: "",
    dna: "",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    shopeeUrl: "https://shopee.co.id",
    tiktokShopUrl: "https://www.tiktok.com",
  };
}

export function AdminPanels({
  tab,
  config,
  setConfig,
  jsonDraft,
  setJsonDraft,
  onApplyJson,
  jsonError,
}: {
  tab: AdminTabId;
  config: SiteConfig;
  setConfig: SetConfig;
  jsonDraft: string;
  setJsonDraft: (s: string) => void;
  onApplyJson: () => void;
  jsonError: string | null;
}) {
  if (tab === "json") {
    return (
      <div className="space-y-4">
        <AdminCard
          title="JSON lanjutan"
          description="Untuk import massal atau field yang belum ada di formulir. Klik «Terapkan» sebelum menyimpan agar perubahan masuk ke situs."
        >
          {jsonError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{jsonError}</p>
          )}
          <Field label="Konfigurasi lengkap (JSON)">
            <TextArea
              value={jsonDraft}
              onChange={setJsonDraft}
              rows={22}
              placeholder="{}"
            />
          </Field>
          <div className="flex flex-wrap gap-2">
            <BtnSecondary onClick={() => setJsonDraft(JSON.stringify(config, null, 2))}>
              Isi ulang dari formulir
            </BtnSecondary>
            <button
              type="button"
              onClick={onApplyJson}
              className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-zinc-800"
            >
              Terapkan ke formulir
            </button>
          </div>
        </AdminCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tab === "theme" && <ThemeTab config={config} setConfig={setConfig} />}
      {tab === "site" && <SiteTab config={config} setConfig={setConfig} />}
      {tab === "home" && <HomeTab config={config} setConfig={setConfig} />}
      {tab === "brands" && <BrandsTab config={config} setConfig={setConfig} />}
      {tab === "social" && <SocialTab config={config} setConfig={setConfig} />}
      {tab === "about" && <AboutTab config={config} setConfig={setConfig} />}
      {tab === "inside" && <InsideTab config={config} setConfig={setConfig} />}
      {tab === "footer" && <FooterTab config={config} setConfig={setConfig} />}
      {tab === "media" && <MediaTab />}
    </div>
  );
}

function ThemeTab({
  config,
  setConfig,
}: {
  config: SiteConfig;
  setConfig: SetConfig;
}) {
  const t = config.theme;
  const set = (patch: Partial<typeof t>) =>
    setConfig((c) => (c ? { ...c, theme: { ...c.theme, ...patch } } : c));
  return (
    <AdminCard
      title="Warna situs"
      description="Aksen utama dipakai untuk tombol, tautan, dan highlight. Pastikan kontras teks tetap terbaca."
    >
      <ColorRow label="Aksen" value={t.accent} onChange={(v) => set({ accent: v })} />
      <ColorRow label="Aksen hover" value={t.accentHover} onChange={(v) => set({ accentHover: v })} />
      <ColorRow label="Aksen lembut (bg)" value={t.accentSoft} onChange={(v) => set({ accentSoft: v })} />
      <ColorRow label="Latar halaman" value={t.background} onChange={(v) => set({ background: v })} />
      <ColorRow label="Teks utama" value={t.foreground} onChange={(v) => set({ foreground: v })} />
      <ColorRow label="Teks sekunder" value={t.mutedFg} onChange={(v) => set({ mutedFg: v })} />
    </AdminCard>
  );
}

function SiteTab({
  config,
  setConfig,
}: {
  config: SiteConfig;
  setConfig: SetConfig;
}) {
  const s = config.site;
  const n = config.nav;
  return (
    <>
      <AdminCard
        title="Logo & favicon"
        description="Upload dari tombol di bawah (file tersimpan di volume), atau tempel URL CDN. Kosongkan logo untuk hanya menampilkan teks."
      >
        <MediaUrlField
          label="URL logo navbar"
          hint="Contoh hasil upload: /api/files/dominatus-logo-….png"
          value={s.logoUrl}
          onUrl={(v) => setConfig((c) => (c ? { ...c, site: { ...c.site, logoUrl: v } } : c))}
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        />
        <Field label="Teks alternatif logo (aksesibilitas)">
          <TextInput
            value={s.logoAlt}
            onChange={(v) => setConfig((c) => (c ? { ...c, site: { ...c.site, logoAlt: v } } : c))}
          />
        </Field>
        <MediaUrlField
          label="URL favicon"
          hint="Biasanya .ico atau .png kecil. Set NEXT_PUBLIC_SITE_URL ke URL publik situs."
          value={s.faviconUrl}
          onUrl={(v) => setConfig((c) => (c ? { ...c, site: { ...c.site, faviconUrl: v } } : c))}
          accept="image/*"
        />
      </AdminCard>

      <AdminCard title="Identitas situs" description="Muncul di navbar, footer, dan judul tab browser.">
        <Field label="Nama perusahaan / brand utama">
          <TextInput value={s.name} onChange={(v) => setConfig((c) => (c ? { ...c, site: { ...c.site, name: v } } : c))} />
        </Field>
        <Field label="Label «Holding» di navbar">
          <TextInput
            value={s.holdingLabel}
            onChange={(v) => setConfig((c) => (c ? { ...c, site: { ...c.site, holdingLabel: v } } : c))}
          />
        </Field>
        <Field label="Tagline singkat">
          <TextInput
            value={s.tagline}
            onChange={(v) => setConfig((c) => (c ? { ...c, site: { ...c.site, tagline: v } } : c))}
          />
        </Field>
        <Field label="Deskripsi (SEO & intro)">
          <TextArea
            value={s.description}
            onChange={(v) => setConfig((c) => (c ? { ...c, site: { ...c.site, description: v } } : c))}
            rows={3}
          />
        </Field>
        <Field label="Suffix judul browser" hint='Contoh: "Holding Beauty & Care"'>
          <TextInput
            value={s.titleSuffix}
            onChange={(v) => setConfig((c) => (c ? { ...c, site: { ...c.site, titleSuffix: v } } : c))}
          />
        </Field>
      </AdminCard>
      <AdminCard title="Navigasi" description="Teks tombol ajakan di menu.">
        <Field label="Teks tombol Join / karir">
          <TextInput
            value={n.joinLabel}
            onChange={(v) => setConfig((c) => (c ? { ...c, nav: { ...c.nav, joinLabel: v } } : c))}
          />
        </Field>
      </AdminCard>
    </>
  );
}

function HomeTab({
  config,
  setConfig,
}: {
  config: SiteConfig;
  setConfig: SetConfig;
}) {
  const h = config.hero;
  const setHero = (patch: Partial<typeof h>) =>
    setConfig((c) => (c ? { ...c, hero: { ...c.hero, ...patch } } : c));
  const setMosaic = (patch: Partial<SiteConfig["mosaic"]>) =>
    setConfig((c) => (c ? { ...c, mosaic: { ...c.mosaic, ...patch } } : c));
  const setMission = (patch: Partial<SiteConfig["mission"]>) =>
    setConfig((c) => (c ? { ...c, mission: { ...c.mission, ...patch } } : c));

  return (
    <>
      <AdminCard title="Hero (halaman utama)" description="Bagian atas landing: judul, teks, gambar besar.">
        <Field label="Label kecil di atas judul">
          <TextInput value={h.eyebrow} onChange={(v) => setHero({ eyebrow: v })} />
        </Field>
        <Field label="Judul baris 1">
          <TextInput value={h.titleLine1} onChange={(v) => setHero({ titleLine1: v })} />
        </Field>
        <Field label="Judul baris 2 (biasanya warna aksen)">
          <TextInput value={h.titleLine2} onChange={(v) => setHero({ titleLine2: v })} />
        </Field>
        <Field label="Paragraf pembuka">
          <TextArea value={h.body} onChange={(v) => setHero({ body: v })} rows={4} />
        </Field>
        <MediaUrlField
          label="Gambar hero"
          hint="Upload ke server atau tempel URL (Unsplash, /api/files/…, dll.)."
          value={h.imageUrl}
          onUrl={(v) => setHero({ imageUrl: v })}
        />
        <Field label="Label badge kecil di gambar">
          <TextInput value={h.badgeEyebrow} onChange={(v) => setHero({ badgeEyebrow: v })} />
        </Field>
        <Field label="Teks badge di gambar">
          <TextInput value={h.badgeTitle} onChange={(v) => setHero({ badgeTitle: v })} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tombol utama">
            <TextInput value={h.primaryCtaLabel} onChange={(v) => setHero({ primaryCtaLabel: v })} />
          </Field>
          <Field label="Tombol sekunder">
            <TextInput value={h.secondaryCtaLabel} onChange={(v) => setHero({ secondaryCtaLabel: v })} />
          </Field>
        </div>
      </AdminCard>

      <AdminCard
        title="Marquee (teks berjalan)"
        description="Satu baris per frase. Kosongkan semua untuk menyembunyikan strip berjalan."
      >
        <Field label="Daftar frase" hint="Tekan Enter untuk baris baru.">
          <TextArea
            value={config.marquee.join("\n")}
            onChange={(v) =>
              setConfig((c) =>
                c
                  ? {
                      ...c,
                      marquee: v
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    }
                  : c,
              )
            }
            rows={6}
          />
        </Field>
      </AdminCard>

      <AdminCard title="Seksi mosaic brand" description="Judul blok grid brand di beranda.">
        <Field label="Label kecil">
          <TextInput value={config.mosaic.eyebrow} onChange={(v) => setMosaic({ eyebrow: v })} />
        </Field>
        <Field label="Judul">
          <TextInput value={config.mosaic.title} onChange={(v) => setMosaic({ title: v })} />
        </Field>
        <Field label="Deskripsi">
          <TextArea value={config.mosaic.subtitle} onChange={(v) => setMosaic({ subtitle: v })} rows={2} />
        </Field>
        <Field label="Teks tautan katalog">
          <TextInput value={config.mosaic.catalogLinkLabel} onChange={(v) => setMosaic({ catalogLinkLabel: v })} />
        </Field>
      </AdminCard>

      <AdminCard title="Mission statement" description="Kutipan di tengah beranda.">
        <Field label="Kalimat pembuka (sebelum highlight)">
          <TextInput value={config.mission.lead} onChange={(v) => setMission({ lead: v })} />
        </Field>
        <Field label="Kata sorot 1">
          <TextInput value={config.mission.highlight1} onChange={(v) => setMission({ highlight1: v })} />
        </Field>
        <Field label="Kata sorot 2">
          <TextInput value={config.mission.highlight2} onChange={(v) => setMission({ highlight2: v })} />
        </Field>
        <Field label="Kata sorot 3">
          <TextInput value={config.mission.highlight3} onChange={(v) => setMission({ highlight3: v })} />
        </Field>
        <Field label="Footer kutipan">
          <TextInput value={config.mission.footer} onChange={(v) => setMission({ footer: v })} />
        </Field>
      </AdminCard>

      <AdminCard title="Angka (stats)" description="Empat angka di strip oranye.">
        {config.stats.map((st, i) => (
          <div
            key={i}
            className="grid gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 sm:grid-cols-3"
          >
            <Field label="Label">
              <TextInput
                value={st.label}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const stats = [...c.stats];
                    stats[i] = { ...stats[i], label: v };
                    return { ...c, stats };
                  })
                }
              />
            </Field>
            <Field label="Nilai">
              <TextInput
                value={st.value}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const stats = [...c.stats];
                    stats[i] = { ...stats[i], value: v };
                    return { ...c, stats };
                  })
                }
              />
            </Field>
            <Field label="Suffix" hint='Mis. "-first" di belakang angka'>
              <TextInput
                value={st.suffix}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const stats = [...c.stats];
                    stats[i] = { ...stats[i], suffix: v };
                    return { ...c, stats };
                  })
                }
              />
            </Field>
          </div>
        ))}
      </AdminCard>
    </>
  );
}

function BrandsTab({
  config,
  setConfig,
}: {
  config: SiteConfig;
  setConfig: SetConfig;
}) {
  return (
    <AdminCard
      title="Portofolio brand"
      description="Setiap brand punya kartu di halaman Our Brands dan mosaic beranda."
    >
      <div className="flex justify-end">
        <BtnSecondary
          onClick={() =>
            setConfig((c) => (c ? { ...c, brands: [...c.brands, emptyBrand()] } : c))
          }
        >
          + Tambah brand
        </BtnSecondary>
      </div>
      {config.brands.map((b, i) => (
        <div
          key={b.id}
          className="space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-zinc-900">Brand {i + 1}</span>
            <BtnDanger
              disabled={config.brands.length <= 1}
              onClick={() =>
                setConfig((c) =>
                  c && c.brands.length > 1
                    ? { ...c, brands: c.brands.filter((_, j) => j !== i) }
                    : c,
                )
              }
            >
              Hapus
            </BtnDanger>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="ID (unik, tanpa spasi)">
              <TextInput
                value={b.id}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const brands = [...c.brands];
                    brands[i] = { ...brands[i], id: v };
                    return { ...c, brands };
                  })
                }
              />
            </Field>
            <Field label="Nama brand">
              <TextInput
                value={b.name}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const brands = [...c.brands];
                    brands[i] = { ...brands[i], name: v };
                    return { ...c, brands };
                  })
                }
              />
            </Field>
            <Field label="Kategori">
              <TextInput
                value={b.category}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const brands = [...c.brands];
                    brands[i] = { ...brands[i], category: v };
                    return { ...c, brands };
                  })
                }
              />
            </Field>
            <Field label="Tagline">
              <TextInput
                value={b.tagline}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const brands = [...c.brands];
                    brands[i] = { ...brands[i], tagline: v };
                    return { ...c, brands };
                  })
                }
              />
            </Field>
          </div>
          <Field label="DNA brand">
            <TextArea
              value={b.dna}
              onChange={(v) =>
                setConfig((c) => {
                  if (!c) return c;
                  const brands = [...c.brands];
                  brands[i] = { ...brands[i], dna: v };
                  return { ...c, brands };
                })
              }
              rows={2}
            />
          </Field>
          <MediaUrlField
            label="Gambar brand"
            accept="image/*"
            value={b.image}
            onUrl={(v) =>
              setConfig((c) => {
                if (!c) return c;
                const brands = [...c.brands];
                brands[i] = { ...brands[i], image: v };
                return { ...c, brands };
              })
            }
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Link Shopee">
              <TextInput
                value={b.shopeeUrl}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const brands = [...c.brands];
                    brands[i] = { ...brands[i], shopeeUrl: v };
                    return { ...c, brands };
                  })
                }
              />
            </Field>
            <Field label="Link TikTok Shop">
              <TextInput
                value={b.tiktokShopUrl}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const brands = [...c.brands];
                    brands[i] = { ...brands[i], tiktokShopUrl: v };
                    return { ...c, brands };
                  })
                }
              />
            </Field>
          </div>
        </div>
      ))}
    </AdminCard>
  );
}

function SocialTab({
  config,
  setConfig,
}: {
  config: SiteConfig;
  setConfig: SetConfig;
}) {
  const [thumbBusy, setThumbBusy] = useState<Record<string, boolean>>({});
  const [thumbError, setThumbError] = useState<Record<string, string>>({});

  const sw = config.socialWall;
  const setWall = (patch: Partial<typeof sw>) =>
    setConfig((c) => (c ? { ...c, socialWall: { ...c.socialWall, ...patch } } : c));

  const newPost = () =>
    setConfig((c) =>
      c
        ? {
            ...c,
            socialPosts: [
              ...c.socialPosts,
              {
                id: `post-${Date.now()}`,
                platform: "Instagram",
                caption: "",
                image:
                  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
                sourceUrl: "",
              },
            ],
          }
        : c,
    );

  const fetchInstagramThumb = async (idx: number, postId: string, url: string) => {
    const cleaned = url.trim();
    if (!cleaned) return;
    setThumbError((prev) => ({ ...prev, [postId]: "" }));
    setThumbBusy((prev) => ({ ...prev, [postId]: true }));
    try {
      const res = await fetch(
        `/api/admin/instagram-thumbnail?url=${encodeURIComponent(cleaned)}`,
        { credentials: "include" },
      );
      const data = (await res.json().catch(() => ({}))) as {
        thumbnailUrl?: string;
        error?: string;
      };
      if (!res.ok || !data.thumbnailUrl) {
        setThumbError((prev) => ({
          ...prev,
          [postId]: data.error ?? "Gagal ambil thumbnail dari link.",
        }));
        return;
      }
      setConfig((c) => {
        if (!c) return c;
        const socialPosts = [...c.socialPosts];
        socialPosts[idx] = { ...socialPosts[idx], image: data.thumbnailUrl ?? socialPosts[idx].image };
        return { ...c, socialPosts };
      });
    } finally {
      setThumbBusy((prev) => ({ ...prev, [postId]: false }));
    }
  };

  return (
    <>
      <AdminCard title="Judul seksi social wall">
        <Field label="Label kecil">
          <TextInput value={sw.eyebrow} onChange={(v) => setWall({ eyebrow: v })} />
        </Field>
        <Field label="Judul">
          <TextInput value={sw.title} onChange={(v) => setWall({ title: v })} />
        </Field>
        <Field label="Deskripsi">
          <TextArea value={sw.subtitle} onChange={(v) => setWall({ subtitle: v })} rows={2} />
        </Field>
      </AdminCard>

      <AdminCard title="Kartu feed (mock)" description="Ubah gambar, caption, dan platform per kartu.">
        <div className="flex justify-end">
          <BtnSecondary onClick={newPost}>+ Tambah kartu</BtnSecondary>
        </div>
        {config.socialPosts.map((p, i) => (
          <div key={p.id} className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4">
            <div className="mb-3 flex justify-between gap-2">
              <span className="text-sm font-bold">Kartu {i + 1}</span>
              <BtnDanger
                disabled={config.socialPosts.length <= 1}
                onClick={() =>
                  setConfig((c) =>
                    c && c.socialPosts.length > 1
                      ? { ...c, socialPosts: c.socialPosts.filter((_, j) => j !== i) }
                      : c,
                  )
                }
              >
                Hapus
              </BtnDanger>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Platform">
                <select
                  value={p.platform}
                  onChange={(e) =>
                    setConfig((c) => {
                      if (!c) return c;
                      const socialPosts = [...c.socialPosts];
                      socialPosts[i] = {
                        ...socialPosts[i],
                        platform: e.target.value as "Instagram" | "TikTok",
                      };
                      return { ...c, socialPosts };
                    })
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </Field>
              <Field label="ID (unik)">
                <TextInput
                  value={p.id}
                  onChange={(v) =>
                    setConfig((c) => {
                      if (!c) return c;
                      const socialPosts = [...c.socialPosts];
                      socialPosts[i] = { ...socialPosts[i], id: v };
                      return { ...c, socialPosts };
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Caption">
              <TextArea
                value={p.caption}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const socialPosts = [...c.socialPosts];
                    socialPosts[i] = { ...socialPosts[i], caption: v };
                    return { ...c, socialPosts };
                  })
                }
                rows={2}
              />
            </Field>
            <Field label="Link feed (Instagram/TikTok)" hint="Tempel URL post/reel. Untuk Instagram, klik tombol auto thumbnail.">
              <TextInput
                value={p.sourceUrl}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const socialPosts = [...c.socialPosts];
                    socialPosts[i] = { ...socialPosts[i], sourceUrl: v };
                    return { ...c, socialPosts };
                  })
                }
              />
            </Field>
            {p.platform === "Instagram" && (
              <div className="flex items-center gap-3">
                <BtnSecondary
                  disabled={!p.sourceUrl.trim() || Boolean(thumbBusy[p.id])}
                  onClick={() => void fetchInstagramThumb(i, p.id, p.sourceUrl)}
                >
                  {thumbBusy[p.id] ? "Mengambil..." : "Ambil thumbnail dari link Instagram"}
                </BtnSecondary>
                {thumbError[p.id] ? (
                  <span className="text-sm text-red-600">{thumbError[p.id]}</span>
                ) : null}
              </div>
            )}
            <MediaUrlField
              label="Gambar"
              accept="image/*"
              value={p.image}
              onUrl={(v) =>
                setConfig((c) => {
                  if (!c) return c;
                  const socialPosts = [...c.socialPosts];
                  socialPosts[i] = { ...socialPosts[i], image: v };
                  return { ...c, socialPosts };
                })
              }
            />
          </div>
        ))}
      </AdminCard>
    </>
  );
}

function AboutTab({
  config,
  setConfig,
}: {
  config: SiteConfig;
  setConfig: SetConfig;
}) {
  const a = config.about;
  const setAbout = (patch: Partial<typeof a>) =>
    setConfig((c) => (c ? { ...c, about: { ...c.about, ...patch } } : c));

  return (
    <>
      <AdminCard title="Halaman About">
        <Field label="Label kecil">
          <TextInput value={a.pageEyebrow} onChange={(v) => setAbout({ pageEyebrow: v })} />
        </Field>
        <Field label="Judul halaman">
          <TextInput value={a.pageTitle} onChange={(v) => setAbout({ pageTitle: v })} />
        </Field>
        <Field label="Intro di bawah judul">
          <TextArea value={a.intro} onChange={(v) => setAbout({ intro: v })} rows={2} />
        </Field>
        <Field label="Judul filosofi">
          <TextInput value={a.philosophyTitle} onChange={(v) => setAbout({ philosophyTitle: v })} />
        </Field>
        <Field label="Isi filosofi">
          <TextArea value={a.philosophyBody} onChange={(v) => setAbout({ philosophyBody: v })} rows={4} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Judul visi">
            <TextInput value={a.visionTitle} onChange={(v) => setAbout({ visionTitle: v })} />
          </Field>
          <Field label="Judul misi">
            <TextInput value={a.missionTitle} onChange={(v) => setAbout({ missionTitle: v })} />
          </Field>
        </div>
        <Field label="Isi visi">
          <TextArea value={a.visionBody} onChange={(v) => setAbout({ visionBody: v })} rows={3} />
        </Field>
        <Field label="Poin misi (satu baris per bullet)">
          <TextArea
            value={a.missionBullets.join("\n")}
            onChange={(v) =>
              setAbout({
                missionBullets: v
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            rows={4}
          />
        </Field>
        <Field label="Judul seksi nilai inti">
          <TextInput value={a.coreValuesTitle} onChange={(v) => setAbout({ coreValuesTitle: v })} />
        </Field>
        <Field label="Judul leadership">
          <TextInput
            value={a.leadershipSectionTitle}
            onChange={(v) => setAbout({ leadershipSectionTitle: v })}
          />
        </Field>
        <Field label="Subtitle leadership">
          <TextArea
            value={a.leadershipSubtitle}
            onChange={(v) => setAbout({ leadershipSubtitle: v })}
            rows={2}
          />
        </Field>
      </AdminCard>

      <AdminCard title="Nilai inti (core values)">
        {config.coreValues.map((cv, i) => (
          <div key={i} className="rounded-xl border border-zinc-100 p-3">
            <Field label={`Nilai ${i + 1} — judul`}>
              <TextInput
                value={cv.title}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const coreValues = [...c.coreValues];
                    coreValues[i] = { ...coreValues[i], title: v };
                    return { ...c, coreValues };
                  })
                }
              />
            </Field>
            <Field label="Deskripsi">
              <TextArea
                value={cv.body}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const coreValues = [...c.coreValues];
                    coreValues[i] = { ...coreValues[i], body: v };
                    return { ...c, coreValues };
                  })
                }
                rows={2}
              />
            </Field>
          </div>
        ))}
      </AdminCard>

      <AdminCard title="Tim leadership">
        {config.leadership.map((person, i) => (
          <div key={i} className="rounded-xl border border-zinc-100 p-3">
            <Field label="Nama">
              <TextInput
                value={person.name}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const leadership = [...c.leadership];
                    leadership[i] = { ...leadership[i], name: v };
                    return { ...c, leadership };
                  })
                }
              />
            </Field>
            <Field label="Jabatan">
              <TextInput
                value={person.role}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const leadership = [...c.leadership];
                    leadership[i] = { ...leadership[i], role: v };
                    return { ...c, leadership };
                  })
                }
              />
            </Field>
            <Field label="Bio singkat">
              <TextArea
                value={person.bio}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const leadership = [...c.leadership];
                    leadership[i] = { ...leadership[i], bio: v };
                    return { ...c, leadership };
                  })
                }
                rows={2}
              />
            </Field>
          </div>
        ))}
      </AdminCard>
    </>
  );
}

function InsideTab({
  config,
  setConfig,
}: {
  config: SiteConfig;
  setConfig: SetConfig;
}) {
  const hub = config.insideHub;
  const setHub = (patch: Partial<typeof hub>) =>
    setConfig((c) => (c ? { ...c, insideHub: { ...c.insideHub, ...patch } } : c));
  const cul = config.culture;
  const setCul = (patch: Partial<typeof cul>) =>
    setConfig((c) => (c ? { ...c, culture: { ...c.culture, ...patch } } : c));
  const car = config.careers;
  const setCar = (patch: Partial<typeof car>) =>
    setConfig((c) => (c ? { ...c, careers: { ...c.careers, ...patch } } : c));
  const ins = config.insights;
  const setIns = (patch: Partial<typeof ins>) =>
    setConfig((c) => (c ? { ...c, insights: { ...c.insights, ...patch } } : c));

  return (
    <>
      <AdminCard title="Hub Inside Dominatus">
        <Field label="Label kecil">
          <TextInput value={hub.eyebrow} onChange={(v) => setHub({ eyebrow: v })} />
        </Field>
        <Field label="Judul">
          <TextInput value={hub.title} onChange={(v) => setHub({ title: v })} />
        </Field>
        <Field label="Deskripsi">
          <TextArea value={hub.subtitle} onChange={(v) => setHub({ subtitle: v })} rows={2} />
        </Field>
        {hub.cards.map((card, i) => (
          <div key={card.href} className="rounded-xl border border-zinc-100 p-3">
            <p className="mb-2 text-xs font-bold text-zinc-500">Kartu {i + 1}</p>
            <Field label="Link (path)">
              <TextInput
                value={card.href}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const cards = [...c.insideHub.cards];
                    cards[i] = { ...cards[i], href: v };
                    return { ...c, insideHub: { ...c.insideHub, cards } };
                  })
                }
              />
            </Field>
            <Field label="Judul">
              <TextInput
                value={card.title}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const cards = [...c.insideHub.cards];
                    cards[i] = { ...cards[i], title: v };
                    return { ...c, insideHub: { ...c.insideHub, cards } };
                  })
                }
              />
            </Field>
            <Field label="Deskripsi">
              <TextArea
                value={card.desc}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const cards = [...c.insideHub.cards];
                    cards[i] = { ...cards[i], desc: v };
                    return { ...c, insideHub: { ...c.insideHub, cards } };
                  })
                }
                rows={2}
              />
            </Field>
          </div>
        ))}
      </AdminCard>

      <AdminCard title="Culture">
        <Field label="Label kecil">
          <TextInput value={cul.introEyebrow} onChange={(v) => setCul({ introEyebrow: v })} />
        </Field>
        <Field label="Judul">
          <TextInput value={cul.title} onChange={(v) => setCul({ title: v })} />
        </Field>
        <Field label="Intro">
          <TextArea value={cul.intro} onChange={(v) => setCul({ intro: v })} rows={3} />
        </Field>
        {cul.cards.map((card, i) => (
          <div key={i} className="rounded-xl border border-zinc-100 p-3">
            <Field label="Ikon">
              <select
                value={card.icon}
                onChange={(e) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const cards = [...c.culture.cards];
                    cards[i] = {
                      ...cards[i],
                      icon: e.target.value as "users" | "coffee" | "music",
                    };
                    return { ...c, culture: { ...c.culture, cards } };
                  })
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
              >
                <option value="users">Tim / users</option>
                <option value="coffee">Kopi / async</option>
                <option value="music">Musik / ritual</option>
              </select>
            </Field>
            <Field label="Judul">
              <TextInput
                value={card.title}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const cards = [...c.culture.cards];
                    cards[i] = { ...cards[i], title: v };
                    return { ...c, culture: { ...c.culture, cards } };
                  })
                }
              />
            </Field>
            <Field label="Isi">
              <TextArea
                value={card.body}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const cards = [...c.culture.cards];
                    cards[i] = { ...cards[i], body: v };
                    return { ...c, culture: { ...c.culture, cards } };
                  })
                }
                rows={2}
              />
            </Field>
          </div>
        ))}
      </AdminCard>

      <AdminCard title="Karir">
        <Field label="Label kecil">
          <TextInput value={car.eyebrow} onChange={(v) => setCar({ eyebrow: v })} />
        </Field>
        <Field label="Judul">
          <TextInput value={car.title} onChange={(v) => setCar({ title: v })} />
        </Field>
        <Field label="Intro (sebelum email)">
          <TextArea value={car.intro} onChange={(v) => setCar({ intro: v })} rows={2} />
        </Field>
        <Field label="Email lamaran">
          <TextInput value={car.email} onChange={(v) => setCar({ email: v })} type="email" />
        </Field>
        <Field label="Teks tombol apply">
          <TextInput value={car.applyLabel} onChange={(v) => setCar({ applyLabel: v })} />
        </Field>
        <Field label="Teks tautan culture">
          <TextInput value={car.cultureLinkText} onChange={(v) => setCar({ cultureLinkText: v })} />
        </Field>
        <p className="text-sm font-bold text-zinc-800">Lowongan</p>
        {car.openings.map((job, i) => (
          <div key={i} className="rounded-xl border border-zinc-100 p-3">
            <Field label="Judul posisi">
              <TextInput
                value={job.title}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const openings = [...c.careers.openings];
                    openings[i] = { ...openings[i], title: v };
                    return { ...c, careers: { ...c.careers, openings } };
                  })
                }
              />
            </Field>
            <Field label="Tipe (lokasi / hybrid)">
              <TextInput
                value={job.type}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const openings = [...c.careers.openings];
                    openings[i] = { ...openings[i], type: v };
                    return { ...c, careers: { ...c.careers, openings } };
                  })
                }
              />
            </Field>
            <Field label="Deskripsi">
              <TextArea
                value={job.desc}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const openings = [...c.careers.openings];
                    openings[i] = { ...openings[i], desc: v };
                    return { ...c, careers: { ...c.careers, openings } };
                  })
                }
                rows={2}
              />
            </Field>
          </div>
        ))}
        <BtnSecondary
          onClick={() =>
            setConfig((c) =>
              c
                ? {
                    ...c,
                    careers: {
                      ...c.careers,
                      openings: [
                        ...c.careers.openings,
                        { title: "Posisi baru", type: "Full-time", desc: "" },
                      ],
                    },
                  }
                : c,
            )
          }
        >
          + Tambah lowongan
        </BtnSecondary>
      </AdminCard>

      <AdminCard title="Blog & Press">
        <Field label="Label kecil">
          <TextInput value={ins.eyebrow} onChange={(v) => setIns({ eyebrow: v })} />
        </Field>
        <Field label="Judul">
          <TextInput value={ins.title} onChange={(v) => setIns({ title: v })} />
        </Field>
        <Field label="Subtitle">
          <TextArea value={ins.subtitle} onChange={(v) => setIns({ subtitle: v })} rows={2} />
        </Field>
        <div className="flex justify-end">
          <BtnSecondary
            onClick={() =>
              setConfig((c) =>
                c
                  ? {
                      ...c,
                      insights: {
                        ...c.insights,
                        articles: [
                          ...c.insights.articles,
                          {
                            slug: `artikel-${Date.now()}`,
                            date: "",
                            title: "Judul baru",
                            tag: "Press",
                            teaser: "",
                            body: "",
                          },
                        ],
                      },
                    }
                  : c,
              )
            }
          >
            + Tambah artikel
          </BtnSecondary>
        </div>
        {ins.articles.map((art, i) => (
          <div key={art.slug} className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-bold">Artikel {i + 1}</span>
              <BtnDanger
                disabled={ins.articles.length <= 1}
                onClick={() =>
                  setConfig((c) =>
                    c && c.insights.articles.length > 1
                      ? {
                          ...c,
                          insights: {
                            ...c.insights,
                            articles: c.insights.articles.filter((_, j) => j !== i),
                          },
                        }
                      : c,
                  )
                }
              >
                Hapus
              </BtnDanger>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Slug URL">
                <TextInput
                  value={art.slug}
                  onChange={(v) =>
                    setConfig((c) => {
                      if (!c) return c;
                      const articles = [...c.insights.articles];
                      articles[i] = { ...articles[i], slug: v };
                      return { ...c, insights: { ...c.insights, articles } };
                    })
                  }
                />
              </Field>
              <Field label="Tanggal (teks)">
                <TextInput
                  value={art.date}
                  onChange={(v) =>
                    setConfig((c) => {
                      if (!c) return c;
                      const articles = [...c.insights.articles];
                      articles[i] = { ...articles[i], date: v };
                      return { ...c, insights: { ...c.insights, articles } };
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Judul">
              <TextInput
                value={art.title}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const articles = [...c.insights.articles];
                    articles[i] = { ...articles[i], title: v };
                    return { ...c, insights: { ...c.insights, articles } };
                  })
                }
              />
            </Field>
            <Field label="Tag">
              <TextInput
                value={art.tag}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const articles = [...c.insights.articles];
                    articles[i] = { ...articles[i], tag: v };
                    return { ...c, insights: { ...c.insights, articles } };
                  })
                }
              />
            </Field>
            <Field label="Ringkasan (daftar)">
              <TextArea
                value={art.teaser}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const articles = [...c.insights.articles];
                    articles[i] = { ...articles[i], teaser: v };
                    return { ...c, insights: { ...c.insights, articles } };
                  })
                }
                rows={2}
              />
            </Field>
            <Field label="Isi artikel">
              <TextArea
                value={art.body}
                onChange={(v) =>
                  setConfig((c) => {
                    if (!c) return c;
                    const articles = [...c.insights.articles];
                    articles[i] = { ...articles[i], body: v };
                    return { ...c, insights: { ...c.insights, articles } };
                  })
                }
                rows={4}
              />
            </Field>
          </div>
        ))}
      </AdminCard>
    </>
  );
}

function FooterTab({
  config,
  setConfig,
}: {
  config: SiteConfig;
  setConfig: SetConfig;
}) {
  const f = config.footer;
  const setFooter = (patch: Partial<typeof f>) =>
    setConfig((c) => (c ? { ...c, footer: { ...c.footer, ...patch } } : c));
  const g = config.genZ;
  const setGen = (patch: Partial<typeof g>) =>
    setConfig((c) => (c ? { ...c, genZ: { ...c.genZ, ...patch } } : c));

  return (
    <>
      <AdminCard title="Footer">
        <Field label="Judul kolom navigasi">
          <TextInput value={f.navigateHeading} onChange={(v) => setFooter({ navigateHeading: v })} />
        </Field>
        <Field label="Judul kolom sosial">
          <TextInput value={f.connectHeading} onChange={(v) => setFooter({ connectHeading: v })} />
        </Field>
        <Field
          label="Teks hak cipta"
          hint='Sertakan placeholder literal: tulis {year} agar tahun diganti otomatis di situs.'
        >
          <TextArea value={f.copyright} onChange={(v) => setFooter({ copyright: v })} rows={2} />
        </Field>
        <Field label="Link LinkedIn / web">
          <TextInput value={f.socialLinkedin} onChange={(v) => setFooter({ socialLinkedin: v })} />
        </Field>
        <Field label="Link Instagram / sosial">
          <TextInput value={f.socialInstagram} onChange={(v) => setFooter({ socialInstagram: v })} />
        </Field>
        <Field label="Email kontak (mailto)">
          <TextInput value={f.email} onChange={(v) => setFooter({ email: v })} />
        </Field>
      </AdminCard>

      <AdminCard
        title="Efek Gen-Z"
        description="Noise halus dan bar progres scroll di situs publik (bukan di halaman admin)."
      >
        <Toggle
          label="Tampilkan noise tekstur halus"
          checked={g.showNoise}
          onChange={(v) => setGen({ showNoise: v })}
        />
        <Toggle
          label="Tampilkan progress bar saat scroll"
          checked={g.showScrollProgress}
          onChange={(v) => setGen({ showScrollProgress: v })}
        />
        <Field label="Durasi satu putaran marquee (detik)" hint="8–120. Angka lebih besar = lebih pelan.">
          <NumberInput
            value={g.marqueeDurationSec}
            onChange={(v) => setGen({ marqueeDurationSec: v })}
            min={8}
            max={120}
          />
        </Field>
      </AdminCard>
    </>
  );
}
