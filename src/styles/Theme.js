import { createTheme } from '@mui/material/styles';

// ===== COLOR CONSTANTS =====
const colors = {
  primary: {
    main: '#1a365d',
    dark: '#0f2862',
    light: '#2a4365',
    lighter: '#4a5568',
  },
  secondary: {
    main: '#f97316',
    dark: '#ea580c',
    light: '#fdba74',
    lighter: '#ffedd5',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #1a365d, #2a4365)',
    primaryReverse: 'linear-gradient(135deg, #2a4365, #1a365d)',
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    backgroundLight: 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)',
    hover: 'linear-gradient(135deg, #0f2862, #1a365d)',
  },
  neutral: {
    white: '#ffffff',
    light: '#f8f9fa',
    lightGray: '#ecf0f1',
    gray: '#bdc3c7',
    darkGray: '#7f8c8d',
    dark: '#2c3e50',
    darker: '#34495e',
    black: '#2c3e50',
  }
};

// Functions required by Admin.js
export const hueSaturationToHex = ({ hue, saturation, lightness = 50 }) => {
  const h = hue;
  const s = saturation / 100;
  const l = lightness / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHex = (n) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const updateThemeFromHex = (hexColor) => {
  // Logic to update the theme context or similar could go here
  // For now just returning defaults or logging if needed, 
  // but keeping signature to match Admin.js usage
  console.log("Updating theme color to:", hexColor);
  return createDynamicTheme({
    primary: { main: hexColor }
  });
};

// ===== DYNAMIC THEME CREATOR =====
const createDynamicTheme = (customColors = {}) => {
  // Custom renkleri mevcut renklerle birleştir
  const mergedColors = {
    ...colors,
    primary: {
      ...colors.primary,
      ...customColors.primary,
    },
    secondary: {
      ...colors.secondary,
      ...customColors.secondary,
    },
  };

  return createTheme({
    palette: {
      mode: 'light',
      primary: mergedColors.primary,
      secondary: mergedColors.secondary,
      background: {
        paper: mergedColors.neutral.white,
        default: mergedColors.neutral.light,
        dark: mergedColors.neutral.dark,
        darker: mergedColors.neutral.darker,
      },
      text: {
        primary: mergedColors.neutral.dark,
        secondary: mergedColors.neutral.darkGray,
        light: mergedColors.neutral.gray,
        white: mergedColors.neutral.lightGray,
      },
      // Custom color extensions
      gradients: mergedColors.gradients,
      neutral: mergedColors.neutral,
    },

    // ===== TYPOGRAPHY =====
    typography: {
      fontFamily: '"Roboto", "Inter", "Helvetica", "Arial", sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,

      h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        '@media (max-width:900px)': {
          fontSize: '2.5rem',
        },
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
        '@media (max-width:900px)': {
          fontSize: '2rem',
        },
        '@media (max-width:600px)': {
          fontSize: '1.8rem',
        },
      },
      h3: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        '@media (max-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.4,
        '@media (max-width:600px)': {
          fontSize: '1.3rem',
        },
      },
      h5: {
        fontSize: '1.3rem',
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1.1rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },

    // ===== SPACING =====
    spacing: 8, // 1 unit = 8px

    // ===== BREAKPOINTS =====
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },

    // ===== SHAPE =====
    shape: {
      borderRadius: 12,
    },

    // ===== SHADOWS =====
    shadows: [
      'none',
      '0 2px 8px rgba(0,0,0,0.08)',
      '0 4px 12px rgba(0,0,0,0.1)',
      '0 6px 16px rgba(0,0,0,0.12)',
      '0 8px 20px rgba(0,0,0,0.15)',
      '0 12px 24px rgba(0,0,0,0.18)',
      '0 16px 32px rgba(0,0,0,0.2)',
      // ... diğer shadow seviyeleri
      ...Array(17).fill('0 16px 32px rgba(0,0,0,0.2)'),
    ],

    // ===== COMPONENT OVERRIDES =====
    components: {
      // Button Components
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            },
            '&:active': {
              transform: 'translateY(-1px) scale(1.02)',
            }
          },
          contained: {
            background: mergedColors.gradients.primary,
            color: mergedColors.neutral.white,
            boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
            '&:hover': {
              background: mergedColors.gradients.hover,
              boxShadow: '0 8px 25px rgba(52, 152, 219, 0.4)',
            },
            '&:disabled': {
              background: mergedColors.neutral.gray,
              color: mergedColors.neutral.darkGray,
            }
          },
          outlined: {
            borderColor: mergedColors.primary.main,
            color: mergedColors.primary.main,
            borderWidth: '2px',
            '&:hover': {
              borderColor: mergedColors.secondary.main,
              color: mergedColors.secondary.main,
              background: `rgba(46, 204, 113, 0.08)`,
              borderWidth: '2px',
            }
          },
          text: {
            color: mergedColors.primary.main,
            '&:hover': {
              background: `rgba(52, 152, 219, 0.08)`,
              color: mergedColors.primary.dark,
            }
          }
        }
      },

      // IconButton
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              background: `rgba(52, 152, 219, 0.1)`,
            }
          }
        }
      },

      // Card
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            }
          }
        }
      },

      // AppBar/Navbar
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mergedColors.neutral.white,
            color: mergedColors.neutral.dark,
            boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            background: `rgba(255, 255, 255, 0.95)`,
          }
        }
      },

      // Paper
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
          },
          elevation1: {
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          },
        }
      },

      // Container
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '24px',
            paddingRight: '24px',
            '@media (max-width:600px)': {
              paddingLeft: '16px',
              paddingRight: '16px',
            },
          }
        }
      }
    },

    // ===== CUSTOM MIXINS =====
    mixins: {
      // Gradient Backgrounds
      gradientBackground: {
        background: mergedColors.gradients.background,
      },
      gradientBackgroundLight: {
        background: mergedColors.gradients.backgroundLight,
      },

      // Text Gradients
      gradientText: {
        background: mergedColors.gradients.primary,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: 600,
      },

      // Hover Effects
      hoverEffect: {
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(52, 152, 219, 0.2)',
        }
      },

      // Glass Effect
      glassEffect: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
      },

      // Social Button
      socialButton: {
        background: 'rgba(255,255,255,0.1)',
        color: mergedColors.neutral.lightGray,
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        '&:hover': {
          transform: 'translateY(-3px)',
          background: mergedColors.gradients.primary,
          boxShadow: '0 8px 25px rgba(52, 152, 219, 0.4)',
        },
      },

      // Section Padding
      sectionPadding: {
        paddingTop: '80px',
        paddingBottom: '80px',
        '@media (max-width:900px)': {
          paddingTop: '60px',
          paddingBottom: '60px',
        },
        '@media (max-width:600px)': {
          paddingTop: '40px',
          paddingBottom: '40px',
        },
      },

      // Flex Center
      flexCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      // Flex Column Center
      flexColumnCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }
  });
};

// Default theme
const theme = createDynamicTheme();

// Export both default and creator function
export { createDynamicTheme, colors };
export default theme;