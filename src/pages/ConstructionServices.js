import React, { useState, useEffect, useMemo } from 'react';
import { 
  Container, 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Fade,
  Skeleton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  HomeWork,
  Foundation,
  Roofing,
  Construction,
  Engineering,
  Architecture,
  Handyman,
  Security,
  Speed,
  CheckCircle,
  Star,
  Group,
  Timeline,
  Build
} from '@mui/icons-material';

// Styled Components from your existing theme
import {
  PageTitle,
  SectionHeading,
  SectionContainer,
  ServiceCard,
  CTAButton,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  ResponsiveGrid,
  FeatureCard,
  StatItem,
  StatsContainer,
  GradientText,
  DescriptionText
} from '../styles/StyledComponents';

// ===== STYLED COMPONENTS =====
const MainContainer = styled(Container)(({ theme }) => ({
  padding: 0,
  maxWidth: '100% !important',
  minHeight: '100vh',
  background: theme.mixins.gradientBackground.background,
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 25% 25%, ${theme.palette.primary.main}12 0%, transparent 50%), 
      radial-gradient(circle at 75% 75%, ${theme.palette.secondary.main}12 0%, transparent 50%),
      radial-gradient(circle at 50% 10%, ${theme.palette.primary.light}08 0%, transparent 40%)
    `,
    zIndex: 0,
    animation: 'constructionBg 30s ease-in-out infinite',
  },
  
  '@keyframes constructionBg': {
    '0%, 100%': {
      background: `
        radial-gradient(circle at 25% 25%, ${theme.palette.primary.main}12 0%, transparent 50%), 
        radial-gradient(circle at 75% 75%, ${theme.palette.secondary.main}12 0%, transparent 50%)
      `,
    },
    '50%': {
      background: `
        radial-gradient(circle at 75% 25%, ${theme.palette.secondary.main}15 0%, transparent 55%), 
        radial-gradient(circle at 25% 75%, ${theme.palette.primary.main}15 0%, transparent 55%)
      `,
    },
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  minHeight: '100vh',
}));

const ServiceHeroSection = styled(HeroSection)(({ theme }) => ({
  minHeight: '60vh',
  background: `linear-gradient(135deg, ${theme.palette.neutral?.dark || '#2c3e50'} 0%, ${theme.palette.neutral?.darker || '#34495e'} 100%)`,
  '&::before': {
    background: 'rgba(0,0,0,0.4)',
  }
}));

const ProcessCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  background: theme.palette.background.paper,
  borderRadius: '20px',
  border: `1px solid ${theme.palette.primary.main}20`,
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: theme.palette.gradients?.primary || `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 20px 40px ${theme.palette.primary.main}25`,
    borderColor: theme.palette.primary.main,
  },
  
  '& .step-number': {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: theme.palette.gradients?.primary || theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 600,
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  
  '& .MuiSvgIcon-root': {
    fontSize: '2.5rem',
    color: theme.palette.primary.main,
  },
  
  '&:hover': {
    transform: 'rotate(360deg) scale(1.1)',
  }
}));

// ===== DATA CONSTANTS =====
const CONSTRUCTION_SERVICES = [
  {
    icon: Foundation,
    title: 'Kaba İnşaat Çalışmaları',
    description: 'Temel kazısından çatı konstrüksiyonuna kadar tüm yapısal işler',
    features: [
      'Zemin etüdü ve temel kazısı',
      'Betonarme kolon ve kiriş imalatı',
      'Döşeme ve merdiven yapımı',
      'Duvar örme işlemleri',
      'Su, elektrik, doğalgaz alt yapısı'
    ],
    duration: '3-6 ay',
    complexity: 'Yüksek'
  },
  {
    icon: Roofing,
    title: 'Çatı, Kolon ve Duvar Uygulamaları',
    description: 'Yapının ana iskelet sisteminin profesyonel uygulaması',
    features: [
      'Çelik ve betonarme kolon imalatı',
      'Duvar örgü ve izolasyon işleri',
      'Kiremit ve membran çatı sistemleri',
      'Saçak ve oluk uygulamaları',
      'Isı ve su yalıtımı'
    ],
    duration: '2-4 ay',
    complexity: 'Orta-Yüksek'
  },
  {
    icon: Handyman,
    title: 'İnce İşçilik ve Tamamlayıcı İşler',
    description: 'Yapının estetik ve fonksiyonel detaylarının tamamlanması',
    features: [
      'Sıva ve boyama işlemleri',
      'Seramik ve parke döşeme',
      'Kapı ve pencere montajı',
      'Mutfak ve banyo dolapları',
      'Aydınlatma ve elektrik tesisatı'
    ],
    duration: '2-3 ay',
    complexity: 'Orta'
  },
  {
    icon: HomeWork,
    title: 'Anahtar Teslim Projeler',
    description: 'Tasarımdan teslime kadar komple yapı çözümleri',
    features: [
      'Mimari proje tasarımı',
      'Ruhsat ve izin işlemleri',
      'Komple inşaat yönetimi',
      'İç dekorasyon ve mobilya',
      'Peyzaj ve dış alan düzenlemesi'
    ],
    duration: '8-18 ay',
    complexity: 'Çok Yüksek'
  }
];

const ADDITIONAL_SERVICES = [
  {
    icon: Engineering,
    title: 'Yapı Denetimi',
    description: 'Yapının her aşamasında kalite kontrol ve denetim hizmetleri'
  },
  {
    icon: Architecture,
    title: 'Restorasyon',
    description: 'Tarihi ve eski yapıların yenileme ve güçlendirme işlemleri'
  },
  {
    icon: Security,
    title: 'Yapı Güçlendirme',
    description: 'Deprem ve doğal afetlere karşı yapı güvenliğini artırma'
  },
  {
    icon: Build,
    title: 'Tadilat Hizmetleri',
    description: 'Mevcut yapılarda değişiklik ve iyileştirme çalışmaları'
  }
];

const CONSTRUCTION_PROCESS = [
  {
    step: 1,
    title: 'Proje Tasarımı',
    description: 'Mimari ve statik projelerin hazırlanması, ruhsat işlemleri',
    icon: Architecture
  },
  {
    step: 2,
    title: 'Temel Atma',
    description: 'Zemin hazırlığı, temel kazısı ve betonarme temel imalatı',
    icon: Foundation
  },
  {
    step: 3,
    title: 'Kaba İnşaat',
    description: 'Kolon, kiriş, döşeme ve duvar inşaatının tamamlanması',
    icon: Construction
  },
  {
    step: 4,
    title: 'Çatı ve İzolasyon',
    description: 'Çatı konstrüksiyonu, su yalıtımı ve ısı yalıtımı işlemleri',
    icon: Roofing
  },
  {
    step: 5,
    title: 'İnce İşçilik',
    description: 'Sıva, boyama, döşeme ve tesisat işlerinin yapılması',
    icon: Handyman
  },
  {
    step: 6,
    title: 'Anahtar Teslim',
    description: 'Son kontroller, temizlik ve yasal işlemlerle teslim',
    icon: CheckCircle
  }
];

const COMPANY_STATS = [
  { icon: CheckCircle, value: '500+', label: 'Tamamlanan Proje' },
  { icon: Star, value: '98%', label: 'Müşteri Memnuniyeti' },
  { icon: Group, value: '25+', label: 'Uzman Ekip' },
  { icon: Timeline, value: '15+', label: 'Yıl Deneyim' }
];

// ===== MAIN COMPONENT =====
const ConstructionServices = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [sectionsLoaded, setSectionsLoaded] = useState({
    hero: false,
    services: false,
    process: false,
    additional: false
  });

  // Loading simulation
  useEffect(() => {
    const loadContent = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const sections = Object.keys(sectionsLoaded);
      for (let i = 0; i < sections.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setSectionsLoaded(prev => ({
          ...prev,
          [sections[i]]: true
        }));
      }
      
      setLoading(false);
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <MainContainer>
        <Box p={4}>
          <Skeleton variant="text" height={80} width="60%" />
          <Skeleton variant="text" height={50} width="80%" />
          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3} mt={4}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={300} />
            ))}
          </Box>
        </Box>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <ContentWrapper>
        {/* Hero Section */}
        <Fade in={sectionsLoaded.hero} timeout={600}>
          <ServiceHeroSection>
            <Container maxWidth="lg">
              <HeroTitle>Yapı Hizmetleri</HeroTitle>
              <HeroSubtitle>
                Temelinden çatısına, her aşamada profesyonel inşaat çözümleri. 
                Modern teknikler ve deneyimli ekibimizle hayalinizdeki yapıyı gerçeğe dönüştürüyoruz.
              </HeroSubtitle>
              <CTAButton size="large">
                Hemen Teklif Alın
              </CTAButton>
            </Container>
          </ServiceHeroSection>
        </Fade>

        {/* Company Stats */}
        <SectionContainer>
          <Fade in={sectionsLoaded.hero} timeout={800}>
            <StatsContainer>
              {COMPANY_STATS.map((stat, index) => (
                <StatItem key={index}>
                  <stat.icon sx={{ fontSize: '2rem', color: theme.palette.primary.main }} />
                  <Box textAlign="center">
                    <GradientText variant="h4" sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                      {stat.value}
                    </GradientText>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </StatItem>
              ))}
            </StatsContainer>
          </Fade>
        </SectionContainer>

        {/* Main Services */}
        <SectionContainer>
          <Fade in={sectionsLoaded.services} timeout={1000}>
            <Box>
              <SectionHeading>Ana Hizmetlerimiz</SectionHeading>
              <DescriptionText sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto', mb: 6 }}>
                Kaba inşaattan anahtar teslim projelere kadar geniş hizmet yelpazemizle, 
                her büyüklükte ve türde yapı projenizi başarıyla tamamlıyoruz.
              </DescriptionText>
              
              <ResponsiveGrid columns={2}>
                {CONSTRUCTION_SERVICES.map((service, index) => (
                  <ServiceCard key={index}>
                    <IconContainer>
                      <service.icon />
                    </IconContainer>
                    
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                      {service.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {service.description}
                    </Typography>
                    
                    <Box sx={{ textAlign: 'left', mb: 3 }}>
                      {service.features.map((feature, idx) => (
                        <Box key={idx} display="flex" alignItems="center" sx={{ mb: 1 }}>
                          <CheckCircle sx={{ fontSize: '1rem', color: 'secondary.main', mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" mt="auto">
                      <Box textAlign="center">
                        <Typography variant="caption" color="text.secondary">Süre</Typography>
                        <Typography variant="body2" fontWeight={600}>{service.duration}</Typography>
                      </Box>
                      <Box textAlign="center">
                        <Typography variant="caption" color="text.secondary">Zorluk</Typography>
                        <Typography variant="body2" fontWeight={600}>{service.complexity}</Typography>
                      </Box>
                    </Box>
                  </ServiceCard>
                ))}
              </ResponsiveGrid>
            </Box>
          </Fade>
        </SectionContainer>

        {/* Construction Process */}
        <SectionContainer sx={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <Fade in={sectionsLoaded.process} timeout={1200}>
            <Box>
              <SectionHeading>İnşaat Sürecimiz</SectionHeading>
              <DescriptionText sx={{ textAlign: 'center', maxWidth: '700px', mx: 'auto', mb: 6 }}>
                Profesyonel ekibimiz ile adım adım organize edilmiş süreçlerimizde, 
                her aşamada kalite ve güvenliği ön planda tutuyoruz.
              </DescriptionText>
              
              <ResponsiveGrid columns={3}>
                {CONSTRUCTION_PROCESS.map((process, index) => (
                  <ProcessCard key={index}>
                    <Box className="step-number">{process.step}</Box>
                    
                    <IconContainer>
                      <process.icon />
                    </IconContainer>
                    
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                      {process.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {process.description}
                    </Typography>
                  </ProcessCard>
                ))}
              </ResponsiveGrid>
            </Box>
          </Fade>
        </SectionContainer>

        {/* Additional Services */}
        <SectionContainer>
          <Fade in={sectionsLoaded.additional} timeout={1400}>
            <Box>
              <SectionHeading>Ek Hizmetlerimiz</SectionHeading>
              <DescriptionText sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 6 }}>
                Ana hizmetlerimize ek olarak, yapı sektöründeki tüm ihtiyaçlarınızı karşılayacak 
                kapsamlı çözümler sunuyoruz.
              </DescriptionText>
              
              <ResponsiveGrid columns={isMobile ? 1 : 2}>
                {ADDITIONAL_SERVICES.map((service, index) => (
                  <FeatureCard key={index}>
                    <IconContainer sx={{ width: '60px', height: '60px' }}>
                      <service.icon sx={{ fontSize: '2rem' }} />
                    </IconContainer>
                    
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                      {service.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </FeatureCard>
                ))}
              </ResponsiveGrid>
            </Box>
          </Fade>
        </SectionContainer>

        {/* Call to Action */}
        <SectionContainer>
          <Box textAlign="center">
            <SectionHeading>Projenizi Hayata Geçirelim</SectionHeading>
            <DescriptionText sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 4 }}>
              Uzman ekibimiz ve modern yaklaşımımızla, yapı projenizi en yüksek kalite standartlarında 
              ve zamanında teslim ediyoruz.
            </DescriptionText>
            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              <CTAButton size="large" variant="contained">
                Ücretsiz Keşif
              </CTAButton>
              <CTAButton size="large" variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                Referansları İncele
              </CTAButton>
            </Box>
          </Box>
        </SectionContainer>
      </ContentWrapper>
    </MainContainer>
  );
};

export default ConstructionServices;