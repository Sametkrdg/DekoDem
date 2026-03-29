import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Top-level error catch. Good place for Sentry or custom logging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    this.setState({
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Inline styling gracefully degrades if application CSS failed
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f8f9fa',
          color: '#343a40',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <h1 style={{ marginBottom: '1rem', color: '#e03131' }}>Hay aksi, bir şeyler ters gitti!</h1>
          <p style={{ marginBottom: '2rem', maxWidth: '600px', lineHeight: '1.5' }}>
            Uygulama çalışırken beklenmeyen bir hata oluştu. Sayfayı yenileyerek tekrar deneyebilirsiniz.
          </p>
          <button 
            onClick={this.handleReload} 
            style={{
              padding: '12px 24px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            Sayfayı Yenile
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
