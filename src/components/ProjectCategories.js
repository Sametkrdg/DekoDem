import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { 
  HomeWork, 
  Business, 
  Villa, 
  Factory, 
  School, 
  LocalHospital 
} from '@mui/icons-material';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: '80px 40px',
  [theme.breakpoints.down('md')]: {
    padding: '60px 20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 15px',
  },
}));

const ContentSection = styled(Section)(({ theme }) => ({
  background: 'rgba(255,255,255,0.02)',
  backdropFilter: 'blur(10px)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '2rem',
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #3498db, #2ecc71)',
    borderRadius: '2px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
  },
}));

const CategoriesGrid = styled(Grid)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  animation: `${fadeInUp} 1s ease-out`,
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px',
  textAlign: 'center',
  height: '350px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
    background: 'rgba(255,255,255,0.08)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    '& .category-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
  [theme.breakpoints.down('md')]: {
    height: '320px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '300px',
  },
}));

const CategoryCardContent = styled(CardContent)(({ theme }) => ({
  padding: '30px !important',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    padding: '25px !important',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px !important',
  },
}));

const CategoryIcon = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  transition: 'all 0.3s ease',
  '& svg': {
    fontSize: '40px',
    color: 'white',
  },
  [theme.breakpoints.down('md')]: {
    width: '70px',
    height: '70px',
    '& svg': {
      fontSize: '35px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px',
    marginBottom: '15px',
    '& svg': {
      fontSize: '30px',
    },
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontWeight: 600,
  color: '#ecf0f1',
  marginBottom: '15px',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const CategoryDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#bdc3c7',
  lineHeight: 1.6,
  textAlign: 'center',
  marginBottom: '15px',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.95rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },
}));

const CategoryStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: '15px 0',
  borderTop: '1px solid rgba(255,255,255,0.1)',
  marginTop: 'auto',
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#3498db',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: '#bdc3c7',
  fontWeight: 500,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.75rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
}));

const ProjectCategories = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'residential',
      icon: <HomeWork />,
      title: 'Konut Projeleri',
      description: 'Modern apartmanlar, site projeleri ve toplu konut çalışmalarımız',
      projectCount: 85,
      completedCount: 78
    },
    {
      id: 'commercial',
      icon: <Business />,
      title: 'Ticari Projeler',
      description: 'Ofis binaları, alışveriş merkezleri ve ticari kompleksler',
      projectCount: 35,
      completedCount: 32
    },
    {
      id: 'villa',
      icon: <Villa />,
      title: 'Villa Serileri',
      description: 'Lüks villalar ve özel konut tasarımları',
      projectCount: 22,
      completedCount: 20
    },
    {
      id: 'industrial',
      icon: <Factory />,
      title: 'Endüstriyel',
      description: 'Fabrikalar, depolar ve endüstriyel tesisler',
      projectCount: 15,
      completedCount: 13
    },
    {
      id: 'educational',
      icon: <School />,
      title: 'Eğitim Yapıları',
      description: 'Okullar, kurshaneler ve eğitim kampüsleri',
      projectCount: 8,
      completedCount: 7
    },
    {
      id: 'healthcare',
      icon: <LocalHospital />,
      title: 'Sağlık Yapıları',
      description: 'Hastaneler, klinikler ve sağlık merkezleri',
      projectCount: 5,
      completedCount: 4
    }
  ];

  const handleCategoryClick = (categoryId) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <ContentSection>
      <SectionTitle>Proje Kategorilerimiz</SectionTitle>
      <CategoriesGrid container spacing={4}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CategoryCard onClick={() => handleCategoryClick(category.id)}>
              <CategoryCardContent>
                <Box>
                  <CategoryIcon className="category-icon">
                    {category.icon}
                  </CategoryIcon>
                  <CategoryTitle>{category.title}</CategoryTitle>
                  <CategoryDescription>{category.description}</CategoryDescription>
                </Box>
                
                <CategoryStats>
                  <StatItem>
                    <StatNumber>{category.projectCount}</StatNumber>
                    <StatLabel>Toplam</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>{category.completedCount}</StatNumber>
                    <StatLabel>Tamamlanan</StatLabel>
                  </StatItem>
                </CategoryStats>
              </CategoryCardContent>
            </CategoryCard>
          </Grid>
        ))}
      </CategoriesGrid>
    </ContentSection>
  );
};

export default ProjectCategories;