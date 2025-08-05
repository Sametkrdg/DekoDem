import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Component imports
import ProjectHeroSection from '../components/ProjectHeroSection';
import ProjectCategories from '../components/ProjectCategories';
import ProjectShowcase from '../components/ProjectShowcase';

const MainContainer = styled(Container)(({ theme }) => ({
  padding: 0,
  maxWidth: '100% !important',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 20%, rgba(52, 152, 219, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(46, 204, 113, 0.1) 0%, transparent 50%)',
    zIndex: 0,
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  width: '100%',
}));

const ProjectsMainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <MainContainer>
      <MainContent>
        {/* Hero Section */}
        <ProjectHeroSection 
          totalProjects={150}
          activeProjects={12}
          completedThisYear={25}
        />

        {/* Categories Section */}
        <ProjectCategories 
          onCategorySelect={handleCategorySelect}
        />

        {/* Projects Showcase */}
        <ProjectShowcase 
          selectedCategory={selectedCategory}
        />
      </MainContent>
    </MainContainer>
  );
};

export default ProjectsMainPage;