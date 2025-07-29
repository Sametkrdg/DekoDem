// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
      dark: '#2980b9',
      light: '#5dade2',
    },
    secondary: {
      main: '#2ecc71',
      dark: '#27ae60',
      light: '#58d68d',
    },
    background: {
      paper: '#ffffff',
      default: '#f8f9fa',
      dark: '#2c3e50',
      darker: '#34495e',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
      light: '#bdc3c7',
      white: '#ecf0f1',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
  },
  components: {
    // Global component overrides
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '0.95rem',
          fontWeight: 500,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          }
        },
        contained: {
          background: 'linear-gradient(135deg, #3498db, #2ecc71)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(135deg, #2980b9, #27ae60)',
          }
        },
        outlined: {
          borderColor: '#3498db',
          color: '#3498db',
          '&:hover': {
            borderColor: '#2ecc71',
            color: '#2ecc71',
            background: 'rgba(46, 204, 113, 0.1)',
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          }
        }
      }
    }
  },
  // Custom mixins
  mixins: {
    gradientBackground: {
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    },
    gradientText: {
      background: 'linear-gradient(135deg, #3498db, #2ecc71)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    hoverEffect: {
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 20px rgba(52, 152, 219, 0.4)',
      }
    },
    socialButton: {
      background: 'rgba(255,255,255,0.1)',
      color: '#ecf0f1',
      width: '45px',
      height: '45px',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        background: 'linear-gradient(135deg, #3498db, #2ecc71)',
        boxShadow: '0 8px 20px rgba(52, 152, 219, 0.4)',
      },
    }
  }
});

export default theme;