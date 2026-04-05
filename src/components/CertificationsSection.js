import React from "react";
import { Box, Container, Typography, Grid, Paper, Chip } from "@mui/material";
import {
  Verified, EmojiEvents, WorkspacePremium, Shield,
  Groups, Engineering,
} from "@mui/icons-material";

const CERTS = [
  {
    icon: <Verified sx={{ fontSize: 36 }} />,
    title: "ISO 9001:2015",
    subtitle: "Kalite Yönetim Sistemi",
    desc: "Uluslararası kalite standartları kapsamında belgelenmiş süreç yönetimi.",
    color: "#1a365d",
    tag: "Sertifika",
  },
  {
    icon: <Shield sx={{ fontSize: 36 }} />,
    title: "ISO 14001:2015",
    subtitle: "Çevre Yönetim Sistemi",
    desc: "Çevre dostu inşaat süreçleri ve sürdürülebilirlik standartlarına tam uyum.",
    color: "#276749",
    tag: "Sertifika",
  },
  {
    icon: <WorkspacePremium sx={{ fontSize: 36 }} />,
    title: "ISO 45001:2018",
    subtitle: "İş Sağlığı ve Güvenliği",
    desc: "Şantiye ve ofis ortamlarında uluslararası iş güvenliği standartları.",
    color: "#c05621",
    tag: "Sertifika",
  },
  {
    icon: <EmojiEvents sx={{ fontSize: 36 }} />,
    title: "En İyi İnşaat Firması",
    subtitle: "Ankara İnşaat Ödülleri 2023",
    desc: "Yılın en başarılı inşaat firması kategorisinde sektörün prestijli ödülü.",
    color: "#b7791f",
    tag: "Ödül",
  },
  {
    icon: <Engineering sx={{ fontSize: 36 }} />,
    title: "İMSAD Üyesi",
    subtitle: "Türkiye İnşaat Malzemesi Sanayicileri Derneği",
    desc: "Sektörün önde gelen meslek kuruluşunda aktif üyelik ve temsil.",
    color: "#2c5282",
    tag: "Üyelik",
  },
  {
    icon: <Groups sx={{ fontSize: 36 }} />,
    title: "Yeşil Bina Sertifikası",
    subtitle: "ÇEDBİK — Çevre Dostu Yapılar",
    desc: "Sürdürülebilir ve enerji verimli yapılar için ulusal yeşil bina belgesi.",
    color: "#276749",
    tag: "Sertifika",
  },
];

const TAG_COLORS = {
  "Sertifika": "primary",
  "Ödül": "warning",
  "Üyelik": "info",
};

const CertificationsSection = () => (
  <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="overline"
          sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2 }}
        >
          KALİTE & GÜVEN
        </Typography>
        <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
          Sertifikalar & Ödüller
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 520, mx: "auto" }}>
          15 yılı aşkın deneyimimiz boyunca kazandığımız uluslararası sertifikalar,
          sektör ödülleri ve meslek kuruluşu üyelikleri.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {CERTS.map((cert, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper
              elevation={0}
              sx={{
                p: 3.5,
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                transition: "all 0.25s",
                "&:hover": {
                  borderColor: cert.color,
                  boxShadow: `0 8px 32px ${cert.color}20`,
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ color: cert.color, p: 1.25, bgcolor: `${cert.color}14`, borderRadius: 2 }}>
                  {cert.icon}
                </Box>
                <Chip
                  label={cert.tag}
                  size="small"
                  color={TAG_COLORS[cert.tag] || "default"}
                  variant="outlined"
                />
              </Box>

              <Typography variant="h6" fontWeight={700} gutterBottom>
                {cert.title}
              </Typography>
              <Typography variant="caption" color="primary.main" fontWeight={600} display="block" sx={{ mb: 1 }}>
                {cert.subtitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {cert.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default CertificationsSection;
