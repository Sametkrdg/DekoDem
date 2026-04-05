import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

/**
 * Wraps each page in a fade-in animation that fires on every route change.
 * No extra library — uses a simple CSS keyframe injected once.
 */
const STYLE_ID = "page-fade-style";

const injectStyle = () => {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @media (prefers-reduced-motion: no-preference) {
      .page-fade-enter {
        animation: pageFadeIn 0.3s ease forwards;
      }
    }
    @keyframes pageFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
};

const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  const boxRef = useRef(null);

  useEffect(() => { injectStyle(); }, []);

  // Re-trigger animation on route change by removing/re-adding the class
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    el.classList.remove("page-fade-enter");
    // Force reflow so the browser registers the class removal
    void el.offsetWidth;
    el.classList.add("page-fade-enter");
  }, [pathname]);

  return (
    <Box ref={boxRef} className="page-fade-enter" sx={{ flex: 1 }}>
      {children}
    </Box>
  );
};

export default PageTransition;
