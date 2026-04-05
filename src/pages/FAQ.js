import React, { useState, useEffect } from "react";
import {
  Container, Typography, Box, Accordion, AccordionSummary,
  AccordionDetails, Button, Breadcrumbs, Divider,
} from "@mui/material";
import { ExpandMore, HelpOutline, Home, NavigateNext } from "@mui/icons-material";
import { Link } from "react-router-dom";

const FAQ_DATA = [
  {
    category: "Genel Sorular",
    items: [
      {
        q: "DEKODEM kaç yıldır sektörde faaliyet göstermektedir?",
        a: "Şirketimiz, dekorasyon ve anahtar teslim yapı sektöründe yılların deneyimiyle güvenilir bir partner olmaya devam etmektedir. Bu süreçte Algida, Yurtiçi Kargo ve Magna gibi köklü kuruluşlara 200'den fazla proje tamamladık.",
      },
      {
        q: "Hangi şehirlerde hizmet veriyorsunuz?",
        a: "Türkiye genelinde hizmet vermekteyiz. Başta Ankara, İstanbul, İzmir, Bursa ve Antalya olmak üzere tüm büyükşehirlerde aktif projelerimiz bulunmaktadır. Proje kapsamına göre yurt dışı projeler için de görüşebiliriz.",
      },
      {
        q: "Küçük ölçekli projelerde de çalışıyor musunuz?",
        a: "Evet. Büyük ticari yapılardan bireysel villa projelerine kadar her ölçekte hizmet sunuyoruz. Projenizin büyüklüğünden bağımsız olarak aynı titizlik ve kalite anlayışıyla çalışıyoruz.",
      },
    ],
  },
  {
    category: "Proje Süreci",
    items: [
      {
        q: "Projeye başlamak için hangi adımları izlemem gerekiyor?",
        a: "İlk olarak bizimle iletişime geçmeniz yeterli. Sizi dinleyerek ihtiyaçlarınızı anlıyor, ardından ücretsiz bir ön değerlendirme toplantısı düzenliyoruz. Sonrasında taslak proje planı ve maliyet tahmini sunuyor, onayınızın ardından sözleşme sürecine geçiyoruz.",
      },
      {
        q: "Proje tamamlanma süresini nelere göre belirliyorsunuz?",
        a: "Projenin büyüklüğü, kullanılacak malzemeler, arsa koşulları ve imar durumu başlıca etkenlerdir. Her projeye özel ayrıntılı bir zaman çizelgesi hazırlıyor ve olası gecikmelere karşı önlemler alıyoruz. Proje boyunca ilerleme raporları düzenli olarak paylaşılmaktadır.",
      },
      {
        q: "Proje sürecinde müşteri ne kadar müdahil olabilir?",
        a: "Süreç boyunca müşterilerimizin aktif katılımını önemsiyor ve teşvik ediyoruz. Haftalık ilerleme toplantıları, saha ziyaretleri ve dijital proje takip paneli ile her adımdan haberdar olmanızı sağlıyoruz.",
      },
      {
        q: "İzin ve ruhsat işlemlerini siz mi yürütüyorsunuz?",
        a: "Evet. Mimari proje çiziminden yapı ruhsatı ve iskan belgesine kadar tüm resmi süreçleri ekibimiz takip etmektedir. Müşterilerimizin bürokratik prosedürlerle vakit kaybetmemesi önceliklerimizden biridir.",
      },
    ],
  },
  {
    category: "Fiyatlandırma & Ödeme",
    items: [
      {
        q: "Proje teklifi ve keşif ücretsiz mi?",
        a: "İlk görüşme ve taslak ön değerlendirme ücretsizdir. Ayrıntılı mimari çizim, zemin etüdü ve kesin bütçe hesabı gerektiren kapsamlı fizibilite çalışmaları için ayrı bir hizmet bedeli uygulanabilir; bu durum önceden bildirilir.",
      },
      {
        q: "Ödeme nasıl yapılandırılıyor?",
        a: "Ödeme planı, proje büyüklüğü ve süresine göre birlikte belirlenmektedir. Genellikle sözleşme başlangıcı, inşaat aşamaları ve teslim olmak üzere belirli kilometre taşlarına bağlı taksitler şeklinde uygulanmaktadır.",
      },
      {
        q: "Maliyet aşımı durumunda ne olur?",
        a: "Sözleşmede belirlenen kapsam içindeki maliyetler sabittir. Müşteri kaynaklı kapsam değişikliği veya beklenmedik zemin koşulları gibi durumlarda ek maliyet söz konusu olabilir; bu durumlar derhal müşteriye bildirilir ve onay alınmadan iş devam etmez.",
      },
    ],
  },
  {
    category: "Kalite & Garanti",
    items: [
      {
        q: "Hangi kalite standartlarını uyguluyorsunuz?",
        a: "Tüm projelerimiz Türk Standartları (TS), Türk Deprem Yönetmeliği (TBDY 2018) ve ilgili Avrupa standartlarına (EN) uygun olarak yürütülmektedir. Malzeme tedarikçilerimiz düzenli denetimden geçirilmektedir.",
      },
      {
        q: "Tamamlanan proje için garanti veriyor musunuz?",
        a: "Tüm projelerimiz için yasal zorunluluklar kapsamında yapı güvencesi sunulmaktadır. Bunun yanı sıra işçilik hatalarına karşı 2 yıl, yapısal elemanlara karşı ise 5 yıl garanti sağlıyoruz.",
      },
      {
        q: "Alt yüklenici kullanıyor musunuz?",
        a: "Belirli uzmanlık gerektiren işlerde (elektrik, sıhhi tesisat, asansör vb.) uzun vadeli çalıştığımız, yetkin ve belgeli alt yüklenicilerle iş birliği yapıyoruz. Tüm alt yükleniciler proje yöneticilerimizin denetiminde çalışır.",
      },
    ],
  },
];

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (_, isExpanded) => setExpanded(isExpanded ? panel : false);

  // ── FAQPage JSON-LD (enables Google rich results / FAQ snippets) ──────────
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

    const script = document.createElement("script");
    script.id = "ld-faq";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("ld-faq")?.remove();
    };
  }, []);

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "80vh" }}>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1a365d 0%, #2c5282 100%)",
          color: "#fff",
          py: { xs: 8, md: 11 },
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: "rgba(255,255,255,0.5)" }} />}
            aria-label="breadcrumb"
            sx={{ mb: 3 }}
          >
            <Link to="/" style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
              <Home sx={{ mr: 0.5, fontSize: 18 }} />
              Anasayfa
            </Link>
            <Typography sx={{ color: "#fff", fontSize: "0.875rem" }}>SSS</Typography>
          </Breadcrumbs>

          <HelpOutline sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
          <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 1.5 }}>
            Sıkça Sorulan Sorular
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 400, maxWidth: 560 }}>
            Merak ettiğiniz konular için hazırladığımız yanıtlar. Aradığınızı bulamazsanız bize ulaşın.
          </Typography>
        </Container>
      </Box>

      {/* ─── Accordion ─────────────────────────────────────── */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
        {FAQ_DATA.map((section, si) => (
          <Box key={si} sx={{ mb: 5 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: "primary.main" }}>
              {section.category}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {section.items.map((item, qi) => {
              const panelId = `panel-${si}-${qi}`;
              return (
                <Accordion
                  key={qi}
                  expanded={expanded === panelId}
                  onChange={handleChange(panelId)}
                  elevation={0}
                  sx={{
                    mb: 1.5,
                    border: "1px solid",
                    borderColor: expanded === panelId ? "primary.main" : "divider",
                    borderRadius: "12px !important",
                    "&:before": { display: "none" },
                    transition: "border-color 0.2s",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={`${panelId}-content`}
                    id={`${panelId}-header`}
                    sx={{ px: 3, py: 1.5 }}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      {item.q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {item.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        ))}

        {/* CTA */}
        <Box
          sx={{
            mt: 6, p: 5, textAlign: "center",
            background: "linear-gradient(135deg, #1a365d 0%, #2c5282 100%)",
            borderRadius: 3, color: "#fff",
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Sorunuz hâlâ yanıtsız mı?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}>
            Ekibimiz sizin için burada. Hemen iletişime geçin.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/iletisim"
            sx={{ bgcolor: "#fff", color: "primary.main", fontWeight: 700, "&:hover": { bgcolor: "grey.100" } }}
          >
            Bize Ulaşın
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
