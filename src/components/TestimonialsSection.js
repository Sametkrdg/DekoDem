import React, { useEffect, useRef, useState } from "react";
import {
  Box, Container, Typography, Avatar,
  IconButton, Skeleton,
} from "@mui/material";
import { ChevronLeft, ChevronRight, FormatQuote } from "@mui/icons-material";
import { getTestimonials } from "../services/firestore";

// ─── Static fallback data shown until Firestore is populated ─────────────────
const FALLBACK = [
  {
    id: "f1",
    clientName: "Ahmet Yılmaz",
    Company: "Yılmaz Holding",
    Comment: "DEKODEM ile çalışmak gerçek bir profesyonellik deneyimiydi. Zamanında teslim, şeffaf iletişim ve mükemmel işçilik. Kesinlikle tekrar tercih edeceğiz.",
  },
  {
    id: "f2",
    clientName: "Fatma Kaya",
    Company: "Kaya Gayrimenkul",
    Comment: "Rezidans projemizde en küçük detaya gösterdikleri özen bizi çok etkiledi. Proje sonunda beklentilerimizin çok üzerinde bir sonuç aldık.",
  },
  {
    id: "f3",
    clientName: "Mehmet Demir",
    Company: "Birlik İnşaat",
    Comment: "Endüstriyel kompleks projemizde iş ortağımız olan DEKODEM, zorlu süreçleri başarıyla yönetti. Güvenilir ve deneyimli bir ekip.",
  },
  {
    id: "f4",
    clientName: "Ayşe Çelik",
    Company: "Çelik Mimarlık",
    Comment: "Tasarım fikirlerimizi inşaata dönüştürürken gösterdikleri hassasiyet takdire değer. Mimari bütünlüğe verdikleri önem bizi çok memnun etti.",
  },
];

const TestimonialCard = ({ item }) => (
  <Box
    sx={{
      bgcolor: "background.paper",
      borderRadius: 3,
      p: { xs: 3, md: 5 },
      height: "100%",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      border: "1px solid",
      borderColor: "divider",
      position: "relative",
    }}
  >
    {/* Quote icon */}
    <FormatQuote
      sx={{
        position: "absolute",
        top: 20,
        right: 24,
        fontSize: 48,
        color: "primary.main",
        opacity: 0.12,
        transform: "rotate(180deg)",
      }}
    />

    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ lineHeight: 1.85, flex: 1, mb: 3, fontStyle: "italic" }}
    >
      "{item.Comment}"
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar
        alt={item.clientName}
        sx={{ bgcolor: "primary.main", width: 48, height: 48, fontWeight: 700 }}
      >
        {item.clientName?.slice(0, 2).toUpperCase()}
      </Avatar>
      <Box>
        <Typography variant="subtitle2" fontWeight={700}>
          {item.clientName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {item.Company || ""}
        </Typography>
      </Box>
    </Box>
  </Box>
);

const VISIBLE = 3; // cards visible at once on desktop

const TestimonialsSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    getTestimonials()
      .then((data) => setItems(data.length ? data : FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  // Auto-advance every 6 s
  useEffect(() => {
    if (!items.length) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [items]);

  const prev = () => {
    clearInterval(timerRef.current);
    setIndex((i) => (i - 1 + items.length) % items.length);
  };
  const next = () => {
    clearInterval(timerRef.current);
    setIndex((i) => (i + 1) % items.length);
  };

  // Slice visible cards (circular)
  const visibleItems = items.length
    ? Array.from({ length: Math.min(VISIBLE, items.length) }, (_, k) => items[(index + k) % items.length])
    : [];

  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: "#f8fafc" }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2 }}
          >
            MÜŞTERİ GÖRÜŞLERİ
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
            Müşterilerimiz Ne Diyor?
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520, mx: "auto" }}>
            Tamamladığımız projelerden memnun kalan müşterilerimizin deneyimleri.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", gap: 3 }}>
            {[1, 2, 3].map((k) => (
              <Box key={k} sx={{ flex: 1 }}>
                <Skeleton variant="rounded" height={260} sx={{ borderRadius: 3 }} />
              </Box>
            ))}
          </Box>
        ) : (
          <>
            {/* Cards */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
                mb: 4,
              }}
            >
              {visibleItems.map((item) => (
                <TestimonialCard key={item.id} item={item} />
              ))}
            </Box>

            {/* Navigation */}
            {items.length > VISIBLE && (
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, alignItems: "center" }}>
                <IconButton
                  onClick={prev}
                  aria-label="Önceki"
                  sx={{ border: "1px solid", borderColor: "divider" }}
                >
                  <ChevronLeft />
                </IconButton>

                {items.map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => setIndex(i)}
                    sx={{
                      width: i === index ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: i === index ? "primary.main" : "divider",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                  />
                ))}

                <IconButton
                  onClick={next}
                  aria-label="Sonraki"
                  sx={{ border: "1px solid", borderColor: "divider" }}
                >
                  <ChevronRight />
                </IconButton>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
