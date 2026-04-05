// React
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";

// Context & Layout
import { SiteProvider, useSite } from "./context/SiteContext";
import { ThemeModeProvider }     from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";

// Global components
import LoadingSpinner        from "./components/LoadingSpinner";
import ProtectedRoute        from "./components/ProtectedRoute";
import CookieConsent         from "./components/CookieConsent";
import ScrollToTop           from "./components/ScrollToTop";
import BackToTop             from "./components/BackToTop";
import WhatsAppButton        from "./components/WhatsAppButton";
import PageTitleManager      from "./components/PageTitleManager";
import LocalBusinessSchema   from "./components/LocalBusinessSchema";

// Route path constants — import PATHS so there are no magic strings in this file
import { PATHS } from "./constants/navigation";

// Pages (Lazy Loaded — code-split per route)
const Home             = lazy(() => import("./pages/Home"));
const About            = lazy(() => import("./pages/About"));
const Contact          = lazy(() => import("./pages/Contact"));
const Projects         = lazy(() => import("./pages/Projects"));
const ProjectDetailPage= lazy(() => import("./pages/ProjectDetailPage"));
const CategoryList     = lazy(() => import("./pages/CategoryList"));
const CategoryDetail   = lazy(() => import("./pages/CategoryDetail"));
const BranchList       = lazy(() => import("./pages/BranchList"));
const BranchDetail     = lazy(() => import("./pages/BranchDetail"));
const Blog             = lazy(() => import("./pages/Blog"));
const BlogDetail       = lazy(() => import("./pages/BlogDetail"));
const FAQ              = lazy(() => import("./pages/FAQ"));
const Career           = lazy(() => import("./pages/Career"));
const PrivacyPolicy    = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService   = lazy(() => import("./pages/TermsOfService"));
const NotFound         = lazy(() => import("./pages/NotFound"));
const Admin            = lazy(() => import("./Admin"));
const Login            = lazy(() => import("./pages/Login"));

// Redirects /kategoriler/:slug → /faaliyet-alanlari/:slug, preserving the param
const CategorySlugRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`${PATHS.ACTIVITIES}/${slug}`} replace />;
};

/**
 * AppContent
 * Reads settings from SiteContext (already loaded) and passes primaryColor
 * down to ThemeModeProvider, which owns the ThemeProvider + CssBaseline.
 * Loading state is handled here so the spinner is always themed correctly.
 */
const AppContent = () => {
  const { settings, loading, siteContent, setSettings, setSiteContent, loadSiteContent } = useSite();

  return (
    <ThemeModeProvider primaryColor={settings?.color}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Router>
          {/* Scroll to top on every route change */}
          <ScrollToTop />

          {/* LocalBusiness JSON-LD — injected once into <head> */}
          <LocalBusinessSchema />

          {/* Dynamic document.title + meta description + OG/Twitter tags per route */}
          <PageTitleManager
            siteTitle={settings?.title}
            seoDescription={settings?.seoDescription}
            seoOgImage={settings?.seoOgImage}
          />

          {/* Global UI overlays */}
          <CookieConsent />
          <BackToTop />
          <WhatsAppButton />

          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* ── Core pages ──────────────────────────────────────── */}
              <Route path={PATHS.HOME}       element={<MainLayout><Home /></MainLayout>} />
              <Route path={PATHS.ABOUT}      element={<MainLayout><About /></MainLayout>} />
              <Route path={PATHS.CONTACT}    element={<MainLayout><Contact /></MainLayout>} />

              {/* ── Projects ────────────────────────────────────────── */}
              <Route path={PATHS.PROJECTS}              element={<MainLayout><Projects /></MainLayout>} />
              <Route path={`${PATHS.PROJECTS}/:slug`}   element={<MainLayout><ProjectDetailPage /></MainLayout>} />

              {/* ── Activity Fields ──────────────────────────────────── */}
              <Route path={PATHS.ACTIVITIES}              element={<MainLayout><CategoryList /></MainLayout>} />
              <Route path={`${PATHS.ACTIVITIES}/:slug`}   element={<MainLayout><CategoryDetail /></MainLayout>} />

              {/* ── Branches ────────────────────────────────────────── */}
              <Route path={PATHS.BRANCHES}        element={<MainLayout><BranchList /></MainLayout>} />
              <Route path={`${PATHS.BRANCHES}/:id`} element={<MainLayout><BranchDetail /></MainLayout>} />

              {/* ── Blog / News ─────────────────────────────────────── */}
              <Route path={PATHS.BLOG}                  element={<MainLayout><Blog /></MainLayout>} />
              <Route path={`${PATHS.BLOG}/:slug`}       element={<MainLayout><BlogDetail /></MainLayout>} />

              {/* ── Info pages ──────────────────────────────────────── */}
              <Route path={PATHS.FAQ}    element={<MainLayout><FAQ /></MainLayout>} />
              <Route path={PATHS.CAREER} element={<MainLayout><Career /></MainLayout>} />

              {/* ── Legal ───────────────────────────────────────────── */}
              <Route path={PATHS.PRIVACY} element={<MainLayout><PrivacyPolicy /></MainLayout>} />
              <Route path={PATHS.TERMS}   element={<MainLayout><TermsOfService /></MainLayout>} />

              {/* ── Auth ────────────────────────────────────────────── */}
              <Route path={PATHS.LOGIN} element={<Login />} />

              {/* ── Admin ───────────────────────────────────────────── */}
              <Route
                path={PATHS.ADMIN}
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

              {/* ── Legacy redirects ────────────────────────────────── */}
              <Route path="/kategoriler"       element={<Navigate to={PATHS.ACTIVITIES} replace />} />
              <Route path="/kategoriler/:slug" element={<CategorySlugRedirect />} />

              {/* ── 404 ─────────────────────────────────────────────── */}
              <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
            </Routes>
          </Suspense>
        </Router>
      )}
    </ThemeModeProvider>
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
