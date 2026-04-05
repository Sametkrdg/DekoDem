import React, { useEffect } from "react";
import { Breadcrumbs, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Home, NavigateNext } from "@mui/icons-material";

const BREADCRUMB_SCHEMA_ID = "ld-breadcrumb";

// Map path segments to human-readable Turkish labels
const SEGMENT_LABELS = {
  hakkimizda: "Hakkımızda",
  projeler: "Projeler",
  "faaliyet-alanlari": "Faaliyet Alanları",
  kategoriler: "Faaliyet Alanları",
  subeler: "Şubelerimiz",
  iletisim: "İletişim",
  haberler: "Haberler",
  sss: "SSS",
  kariyer: "Kariyer",
  "gizlilik-politikasi": "Gizlilik Politikası",
  "kullanim-kosullari": "Kullanım Koşulları",
  admin: "Yönetim Paneli",
};

/**
 * Auto-generates a breadcrumb trail from the current URL path.
 *
 * Props:
 *  - override   : Array of { label, to } to replace the auto-generated trail
 *  - light      : boolean — renders white text (for use on dark hero sections)
 *  - sx         : extra sx styles on the wrapper Box
 */
const AppBreadcrumbs = ({ override, light = false, sx = {} }) => {
  const { pathname } = useLocation();

  const crumbs = React.useMemo(() => {
    if (override) return override;

    const segments = pathname.split("/").filter(Boolean);
    return segments.map((seg, idx) => {
      const to = "/" + segments.slice(0, idx + 1).join("/");
      const label = SEGMENT_LABELS[seg] || decodeURIComponent(seg).replace(/-/g, " ");
      return { label, to };
    });
  }, [pathname, override]);

  // ── BreadcrumbList JSON-LD ──────────────────────────────────────────────
  useEffect(() => {
    const allCrumbs = [{ label: "Anasayfa", to: "/" }, ...crumbs];
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: allCrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.label,
        item: `${window.location.origin}${crumb.to}`,
      })),
    };

    document.getElementById(BREADCRUMB_SCHEMA_ID)?.remove();
    // Only inject when there's more than just Home in the trail
    if (allCrumbs.length > 1) {
      const script = document.createElement("script");
      script.id = BREADCRUMB_SCHEMA_ID;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(BREADCRUMB_SCHEMA_ID)?.remove();
    };
  }, [crumbs]);

  const textColor = light ? "rgba(255,255,255,0.7)" : "inherit";
  const activeColor = light ? "#fff" : "text.primary";
  const separatorColor = light ? "rgba(255,255,255,0.4)" : "text.disabled";

  return (
    <Box sx={sx}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" sx={{ color: separatorColor }} />}
        aria-label="breadcrumb"
      >
        {/* Home is always first */}
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", color: textColor, textDecoration: "none" }}
        >
          <Home sx={{ mr: 0.5, fontSize: 18 }} />
          <Typography variant="body2" component="span">Anasayfa</Typography>
        </Link>

        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return isLast ? (
            <Typography key={crumb.to} variant="body2" sx={{ color: activeColor, fontWeight: 500 }}>
              {crumb.label}
            </Typography>
          ) : (
            <Link
              key={crumb.to}
              to={crumb.to}
              style={{ color: textColor, textDecoration: "none" }}
            >
              <Typography variant="body2" component="span">{crumb.label}</Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default AppBreadcrumbs;
