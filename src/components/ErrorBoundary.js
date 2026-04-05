import React from 'react';

// Inline styles only — this component must work even if the app CSS fails to load.
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    textAlign: 'center',
    padding: '2rem',
    gap: '1rem',
  },
  icon: {
    fontSize: '4rem',
    marginBottom: '0.5rem',
  },
  heading: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#c0392b',
    margin: '0 0 0.5rem',
  },
  body: {
    maxWidth: '560px',
    lineHeight: '1.6',
    color: '#555',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  btnPrimary: {
    padding: '12px 28px',
    backgroundColor: '#c0392b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(192,57,43,0.3)',
    textDecoration: 'none',
    display: 'inline-block',
  },
  btnSecondary: {
    padding: '12px 28px',
    backgroundColor: 'transparent',
    color: '#c0392b',
    border: '2px solid #c0392b',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Replace console.error with Sentry.captureException(error) for production monitoring.
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.wrapper} role="alert">
          <div style={styles.icon} aria-hidden="true">⚠️</div>
          <h1 style={styles.heading}>Beklenmedik bir hata oluştu</h1>
          <p style={styles.body}>
            Üzgünüz, uygulama beklenmedik bir sorunla karşılaştı.
            Sayfayı yenileyerek tekrar deneyebilir veya ana sayfaya dönebilirsiniz.
          </p>
          <div style={styles.actions}>
            <button onClick={this.handleReload} style={styles.btnPrimary}>
              Sayfayı Yenile
            </button>
            <a href="/" style={styles.btnSecondary}>
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
