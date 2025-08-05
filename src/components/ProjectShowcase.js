import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  Button,
  Tabs,
  Tab
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { 
  LocationOn, 
  CalendarToday, 
  Apartment, 
  ArrowForward,
  Visibility
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

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: '40px',
  '& .MuiTabs-indicator': {
    background: 'linear-gradient(90deg, #3498db, #2ecc71)',
    height: '3px',
  },
  '& .MuiTab-root': {
    color: '#bdc3c7',
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'none',
    minWidth: 120,
    '&.Mui-selected': {
      color: '#3498db',
    },
    '&:hover': {
      color: '#2ecc71',
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiTab-root': {
      fontSize: '0.9rem',
      minWidth: 100,
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTab-root': {
      fontSize: '0.8rem',
      minWidth: 80,
    },
  },
}));

const ProjectsGrid = styled(Grid)(({ theme }) => ({
  maxWidth: '1400px',
  margin: '0 auto',
  animation: `${fadeInUp} 1s ease-out`,
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px',
  height: '480px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-10px)',
    background: 'rgba(255,255,255,0.08)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    '& .project-image': {
      transform: 'scale(1.05)',
    },
    '& .view-button': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  [theme.breakpoints.down('md')]: {
    height: '450px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '420px',
  },
}));

const ProjectImage = styled(Box)(({ theme }) => ({
  height: '220px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(52,152,219,0.8), rgba(46,204,113,0.8))',
    zIndex: 1,
  },
}));

const ProjectImagePlaceholder = styled(Box)(({ theme }) => ({
  color: 'white',
  fontSize: '60px',
  zIndex: 2,
  position: 'relative',
}));

const ViewButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) translateY(20px)',
  background: 'rgba(255,255,255,0.2)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '25px',
  padding: '8px 20px',
  fontSize: '0.9rem',
  fontWeight: 600,
  opacity: 0,
  transition: 'all 0.3s ease',
  zIndex: 3,
  '&:hover': {
    background: 'rgba(255,255,255,0.3)',
    transform: 'translate(-50%, -50%) translateY(0) scale(1.05)',
  },
}));

const ProjectCardContent = styled(CardContent)(({ theme }) => ({
  padding: '25px !important',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    padding: '20px !important',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '18px !important',
  },
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontWeight: 700,
  color: '#ecf0f1',
  marginBottom: '10px',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const ProjectDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  color: '#bdc3c7',
  lineHeight: 1.6,
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
    WebkitLineClamp: 2,
  },
}));

const ProjectDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '15px',
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#bdc3c7',
  fontSize: '0.9rem',
  '& svg': {
    fontSize: '18px',
    color: '#3498db',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.85rem',
    '& svg': {
      fontSize: '16px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    '& svg': {
      fontSize: '14px',
    },
  },
}));

const ProjectStatus = styled(Chip)(({ theme }) => ({
  alignSelf: 'flex-start',
  fontSize: '0.75rem',
  fontWeight: 600,
  height: '24px',
  '&.completed': {
    background: 'rgba(46, 204, 113, 0.2)',
    color: '#2ecc71',
    border: '1px solid rgba(46, 204, 113, 0.3)',
  },
  '&.ongoing': {
    background: 'rgba(241, 196, 15, 0.2)',
    color: '#f1c40f',
    border: '1px solid rgba(241, 196, 15, 0.3)',
  },
  '&.planning': {
    background: 'rgba(52, 152, 219, 0.2)',
    color: '#3498db',
    border: '1px solid rgba(52, 152, 219, 0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
    height: '22px',
  },
}));

const ShowMoreButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  color: 'white',
  padding: '12px 30px',
  borderRadius: '25px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  margin: '40px auto 0',
  display: 'block',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #2980b9, #27ae60)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(52, 152, 219, 0.3)',
  },
  [theme.breakpoints.down('md')]: {
    padding: '10px 25px',
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px 20px',
    fontSize: '0.8rem',
  },
}));

const ProjectShowcase = ({ selectedCategory = 'all' }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const tabs = [
    { label: 'Tümü', value: 'all' },
    { label: 'Tamamlanan', value: 'completed' },
    { label: 'Devam Eden', value: 'ongoing' },
    { label: 'Planlanan', value: 'planning' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Modern Konutlar Sitesi',
      description: 'İstanbul\'da modern mimariye sahip 120 daireli lüks konut projesi. Sosyal tesisler ve yeşil alanlarla donatılmış.',
      location: 'Kadıköy, İstanbul',
      year: 2023,
      type: 'Konut',
      status: 'completed',
      category: 'residential'
    },
    {
      id: 2,
      title: 'Business Plaza',
      description: 'Ankara\'nın merkezinde 25 katlı modern ofis binası. A+ sınıfı ofis alanları ve konferans merkezleri.',
      location: 'Çankaya, Ankara',
      year: 2022,
      type: 'Ticari',
      status: 'completed',
      category: 'commercial'
    },
    {
      id: 3,
      title: 'Ege Villa Serisi',
      description: 'İzmir\'de deniz manzaralı 15 adet müstakil villa projesi. Özel bahçeler ve kapalı otoparklar.',
      location: 'Çeşme, İzmir',
      year: 2021,
      type: 'Villa',
      status: 'completed',
      category: 'villa'
    },
    {
      id: 4,
      title: 'Teknoloji Kampüsü',
      description: 'Bursa\'da teknoloji şirketleri için tasarlanan modern kampüs projesi. Sürdürülebilir enerji çözümleri.',
      location: 'Nilüfer, Bursa',
      year: 2023,
      type: 'Ticari',
      status: 'ongoing',
      category: 'commercial'
    },
    {
      id: 5,
      title: 'Marmara Residence',
      description: 'İstanbul\'da 200 daireli karma kullanımlı proje. Alışveriş alanları ve sosyal tesisler içeriyor.',
      location: 'Maltepe, İstanbul',
      year: 2024,
      type: 'Karma',
      status: 'ongoing',
      category: 'residential'
    },
    {
      id: 6,
      title: 'Endüstri Merkezi',
      description: 'Kocaeli\'nde modern endüstriyel tesis projesi. Lojistik ve üretim alanları bir arada.',
      location: 'Gebze, Kocaeli',
      year: 2024,
      type: 'Endüstriyel',
      status: 'planning',
      category: 'industrial'
    }
  ];

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Tamamlandı';
      case 'ongoing': return 'Devam Ediyor';
      case 'planning': return 'Planlama';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    return status;
  };

  const filteredProjects = projects.filter(project => {
    if (activeTab === 0) return true; // Tümü
    const statusMap = ['all', 'completed', 'ongoing', 'planning'];
    return project.status === statusMap[activeTab];
  });

  const displayedProjects = showMore ? filteredProjects : filteredProjects.slice(0, 6);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setShowMore(false);
  };

  const handleProjectClick = (project) => {
    console.log('Proje detayı:', project);
  };

  return (
    <ContentSection>
      <SectionTitle>Öne Çıkan Projelerimiz</SectionTitle>
      
      <Box display="flex" justifyContent="center" mb="40px">
        <StyledTabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </StyledTabs>
      </Box>

      <ProjectsGrid container spacing={4}>
        {displayedProjects.map((project, index) => (
          <Grid item xs={12} sm={6} lg={4} key={project.id}>
            <ProjectCard onClick={() => handleProjectClick(project)}>
              <ProjectImage className="project-image">
                <ProjectImagePlaceholder>
                  <Apartment />
                </ProjectImagePlaceholder>
                <ViewButton 
                  className="view-button"
                  startIcon={<Visibility />}
                >
                  Detayları Gör
                </ViewButton>
              </ProjectImage>
              
              <ProjectCardContent>
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb="10px">
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectStatus 
                      label={getStatusLabel(project.status)}
                      className={getStatusClass(project.status)}
                    />
                  </Box>
                  
                  <ProjectDescription>{project.description}</ProjectDescription>
                  
                  <ProjectDetails>
                    <DetailItem>
                      <LocationOn />
                      <span>{project.location}</span>
                    </DetailItem>
                    <DetailItem>
                      <CalendarToday />
                      <span>{project.year}</span>
                    </DetailItem>
                    <DetailItem>
                      <Apartment />
                      <span>{project.type}</span>
                    </DetailItem>
                  </ProjectDetails>
                </Box>
              </ProjectCardContent>
            </ProjectCard>
          </Grid>
        ))}
      </ProjectsGrid>

      {filteredProjects.length > 6 && (
        <ShowMoreButton
          onClick={() => setShowMore(!showMore)}
          endIcon={<ArrowForward />}
        >
          {showMore ? 'Daha Az Göster' : `${filteredProjects.length - 6} Proje Daha Göster`}
        </ShowMoreButton>
      )}
    </ContentSection>
  );
};

export default ProjectShowcase;