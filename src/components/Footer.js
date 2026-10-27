// React
import React, { useEffect, useState } from 'react';

// MUI
import { Typography, Container, Button, Grid, Box, Link as MuiLink, Skeleton } from '@mui/material';
import { Link }      from 'react-router-dom';
import { Phone, Email, LocationOn, Instagram } from '@mui/icons-material';

// Styles
import {
  FooterContainer, MainFooter, FooterSection,
  SectionTitle, SocialMediaContainer, SocialButton,
  ServiceItem, ContactItem, ContactText,
  CopyrightSection, CopyrightText,
} from '../styles/StyledComponents';

// Constants — single source of truth for all brand strings
import { brand, about, activityFields } from '../constants/siteContent';
import { FOOTER_QUICK_LINKS, activityPath, PATHS } from '../constants/navigation';

// Firebase
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';

// Context
import { useSite } from '../context/SiteContext';

// Max items shown in the footer column
const FOOTER_MAX = 5;

function Footer() {
  const { contactSettings } = useSite();

  // Real-time activities from Firestore; falls back to static data if Firebase is not configured
  // null = loading, array = ready (may be static fallback)
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      // Firebase not available — use static data immediately
      setActivities(
        activityFields.slice(0, FOOTER_MAX).map((f) => ({ id: f.slug, title: f.title }))
      );
      return;
    }

    const q = query(collection(db, 'Activities'), orderBy('Name'));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const docs = snap.docs
          .map((d) => ({ id: d.id, title: d.data().Name ?? '' }))
          .filter((a) => a.title)
          .slice(0, FOOTER_MAX);

        // If Firestore returned no documents fall back to static data
        setActivities(
          docs.length > 0
            ? docs
            : activityFields.slice(0, FOOTER_MAX).map((f) => ({ id: f.slug, title: f.title }))
        );
      },
      (err) => {
        console.error('[Footer] Activities listener error:', err);
        setActivities(
          activityFields.slice(0, FOOTER_MAX).map((f) => ({ id: f.slug, title: f.title }))
        );
      }
    );

    return unsubscribe;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Derive href values from Firestore fields
  const phoneHref = contactSettings.Phone ? `tel:${contactSettings.Phone.replace(/\s/g, '')}` : '#';
  const emailHref = contactSettings.Email ? `mailto:${contactSettings.Email}` : '#';
  const mapsHref  = contactSettings.Address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactSettings.Address)}`
    : null;

  return (
    <FooterContainer component="footer">
      <MainFooter>
        <Container maxWidth="lg">
          <Grid container spacing={4}>

            {/* ── Col 1: Brand + short summary + social ─────────────── */}
            <Grid size={{ xs: 12, md: 3 }}>
              <FooterSection>
                {/* Logo + brand name */}
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    component="img"
                    src={brand.logoSrc}
                    alt={brand.logoAlt}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    sx={{ height: 44, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{
                      background:           'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor:  'transparent',
                    }}
                  >
                    {brand.name}
                  </Typography>
                </Box>

                {/* WCAG-AA: 0.78 alpha on near-black ≈ 12:1 contrast — passes AAA */}
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, mb: 3 }}>
                  {about.shortSummary}
                </Typography>

                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.78)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}>
                  Bizi Takip Edin
                </Typography>

                <SocialMediaContainer>
                  <SocialButton
                    component="a"
                    href={contactSettings.InstaUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram />
                  </SocialButton>
                </SocialMediaContainer>
              </FooterSection>
            </Grid>

            {/* ── Col 2: Activity fields (linked to detail pages) ────── */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FooterSection>
                <SectionTitle>Faaliyet Alanlarımız</SectionTitle>

                {activities === null ? (
                  // Loading skeleton — preserves column height to prevent layout shift
                  Array.from({ length: FOOTER_MAX }).map((_, i) => (
                    <Box key={i} sx={{ py: '6px' }}>
                      <Skeleton
                        variant="text"
                        width={`${65 + (i % 3) * 12}%`}
                        sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: 1 }}
                      />
                    </Box>
                  ))
                ) : (
                  activities.map((activity) => (
                    <ServiceItem
                      key={activity.id}
                      component={Link}
                      to={activityPath(activity.id)}
                      sx={{ cursor: 'pointer', textDecoration: 'none' }}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}
                      >
                        {activity.title}
                      </Typography>
                    </ServiceItem>
                  ))
                )}

                <Button
                  component={Link}
                  to={PATHS.ACTIVITIES}
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 2, borderRadius: '50px',
                    color:       'rgba(255,255,255,0.92)', // ~14:1 contrast on near-black
                    borderColor: 'rgba(255,255,255,0.45)', // ~5.5:1 — visible hairline
                    '&:hover': { borderColor: '#fff', color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                  }}
                >
                  Tümünü Gör →
                </Button>
              </FooterSection>
            </Grid>

            {/* ── Col 3: Quick links (Kurumsal) ──────────────────────── */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FooterSection>
                <SectionTitle>Kurumsal</SectionTitle>

                <Box
                  component="nav"
                  aria-label="Kurumsal bağlantılar"
                >
                  <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                    {FOOTER_QUICK_LINKS.map((link) => (
                      <Box component="li" key={link.path}>
                        <ServiceItem
                          component={Link}
                          to={link.path}
                          sx={{ cursor: 'pointer', textDecoration: 'none' }}
                        >
                          <Typography variant="body2">{link.label}</Typography>
                        </ServiceItem>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </FooterSection>
            </Grid>

            {/* ── Col 4: Contact ─────────────────────────────────────── */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FooterSection>
                <SectionTitle>İletişim</SectionTitle>

                <ContactItem
                  component="a"
                  href={phoneHref}
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  <Phone color="primary" sx={{ flexShrink: 0 }} />
                  <Box>
                    <ContactText variant="body2">{contactSettings.Phone}</ContactText>
                  </Box>
                </ContactItem>

                <ContactItem
                  component="a"
                  href={emailHref}
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  <Email color="primary" sx={{ flexShrink: 0 }} />
                  <ContactText variant="body2">{contactSettings.Email}</ContactText>
                </ContactItem>

                {contactSettings.Address && mapsHref && (
                  <ContactItem
                    component={MuiLink}
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    <LocationOn color="primary" sx={{ flexShrink: 0 }} />
                    <ContactText variant="body2">{contactSettings.Address}</ContactText>
                  </ContactItem>
                )}

                <Button
                  component={Link}
                  to={PATHS.CONTACT}
                  variant="contained"
                  size="small"
                  sx={{ mt: 2.5, borderRadius: '50px' }}
                >
                  İletişime Geç
                </Button>
              </FooterSection>
            </Grid>
          </Grid>
        </Container>
      </MainFooter>

      {/* Copyright */}
      <CopyrightSection>
        <Container maxWidth="lg">
          <CopyrightText>
            © {new Date().getFullYear()} {brand.name}. Tüm hakları saklıdır.
          </CopyrightText>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 1, flexWrap: 'wrap' }}>
            <Typography
              component={Link}
              to={PATHS.PRIVACY}
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none', '&:hover': { color: '#fff' } }}
            >
              Gizlilik Politikası
            </Typography>
            <Typography
              component={Link}
              to={PATHS.TERMS}
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none', '&:hover': { color: '#fff' } }}
            >
              Kullanım Koşulları
            </Typography>
          </Box>
        </Container>
      </CopyrightSection>
    </FooterContainer>
  );
}

export default Footer;
