// React
import React from 'react';

// MUI
import { Grid, Box, Typography, Link as MuiLink } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Phone } from '@mui/icons-material';

// Styles
import { SectionContainer } from '../styles/StyledComponents';

// Components
import ContactHeader from '../components/ContactHeader';
import ContactInfo   from '../components/ContactInfo';
import ContactForm   from '../components/ContactForm';
import LocationMap   from '../components/LocationMap';

// Context
import { useSite } from '../context/SiteContext';

const Contact = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { contactSettings } = useSite();

  const phoneHref = contactSettings.Phone ? `tel:${contactSettings.Phone.replace(/\s/g, '')}` : '#';

  return (
    <SectionContainer maxWidth="lg">

      {/* Header */}
      <ContactHeader />

      {/* Info + Form */}
      <Grid container spacing={6} sx={{ mb: 10 }}>
        <Grid item xs={12} lg={7}>
          <ContactInfo />
        </Grid>
        <Grid item xs={12} lg={5}>
          <ContactForm />
        </Grid>
      </Grid>

      {/* Map */}
      <Box sx={{ mb: 10 }}>
        <LocationMap />
      </Box>

      {/* ── Quick-call CTA ────────────────────────────────────────────── */}
      <Box
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)'
            : 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
          borderRadius: 4,
          p: { xs: '40px 24px', md: '56px 48px' },
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 50% 70% at 50% 100%, ${alpha(theme.palette.primary.main, 0.25)}, transparent)`,
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Typography variant="overline" sx={{ color: alpha('#fff', 0.6), letterSpacing: 3, display: 'block', mb: 1 }}>
            Hızlı İletişim
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1.5 }}>
            Bizi Hemen Arayın
          </Typography>
          <Typography sx={{ color: alpha('#fff', 0.7), mb: 3.5, maxWidth: 420, mx: 'auto' }}>
            Proje danışmanlığı ve fiyat teklifi için aşağıdaki numaraları arayabilirsiniz.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <MuiLink
              href={phoneHref}
              underline="none"
              sx={{
                display:     'inline-block',
                px: 3.5, py: 1.5,
                borderRadius: '50px',
                border:      '1.5px solid rgba(255,255,255,0.35)',
                bgcolor:     'rgba(255,255,255,0.08)',
                color:       '#fff',
                fontWeight:  700,
                fontSize:    '1.05rem',
                letterSpacing: '0.03em',
                transition:  'all 0.2s ease',
                backdropFilter: 'blur(8px)',
                '&:hover': {
                  bgcolor:     'rgba(255,255,255,0.16)',
                  borderColor: '#fff',
                  transform:   'translateY(-2px)',
                  boxShadow:   '0 8px 24px rgba(0,0,0,0.3)',
                },
              }}
            >
              <Phone fontSize="small" aria-hidden="true" sx={{ mr: 0.5, verticalAlign: 'middle' }} />{contactSettings.Phone}
            </MuiLink>
          </Box>

          <Typography variant="caption" sx={{ color: alpha('#fff', 0.45), display: 'block', mt: 3 }}>
            Pazartesi – Cumartesi: 08:00 – 18:00
          </Typography>
        </Box>
      </Box>
    </SectionContainer>
  );
};

export default Contact;
