// React
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Styles
import { createDynamicTheme } from '../styles/Theme';

// ── Context ────────────────────────────────────────────────────────────────
const ThemeModeContext = createContext({
  mode:       'light',
  isDark:     false,
  toggleMode: () => {},
});

/**
 * ThemeModeProvider
 *
 * Wraps MUI ThemeProvider + CssBaseline with a persistent dark/light toggle.
 * Accepts `primaryColor` so the theme stays in sync with admin settings color.
 *
 * Must be mounted INSIDE <SiteProvider> so the parent can pass settings.color.
 */
export const ThemeModeProvider = ({ children, primaryColor = '#C9A961' }) => {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('themeMode') || 'light';
    } catch {
      return 'light';
    }
  });

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('themeMode', next); } catch { /* storage blocked */ }
      return next;
    });
  }, []);

  const theme = useMemo(
    () => createDynamicTheme({ primary: { main: primaryColor }, mode }),
    [primaryColor, mode],
  );

  const ctxValue = useMemo(
    () => ({ mode, isDark: mode === 'dark', toggleMode }),
    [mode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={ctxValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

/** Hook — use inside any component mounted below ThemeModeProvider */
export const useThemeMode = () => useContext(ThemeModeContext);
