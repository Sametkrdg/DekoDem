import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  Settings,
  VideoLibrary,
  Business,
  Article,
  LocationOn,
  QuestionAnswer,
  Work,
  FormatQuote,
  Handshake,
  ExitToApp,
  Bolt,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";

// ── Panel imports ───────────────────────────────────────────────────────────
import DashboardPanel        from "./admin/panels/DashboardPanel";
import GeneralSettingsPanel  from "./admin/panels/GeneralSettingsPanel";
import ContentPanel          from "./admin/panels/ContentPanel";
import ActivitiesPanel       from "./admin/panels/ActivitiesPanel";
import ProjectsPanel         from "./admin/panels/ProjectsPanel";
import BlogPanel             from "./admin/panels/BlogPanel";
import BranchesPanel         from "./admin/panels/BranchesPanel";
import FaqPanel              from "./admin/panels/FaqPanel";
import CareerPanel           from "./admin/panels/CareerPanel";
import TestimonialsPanel     from "./admin/panels/TestimonialsPanel";
import PartnersPanel         from "./admin/panels/PartnersPanel";

// ── Styled shell ────────────────────────────────────────────────────────────
const AdminShell = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: theme.palette.mode === "dark" ? "#0f0f0f" : "#f5f5f7",
}));

const AdminHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, var(--primary-500, #d35400) 0%, var(--primary-800, #922b21) 100%)",
  color: "#fff",
  padding: theme.spacing(3, 4),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .MuiTab-root": {
    minHeight: 56,
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.85rem",
  },
}));

// ── Tab definitions ─────────────────────────────────────────────────────────
const TABS = [
  { label: "Özet",          icon: <Dashboard      fontSize="small" /> },
  { label: "Ayarlar",       icon: <Settings       fontSize="small" /> },
  { label: "Medya",         icon: <VideoLibrary   fontSize="small" /> },
  { label: "Faaliyetler",   icon: <Bolt           fontSize="small" /> },
  { label: "Projeler",      icon: <Business       fontSize="small" /> },
  { label: "Blog",          icon: <Article        fontSize="small" /> },
  { label: "Şubeler",       icon: <LocationOn     fontSize="small" /> },
  { label: "SSS",           icon: <QuestionAnswer fontSize="small" /> },
  { label: "Kariyer",       icon: <Work           fontSize="small" /> },
  { label: "Referanslar",   icon: <FormatQuote    fontSize="small" /> },
  { label: "İş Ortakları",  icon: <Handshake      fontSize="small" /> },
];

// ── Component ───────────────────────────────────────────────────────────────
function Admin({ settings, setSettings, siteContent, setSiteContent, refreshSiteContent }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [tab, setTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  /** Shared helper passed to every panel. */
  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      showSnackbar("Çıkış yapılamadı.", "error");
    }
  };

  // ── Render active panel ──────────────────────────────────────────────────
  const renderPanel = () => {
    const common = { showSnackbar };
    const contentProps = { siteContent, setSiteContent, refreshSiteContent, ...common };

    switch (tab) {
      case 0:  return <DashboardPanel settings={settings} {...common} />;
      case 1:  return <GeneralSettingsPanel settings={settings} setSettings={setSettings} {...common} />;
      case 2:  return <ContentPanel {...contentProps} />;
      case 3:  return <ActivitiesPanel {...common} />;
      case 4:  return <ProjectsPanel {...common} />;
      case 5:  return <BlogPanel {...common} />;
      case 6:  return <BranchesPanel {...common} />;
      case 7:  return <FaqPanel {...common} />;
      case 8:  return <CareerPanel {...common} />;
      case 9:  return <TestimonialsPanel {...common} />;
      case 10: return <PartnersPanel {...common} />;
      default: return null;
    }
  };

  return (
    <AdminShell>
      {/* ── Top Header ─────────────────────────────────────────────── */}
      <AdminHeader>
        <Box>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight={800} sx={{ lineHeight: 1.2 }}>
            Admin Panel
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.3 }}>
            {settings?.title || "DEKODEM"}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<ExitToApp />}
          onClick={handleSignOut}
          size={isMobile ? "small" : "medium"}
          sx={{ borderColor: "rgba(255,255,255,0.5)", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
        >
          {isMobile ? "Çıkış" : "Çıkış Yap"}
        </Button>
      </AdminHeader>

      {/* ── Tab Navigation ─────────────────────────────────────────── */}
      <StyledTabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {TABS.map(({ label, icon }) => (
          <Tab key={label} label={label} icon={icon} iconPosition="start" />
        ))}
      </StyledTabs>

      <Divider />

      {/* ── Panel Content ──────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {renderPanel()}
      </Container>

      {/* ── Global Snackbar ────────────────────────────────────────── */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ borderRadius: 2, minWidth: 280 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AdminShell>
  );
}

export default Admin;
