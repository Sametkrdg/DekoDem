import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

const sendToAnalytics = ({ id, name, value }) => {
  if (window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value), // Değerleri normalize eder
      non_interaction: true, // Kullanıcı etkileşimi sayılmaz, hemen çıkma oranını bozmaz
    });
  }
};

// Log Core Web Vitals to console in development.
// In production, replace console.log with your analytics endpoint, e.g.:
//   reportWebVitals(metric => fetch('/analytics', { method: 'POST', body: JSON.stringify(metric) }));
if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log);
}else {
  reportWebVitals(sendToAnalytics);
}
