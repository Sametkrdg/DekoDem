import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import {
  Article,
  Business,
  Group,
  Handshake,
  Work,
  QuestionAnswer,
  OpenInNew,
  Refresh,
} from "@mui/icons-material";
import { getDashboardStats } from "../adminFirestore";

const STAT_CONFIG = [
  { key: "projects",     label: "Projeler",       icon: Business,      color: "#d35400" },
  { key: "posts",        label: "Blog Yazıları",   icon: Article,       color: "#2980b9" },
  { key: "branches",     label: "Şubeler",         icon: Business,      color: "#16a085" },
  { key: "testimonials", label: "Referanslar",      icon: Group,         color: "#8e44ad" },
  { key: "partners",     label: "İş Ortakları",    icon: Handshake,     color: "#27ae60" },
  { key: "careers",      label: "İş İlanları",     icon: Work,          color: "#c0392b" },
  { key: "faq",          label: "SSS Soruları",    icon: QuestionAnswer, color: "#f39c12" },
];

const StatCard = ({ label, count, icon: Icon, color, loading }) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 28px rgba(0,0,0,0.12)" },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {label}
          </Typography>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Typography variant="h3" fontWeight={800} sx={{ color }}>
              {count ?? "—"}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "14px",
            bgcolor: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon sx={{ color, fontSize: 28 }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPanel = ({ settings }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error("Dashboard stats yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Box>
      {/* Welcome */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Hoş geldiniz
          </Typography>
          <Typography color="text.secondary">
            {settings?.title || "DEKODEM"} yönetim paneline genel bakış
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadStats}
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            Yenile
          </Button>
          <Button
            variant="contained"
            startIcon={<OpenInNew />}
            onClick={() => window.open("/", "_blank")}
            sx={{ borderRadius: 2 }}
          >
            Siteyi Görüntüle
          </Button>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={2.5}>
        {STAT_CONFIG.map(({ key, label, icon, color }) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <StatCard
              label={label}
              count={stats[key]}
              icon={icon}
              color={color}
              loading={loading}
            />
          </Grid>
        ))}
      </Grid>

      {/* Quick actions */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Hızlı İşlemler
        </Typography>
        <Grid container spacing={2}>
          {[
            { label: "Yeni Blog Yazısı Ekle",  tab: 4 },
            { label: "Yeni Proje Ekle",         tab: 3 },
            { label: "Yeni Şube Ekle",          tab: 5 },
            { label: "Yeni İş İlanı Ekle",      tab: 8 },
          ].map(({ label }) => (
            <Grid item xs={12} sm={6} md={3} key={label}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ borderRadius: 2, py: 1.5 }}
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPanel;
