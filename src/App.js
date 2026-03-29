import React, { useMemo, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import theme from "./styles/Theme";

// Context & Layout
import { SiteProvider, useSite } from "./context/SiteContext";
import MainLayout from "./layouts/MainLayout";

// Components
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages (Lazy Loaded)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
const CategoryList = lazy(() => import("./pages/CategoryList"));
const CategoryDetail = lazy(() => import("./pages/CategoryDetail"));
const BranchList = lazy(() => import("./pages/BranchList"));
const BranchDetail = lazy(() => import("./pages/BranchDetail"));
const Admin = lazy(() => import("./Admin"));
const Login = lazy(() => import("./pages/Login"));

// Inner component to handle Theme consuming Context
const AppContent = () => {
  const { settings, loading, siteContent, setSettings, setSiteContent, loadSiteContent } = useSite();

  const dynamicTheme = useMemo(
    () => ({
      ...theme,
      palette: {
        ...theme.palette,
        primary: {
          ...theme.palette.primary,
          main: settings.color,
        },
      },
    }),
    [settings.color]
  );

  if (loading) {
    return (
      <ThemeProvider theme={dynamicTheme}>
        <CssBaseline />
        <LoadingSpinner />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={dynamicTheme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes wrapped in MainLayout */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/hakkimizda" element={<MainLayout><About /></MainLayout>} />
            <Route path="/projeler" element={<MainLayout><Projects /></MainLayout>} />

            {/* Categories */}
            <Route path="/kategoriler" element={<MainLayout><CategoryList /></MainLayout>} />
            <Route path="/kategoriler/:slug" element={<MainLayout><CategoryDetail /></MainLayout>} />

            {/* Branches */}
            <Route path="/subeler" element={<MainLayout><BranchList /></MainLayout>} />
            <Route path="/subeler/:id" element={<MainLayout><BranchDetail /></MainLayout>} />

            {/* Contact */}
            <Route path="/iletisim" element={<MainLayout><Contact /></MainLayout>} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />

            {/* Legacy/Redirects (Optional - mapping old static routes to dynamic ones if needed) */}
            <Route path="/faaliyet-alanlari" element={<Navigate to="/kategoriler" replace />} />

            {/* Admin Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin
                    settings={settings}
                    setSettings={setSettings}
                    siteContent={siteContent}
                    setSiteContent={setSiteContent}
                    refreshSiteContent={loadSiteContent}
                  />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <MainLayout>
                  <Box sx={{ p: 4, textAlign: "center" }}>
                    <h2>404 - Sayfa Bulunamadı</h2>
                    <p>Aradığınız sayfa mevcut değil.</p>
                  </Box>
                </MainLayout>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}

export default App;

