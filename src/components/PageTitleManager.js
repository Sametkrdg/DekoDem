import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME    = "DEKODEM";
const PROD_ORIGIN  = "https://dekodemyapi.com";

/**
 * Per-route SEO metadata.
 *
 * `title`       — suffix appended as "<title> — DEKODEM" in the browser tab.
 *                 null = use SITE_NAME alone (home page).
 * `description` — injected into <meta name="description">, og:description,
 *                 and twitter:description.
 * `noindex`     — true = adds "noindex,nofollow" for admin/login routes.
 */
const ROUTE_META = {
  // ── Core ──────────────────────────────────────────────────────────────────
  "/": {
    title: null,
    description:
      "DEKODEM, Kocaeli / İzmit merkezli anahtar teslim dekorasyon, çelik konstrüksiyon, iç mimarlık ve endüstriyel yapı firması. Fabrika, ofis ve ticari alanlarda A'dan Z'ye uygulama.",
  },
  "/hakkimizda": {
    title: "Hakkımızda",
    description:
      "DEKODEM hakkında: Kocaeli / İzmit'te faaliyet gösteren, dekorasyon ve anahtar teslim projelerde uzmanlaşmış uygulama firması. Referanslarımız: Algida, Yurtiçi Kargo, Magna.",
  },
  "/iletisim": {
    title: "İletişim",
    description:
      "DEKODEM ile iletişime geçin. Adres: Alikahya Merkez Mah. Sakıp Sabancı Bulv. No:26/A, İzmit / Kocaeli. Tel: +90 537 466 71 72.",
  },

  // ── Activity Fields ───────────────────────────────────────────────────────
  "/faaliyet-alanlari": {
    title: "Faaliyet Alanları",
    description:
      "DEKODEM faaliyet alanları: iç mimarlık, çelik konstrüksiyon, tavan & duvar sistemleri, mekanik tesisat, yangın sistemleri, peyzaj ve daha fazlası.",
  },

  // ── Projects ──────────────────────────────────────────────────────────────
  "/projeler": {
    title: "Projeler",
    description:
      "DEKODEM tamamlanan ve devam eden projeleri: fabrika dekorasyon, ofis tadilat, çelik konstrüksiyon ve anahtar teslim ticari yapı projeleri.",
  },

  // ── Branches ──────────────────────────────────────────────────────────────
  "/subeler": {
    title: "Şubelerimiz",
    description:
      "DEKODEM şube lokasyonları, iletişim bilgileri ve çalışma saatleri.",
  },

  // ── Blog / News ───────────────────────────────────────────────────────────
  "/haberler": {
    title: "Haberler & Blog",
    description:
      "Dekorasyon, inşaat ve çelik konstrüksiyon alanındaki sektör haberleri, proje güncellemeleri ve DEKODEM'den duyurular.",
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  "/sss": {
    title: "Sık Sorulan Sorular",
    description:
      "Anahtar teslim projeler, fiyatlandırma, süreç ve DEKODEM hizmetleri hakkında sık sorulan soruların yanıtları.",
  },

  // ── Careers ───────────────────────────────────────────────────────────────
  "/kariyer": {
    title: "Kariyer",
    description:
      "DEKODEM'de kariyer fırsatları. Açık pozisyonlar, çalışma koşulları ve başvuru bilgileri için bu sayfayı ziyaret edin.",
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  "/gizlilik-politikasi": {
    title: "Gizlilik Politikası",
    description:
      "DEKODEM gizlilik politikası ve KVKK kapsamında kişisel verilerin korunmasına ilişkin bilgilendirme.",
  },
  "/kullanim-kosullari": {
    title: "Kullanım Koşulları",
    description:
      "DEKODEM web sitesi kullanım koşulları ve yasal uyarılar.",
  },

  // ── Private (noindex) ─────────────────────────────────────────────────────
  "/admin": { title: "Yönetim Paneli", description: null, noindex: true },
  "/login":  { title: "Giriş",          description: null, noindex: true },
};

// ── DOM helpers ───────────────────────────────────────────────────────────────

/** Set content attribute on the first matching meta/link element. */
const setMeta = (selector, value) => {
  if (!value) return;
  document.querySelector(selector)?.setAttribute("content", value);
};

/** Set href on the first matching link element. */
const setLink = (selector, value) => {
  if (!value) return;
  document.querySelector(selector)?.setAttribute("href", value);
};

/** Upsert the robots meta — add it if it doesn't exist yet. */
const setRobots = (content) => {
  let el = document.querySelector('meta[name="robots"]');
  if (!el) {
    el = document.createElement("meta");
    el.name = "robots";
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * PageTitleManager
 *
 * Keeps document.title, meta description, Open Graph tags, Twitter Card tags,
 * canonical URL, and robots meta in sync with the current React Router route.
 *
 * Place once inside <Router>, alongside <ScrollToTop />.
 *
 * @param {{ siteTitle?: string, seoDescription?: string, seoOgImage?: string }} props
 *   siteTitle      — overrides the default SITE_NAME (set via admin)
 *   seoDescription — custom home-page description from admin settings
 *   seoOgImage     — absolute URL for the site-wide OG image from admin settings
 */
const PageTitleManager = ({ siteTitle, seoDescription, seoOgImage }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const name = siteTitle || SITE_NAME;

    // ── Resolve route metadata ────────────────────────────────────
    let meta;
    if (pathname === "/") {
      meta = ROUTE_META["/"];
    } else {
      const key = Object.keys(ROUTE_META)
        .filter((k) => k !== "/" && pathname.startsWith(k))
        .sort((a, b) => b.length - a.length)[0];
      meta = key ? ROUTE_META[key] : null;
    }

    const pageTitle = meta?.title ?? null;
    const isNoIndex = meta?.noindex === true;

    // ── document.title ────────────────────────────────────────────
    document.title = pageTitle ? `${pageTitle} — ${name}` : name;

    // ── robots ────────────────────────────────────────────────────
    setRobots(
      isNoIndex
        ? "noindex, nofollow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    // ── description ───────────────────────────────────────────────
    // Home: prefer admin-configured seoDescription; fall back to route default.
    const desc =
      pathname === "/" && seoDescription
        ? seoDescription
        : (meta?.description ?? null);

    setMeta('meta[name="description"]',       desc);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[name="twitter:description"]', desc);

    // ── OG / Twitter title ────────────────────────────────────────
    const fullTitle = pageTitle ? `${pageTitle} — ${name}` : name;
    setMeta('meta[property="og:title"]',      fullTitle);
    setMeta('meta[name="twitter:title"]',     fullTitle);
    setMeta('meta[property="og:site_name"]',  name);

    // ── OG URL & canonical ────────────────────────────────────────
    const canonicalUrl = `${PROD_ORIGIN}${pathname}`;
    setMeta('meta[property="og:url"]', canonicalUrl);
    setLink('link[rel="canonical"]',   canonicalUrl);

    // ── OG / Twitter image (site-wide from admin) ─────────────────
    if (seoOgImage) {
      setMeta('meta[property="og:image"]',       seoOgImage);
      setMeta('meta[property="og:image:secure_url"]', seoOgImage);
      setMeta('meta[name="twitter:image"]',      seoOgImage);
      setMeta('meta[name="twitter:image:alt"]',  `${name} — Anahtar Teslim Dekorasyon`);
    }
  }, [pathname, siteTitle, seoDescription, seoOgImage]);

  return null;
};

export default PageTitleManager;
