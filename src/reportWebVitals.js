/**
 * Web Vitals reporter — uses the already-installed `web-vitals` package.
 *
 * Pass a function to log results:
 *   reportWebVitals(console.log)          — development
 *   reportWebVitals(sendToAnalytics)      — production
 *
 * Metrics reported:
 *   CLS  — Cumulative Layout Shift   (visual stability)
 *   FID  — First Input Delay          (interactivity)
 *   FCP  — First Contentful Paint     (perceived load)
 *   LCP  — Largest Contentful Paint   (main content load)
 *   TTFB — Time to First Byte         (server response)
 */
const reportWebVitals = (onPerfEntry) => {
  if (typeof onPerfEntry !== "function") return;

  import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  });
};

export default reportWebVitals;
