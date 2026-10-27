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
// Champagne Gold — luxury accent for icons, hover states, primary actions
const LUXURY_PRIMARY  = { main: '#C9A961', dark: '#A8893E', light: '#E0C788', lighter: '#F1E2BB' };
// Platinum Silver — secondary accent
const BRAND_SECONDARY = { main: '#B8B8B8', dark: '#8E8E93', light: '#D4D4D4' };

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

// ── Shadows ────────────────────────────────────────────────────────────────
// Luxury rule: heavy shadows are removed; depth comes from 1px borders.
// We keep MUI's required 25-entry shadow array but use only a whisper of shadow.
const buildShadows = () => {
  const arr = new Array(25).fill('none');
  // Reserve a couple of extremely subtle elevations for surfaces that genuinely need lift.
  arr[1] = '0 1px 2px rgba(0,0,0,0.04)';
  arr[2] = '0 1px 3px rgba(0,0,0,0.05)';
  return arr;
};

// ── Core theme factory ──────────────────────────────────────────────────────
const createDynamicTheme = ({ primary = {}, secondary = {}, mode = 'light' } = {}) => {
  const isDark = mode === 'dark';
  const primaryColor = primary.main || LUXURY_PRIMARY.main;
  const glass = glassTokens[isDark ? 'dark' : 'light'];

  // Thin 1px border tokens (Apple-style hairline contrast)
  const hairline = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)';

  // ── Palette ──────────────────────────────────────────────────────────────
  const palette = {
    mode,
    primary: {
      main:    primaryColor,
      dark:    primary.dark    || LUXURY_PRIMARY.dark,
      light:   primary.light   || LUXURY_PRIMARY.light,
      lighter: primary.lighter || LUXURY_PRIMARY.lighter,
      ...primary,
    },
    secondary: { ...BRAND_SECONDARY, ...secondary },
    // Apple-inspired surfaces
    background: isDark
      ? { default: '#000000', paper: '#1C1C1E', elevated: '#161617' }
      : { default: '#FBFBFD', paper: '#FFFFFF', elevated: '#F5F5F7' },
    // WCAG-AA compliant text contrast pairs
    // Dark secondary #AEAEB2 on #000 ≈ 9.4:1 — far above 4.5:1 minimum
    // Light secondary #4A4A4F on #FBFBFD ≈ 8.7:1 — far above 4.5:1 minimum
    text: isDark
      ? { primary: '#F5F5F7', secondary: '#AEAEB2', disabled: '#6E6E73', white: '#FFFFFF' }
      : { primary: '#1D1D1F', secondary: '#4A4A4F', disabled: '#86868B', white: '#FFFFFF' },
    divider: hairline,
    // Extended custom tokens consumed by mixins & StyledComponents
    gradients: {
      primary:         `linear-gradient(135deg, ${primaryColor}, ${alpha(primaryColor, 0.75)})`,
      primaryReverse:  `linear-gradient(135deg, ${alpha(primaryColor, 0.75)}, ${primaryColor})`,
      background:      isDark
        ? '#000000'
        : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      backgroundLight: isDark
        ? '#1C1C1E'
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
            background:   'rgba(0, 0, 0, 0.90)',
            borderBottom: '1px solid rgba(240,246,252,0.06)',
            boxShadow:    '0 2px 24px rgba(0,0,0,0.55)',
          } : {
            background:   'rgba(255, 255, 255, 0.94)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            boxShadow:    '0 2px 20px rgba(0,0,0,0.06)',
          }),
          backdropFilter:       glass.blur,
          WebkitBackdropFilter: glass.blur,
          // Construction accent: thin primary→secondary gradient at bottom of nav
          '&::after': {
            content:    '""',
            position:   'absolute',
            left: 0, right: 0, bottom: 0,
            height:     '2px',
            background: `linear-gradient(90deg, ${primaryColor} 0%, ${BRAND_SECONDARY.main} 50%, ${primaryColor} 100%)`,
            opacity:    isDark ? 0.5 : 0.35,
          },
        },
      },
    },

    // ── Paper (base for Card, Dialog, etc.) ──────────────────────────────────
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius:    '24px',
          border:          `1px solid ${hairline}`,
          boxShadow:       'none',
        },
        // All elevations flattened — luxury rule removes heavy shadows
        elevation0: { boxShadow: 'none' },
        elevation1: { boxShadow: 'none' },
        elevation2: { boxShadow: 'none' },
        elevation3: { boxShadow: 'none' },
      },
    },

    // ── Card (Apple-style flat surface, hairline border, scale-on-hover) ─────
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius:    '24px',
          boxShadow:       'none',
          border:          `1px solid ${hairline}`,
          background:      isDark ? '#1C1C1E' : '#FFFFFF',
          transition:      'transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease',
          overflow:        'hidden',
          '&:hover': {
            transform:   'scale(1.02)',
            borderColor: alpha(primaryColor, isDark ? 0.55 : 0.45),
          },
        },
      },
    },

    // ── Dialog (flat surface) ────────────────────────────────────────────────
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          borderRadius:    '24px',
          border:          `1px solid ${hairline}`,
          boxShadow:       'none',
          background:      isDark ? '#1C1C1E' : '#FFFFFF',
        },
      },
    },

    // ── Button (24px radius, flat, no shadows) ───────────────────────────────
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius:  '24px',
          padding:       '10px 24px',
          fontSize:      '0.95rem',
          fontWeight:    600,
          letterSpacing: '-0.01em',
          boxShadow:     'none',
          transition:    'transform 0.2s cubic-bezier(0.4,0,0.2,1), background-color 0.2s ease, border-color 0.2s ease',
          '&:hover':  { boxShadow: 'none' },
          '&:active': { transform: 'scale(0.98)' },
        },
        contained: {
          background: primaryColor,
          color:      isDark ? '#000000' : '#FFFFFF',
          boxShadow:  'none',
          '&:hover': {
            background: LUXURY_PRIMARY.dark,
            boxShadow:  'none',
          },
          '&:disabled': {
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            color:      isDark ? 'rgba(255,255,255,0.3)'  : 'rgba(0,0,0,0.38)',
          },
        },
        outlined: {
          borderColor: hairline,
          borderWidth: '1px',
          color:       isDark ? '#F5F5F7' : '#1D1D1F',
          '&:hover': {
            borderWidth:     '1px',
            borderColor:     primaryColor,
            backgroundColor: alpha(primaryColor, isDark ? 0.10 : 0.06),
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
          borderRadius: '24px',
          // Multi-line textareas read better with a softer curve
          '&.MuiInputBase-multiline': { borderRadius: '16px' },
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
            background:           'rgba(0, 0, 0, 0.95)',
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
          // Pure black anchored to the viewport — Apple-system dark canvas
          ...(isDark && {
            background:           '#000000',
            backgroundAttachment: 'fixed',
          }),
        },
        // Graceful backdropFilter fallback
        '@supports not (backdrop-filter: blur(1px))': {
          '.glass-fallback': {
            background: isDark ? 'rgba(0,0,0,0.97) !important' : 'rgba(255,255,255,0.97) !important',
          },
        },
        // Custom scrollbar (dark mode)
        ...(isDark && {
          '::-webkit-scrollbar': { width: '8px', height: '8px' },
          '::-webkit-scrollbar-track': { background: '#000000' },
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
    // Apple-system dark surfaces: pure black canvas, midnight cards
    gradientBackground:      { background: isDark ? '#000000' : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' },
    gradientBackgroundLight: { background: isDark ? '#1C1C1E' : 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)' },
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

    // ── Construction-specific tokens ────────────────────────────────────────

    // Horizontal accent rule (safety-orange → transparent)
    // Use as a bottom-border on section headings or card headers.
    constructionDivider: {
      display:      'block',
      width:        '56px',
      height:       '4px',
      borderRadius: '2px',
      background:   `linear-gradient(90deg, ${BRAND_SECONDARY.main}, ${alpha(BRAND_SECONDARY.dark, 0.4)})`,
      flexShrink:   0,
    },

    // Sharp-edged card surface — "blueprint" aesthetic
    // Spread onto any Box that should look like a project card.
    blueprintCard: {
      borderRadius: '8px',
      border:       isDark
        ? '1px solid rgba(255,255,255,0.06)'
        : `1px solid rgba(0,0,0,0.07)`,
      background:   isDark ? glass.bg : '#ffffff',
      backdropFilter:       glass.blur,
      WebkitBackdropFilter: glass.blur,
      overflow: 'hidden',
      position: 'relative',
      // Accent strip baked in
      '&::before': {
        content:    '""',
        position:   'absolute',
        top: 0, left: 0, right: 0,
        height:     '3px',
        background: `linear-gradient(90deg, ${primaryColor}, ${BRAND_SECONDARY.main})`,
      },
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      '&:hover': {
        transform:  'translateY(-4px)',
        boxShadow:  isDark
          ? `0 16px 40px rgba(0,0,0,0.55), 0 0 0 1px ${alpha(primaryColor, 0.2)}`
          : `0 12px 32px ${alpha(primaryColor, 0.12)}`,
      },
    },

    // Section overline + title + divider — standard construction-page header
    sectionHeader: {
      textAlign:  'center',
      marginBottom: isDark ? '48px' : '56px',
    },
  };

  // ── Apple-inspired typography ────────────────────────────────────────────
  // Inter primary, Plus Jakarta Sans alt — both load via Google Fonts.
  // Headings: bold, tight letter-spacing. Body: 1.6 line-height for readability.
  const HEADING_FONT = '"Inter", "Plus Jakarta Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif';
  const BODY_FONT    = '"Inter", "Plus Jakarta Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif';

  return createTheme({
    palette,
    typography: {
      fontFamily:        BODY_FONT,
      fontWeightLight:   300,
      fontWeightRegular: 400,
      fontWeightMedium:  500,
      fontWeightBold:    700,
      // h1–h4 use Montserrat for a structural, "built-to-last" feel
      h1: {
        fontFamily: HEADING_FONT,
        fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1,
        letterSpacing: '-0.03em',
        '@media (max-width:900px)': { fontSize: '2.5rem' },
        '@media (max-width:600px)': { fontSize: '2rem'   },
      },
      h2: {
        fontFamily: HEADING_FONT,
        fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.15,
        letterSpacing: '-0.025em',
        '@media (max-width:900px)': { fontSize: '2rem'   },
        '@media (max-width:600px)': { fontSize: '1.75rem' },
      },
      h3: {
        fontFamily: HEADING_FONT,
        fontSize: '2rem', fontWeight: 800, lineHeight: 1.2,
        letterSpacing: '-0.02em',
        '@media (max-width:600px)': { fontSize: '1.5rem' },
      },
      h4: {
        fontFamily: HEADING_FONT,
        fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3,
        letterSpacing: '-0.01em',
        '@media (max-width:600px)': { fontSize: '1.25rem' },
      },
      h5: { fontFamily: HEADING_FONT, fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.4  },
      h6: { fontFamily: HEADING_FONT, fontSize: '1.1rem',  fontWeight: 700, lineHeight: 1.5  },
      body1:   { fontSize: '1rem',     lineHeight: 1.6 },
      body2:   { fontSize: '0.875rem', lineHeight: 1.6 },
      caption: { fontSize: '0.75rem',  letterSpacing: '0.02em' },
      overline: { fontSize: '0.7rem',  letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase' },
      // Subtitle variants with Montserrat for sub-headings in cards/sections
      subtitle1: { fontFamily: HEADING_FONT, fontWeight: 600, lineHeight: 1.45 },
      subtitle2: { fontFamily: HEADING_FONT, fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.45 },
    },
    spacing: 8,
    // Base unit for numeric sx radii: `borderRadius: 3` → 24px (Apple-style curvature).
    // Components needing exactly 24px set it explicitly in their overrides above.
    shape: { borderRadius: 8 },
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
    shadows: buildShadows(),
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
