import React from 'react';
import { Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TimelineSidebar from '../components/TimelineSidebar';
import HeroSection from '../components/HeroSection';
import ValuesSection from '../components/ValueSection';
import ContactSection from '../components/ContactSection';

const MainContainer = styled(Container)(({ theme }) => ({
  padding: 0,
  maxWidth: '100% !important',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'row',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
  },
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
  width: '70%',
  minHeight: '100vh',
  zIndex: 1,
  [theme.breakpoints.down('lg')]: {
    width: '75%',
  },
  [theme.breakpoints.down('md')]: {
    width: '75%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '75%',
  },
}));

const About = () => {
  const timeline = [
    {
      year: '2009',
      title: 'Kuruluş',
      description: 'Sedat Demir Yapı, küçük ölçekli konut projeleriyle sektöre adım attı ve güvenilir bir işletme olarak temellerini attı.'
    },
    {
      year: '2012',
      title: 'Büyük Proje',
      description: '50 daireli konut kompleksimizi başarıyla tamamladık ve sektördeki yerimizi sağlamlaştırdık. Bu proje deneyim kazanmamızda büyük rol oynadı.'
    },
    {
      year: '2015',
      title: 'Ekip Büyümesi',
      description: 'Artan talep doğrultusunda uzman ekibimizi genişlettik ve hizmet kalitemizi artırdık. Mimar, mühendis ve usta kadromuz güçlendi.'
    },
    {
      year: '2018',
      title: 'Teknoloji Yatırımı',
      description: 'Modern inşaat teknolojilerine yatırım yaparak, projelerimizde çağdaş çözümler sunmaya başladık. Dijital tasarım araçları kullanmaya başladık.'
    },
    {
      year: '2021',
      title: 'Sürdürülebilirlik',
      description: 'Çevre dostu inşaat malzemeleri ve sürdürülebilir yapı teknikleri kullanmaya başladık. Enerji verimli binalar inşa etmeye odaklandık.'
    },
    {
      year: '2024',
      title: 'Dijitalleşme',
      description: 'Dijital proje yönetimi ve müşteri takip sistemlerimizi devreye aldık. BIM teknolojisi ve akıllı bina çözümleri kullanıyoruz.'
    }
  ];

  return (
    <MainContainer>
      {/* Sol Sidebar - Tarihçe */}
      <TimelineSidebar timeline={timeline} />

      {/* Sağ İçerik Alanı */}
      <MainContent>
        {/* Hero Section */}
        <HeroSection />

        {/* Değerlerimiz Section */}
        <ValuesSection />

        {/* İletişim Section */}
        <ContactSection />
      </MainContent>
    </MainContainer>
  );
};

export default About;