// React
import React from 'react';

// Components
import VisuallyHidden    from "../components/VisuallyHidden";
import AboutSection      from "../components/AboutSection";
import ActivitiesSection from "../components/ActivitiesSection";
import GallerySection    from "../components/GallerySection";
import TestimonialsSection from "../components/TestimonialsSection";
import PartnersSection   from "../components/PartnersSection";

// Context
import { useSite } from "../context/SiteContext";

function Home() {
  const { siteContent, settings } = useSite();
  const photos   = siteContent?.galleryPhotos || [];
  const siteTitle = settings?.title || "DEKODEM";

  return (
    <>
      {/* Screen-reader h1 — visually hidden so it doesn't overlap the hero design */}
      <VisuallyHidden component="h1">{siteTitle} — Profesyonel Yapı Çözümleri</VisuallyHidden>

      {/* 1. About / company intro */}
      <AboutSection photos={photos} />

      {/* 2. Service categories grid */}
      <ActivitiesSection />

      {/* 3. Photo gallery with lightbox */}
      <GallerySection photos={photos} />

      {/* 4. Testimonials */}
      <TestimonialsSection />

      {/* 5. Partners / clients logo strip */}
      <PartnersSection />
    </>
  );
}

export default Home;
