// React
import React from 'react';

// MUI
import { Box, Typography, Grid, Paper, Link as MuiLink } from '@mui/material';
import { Phone, Email, LocationOn, Instagram } from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';

// Context
import { useSite } from '../context/SiteContext';

const ContactInfo = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { contactSettings } = useSite();

  // Derive href values from Firestore fields
  const phoneHref = contactSettings.Phone ? `tel:${contactSettings.Phone.replace(/\s/g, '')}` : '#';
  const emailHref = contactSettings.Email ? `mailto:${contactSettings.Email}` : '#';

  // ── Contact card definitions ─────────────────────────────────────────────
  const CARDS = [
    {
      icon:   <Phone />,
      title:  'Telefon',
      lines:  [{ text: contactSettings.Phone, href: phoneHref }],
      sub:    'Pazartesi – Cumartesi: 08:00 – 18:00',
      accent: '#1a365d',
    },
    {
      icon:   <Email />,
      title:  'E-posta',
      lines:  [{ text: contactSettings.Email, href: emailHref }],
      sub:    '24 saat içinde yanıt veriyoruz',
      accent: '#276749',
    },
    {
      icon:   <LocationOn />,
      title:  'Adres',
      lines:  [{ text: contactSettings.Address, href: '#' }],
      sub:    'İzmit / Kocaeli',
      accent: '#c05621',
    },
    {
      icon:   <Instagram />,
      title:  'Instagram',
      lines:  [{ text: '@dekodem.com.tr', href: contactSettings.InstaUrl || '#', external: true }],
      sub:    'Projelerimizi takip edin',
      accent: '#553c9a',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
        İletişim Bilgileri
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Bize ulaşmak için aşağıdaki kanalları kullanabilirsiniz.
      </Typography>

      <Grid container spacing={2.5}>
        {CARDS.map((card) => (
          <Grid item xs={12} sm={6} key={card.title}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                transition: 'box-shadow 0.25s, border-color 0.25s, transform 0.25s',
                '&:hover': {
                  borderColor: card.accent,
                  boxShadow:   isDark
                    ? `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px ${alpha(card.accent, 0.3)}`
                    : `0 8px 24px ${alpha(card.accent, 0.16)}`,
                  transform: 'translateY(-3px)',
                },
                ...(isDark && {
                  background:           theme.glass?.bgSubtle,
                  backdropFilter:       'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }),
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  width:  46,
                  height: 46,
                  borderRadius: 2,
                  bgcolor:  alpha(card.accent, isDark ? 0.2 : 0.1),
                  color:    card.accent,
                  mb: 2,
                  '& svg': { fontSize: 22 },
                }}
              >
                {card.icon}
              </Box>

              <Typography variant="caption" fontWeight={700} sx={{ color: card.accent, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                {card.title}
              </Typography>

              {/* Clickable lines */}
              {card.lines.map((line) => (
                <MuiLink
                  key={line.text}
                  href={line.href}
                  {...(line.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  underline="hover"
                  sx={{
                    display:    'block',
                    fontWeight: 700,
                    fontSize:   '1rem',
                    color:      'text.primary',
                    lineHeight: 1.5,
                    mb:         0.25,
                    transition: 'color 0.2s',
                    '&:hover':  { color: card.accent },
                  }}
                >
                  {line.text}
                </MuiLink>
              ))}

              <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
                {card.sub}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ContactInfo;
