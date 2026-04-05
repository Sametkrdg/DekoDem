import React, { useEffect, useState } from "react";
import {
  Container, Typography, Box, Grid, Card, CardContent,
  Chip, Button, Breadcrumbs, Divider,
} from "@mui/material";
import { CardGridSkeleton } from "../components/Skeletons";
import EmptyState from "../components/EmptyState";
import {
  Work, Home, NavigateNext, LocationOn, Schedule,
  Send, WorkOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const VALUES = [
  { emoji: "🤝", title: "Güven", desc: "Şeffaf iletişim ve dürüstlük her ilişkimizin temelidir." },
  { emoji: "🏆", title: "Kalite", desc: "Her projede mükemmelliği hedefliyor, standartların üstüne çıkıyoruz." },
  { emoji: "🌱", title: "Gelişim", desc: "Çalışanlarımızın kariyer yolculuklarına sürekli yatırım yapıyoruz." },
  { emoji: "🔧", title: "Uzmanlık", desc: "Alanında deneyimli ekibimizle en zorlu projeleri hayata geçiriyoruz." },
];

const BENEFITS = [
  "Rekabetçi maaş ve prim sistemi",
  "Özel sağlık sigortası",
  "Proje bazlı prim ve ikramiyeler",
  "Eğitim & sertifikasyon desteği",
  "Şantiye ve ofis araç tahsisi",
  "Esnek çalışma saatleri (ofis pozisyonlarında)",
  "Yılda 2 kez performans değerlendirmesi",
];

const Career = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const q = query(collection(db, "careers"), where("status", "==", "open"));
        const snapshot = await getDocs(q);
        setPositions(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        setPositions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPositions();
  }, []);

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "80vh" }}>
      {/* ─── Hero ─────────────────────────────────────────── */}
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
            <Typography sx={{ color: "#fff", fontSize: "0.875rem" }}>Kariyer</Typography>
          </Breadcrumbs>

          <Work sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
          <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 1.5 }}>
            Kariyer
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 400, maxWidth: 600 }}>
            Büyüyen ekibimize katılın. Beraber Türkiye'nin geleceğini inşa edelim.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        {/* ─── Company Values ───────────────────────────────── */}
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 1 }}>
          Neden DEKODEM?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 640 }}>
          Çalışanlarımızı en değerli varlığımız olarak görüyor; onların gelişimi için
          yatırım yapmayı bir sorumluluk değil, öncelik olarak benimsiyoruz.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {VALUES.map((v) => (
            <Grid item xs={12} sm={6} md={3} key={v.title}>
              <Card
                elevation={0}
                sx={{ height: "100%", border: "1px solid", borderColor: "divider", borderRadius: 3, p: 1 }}
              >
                <CardContent>
                  <Typography fontSize={36} sx={{ mb: 1.5 }}>{v.emoji}</Typography>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {v.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {v.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ─── Benefits ─────────────────────────────────────── */}
        <Box sx={{ mb: 8, p: { xs: 3, md: 5 }, bgcolor: "primary.main", borderRadius: 3, color: "#fff" }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Yan Haklar & İmkânlar
          </Typography>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 3 }} />
          <Grid container spacing={1.5}>
            {BENEFITS.map((b) => (
              <Grid item xs={12} sm={6} key={b}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>✓</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>{b}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ─── Open Positions ───────────────────────────────── */}
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Açık Pozisyonlar
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {loading ? (
          <CardGridSkeleton count={4} columns={{ xs: 12, md: 6 }} />
        ) : positions.length === 0 ? (
          <EmptyState
            icon={<WorkOutline />}
            title="Şu an aktif bir ilan yok"
            description="Uygun bir pozisyon bulamasanız da özgeçmişinizi bize gönderebilirsiniz. Sizi ilerleyen süreçlerde değerlendiririz."
            action={{ label: "Özgeçmiş Gönder", href: "mailto:dekodemyapi@gmail.com" }}
          />
        ) : (
          <Grid container spacing={3}>
            {positions.map((pos) => (
              <Grid item xs={12} md={6} key={pos.id}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid", borderColor: "divider", borderRadius: 3,
                    transition: "box-shadow 0.2s, transform 0.2s",
                    "&:hover": { boxShadow: 4, transform: "translateY(-2px)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, flexWrap: "wrap", gap: 1 }}>
                      <Typography variant="h6" fontWeight={700}>{pos.title}</Typography>
                      <Chip label="Açık" color="success" size="small" />
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
                      {pos.location && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
                          <LocationOn sx={{ fontSize: 16 }} />
                          <Typography variant="caption">{pos.location}</Typography>
                        </Box>
                      )}
                      {pos.type && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
                          <Schedule sx={{ fontSize: 16 }} />
                          <Typography variant="caption">{pos.type}</Typography>
                        </Box>
                      )}
                    </Box>

                    {pos.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                        {pos.description}
                      </Typography>
                    )}

                    <Button
                      variant="outlined"
                      fullWidth
                      component="a"
                      href={`mailto:dekodemyapi@gmail.com?subject=${encodeURIComponent(pos.title)} Başvurusu`}
                      startIcon={<Send />}
                    >
                      Başvur
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ─── Spontaneous application CTA ──────────────────── */}
        {!loading && positions.length > 0 && (
          <Box sx={{ mt: 6, p: 4, border: "1px solid", borderColor: "divider", borderRadius: 3, textAlign: "center" }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Aradığınız pozisyonu bulamadınız mı?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Açık bir ilan olmasa bile özgeçmişinizi bize iletebilirsiniz.
            </Typography>
            <Button
              variant="contained"
              component="a"
              href="mailto:dekodemyapi@gmail.com"
              startIcon={<Send />}
            >
              Özgeçmiş Gönder
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Career;
