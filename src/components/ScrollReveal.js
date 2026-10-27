/**
 * ScrollReveal.js — Fade-in-on-scroll wrapper.
 *
 * Uses IntersectionObserver + MUI Fade to elegantly reveal a section as it
 * enters the viewport. Designed for the Dekodem Yapı "storytelling" feel.
 *
 * Once a section has been revealed it stays visible — we don't re-hide on
 * scroll-out (that pattern feels twitchy at luxury speeds).
 *
 * Usage:
 *   <ScrollReveal>
 *     <YourSection />
 *   </ScrollReveal>
 *
 *   <ScrollReveal delay={150} timeout={700} threshold={0.15}>
 *     <Card />
 *   </ScrollReveal>
 *
 * Respects `prefers-reduced-motion` — the content renders instantly without
 * a transition for users who request reduced motion.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Box, Fade, useMediaQuery } from '@mui/material';

const ScrollReveal = ({
  children,
  delay     = 0,         // ms — useful for chaining several reveals
  timeout   = 700,       // Fade duration
  threshold = 0.12,      // % of element visible before reveal
  rootMargin = '0px 0px -40px 0px', // start slightly before fully in view
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    // SSR / very old browsers — show immediately
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, prefersReducedMotion]);

  return (
    <Box ref={ref}>
      <Fade in={visible} timeout={timeout} style={{ transitionDelay: `${delay}ms` }}>
        {/* Fade needs a single DOM child it can attach inline styles to */}
        <Box>{children}</Box>
      </Fade>
    </Box>
  );
};

export default ScrollReveal;
