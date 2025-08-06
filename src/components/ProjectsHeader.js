// components/ProjectsHeader.js
import React from 'react';

const ProjectsHeader = () => {
  const styles = {
    header: {
      textAlign: 'center',
      marginBottom: '60px',
    },
    pageTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #3498db, #2ecc71)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '20px',
      margin: '0 0 20px 0',
    },
    subtitle: {
      color: '#7f8c8d',
      fontSize: '1.2rem',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
  };

  return (
    <div style={styles.header}>
      <h1 style={styles.pageTitle}>
        Projelerimiz
      </h1>
      <p style={styles.subtitle}>
        Kaliteli tasarım ve mükemmel işçilikle hayata geçirdiğimiz projelerimizi keşfedin
      </p>
    </div>
  );
};

export default ProjectsHeader;