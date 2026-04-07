/**
 * FAQ.js — Sıkça Sorulan Sorular
 *
 * Static FAQ optimized for construction / decoration sector.
 * Categories cover the exact buyer-journey questions that prospects
 * ask before signing a contract:
 *
 *   1. Proje Süreleri     — timelines & scheduling
 *   2. Fiyatlandırma      — budgeting & cost drivers
 *   3. İzin ve Ruhsat     — permits & legal documentation
 *   4. Çalışma Süreci     — step-by-step workflow
 *   5. Garanti & Destek   — warranty & after-sales
 *   6. Referanslar        — credibility & portfolio
 *
 * JSON-LD FAQPage schema is injected for Google rich results.
 * Accordion layout is fully accessible (keyboard nav, ARIA).
 */

import React, { useState, useEffect } from "react";
import {
  Container, Typography, Box, Accordion, AccordionSummary,
  AccordionDetails, Button, Breadcrumbs, Divider, Chip,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
  ExpandMore, HelpOutline, Home, NavigateNext,
  Schedule, AttachMoney, Gavel, AccountTree,
  VerifiedUser, Business, ArrowForward,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { PATHS } from "../constants/navigation";
import { contact } from "../constants/siteContent";

// ── FAQ data ──────────────────────────────────────────────────────────────────
// Each category has an icon, a color accent, and 3–4 precise Q&A pairs.
// Answers are drawn from DEKODEM's actual working methods.

const FAQ_DATA = [
  {
    category: "Proje Süreleri",
    icon: <Schedule />,
    accent: "#1a365d",
    items: [
      {
        q: "Tipik bir tadilat veya yapı projesi ne kadar sürer?",
        a: "Süre doğrudan projenin kapsamına ve büyüklüğüne bağlıdır. Ofis boya-badana veya alçıpan bölme gibi tek disiplinli işler genellikle 1–2 haftada tamamlanır. Orta ölçekli bir ofis tadilat projesi (duvar, tavan, boya, kapı) 3–6 hafta, komple fabrika veya depo dekorasyonu ise 2–4 ay alabilir. Her proje için keşif aşamasında ayrıntılı zaman çizelgesi hazırlanır ve sözleşmede teslim tarihi taahhüt edilir.",
      },
      {
        q: "Projede gecikme yaşanırsa ne olur?",
        a: "DEKODEM, belirlenen teslim tarihine uyumu temel çalışma prensibi olarak benimser. Müşteriden kaynaklanan kapsam değişiklikleri veya tedarik dışı durumlar (doğal afet, uzun süreli şantiye erişim engeli) haricinde sözleşme takvimi geçerlidir. Olası bir gecikme ihtimalinde müşteri önceden yazılı olarak bilgilendirilir; revize plan derhal paylaşılır.",
      },
      {
        q: "Proje süresince iş yerimizde faaliyetlerimize devam edebilir miyiz?",
        a: "Evet. Özellikle ofis ve fabrika projelerinde aşamalı (fazlı) uygulama planı hazırlarız: aktif üretim veya çalışma alanları korunurken tamamlanan bölümlere geçilir. Gerektiğinde mesai saati dışında veya hafta sonu çalışma düzeni uygulanır. Bu plan keşif görüşmesinde müşteri operasyonlarına göre özelleştirilir.",
      },
    ],
  },
  {
    category: "Fiyatlandırma & Bütçe",
    icon: <AttachMoney />,
    accent: "#276749",
    items: [
      {
        q: "Proje maliyeti nasıl hesaplanıyor, fiyatı etkileyen faktörler neler?",
        a: "Fiyatlandırma dört ana bileşeni kapsar: (1) Malzeme — kullanılacak ürün sınıfı ve marka; (2) İşçilik — kapsam, alan büyüklüğü ve uzmanlık gereksinimi; (3) Ekipman — vinç, iskele, özel alet gereksinimleri; (4) Proje yönetimi — mühendislik, çizim ve koordinasyon. Ek olarak erişim güçlükleri, çalışma saati kısıtlamaları ve kısa teslim süreleri maliyeti etkileyebilir. Keşif sonrasında kalem kalem şeffaf bir teklif sunulur.",
      },
      {
        q: "Keşif ve ilk teklif ücretsiz mi?",
        a: "Evet — yerinde keşif, ihtiyaç analizi ve taslak teklife kadarki süreç tamamen ücretsizdir. Kapsamlı zemin etüdü, 3D mimari görselleştirme veya detaylı fizibilite raporu gibi özel mühendislik çalışmaları için ayrı bir hizmet bedeli söz konusu olabilir; bu durum her zaman önceden yazılı olarak bildirilir.",
      },
      {
        q: "Sözleşme sonrası maliyet artışı yaşanır mı?",
        a: "Sözleşmede tanımlanan kapsam için fiyat sabittir. Müşteri kaynaklı kapsam genişlemesi (ek alan, farklı malzeme seçimi) veya keşifte tespit edilemeyen altyapı sorunları gibi durumlarda ek iş kalemi olarak ayrı fiyatlandırılır ve müşteri onayı alınmadan iş yapılmaz. DEKODEM, sürpriz faturaya karşı şeffaf iletişim politikasını benimsemektedir.",
      },
      {
        q: "Ödeme planı nasıl yapılandırılıyor?",
        a: "Ödeme genellikle proje kilometre taşlarına bağlı taksitler şeklinde düzenlenir: sözleşme başlangıcında %30, uygulama ortasında %40, ve teslimatta %30 olarak önerilen yapı en yaygın kullanılandır. Proje büyüklüğüne ve süresine göre müşteri ile anlaşmaya dayalı farklı ödeme planları da oluşturulabilir.",
      },
    ],
  },
  {
    category: "İzin, Ruhsat ve Yasal Süreçler",
    icon: <Gavel />,
    accent: "#c05621",
    items: [
      {
        q: "Yapı ruhsatı ve resmi izin süreçlerini siz mi yürütüyorsunuz?",
        a: "Evet. Mimari proje çiziminden yapı ruhsatı başvurusuna, kat irtifakı kurulumundan iskan belgesine kadar tüm resmi süreçler DEKODEM bünyesindeki mühendislik ekibi ve uzman iş ortakları aracılığıyla takip edilir. Müşterilerimizin bürokratik prosedürlerle vakit kaybetmemesi temel önceliğimizdir.",
      },
      {
        q: "Yangın yönetmeliğine ve iş güvenliği standartlarına uygunluk sağlanıyor mu?",
        a: "Tüm projelerimiz Türk Standartları (TS), Türk Deprem Yönetmeliği (TBDY 2018) ve ilgili yangın yönetmelikleri kapsamında yürütülür. Yangın kapısı, sprinkler, acil çıkış ve duman tahliye sistemleri standart olarak TS EN normlarına uygun tasarlanır ve kurulur. Fabrika ve büyük ticari yapılar için iş sağlığı ve güvenliği (İSG) planı ayrıca hazırlanır.",
      },
      {
        q: "Kiracı olarak kullandığım bir alanı tadil etmek için kiralayanın onayı gerekiyor mu? Bu konuda destek veriyor musunuz?",
        a: "Evet, kural olarak mülk sahibinin yazılı onayı gereklidir. DEKODEM, gerekli teknik dokümanları ve çizimleri hazırlayarak kiralayan ile kiracı arasındaki onay sürecini kolaylaştırmaya destek olur. Tadilat kapsamı ve geri dönüşüm koşulları sözleşmede açıkça belirtilir.",
      },
    ],
  },
  {
    category: "Çalışma Süreci",
    icon: <AccountTree />,
    accent: "#553c9a",
    items: [
      {
        q: "Projemizin başından sonuna kadar adım adım süreç nasıl işliyor?",
        a: "DEKODEM 5 aşamalı metodoloji uygular:\n\n1. Keşif ve İhtiyaç Analizi — Uzman ekibimiz sahaya gelerek mekanı inceler, mevcut altyapıyı değerlendirir ve ihtiyaçlarınızı dinler. Bu aşama tamamen ücretsizdir.\n\n2. Projelendirme ve Tasarım — Talebe göre 2D/3D çizimler, malzeme seçim raporu ve teknik şartname hazırlanır.\n\n3. Fiyatlandırma ve Sözleşme — Kalem kalem şeffaf teklif sunulur; onay alındıktan sonra teslim tarihi ve ödeme takvimini içeren sözleşme imzalanır.\n\n4. Uygulama Süreci — Alanında uzman ekipler sahaya girer; haftalık ilerleme raporları WhatsApp veya e-posta ile paylaşılır.\n\n5. Teslim ve Kontrol — Proje bitiminde müşteri ile birlikte kontrol turu yapılır; varsa eksikler sözleşme garantisi kapsamında giderilir.",
      },
      {
        q: "Proje süresince ekibinizle nasıl iletişim kuracağım?",
        a: "Her projeye atanan bir proje sorumlusu, süreç boyunca tek iletişim noktanız olur. Haftalık ilerleme güncellemeleri fotoğraf ve kısa raporlarla paylaşılır. Acil durumlarda direkt olarak +90 537 466 71 72 numarasından ulaşabilirsiniz. Talep üzerine şantiye ziyaretleri düzenlenir.",
      },
    ],
  },
  {
    category: "Garanti ve Satış Sonrası Destek",
    icon: <VerifiedUser />,
    accent: "#2c7a7b",
    items: [
      {
        q: "Tamamlanan proje için garanti veriyor musunuz?",
        a: "Evet. DEKODEM'in standart garanti kapsamı şöyledir:\n\n• İşçilik garantisi: Teslim tarihinden itibaren 2 yıl. Bu süre içinde ortaya çıkan işçilik kaynaklı hatalar ücretsiz giderilir.\n\n• Yapısal elemanlar (çelik konstrüksiyon, beton, taşıyıcı sistemler): 5 yıl.\n\n• Tedarik edilen malzeme ve ekipmanlar: Üretici garantisi geçerlidir (genellikle 2–5 yıl).\n\nGaranti belgesi teslim tutanağıyla birlikte imzalı olarak müşteriye verilir.",
      },
      {
        q: "Teslimat sonrası bakım veya onarım hizmeti sunuyor musunuz?",
        a: "Evet. Garanti dönemi içindeki bakım ve onarımlar ücretsiz olarak gerçekleştirilir. Garanti sonrasında ücretli periyodik bakım anlaşmaları yapılabilir. Özellikle mekanik tesisat (yangın, klima), epoksi zemin ve çelik konstrüksiyon sistemleri için yıllık bakım paketi önerilmektedir. Eski müşterilerimiz öncelikli servis hakkından yararlanır.",
      },
      {
        q: "Herhangi bir mesleki sorumluluk sigortanız var mı?",
        a: "DEKODEM tüm aktif projelerinde zorunlu işçilik sigortası ve şantiye sorumluluk sigortası kapsamında çalışır. Büyük ölçekli projelerde proje özelinde ek sigorta poliçesi düzenlenebilir. Sigorta belgesi talep halinde müşteriye ibraz edilir.",
      },
    ],
  },
  {
    category: "Referanslar ve Portföy",
    icon: <Business />,
    accent: "#702459",
    items: [
      {
        q: "Daha önce hangi kurumsal markalara hizmet verdiniz?",
        a: "DEKODEM; Algida (anahtar teslim proje uygulamaları), Yurtiçi Kargo (alçıpan tavan/bölme sistemleri ve tadilat), Magna (epoksi zemin kaplama, boya ve tadilat), Hyundai (boya ve tadilat), Sadık Enerji (anahtar teslim proje uygulamaları), fikiraktif ve Yağızlar Yapı Market gibi önde gelen markaların projelerini başarıyla tamamlamıştır. Toplam 200'den fazla kurumsal proje deneyimimiz mevcuttur.",
      },
      {
        q: "Çalışma bölgeniz neler? Kocaeli dışında proje alıyor musunuz?",
        a: "Merkezimiz Kocaeli / İzmit'te (Alikahya Merkez Mah.) olup Marmara Bölgesi'nin tamamında aktif projelerimiz bulunmaktadır. Büyük ölçekli ve kurumsal projeler için Türkiye geneline hizmet verebilmekteyiz. Proje büyüklüğü ve kapsamına bağlı olarak farklı şehirler için özel koşullar değerlendirilebilir. Bizi arayarak projenizi paylaşabilirsiniz.",
      },
    ],
  },
];

// ── Category chip colors ──────────────────────────────────────────────────────

const CategoryIcon = ({ icon, accent }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box
      aria-hidden="true"
      sx={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        width:  40,
        height: 40,
        borderRadius:   "10px",
        bgcolor:        isDark ? alpha(accent, 0.25) : alpha(accent, 0.1),
        color:          accent,
        flexShrink:     0,
        "& svg":        { fontSize: 22 },
      }}
    >
      {icon}
    </Box>
  );
};

// ── Page component ────────────────────────────────────────────────────────────

const FAQ = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (_, isExpanded) => setExpanded(isExpanded ? panel : false);

  // ── FAQPage JSON-LD (Google rich results / FAQ snippets) ──────────────────
  useEffect(() => {
    const allItems = FAQ_DATA.flatMap((cat) => cat.items);
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allItems.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    };

    document.getElementById("ld-faq")?.remove();
    const script       = document.createElement("script");
    script.id          = "ld-faq";
    script.type        = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => { document.getElementById("ld-faq")?.remove(); };
  }, []);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "80vh" }}>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="SSS başlığı"
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)"
            : "linear-gradient(135deg, #1a365d 0%, #2c5282 100%)",
          color: "#fff",
          py: { xs: 9, md: 12 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 55% 55% at 90% 50%, ${alpha(theme.palette.primary.main, 0.22)}, transparent)`,
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: "rgba(255,255,255,0.5)" }} />}
            aria-label="Sayfa konumu"
            sx={{ mb: 3 }}
          >
            <Box
              component={Link}
              to={PATHS.HOME}
              sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#fff" } }}
            >
              <Home sx={{ fontSize: 17 }} />
              Anasayfa
            </Box>
            <Typography sx={{ color: "#fff", fontSize: "0.875rem" }}>SSS</Typography>
          </Breadcrumbs>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box
              aria-hidden="true"
              sx={{
                width: 64, height: 64, borderRadius: "16px",
                bgcolor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <HelpOutline sx={{ fontSize: 36 }} />
            </Box>
            <Box>
              <Typography variant="overline" sx={{ color: alpha("#fff", 0.6), letterSpacing: 3 }}>
                Yardım Merkezi
              </Typography>
              <Typography variant="h2" component="h1" fontWeight={800} sx={{ lineHeight: 1.1, fontSize: { xs: "1.8rem", md: "2.6rem" } }}>
                Sıkça Sorulan Sorular
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h6"
            sx={{ color: alpha("#fff", 0.72), fontWeight: 400, maxWidth: 560, lineHeight: 1.7, mb: 3 }}
          >
            Anahtar teslim projeler, süreç, fiyatlandırma ve garanti hakkında
            en çok merak edilen soruların yanıtları.
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {FAQ_DATA.map((cat) => (
              <Chip
                key={cat.category}
                label={cat.category}
                size="small"
                sx={{ bgcolor: alpha("#fff", 0.12), color: "#fff", fontWeight: 600, border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.75rem" }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Accordion sections ─────────────────────────────────────────────── */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
        {FAQ_DATA.map((section, si) => (
          <Box
            key={si}
            component="section"
            aria-label={section.category}
            sx={{ mb: 6 }}
          >
            {/* Category header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <CategoryIcon icon={section.icon} accent={section.accent} />
              <Typography variant="h5" fontWeight={700} sx={{ color: section.accent }}>
                {section.category}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, borderColor: alpha(section.accent, isDark ? 0.25 : 0.2) }} />

            {section.items.map((item, qi) => {
              const panelId = `panel-${si}-${qi}`;
              return (
                <Accordion
                  key={qi}
                  expanded={expanded === panelId}
                  onChange={handleChange(panelId)}
                  elevation={0}
                  disableGutters
                  sx={{
                    mb: 1.5,
                    border: "1px solid",
                    borderColor: expanded === panelId
                      ? alpha(section.accent, 0.5)
                      : "divider",
                    borderRadius: "14px !important",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                    "&:before": { display: "none" },
                    bgcolor: expanded === panelId
                      ? (isDark ? alpha(section.accent, 0.06) : alpha(section.accent, 0.02))
                      : "background.paper",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMore
                        sx={{
                          color: expanded === panelId ? section.accent : "text.secondary",
                          transition: "color 0.2s",
                        }}
                      />
                    }
                    aria-controls={`${panelId}-content`}
                    id={`${panelId}-header`}
                    sx={{ px: { xs: 2.5, md: 3 }, py: 1.75 }}
                  >
                    <Typography variant="body1" fontWeight={600} sx={{ pr: 1, lineHeight: 1.5 }}>
                      {item.q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: { xs: 2.5, md: 3 }, pb: 3, pt: 0 }}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      component="div"
                      sx={{ lineHeight: 1.85, whiteSpace: "pre-line" }}
                    >
                      {item.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        ))}

        {/* ── CTA block ──────────────────────────────────────────────────── */}
        <Box
          component="section"
          aria-label="İletişime geç"
          sx={{
            mt: 4,
            p: { xs: "36px 24px", md: "52px 48px" },
            textAlign: "center",
            background: isDark
              ? "linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)"
              : "linear-gradient(135deg, #1a365d 0%, #2c5282 100%)",
            borderRadius: 3,
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 50% 70% at 50% 100%, ${alpha(theme.palette.primary.main, 0.25)}, transparent)`,
            },
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Typography variant="overline" sx={{ color: alpha("#fff", 0.6), letterSpacing: 3, display: "block", mb: 1 }}>
              Hâlâ sorunuz mu var?
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1.5 }}>
              Ekibimizle Konuşun
            </Typography>
            <Typography sx={{ color: alpha("#fff", 0.7), mb: 4, maxWidth: 440, mx: "auto", lineHeight: 1.7 }}>
              Aradığınızı bulamadıysanız uzman ekibimiz size özel yanıt vermekten
              memnuniyet duyar. Ücretsiz keşif için bizi arayın.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to={PATHS.CONTACT}
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: "#fff", color: "primary.main", fontWeight: 700,
                  borderRadius: "50px", px: 4,
                  "&:hover": { bgcolor: "grey.100", transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" },
                  transition: "all 0.2s",
                }}
              >
                Bize Ulaşın
              </Button>
              <Button
                variant="outlined"
                size="large"
                component="a"
                href={`tel:${contact.phone1.replace(/\s/g, "")}`}
                sx={{
                  borderColor: "rgba(255,255,255,0.4)", color: "#fff", fontWeight: 700,
                  borderRadius: "50px", px: 4,
                  "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
                }}
              >
                {contact.phone1}
              </Button>
            </Box>

            <Typography variant="caption" sx={{ color: alpha("#fff", 0.45), display: "block", mt: 3 }}>
              Pazartesi – Cumartesi: 08:00 – 18:00
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
