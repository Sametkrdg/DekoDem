// React
import React, { useEffect, useRef, useState } from 'react';

// MUI
import { Box, Container, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// Firestore
import { getReferences } from '../services/firestore';

// Static fallback
import { references as staticReferences } from '../constants/siteContent';

// ── Brand tile ────────────────────────────────────────────────────────────────
const BrandTile = ({ BrandName, LogoUrl }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      aria-label={BrandName}
      sx={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        px:             { xs: 3.5, md: 5 },
        py:             { xs: 2,   md: 2.5 },
        minWidth:       { xs: 150, md: 190 },
        height:         { xs: 70,  md: 80  },
        flexShrink:     0,
        borderRadius:   '16px',
        border:         '1px solid',
        borderColor:    isDark
          ? 'rgba(255,255,255,0.1)'
          : alpha(theme.palette.primary.main, 0.14),
        bgcolor:        isDark
          ? 'rgba(255,255,255,0.04)'
          : alpha(theme.palette.primary.main, 0.03),
        backdropFilter: 'blur(10px)',
        transition:     'all 0.25s ease',
        cursor:         'default',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, isDark ? 0.45 : 0.4),
          bgcolor:     isDark
            ? 'rgba(255,255,255,0.08)'
            : alpha(theme.palette.primary.main, 0.07),
          transform:   'translateY(-3px)',
          boxShadow:   `0 10px 28px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
      }}
    >
      {LogoUrl ? (
        <Box
          component="img"
          src={LogoUrl}
          alt={BrandName}
          sx={{
            maxHeight:  44,
            maxWidth:   130,
            objectFit:  'contain',
            filter:     isDark ? 'brightness(0) invert(0.85)' : 'none',
            transition: 'filter 0.25s',
          }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ) : (
        <Typography
          variant="body1"
          fontWeight={700}
          sx={{
            textAlign:   'center',
            letterSpacing: '0.03em',
            color:       isDark ? 'rgba(255,255,255,0.75)' : alpha(theme.palette.text.primary, 0.75),
            userSelect:  'none',
            transition:  'color 0.25s',
          }}
        >
          {BrandName}
        </Typography>
      )}
    </Box>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const PartnersSection = () => {
  const theme      = useTheme();
  const isDark     = theme.palette.mode === 'dark';
  const trackRef   = useRef(null);
  const rafRef     = useRef(null);
  const posRef     = useRef(0);
  const SPEED      = 0.45; // px per frame

  const [items, setItems] = useState([]);

  useEffect(() => {
    getReferences()
      .then((data) => {
        if (data && data.length > 0) {
          setItems(data);
        } else {
          // Fallback: convert static string array to schema shape
          setItems(staticReferences.map((ref, i) => ({ id: `s${i}`, BrandName: ref.name, LogoUrl: '' })));
        }
      })
      .catch(() => {
        setItems(staticReferences.map((ref, i) => ({ id: `s${i}`, BrandName: ref.name, LogoUrl: '' })));
      });
  }, []);

  // Continuous marquee — pause on hover
  useEffect(() => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    const animate = () => {
      posRef.current -= SPEED;
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(posRef.current) >= halfWidth) posRef.current = 0;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items]);

  const pause  = () => cancelAnimationFrame(rafRef.current);
  const resume = () => {
    const track = trackRef.current;
    if (!track) return;
    const go = () => {
      posRef.current -= SPEED;
      const half = track.scrollWidth / 2;
      if (Math.abs(posRef.current) >= half) posRef.current = 0;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(go);
    };
    rafRef.current = requestAnimationFrame(go);
  };

  // Duplicate list 4× for a seamless loop regardless of tile count
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <Box
      component="section"
      aria-label="Çalıştığımız markalar"
      sx={{
        py:          { xs: 7, md: 9 },
        bgcolor:     isDark ? alpha('#0d1117', 0.8) : '#f8fafc',
        borderTop:   '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'divider',
        position:    'relative',
        overflow:    'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.14em', display: 'block', mb: 1 }}
          >
            REFERANSLARIMIZ
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1.5 }}>
            Çalıştığımız Markalar
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
            Türkiye'nin ve dünyanın önde gelen firmaları ile başarılı projeler gerçekleştirdik.
          </Typography>
        </Box>
      </Container>

      {/* Marquee strip — outside Container for full bleed */}
      {repeated.length > 0 && (
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          {/* Fade edges */}
          <Box
            sx={{
              position:   'absolute', left: 0, top: 0, bottom: 0, width: { xs: 40, md: 80 },
              background: isDark
                ? 'linear-gradient(to right, rgba(13,17,23,0.9), transparent)'
                : 'linear-gradient(to right, #f8fafc, transparent)',
              zIndex: 1, pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position:   'absolute', right: 0, top: 0, bottom: 0, width: { xs: 40, md: 80 },
              background: isDark
                ? 'linear-gradient(to left, rgba(13,17,23,0.9), transparent)'
                : 'linear-gradient(to left, #f8fafc, transparent)',
              zIndex: 1, pointerEvents: 'none',
            }}
          />

          <Box
            ref={trackRef}
            onMouseEnter={pause}
            onMouseLeave={resume}
            sx={{ display: 'flex', gap: 3, width: 'max-content', px: 3 }}
          >
            {repeated.map((item, i) => (
              <BrandTile key={`${item.id}-${i}`} BrandName={item.BrandName} LogoUrl={item.LogoUrl} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PartnersSection;
