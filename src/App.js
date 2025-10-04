import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './styles/Theme';

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner"; // Yeni component önerisi

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ActivityAreas from "./pages/ActivityAreas";
import Projects from "./pages/Projects";
import ConstructionServices from "./pages/ConstructionServices";
import MaterialSales from "./pages/activities/MaterialSales";
import DecorationServices from "./pages/activities/DecorationServices";
import ProjectManagement from "./pages/activities/ProjectManagement";
import InteriorDesign from "./pages/activities/InteriorDesign";
import LandscapeDesign from "./pages/activities/LandscapeDesign";
import FacadeSystems from "./pages/activities/FacadeSystems";
import ModernKonutlar from "./pages/projects/ModernKonutlar";
import OfisPlaza from "./pages/projects/OfisPlaza";
import VillaSerisi from "./pages/projects/VillaSerisi";
import EndustriyelKompleks from "./pages/projects/EndustriyelKompleks";
import AlisverisMerkezi from "./pages/projects/AlisverisMerkezi";
import RezidansProjesi from "./pages/projects/RezidansProjesi";
import Admin from "./Admin";

// Constants
const DEFAULT_SETTINGS = {
  title: "Sedat Demir Yapı",
  color: "#1976d2",
  logoUrl: "",
  description: "Profesyonel yapı çözümleri", // SEO için
};

// Routes configuration - Bakım kolaylığı için
const ROUTES = [
  { path: "/", element: Home, requiresSettings: true },
  { path: "/hakkimizda", element: About },
  { path: "/faaliyet-alanlari", element: ActivityAreas },
  { path: "/projeler", element: Projects },
  { path: "/yapi-hizmetleri", element: ConstructionServices },
  { path: "/malzeme-satisi", element: MaterialSales },
  { path: "/dekorasyon-hizmetleri", element: DecorationServices },
  { path: "/proje-yonetimi", element: ProjectManagement },
  { path: "/ic-mekan-tasarimi", element: InteriorDesign },
  { path: "/peyzaj-duzenleme", element: LandscapeDesign },
  { path: "/cephe-giydirme", element: FacadeSystems },
  { path: "/projeler/modern-konutlar", element: ModernKonutlar },
  { path: "/projeler/ofis-plaza", element: OfisPlaza },
  { path: "/projeler/villa-serisi", element: VillaSerisi },
  { path: "/projeler/endustriyel-kompleks", element: EndustriyelKompleks },
  { path: "/projeler/alisveris-merkezi", element: AlisverisMerkezi },
  { path: "/projeler/rezidans-projesi", element: RezidansProjesi },
  { path: "/iletisim", element: Contact },
];

function App() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Settings yükleme simülasyonu (gerçek projede API'den gelecek)
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // API çağrısı simülasyonu
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Gerçek projede:
        // const response = await fetch('/api/settings');
        // const data = await response.json();
        // setSettings(prevSettings => ({ ...prevSettings, ...data }));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Settings yüklenirken hata:', error);
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Theme'i settings'e göre dinamik oluştur
  const dynamicTheme = useMemo(() => ({
    ...theme,
    palette: {
      ...theme.palette,
      primary: {
        ...theme.palette.primary,
        main: settings.color,
      },
    },
  }), [settings.color]);

  // Loading state
  if (isLoading) {
    return (
      <ThemeProvider theme={dynamicTheme}>
        <CssBaseline />
        <LoadingSpinner />
      </ThemeProvider>
    );
  }

  return (
    <Router>
      <ThemeProvider theme={dynamicTheme}>
        <CssBaseline />
        
        {/* Ana layout container */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh' 
          }}
        >
          {/* Header */}
          <Navbar settings={settings} />
          
          {/* Ana içerik alanı */}
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              {/* Dinamik route oluşturma */}
              {ROUTES.map(({ path, element: Component, requiresSettings }) => (
                <Route 
                  key={path}
                  path={path} 
                  element={
                    <Component 
                      {...(requiresSettings && { settings })} 
                    />
                  } 
                />
              ))}
              
              {/* Admin route - ayrı tutuldu çünkü özel props gerektiriyor */}
              <Route 
                path="/admin" 
                element={
                  <Admin 
                    settings={settings} 
                    setSettings={setSettings} 
                  />
                } 
              />
              
              {/* 404 sayfası */}
              <Route 
                path="*" 
                element={
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <h2>404 - Sayfa Bulunamadı</h2>
                    <p>Aradığınız sayfa mevcut değil.</p>
                  </Box>
                } 
              />
            </Routes>
          </Box>
          
          {/* Footer */}
          <Footer settings={settings} />
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;