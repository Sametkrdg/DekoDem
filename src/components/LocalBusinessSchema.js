import { useEffect } from "react";
import { useSite } from "../context/SiteContext";
import { brand, about } from "../constants/siteContent";

const SCHEMA_ID   = "ld-local-business";
const PROD_ORIGIN = "https://dekodemyapi.com";

/**
 * LocalBusinessSchema
 *
 * Injects a Schema.org LocalBusiness JSON-LD <script> into <head>.
 * Re-injects whenever contactSettings or admin settings change so that
 * the JSON-LD stays in sync with the Footer and Contact page — a key
 * Local SEO ranking signal (consistent NAP across the page).
 *
 * Data priority:
 *   Phone / Email / Address / InstaUrl → Firestore Settings/main (contactSettings)
 *   Name / Logo                        → Firestore Settings/main + localStorage (settings)
 *   Description                        → Firestore About/main (aboutContent)
 */
const LocalBusinessSchema = () => {
  const { settings, contactSettings, aboutContent } = useSite();

  useEffect(() => {
    const origin      = window.location.origin || PROD_ORIGIN;
    const name        = settings?.title         || brand.name;
    const description = aboutContent?.AboutShort || about.shortSummary;
    const logoUrl     = settings?.logoUrl        || contactSettings?.LogoUrl
      ? (settings?.logoUrl || contactSettings?.LogoUrl)
      : `${origin}/assets/logo.png`;

    // NAP fields — sourced from Firestore Settings/main via contactSettings
    const phone   = contactSettings?.Phone    || "";
    const email   = contactSettings?.Email    || "";
    const address = contactSettings?.Address  || "Alikahya Merkez Mah. Sakıp Sabancı Bulv. No: 26/A, İzmit / Kocaeli";
    const insta   = contactSettings?.InstaUrl || "";

    const schema = {
      "@context": "https://schema.org",
      "@type":    "HomeAndConstructionBusiness",
      "@id":      `${origin}/#organization`,
      name,
      description,
      url:        origin,
      logo: {
        "@type": "ImageObject",
        url:     logoUrl,
      },
      image: `${origin}/og-image.jpg`,

      // ── NAP (Name / Address / Phone) — must match Footer & Contact page exactly ──
      telephone: phone,
      email:     email,
      address: {
        "@type":           "PostalAddress",
        streetAddress:     address,
        addressLocality:   "İzmit",
        addressRegion:     "Kocaeli",
        postalCode:        "41100",
        addressCountry:    "TR",
      },

      // ── Geo ─────────────────────────────────────────────────────────────
      geo: {
        "@type":    "GeoCoordinates",
        latitude:   "40.76553",
        longitude:  "29.91987",
      },

      // ── Service area ─────────────────────────────────────────────────────
      areaServed: [
        { "@type": "City",    name: "İzmit"   },
        { "@type": "City",    name: "Kocaeli" },
        { "@type": "Country", name: "Turkey"  },
      ],

      // ── Pricing ──────────────────────────────────────────────────────────
      priceRange: "₺₺₺",

      // ── Opening hours ────────────────────────────────────────────────────
      openingHoursSpecification: [
        {
          "@type":   "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          opens:     "08:00",
          closes:    "18:00",
        },
      ],

      // ── Social profiles ──────────────────────────────────────────────────
      sameAs: [insta].filter(Boolean),
    };

    // Strip undefined / empty keys before serialising
    const clean = JSON.parse(JSON.stringify(schema));

    document.getElementById(SCHEMA_ID)?.remove();
    const script       = document.createElement("script");
    script.id          = SCHEMA_ID;
    script.type        = "application/ld+json";
    script.textContent = JSON.stringify(clean);
    document.head.appendChild(script);

    return () => { document.getElementById(SCHEMA_ID)?.remove(); };
  }, [
    settings?.title,
    settings?.logoUrl,
    contactSettings?.Phone,
    contactSettings?.Email,
    contactSettings?.Address,
    contactSettings?.InstaUrl,
    contactSettings?.LogoUrl,
    aboutContent?.AboutShort,
  ]);

  return null;
};

export default LocalBusinessSchema;
