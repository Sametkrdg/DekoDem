import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Collapse, IconButton, Divider } from "@mui/material";
import { Cookie, Close, ExpandMore, ExpandLess } from "@mui/icons-material";
import { Link } from "react-router-dom";

const CONSENT_KEY = "sdyapi_cookie_consent";
const CONSENT_VERSION = "1";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Slight delay so the page loads visually first
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (type) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ type, version: CONSENT_VERSION, date: new Date().toISOString() }));
    setVisible(false);
  };

  const handleAcceptAll = () => saveConsent("all");
  const handleAcceptNecessary = () => saveConsent("necessary");

  return (
    <Collapse in={visible} timeout={400}>
      <Box
        role="dialog"
        aria-modal="false"
        aria-label="Çerez bildirimi"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          bgcolor: "background.paper",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.15)",
          borderTop: "3px solid",
          borderColor: "primary.main",
        }}
      >
        <Box
          sx={{
            maxWidth: "lg",
            mx: "auto",
            px: { xs: 2, sm: 4 },
            py: { xs: 2, sm: 3 },
          }}
        >
          {/* Header row */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <Cookie sx={{ color: "primary.main", fontSize: 28, mt: 0.25, flexShrink: 0 }} />

            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                Bu site çerez kullanmaktadır
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Web sitemizin düzgün çalışması için zorunlu çerezler kullanılmaktadır. Ayrıca site
                deneyimini iyileştirmek amacıyla analitik çerezler kullanmak istiyoruz. Tercihlerinizi
                aşağıdan yönetebilirsiniz.{" "}
                <Typography
                  component={Link}
                  to="/gizlilik-politikasi"
                  variant="body2"
                  sx={{ color: "primary.main", textDecoration: "underline" }}
                >
                  Gizlilik Politikası
                </Typography>
              </Typography>

              {/* Expandable details */}
              <Box sx={{ mt: 1 }}>
                <Button
                  size="small"
                  onClick={() => setExpanded((p) => !p)}
                  endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                  sx={{ textTransform: "none", color: "text.secondary", pl: 0 }}
                >
                  {expanded ? "Daha az göster" : "Çerez türleri hakkında bilgi al"}
                </Button>

                <Collapse in={expanded}>
                  <Divider sx={{ my: 1.5 }} />
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                    {[
                      {
                        title: "Zorunlu Çerezler",
                        desc: "Sitenin temel işlevleri için gereklidir. Devre dışı bırakılamaz.",
                        always: true,
                      },
                      {
                        title: "Analitik Çerezler",
                        desc: "Siteyi nasıl kullandığınızı anlamamıza yardımcı olur (Google Analytics).",
                        always: false,
                      },
                      {
                        title: "Tercih Çerezleri",
                        desc: "Onay durumunuz gibi tercihlerinizi hatırlar.",
                        always: false,
                      },
                    ].map((c) => (
                      <Box key={c.title} sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, display: "block", mb: 0.5 }}>
                          {c.title}{" "}
                          {c.always && (
                            <Typography component="span" variant="caption" color="success.main">
                              (Her zaman aktif)
                            </Typography>
                          )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {c.desc}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            </Box>

            <IconButton
              size="small"
              onClick={handleAcceptNecessary}
              aria-label="Kapat - yalnızca zorunlu çerezleri kabul et"
              sx={{ flexShrink: 0, color: "text.secondary" }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>

          {/* Action buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mt: 2,
              ml: { sm: "44px" },
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={handleAcceptAll}
              sx={{ fontWeight: 600, minWidth: 160 }}
            >
              Tümünü Kabul Et
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAcceptNecessary}
              sx={{ fontWeight: 600, minWidth: 160 }}
            >
              Yalnızca Zorunluları Kabul Et
            </Button>
          </Box>
        </Box>
      </Box>
    </Collapse>
  );
};

export default CookieConsent;
