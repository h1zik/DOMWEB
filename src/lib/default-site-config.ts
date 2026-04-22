import type { SiteConfig } from "./site-config-schema";

export const defaultSiteConfig: SiteConfig = {
  theme: {
    accent: "#f97316",
    accentHover: "#ea580c",
    accentSoft: "#fff7ed",
    background: "#ffffff",
    foreground: "#18181b",
    mutedFg: "#71717a",
  },
  site: {
    name: "Dominatus",
    tagline: "House of Identity — Beauty & Care, Elevated.",
    description:
      "B2C holding company yang menaungi brand kosmetik: parfum, lip care, dan body care. Modern, inovatif, dan terstruktur.",
    holdingLabel: "Holding",
    titleSuffix: "Holding Beauty & Care",
    logoUrl: "",
    logoAlt: "Dominatus",
    faviconUrl: "",
  },
  nav: {
    joinLabel: "Join us",
  },
  hero: {
    eyebrow: "B2C Holding · Beauty & Care",
    titleLine1: "Skala korporat.",
    titleLine2: "Energi yang playful.",
    body: "Dominatus menaungi brand kosmetik dengan narasi modern dan terstruktur — untuk investor, talent, dan mitra strategis yang ingin bergerak cepat di pasar Gen-Z.",
    imageUrl:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80",
    badgeEyebrow: "Hero lifestyle",
    badgeTitle: "Visual campaign — siap diganti video reel",
    primaryCtaLabel: "Lihat brand",
    secondaryCtaLabel: "Filosofi kami",
  },
  marquee: [
    "House of Identity",
    "D2C-first",
    "Parfum · Lip · Body",
    "Investor-ready",
    "Talent-friendly",
    "Shopee & TikTok Shop",
    "No cap — just growth",
  ],
  mosaic: {
    eyebrow: "Brand mosaic",
    title: "House of Identity",
    subtitle: "Parfum, lip care, dan body care dalam satu ekosistem yang kohesif.",
    catalogLinkLabel: "Katalog lengkap →",
  },
  mission: {
    lead: "Kami membangun portofolio beauty yang",
    highlight1: "berani bercerita",
    highlight2: "mudah diakses",
    highlight3: "siap scale-up",
    footer: "— Mission statement, Dominatus Holding",
  },
  stats: [
    { label: "Brand portfolio", value: "4+", suffix: "" },
    { label: "Kategori produk", value: "3", suffix: "" },
    { label: "Fokus channel", value: "D2C", suffix: "" },
    { label: "Visi", value: "ASEAN", suffix: "-first" },
  ],
  brands: [
    {
      id: "velora",
      name: "Velora",
      category: "Parfum",
      tagline: "Signature scents for everyday icons.",
      dna: "Artisan blending, long-lasting projection, gender-inclusive storytelling.",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
      shopeeUrl: "https://shopee.co.id",
      tiktokShopUrl: "https://www.tiktok.com",
    },
    {
      id: "lumen-lip",
      name: "Lumen Lip",
      category: "Lip Care",
      tagline: "Comfort-first color that cares.",
      dna: "Dermatologist-minded formulas, playful shades, refill-friendly packaging.",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
      shopeeUrl: "https://shopee.co.id",
      tiktokShopUrl: "https://www.tiktok.com",
    },
    {
      id: "solstice-body",
      name: "Solstice Body",
      category: "Body Care",
      tagline: "Rituals that feel like sunlight.",
      dna: "Sensorial textures, clean ingredients, spa-at-home positioning.",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
      shopeeUrl: "https://shopee.co.id",
      tiktokShopUrl: "https://www.tiktok.com",
    },
    {
      id: "noir-atelier",
      name: "Noir Atelier",
      category: "Parfum",
      tagline: "Bold notes. Quiet confidence.",
      dna: "Evening-led portfolio, layered accords, limited drops.",
      image:
        "https://images.unsplash.com/photo-1595425970377-c970029bf1e6?w=800&q=80",
      shopeeUrl: "https://shopee.co.id",
      tiktokShopUrl: "https://www.tiktok.com",
    },
  ],
  coreValues: [
    {
      title: "Kreativitas terukur",
      body: "Ide berani dengan eksekusi yang bisa diukur dampaknya ke brand dan bisnis.",
    },
    {
      title: "Kolaborasi lintas tim",
      body: "Product, growth, dan creative bekerja dalam satu ritme sprint yang jelas.",
    },
    {
      title: "Integritas brand",
      body: "Setiap touchpoint konsisten dengan janji House of Identity.",
    },
    {
      title: "Growth mindset",
      body: "Belajar dari data marketplace, komunitas, dan talent internal.",
    },
  ],
  leadership: [
    {
      name: "A. Prameswari",
      role: "Group CEO",
      bio: "Memimpin strategi portofolio dan partnership skala regional.",
    },
    {
      name: "R. Kusuma",
      role: "Chief Brand Officer",
      bio: "Menjaga narasi grup dan DNA tiap label di bawah payung Dominatus.",
    },
    {
      name: "M. Aditya",
      role: "Head of Commerce",
      bio: "Mengorkestrasi saluran Shopee, TikTok Shop, dan retail terpilih.",
    },
  ],
  socialPosts: [
    {
      id: "1",
      platform: "Instagram",
      caption: "Behind the scent lab — Velora drop minggu ini.",
      image:
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
    },
    {
      id: "2",
      platform: "TikTok",
      caption: "GRWM: Lumen Lip shade baru untuk daily office.",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
    },
    {
      id: "3",
      platform: "Instagram",
      caption: "Solstice Body ritual malam — texture check.",
      image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&q=80",
    },
    {
      id: "4",
      platform: "TikTok",
      caption: "Unboxing Noir Atelier limited run.",
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    },
    {
      id: "5",
      platform: "Instagram",
      caption: "Dominatus townhall Q2 — culture snapshot.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    },
    {
      id: "6",
      platform: "TikTok",
      caption: "Founder notes: kenapa kami percaya pada lip care kategori.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
    },
  ],
  socialWall: {
    eyebrow: "Social wall",
    title: "Keseharian brand di feed",
    subtitle:
      "Mockup grid untuk Instagram & TikTok — tone fun, playful, dan bold sesuai DNA Dominatus.",
  },
  about: {
    pageEyebrow: "About Us",
    pageTitle: "Terstruktur, kreatif, dan human-centric",
    intro:
      "B2C holding company yang menaungi brand kosmetik: parfum, lip care, dan body care. Modern, inovatif, dan terstruktur.",
    philosophyTitle: "Filosofi Dominatus",
    philosophyBody:
      "Dominatus percaya bahwa beauty holding tidak harus kaku. Kami menjembatani disiplin korporat — governance, data, dan growth — dengan eksekusi kreatif yang disukai Gen-Z: cepat, jujur, dan visual-first. Setiap brand di bawah naungan kami punya identitas keras, namun berbagi standar kualitas dan etika pasar yang sama.",
    visionTitle: "Visi",
    visionBody:
      "Menjadi house of identity terdepan di Asia Tenggara untuk kategori fragrance dan personal care yang berani bereksperimen namun tetap grounded pada kebutuhan konsumen lokal.",
    missionTitle: "Misi",
    missionBullets: [
      "Membangun portofolio brand D2C yang profitable dan scalable.",
      "Menyalurkan talent kreatif dan komersial dalam satu mesin growth.",
      "Partner strategis bagi supplier, KOL, dan platform marketplace.",
    ],
    coreValuesTitle: "Core values",
    leadershipSectionTitle: "Leadership team",
    leadershipSubtitle:
      "Struktur ringkas — siap dikembangkan sesuai organisasi aktual.",
  },
  culture: {
    introEyebrow: "Culture",
    title: "Tempat ide besar bertemu ritme sprint",
    intro:
      "Kami merayakan eksperimen yang terukur: townhall transparan, ruang feedback, dan ritual creative yang tidak mengorbankan clarity bisnis.",
    cards: [
      {
        icon: "users",
        title: "Cross-functional pods",
        body: "Brand, commerce, dan creative duduk dalam satu sprint goal.",
      },
      {
        icon: "coffee",
        title: "Async-first, sync-intentional",
        body: "Dokumentasi rapi agar talent remote-friendly tetap produktif.",
      },
      {
        icon: "music",
        title: "Playful rituals",
        body: "Launch party mini, moodboard mingguan, dan spotlight konsumen.",
      },
    ],
  },
  careers: {
    eyebrow: "Karir",
    title: "Build with us",
    intro:
      "Kami mencari talent yang suka struktur, namun tidak takut warna-warni eksekusi kreatif. Kirim portfolio & CV ke email berikut.",
    email: "careers@dominatus.example",
    applyLabel: "Apply",
    cultureLinkText: "Pelajari culture kami",
    openings: [
      {
        title: "Brand Manager — Fragrance",
        type: "Full-time · Jakarta",
        desc: "Memimpin positioning dan campaign Velora & Noir Atelier.",
      },
      {
        title: "Growth Lead, Marketplace",
        type: "Full-time · Hybrid",
        desc: "Shopee & TikTok Shop: paid, organic, dan cohort analysis.",
      },
      {
        title: "Senior Product Developer",
        type: "Full-time · Jakarta",
        desc: "Formulasi lip & body care, vendor management, compliance.",
      },
    ],
  },
  insights: {
    eyebrow: "Blog & Press",
    title: "Insights & narasi publik",
    subtitle:
      "Cuplikan konten untuk halaman Inside Dominatus. Edit artikel dari panel admin.",
    articles: [
      {
        slug: "q2-townhall",
        date: "Apr 2026",
        title: "Ringkasan Townhall Q2: fokus kanal & portfolio",
        tag: "Press",
        teaser:
          "Ringkasan arah kanal marketplace dan prioritas brand untuk kuartal berikutnya.",
        body: "Placeholder konten lengkap — siap dihubungkan ke CMS. Ringkasan arah kanal marketplace dan prioritas brand untuk kuartal berikutnya.",
      },
      {
        slug: "gen-z-lip",
        date: "Mar 2026",
        title: "Consumer insight: apa yang Gen-Z cari di lip care?",
        tag: "Insights",
        teaser:
          "Analisis perilaku, preferensi shade, dan ekspektasi harga dari riset internal (mock).",
        body: "Placeholder — analisis perilaku, preferensi shade, dan ekspektasi harga dari riset internal (mock).",
      },
      {
        slug: "partner-program",
        date: "Feb 2026",
        title: "Membuka program mitra strategis untuk supplier terpilih",
        tag: "Press",
        teaser: "Kriteria partnership, SLA, dan kontak bisnis.",
        body: "Placeholder — kriteria partnership, SLA, dan kontak bisnis.",
      },
    ],
  },
  insideHub: {
    eyebrow: "Inside Dominatus",
    title: "Lebih dekat dengan mesin di balik brand",
    subtitle:
      "Culture, talent pipeline, dan komunikasi publik — satu pintu untuk calon karyawan, media, dan mitra.",
    cards: [
      {
        href: "/inside/culture",
        title: "Culture",
        desc: "Ritual kerja, nilai tim, dan cara kami berkolaborasi.",
      },
      {
        href: "/inside/careers",
        title: "Karir",
        desc: "Posisi terbuka dan jalur lamaran ke tim People.",
      },
      {
        href: "/inside/insights",
        title: "Blog & Press",
        desc: "Press release, opini leadership, dan ringkasan insight.",
      },
    ],
  },
  footer: {
    navigateHeading: "Navigate",
    connectHeading: "Connect",
    copyright:
      "© {year} Dominatus Holding Group. Untuk investor, talent, dan mitra strategis.",
    socialLinkedin: "https://linkedin.com",
    socialInstagram: "https://instagram.com",
    email: "hello@dominatus.example",
  },
  genZ: {
    showNoise: true,
    showScrollProgress: true,
    marqueeDurationSec: 32,
  },
};
