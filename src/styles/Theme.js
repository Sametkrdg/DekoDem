import { createTheme, alpha } from '@mui/material/styles';

// ── HSL utility (kept for Admin.js compatibility) ──────────────────────────
export const hueSaturationToHex = ({ hue, saturation, lightness = 50 }) => {
  const h = hue;
  const s = saturation / 100;
  const l = lightness / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60)        { r = c; g = x; b = 0; }
  else if (h < 120)  { r = x; g = c; b = 0; }
  else if (h < 180)  { r = 0; g = c; b = x; }
  else if (h < 240)  { r = 0; g = x; b = c; }
  else if (h < 300)  { r = x; g = 0; b = c; }
  else               { r = c; g = 0; b = x; }
  const toHex = (n) => { const hex = Math.round((n + m) * 255).toString(16); return hex.length === 1 ? '0' + hex : hex; };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const updateThemeFromHex = (hexColor) => createDynamicTheme({ primary: { main: hexColor } });

// ── Brand constants ────────────────────────────────────────────────────────
const BRAND_SECONDARY = { main: '#f97316', dark: '#ea580c', light: '#fdba74' };

// ── Glass tokens ────────────────────────────────────────────────────────────
// Exported so components can reference them without importing Theme internals
export const glassTokens = {
  dark: {
    bg:        'rgba(13, 17, 35, 0.78)',
    bgSubtle:  'rgba(22, 27, 50, 0.88)',
    border:    'rgba(255, 255, 255, 0.07)',
    blur:      'blur(16px)',
  },
  light: {
    bg:        'rgba(255, 255, 255, 0.78)',
    bgSubtle:  'rgba(255, 255, 255, 0.92)',
    border:    'rgba(255, 255, 255, 0.95)',
    blur:      'blur(12px)',
  },
};

// ── Build a full 25-entry shadows array ────────────────────────────────────
const buildShadows = (isDark, primaryColor) => {
  const base = isDark
    ? [
        'none',
        `0 2px 6px rgba(0,0,0,0.45)`,
        `0 4px 10px rgba(0,0,0,0.5)`,
        `0 6px 14px rgba(0,0,0,0.55)`,
        `0 8px 20px rgba(0,0,0,0.58)`,
        `0 12px 28px rgba(0,0,0,0.62)`,
        `0 16px 36px rgba(0,0,0,0.65)`,
        `0 20px 44px rgba(0,0,0,0.68)`,
        `0 8px 40px rgba(0,0,0,0.6), 0 0 24px ${alpha(primaryColor, 0.14)}`,
        `0 12px 48px rgba(0,0,0,0.65), 0 0 28px ${alpha(primaryColor, 0.16)}`,
        `0 16px 56px rgba(0,0,0,0.7), 0 0 32px ${alpha(primaryColor, 0.18)}`,
      ]
    : [
        'none',
        '0 2px 6px rgba(0,0,0,0.06)',
        '0 4px 10px rgba(0,0,0,0.08)',
        '0 6px 14px rgba(0,0,0,0.10)',
        '0 8px 20px rgba(0,0,0,0.12)',
        '0 12px 28px rgba(0,0,0,0.14)',
        '0 16px 36px rgba(0,0,0,0.16)',
        '0 20px 44px rgba(0,0,0,0.18)',
        `0 8px 32px rgba(0,0,0,0.12), 0 0 20px ${alpha(primaryColor, 0.10)}`,
        `0 12px 40px rgba(0,0,0,0.14), 0 0 24px ${alpha(primaryColor, 0.12)}`,
        `0 16px 48px rgba(0,0,0,0.16), 0 0 28px ${alpha(primaryColor, 0.14)}`,
      ];
  // MUI requires exactly 25 shadows (index 0-24)
  const filler = base[base.length - 1];
  while (base.length < 25) base.push(filler);
  return base;
};

// ── Core theme factory ──────────────────────────────────────────────────────
const createDynamicTheme = ({ primary = {}, secondary = {}, mode = 'light' } = {}) => {
  const isDark = mode === 'dark';
  const primaryColor = primary.main || '#1a365d';
  const glass = glassTokens[isDark ? 'dark' : 'light'];

  // ── Palette ──────────────────────────────────────────────────────────────
  const palette = {
    mode,
    primary: {
      main:    primaryColor,
      dark:    primary.dark  || '#0f2862',
      light:   primary.light || '#2a4365',
      lighter: primary.lighter || '#4a5568',
      ...primary,
    },
    secondary: { ...BRAND_SECONDARY, ...secondary },
    background: isDark
      ? { default: '#0d1117', paper: '#161b22', elevated: '#21262d' }
      : { default: '#f8fafc', paper: '#ffffff',  elevated: '#f1f5f9' },
    text: isDark
      ? { primary: '#e6edf3', secondary: '#8b949e', disabled: '#484f58', white: '#e6edf3' }
      : { primary: '#1e293b', secondary: '#64748b', disabled: '#94a3b8', white: '#f8fafc' },
    divider: isDark ? 'rgba(240,246,252,0.08)' : 'rgba(0,0,0,0.08)',
    // Extended custom tokens consumed by mixins & StyledComponents
    gradients: {
      primary:         `linear-gradient(135deg, ${primaryColor}, ${alpha(primaryColor, 0.75)})`,
      primaryReverse:  `linear-gradient(135deg, ${alpha(primaryColor, 0.75)}, ${primaryColor})`,
      background:      isDark
        ? 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)'
        : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      backgroundLight: isDark
        ? 'linear-gradient(135deg, #161b22 0%, #21262d 100%)'
        : 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)',
      hover: `linear-gradient(135deg, ${alpha(primaryColor, 0.9)}, ${primaryColor})`,
    },
    neutral: isDark
      ? {
          white:     '#e6edf3',
          light:     '#8b949e',
          lightGray: '#484f58',
          gray:      '#30363d',
          darkGray:  '#21262d',
          dark:      '#161b22',
          darker:    '#0d1117',
          black:     '#010409',
        }
      : {
          white:     '#ffffff',
          light:     '#f8f9fa',
          lightGray: '#ecf0f1',
          gray:      '#bdc3c7',
          darkGray:  '#7f8c8d',
          dark:      '#2c3e50',
          darker:    '#34495e',
          black:     '#2c3e50',
        },
    glass,
  };

  // ── Component overrides ───────────────────────────────────────────────────
  const components = {
    // ── AppBar ──────────────────────────────────────────────────────────────
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          ...(isDark ? {
            background:  'rgba(13, 17, 23, 0.88)',
            borderBottom: '1px solid rgba(240,246,252,0.06)',
            boxShadow:   '0 2px 16px rgba(0,0,0,0.5)',
          } : {
            background:  'rgba(255, 255, 255, 0.92)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            boxShadow:   '0 2px 16px rgba(0,0,0,0.07)',
          }),
          backdropFilter:       glass.blur,
          WebkitBackdropFilter: glass.blur,
        },
      },
    },

    // ── Paper (base for Card, Dialog, etc.) ──────────────────────────────────
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius:    '14px',
          ...(isDark && {
            background:           glass.bgSubtle,
            backdropFilter:       glass.blur,
            WebkitBackdropFilter: glass.blur,
            border:               `1px solid ${glass.border}`,
          }),
        },
        elevation0: { boxShadow: 'none' },
        elevation1: { boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.45)'  : '0 2px 6px rgba(0,0,0,0.06)' },
        elevation2: { boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.5)'  : '0 4px 10px rgba(0,0,0,0.08)' },
        elevation3: { boxShadow: isDark ? '0 6px 16px rgba(0,0,0,0.55)' : '0 6px 14px rgba(0,0,0,0.10)' },
      },
    },

    // ── Card (glass + lift-on-hover) ─────────────────────────────────────────
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius:    '16px',
          transition:      'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          ...(isDark ? {
            background:           glass.bg,
            backdropFilter:       glass.blur,
            WebkitBackdropFilter: glass.blur,
            border:               `1px solid ${glass.border}`,
            boxShadow:            '0 4px 20px rgba(0,0,0,0.45)',
            '&:hover': {
              transform:  'translateY(-4px)',
              boxShadow:  `0 16px 48px rgba(0,0,0,0.6), 0 0 24px ${alpha(primaryColor, 0.18)}`,
              borderColor: alpha(primaryColor, 0.4),
            },
          } : {
            background:  '#ffffff',
            boxShadow:   '0 4px 16px rgba(0,0,0,0.07)',
            border:      '1px solid rgba(0,0,0,0.06)',
            '&:hover': {
              transform:  'translateY(-4px)',
              boxShadow:  `0 16px 40px rgba(0,0,0,0.12), 0 0 20px ${alpha(primaryColor, 0.10)}`,
              borderColor: alpha(primaryColor, 0.3),
            },
          }),
        },
      },
    },

    // ── Dialog (heavy glass) ─────────────────────────────────────────────────
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          borderRadius:    '20px',
          ...(isDark ? {
            background:           'rgba(13, 19, 33, 0.94)',
            backdropFilter:       'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border:               '1px solid rgba(255,255,255,0.09)',
            boxShadow:            '0 24px 60px rgba(0,0,0,0.75)',
          } : {
            background: '#ffffff',
            boxShadow:  '0 16px 48px rgba(0,0,0,0.14)',
          }),
        },
      },
    },

    // ── Button ────────────────────────────────────────────────────────────────
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius:  '12px',
          padding:       '10px 22px',
          fontSize:      '0.95rem',
          fontWeight:    600,
          transition:    'transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s ease, background-color 0.2s ease',
          '&:hover':  { transform: 'translateY(-2px)' },
          '&:active': { transform: 'translateY(0) scale(0.98)' },
        },
        contained: {
          background: `linear-gradient(135deg, ${primaryColor}, ${alpha(primaryColor, 0.82)})`,
          color:      '#fff',
          boxShadow:  isDark
            ? `0 4px 18px ${alpha(primaryColor, 0.45)}, 0 0 0 1px ${alpha(primaryColor, 0.2)}`
            : `0 4px 14px ${alpha(primaryColor, 0.3)}`,
          '&:hover': {
            background: `linear-gradient(135deg, ${alpha(primaryColor, 0.9)}, ${primaryColor})`,
            boxShadow:  isDark
              ? `0 8px 28px ${alpha(primaryColor, 0.55)}, 0 0 0 1px ${alpha(primaryColor, 0.3)}`
              : `0 8px 24px ${alpha(primaryColor, 0.4)}`,
          },
          '&:disabled': {
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)',
            color:       isDark ? 'rgba(255,255,255,0.3)'  : 'rgba(0,0,0,0.38)',
          },
        },
        outlined: {
          borderColor: alpha(primaryColor, 0.6),
          borderWidth: '1.5px',
          color:       primaryColor,
          ...(isDark && { color: alpha(primaryColor, 0.9) }),
          '&:hover': {
            borderWidth:     '1.5px',
            borderColor:     primaryColor,
            backgroundColor: alpha(primaryColor, isDark ? 0.12 : 0.06),
          },
        },
        text: {
          color: primaryColor,
          '&:hover': { backgroundColor: alpha(primaryColor, isDark ? 0.12 : 0.06) },
        },
      },
    },

    // ── IconButton ────────────────────────────────────────────────────────────
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius:  '10px',
          transition:    'transform 0.2s ease, background-color 0.2s ease',
          '&:hover': {
            transform:       'scale(1.08)',
            backgroundColor: alpha(primaryColor, isDark ? 0.15 : 0.08),
          },
        },
      },
    },

    // ── TextField / OutlinedInput ─────────────────────────────────────────────
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          ...(isDark && {
            backgroundColor: 'rgba(255,255,255,0.04)',
          }),
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: isDark ? 'rgba(240,246,252,0.14)' : 'rgba(0,0,0,0.18)',
            transition:  'border-color 0.2s ease, box-shadow 0.2s ease',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: isDark ? 'rgba(240,246,252,0.3)' : alpha(primaryColor, 0.5),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: primaryColor,
            borderWidth: '2px',
            boxShadow:   `0 0 0 3px ${alpha(primaryColor, isDark ? 0.25 : 0.15)}`,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': { color: primaryColor },
        },
      },
    },

    // ── Chip ─────────────────────────────────────────────────────────────────
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight:   600,
          ...(isDark && {
            '&.MuiChip-outlined': {
              borderColor: alpha(primaryColor, 0.4),
              color:       alpha(primaryColor, 0.9),
            },
          }),
        },
      },
    },

    // ── Divider ───────────────────────────────────────────────────────────────
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
        },
      },
    },

    // ── Accordion ─────────────────────────────────────────────────────────────
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          ...(isDark && {
            background:  glass.bgSubtle,
            border:      `1px solid ${glass.border}`,
            '&:before':  { display: 'none' },
          }),
        },
      },
    },

    // ── Drawer ────────────────────────────────────────────────────────────────
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          ...(isDark && {
            background:           'rgba(13, 17, 23, 0.95)',
            backdropFilter:       'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight:          `1px solid ${glass.border}`,
          }),
        },
      },
    },

    // ── Tooltip ───────────────────────────────────────────────────────────────
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: '8px',
          fontSize:     '0.78rem',
          fontWeight:   500,
          padding:      '6px 12px',
          ...(isDark && {
            background: 'rgba(22, 27, 50, 0.95)',
            border:     `1px solid ${glass.border}`,
          }),
        },
      },
    },

    // ── Container ────────────────────────────────────────────────────────────
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft:  '24px',
          paddingRight: '24px',
          '@media (max-width:600px)': { paddingLeft: '16px', paddingRight: '16px' },
        },
      },
    },

    // ── CssBaseline ──────────────────────────────────────────────────────────
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': { boxSizing: 'border-box' },
        html: { scrollBehavior: 'smooth' },
        body: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
          // Deep charcoal-navy gradient anchored to viewport so sections scroll over it
          ...(isDark && {
            background:           'linear-gradient(160deg, #0a0e1a 0%, #0d1117 45%, #111827 100%)',
            backgroundAttachment: 'fixed',
          }),
        },
        // Graceful backdropFilter fallback
        '@supports not (backdrop-filter: blur(1px))': {
          '.glass-fallback': {
            background: isDark ? 'rgba(13,17,35,0.97) !important' : 'rgba(255,255,255,0.97) !important',
          },
        },
        // Custom scrollbar (dark mode)
        ...(isDark && {
          '::-webkit-scrollbar': { width: '8px', height: '8px' },
          '::-webkit-scrollbar-track': { background: '#0d1117' },
          '::-webkit-scrollbar-thumb': {
            background:   'rgba(255,255,255,0.15)',
            borderRadius: '4px',
            '&:hover': { background: 'rgba(255,255,255,0.25)' },
          },
        }),
      },
    },
  };

  // ── Mixins (mode-aware) ───────────────────────────────────────────────────
  const mixins = {
    gradientBackground:      { background: isDark ? 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)' : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' },
    gradientBackgroundLight: { background: isDark ? 'linear-gradient(135deg, #161b22 0%, #21262d 100%)' : 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)' },
    gradientText: {
      background:             `linear-gradient(135deg, ${primaryColor}, ${alpha(primaryColor, 0.75)})`,
      WebkitBackgroundClip:   'text',
      WebkitTextFillColor:    'transparent',
      backgroundClip:         'text',
      fontWeight:             600,
    },
    glassEffect: {
      background:           glass.bg,
      backdropFilter:       glass.blur,
      WebkitBackdropFilter: glass.blur,
      border:               `1px solid ${glass.border}`,
      borderRadius:         '16px',
    },
    glassEffectSubtle: {
      background:           glass.bgSubtle,
      backdropFilter:       glass.blur,
      WebkitBackdropFilter: glass.blur,
      border:               `1px solid ${glass.border}`,
      borderRadius:         '14px',
    },
    hoverEffect: {
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      cursor:     'pointer',
      '&:hover': {
        transform:  'translateY(-4px)',
        boxShadow:  isDark
          ? `0 16px 48px rgba(0,0,0,0.6), 0 0 24px ${alpha(primaryColor, 0.18)}`
          : `0 12px 36px ${alpha(primaryColor, 0.15)}`,
      },
    },
    socialButton: {
      background:   'rgba(255,255,255,0.08)',
      color:        isDark ? '#e6edf3' : '#ecf0f1',
      width:        '44px',
      height:       '44px',
      borderRadius: '12px',
      transition:   'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
      '&:hover': {
        transform:  'translateY(-3px)',
        background: `linear-gradient(135deg, ${primaryColor}, ${alpha(primaryColor, 0.8)})`,
        boxShadow:  `0 8px 24px ${alpha(primaryColor, 0.4)}`,
      },
    },
    sectionPadding: {
      paddingTop:    '80px',
      paddingBottom: '80px',
      '@media (max-width:900px)': { paddingTop: '56px', paddingBottom: '56px' },
      '@media (max-width:600px)': { paddingTop: '40px', paddingBottom: '40px' },
    },

    // ── Section surface tokens ──────────────────────────────────────────────
    // Alternating section backgrounds that sit over the fixed body gradient.
    // sectionSurface    → transparent (dark) / off-white (light)  — "invisible" section
    // sectionSurfaceAlt → frosted glass (dark) / white (light)    — "raised" section
    sectionSurface: {
      background: isDark ? 'transparent' : '#f8fafc',
    },
    sectionSurfaceAlt: {
      background: isDark ? 'rgba(255, 255, 255, 0.026)' : '#ffffff',
      ...(isDark && {
        backdropFilter:       'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop:            '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom:         '1px solid rgba(255, 255, 255, 0.05)',
      }),
    },

    // ── Uniform card token — spread onto any Box that acts as a card ────────
    cardGlass: {
      borderRadius:         '20px',
      border:               `1px solid ${glass.border}`,
      background:           isDark ? glass.bg : '#ffffff',
      backdropFilter:       glass.blur,
      WebkitBackdropFilter: glass.blur,
      overflow:             'hidden',
      transition:           'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      '&:hover': {
        transform:   'translateY(-6px)',
        boxShadow:   isDark
          ? `0 20px 48px rgba(0,0,0,0.62), 0 0 0 1px ${alpha(primaryColor, 0.25)}`
          : `0 16px 40px rgba(0,0,0,0.10), 0 0 0 1px ${alpha(primaryColor, 0.18)}`,
        borderColor: alpha(primaryColor, isDark ? 0.4 : 0.35),
      },
    },

    flexCenter:       { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    flexColumnCenter: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  };

  return createTheme({
    palette,
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeightLight:   300,
      fontWeightRegular: 400,
      fontWeightMedium:  500,
      fontWeightBold:    700,
      h1: { fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', '@media (max-width:900px)': { fontSize: '2.5rem' }, '@media (max-width:600px)': { fontSize: '2rem' } },
      h2: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2,  letterSpacing: '-0.01em', '@media (max-width:900px)': { fontSize: '2rem'   }, '@media (max-width:600px)': { fontSize: '1.8rem' } },
      h3: { fontSize: '2rem',   fontWeight: 700, lineHeight: 1.25, '@media (max-width:600px)': { fontSize: '1.5rem' } },
      h4: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.35, '@media (max-width:600px)': { fontSize: '1.3rem' } },
      h5: { fontSize: '1.3rem', fontWeight: 600, lineHeight: 1.4  },
      h6: { fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.5  },
      body1:   { fontSize: '1rem',    lineHeight: 1.65 },
      body2:   { fontSize: '0.875rem', lineHeight: 1.55 },
      caption: { fontSize: '0.75rem',  letterSpacing: '0.02em' },
      overline: { fontSize: '0.7rem',  letterSpacing: '0.1em', fontWeight: 700, textTransform: 'uppercase' },
    },
    spacing: 8,
    shape: { borderRadius: 12 },
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
    shadows: buildShadows(isDark, primaryColor),
    transitions: {
      duration: { shortest: 150, shorter: 200, short: 250, standard: 300, complex: 375 },
      easing:   { easeInOut: 'cubic-bezier(0.4,0,0.2,1)', sharp: 'cubic-bezier(0.4,0,0.6,1)', easeOut: 'cubic-bezier(0,0,0.2,1)' },
    },
    components,
    mixins,
    // Expose glass tokens on the theme object for use in sx / styled
    glass: glassTokens[isDark ? 'dark' : 'light'],
  });
};

// Default light theme (backward-compat default export)
const theme = createDynamicTheme();

export { createDynamicTheme };
export default theme;
