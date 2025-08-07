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