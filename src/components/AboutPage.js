import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { 
  ArrowForward, 
  CheckCircle, 
  Engineering, 
  Business, 
  Star,
  Timeline,
  Group,
  Security,
  Build,
  HomeWork,
  Architecture,
  Construction,
  Assignment,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';

// Animasyonlar
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

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const MainContainer = styled(Container)(({ theme }) => ({
  padding: 0,
  maxWidth: '100% !important',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
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

const TimelineSidebar = styled(Box)(({ theme }) => ({
  width: '30%',
  minHeight: '100vh',
  position: 'sticky',
  top: 0,
  background: 'rgba(255,255,255,0.03)',
  borderRight: '1px solid rgba(255,255,255,0.1)',
  padding: '60px 20px',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    minHeight: 'auto',
    position: 'relative',
    padding: '40px 20px',
    borderRight: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  width: '70%',
  minHeight: '100vh',
  zIndex: 1,
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}));

const Section = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: '80px 40px',
  [theme.breakpoints.down('md')]: {
    padding: '60px 20px',
  },
}));

const HeroSection = styled(Section)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ContentSection = styled(Section)(({ theme }) => ({
  background: 'rgba(255,255,255,0.02)',
  backdropFilter: 'blur(10px)',
}));

const HeroContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  minHeight: '700px',
  gap: '60px',
  maxWidth: '1400px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '40px',
    minHeight: 'auto',
  },
}));

const ImageSection = styled(Box)(({ theme }) => ({
  flex: '0 0 45%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  [theme.breakpoints.down('md')]: {
    flex: '1',
  },
}));

const TextSection = styled(Box)(({ theme }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '400px',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  animation: `${fadeInLeft} 1s ease-out, ${floatAnimation} 6s ease-in-out infinite`,
  background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
    zIndex: 1,
  },
}));

const SmallImageContainer = styled(ImageContainer)(({ theme }) => ({
  height: '260px',
  animation: `${fadeInLeft} 1s ease-out 0.2s both`,
}));

const PlaceholderImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
  position: 'relative',
  zIndex: 3,
}));

const TextContainer = styled(Box)(({ theme }) => ({
  animation: `${fadeInRight} 1s ease-out 0.3s both`,
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '1rem',
  lineHeight: 1.2,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: 0,
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #3498db, #2ecc71)',
    borderRadius: '2px',
  },
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
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  color: '#bdc3c7',
  marginBottom: '2rem',
  fontWeight: 300,
  lineHeight: 1.6,
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#ecf0f1',
  lineHeight: 1.8,
  marginBottom: '2rem',
  textAlign: 'justify',
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '30px',
  marginBottom: '3rem',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: '20px',
    justifyContent: 'center',
  },
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '20px 25px',
  background: 'rgba(52, 152, 219, 0.15)',
  borderRadius: '16px',
  border: '1px solid rgba(52, 152, 219, 0.3)',
  transition: 'all 0.3s ease',
  minWidth: '180px',
  '&:hover': {
    background: 'rgba(52, 152, 219, 0.25)',
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(52, 152, 219, 0.15)',
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#3498db',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#bdc3c7',
  fontWeight: 500,
}));

const ValuesGrid = styled(Grid)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  animation: `${fadeInUp} 1s ease-out`,
}));

const ValueCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px',
  textAlign: 'center',
  height: '350px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    background: 'rgba(255,255,255,0.08)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  },
}));

const ValueCardContent = styled(CardContent)(({ theme }) => ({
  padding: '30px !important',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ValueTopSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ValueBottomSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '15px',
}));

const ValueIcon = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  '& svg': {
    fontSize: '40px',
    color: 'white',
  },
}));

const ValueTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 600,
  color: '#ecf0f1',
  marginBottom: '15px',
}));

const ValueDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#bdc3c7',
  lineHeight: 1.6,
  textAlign: 'center',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  height: '100%',
  maxHeight: '100px',
}));

const TimelineContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '15px',
    top: '60px',
    bottom: '60px',
    width: '2px',
    background: 'linear-gradient(180deg, #3498db, #2ecc71)',
    [theme.breakpoints.down('lg')]: {
      left: '12px',
    },
    [theme.breakpoints.down('md')]: {
      left: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      left: '8px',
    },
  },
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  position: 'relative',
  marginLeft: '40px',
  [theme.breakpoints.down('lg')]: {
    marginLeft: '35px',
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '25px',
  },
}));

const TimelineContent = styled(Box)(({ theme }) => ({
  padding: '15px',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  width: '100%',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: 'rgba(255,255,255,0.08)',
    transform: 'translateX(5px)',
    '& .timeline-description': {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateY(0)',
    },
  },
}));

const TimelineDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: '#bdc3c7',
  lineHeight: 1.4,
  marginTop: '8px',
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(-10px)',
  transition: 'all 0.3s ease',
  position: 'absolute',
  top: '100%',
  left: '0',
  right: '0',
  background: 'rgba(44, 62, 80, 0.95)',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  zIndex: 10,
  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
  [theme.breakpoints.up('lg')]: {
    position: 'static',
    opacity: 1,
    visibility: 'visible',
    transform: 'none',
    background: 'transparent',
    border: 'none',
    padding: '0',
    boxShadow: 'none',
    backdropFilter: 'none',
    marginTop: '8px',
  },
}));

const TimelineDot = styled(Box)(({ theme }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  position: 'absolute',
  left: '-46px',
  top: '20px',
  zIndex: 2,
  boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)',
  [theme.breakpoints.down('lg')]: {
    left: '-41px',
    width: '10px',
    height: '10px',
  },
  [theme.breakpoints.down('md')]: {
    left: '-36px',
    width: '8px',
    height: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    left: '-31px',
    width: '8px',
    height: '8px',
  },
}));

const TimelineTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '5px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '1.1rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const TimelineSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#ecf0f1',
  [theme.breakpoints.down('lg')]: {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.75rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  color: 'white',
  padding: '15px 35px',
  borderRadius: '50px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 25px rgba(52, 152, 219, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(52, 152, 219, 0.4)',
    background: 'linear-gradient(135deg, #2980b9, #27ae60)',
    '&::before': {
      left: '100%',
    },
  },
}));

const ContactSection = styled(Box)(({ theme }) => ({
  background: 'rgba(255,255,255,0.03)',
  borderRadius: '24px',
  padding: '40px',
  marginTop: '60px',
  textAlign: 'center',
  border: '1px solid rgba(255,255,255,0.1)',
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginTop: '30px',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: '20px',
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: '#bdc3c7',
  fontSize: '1rem',
  '& svg': {
    color: '#3498db',
  },
}));

const AboutPage = () => {
  const stats = [
    { number: '15+', label: 'Yıl Deneyim', icon: <Star sx={{ color: '#3498db' }} /> },
    { number: '150+', label: 'Tamamlanan Proje', icon: <Engineering sx={{ color: '#2ecc71' }} /> },
    { number: '75+', label: 'Mutlu Müşteri', icon: <Business sx={{ color: '#3498db' }} /> },
    { number: '25+', label: 'Uzman Ekip', icon: <Group sx={{ color: '#2ecc71' }} /> }
  ];

  const values = [
    {
      icon: <Security />,
      title: 'Güvenilirlik',
      description: 'Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temel taşıdır. Sözümüzü tutmak ve kaliteli hizmet sunmak önceliğimizdir.'
    },
    {
      icon: <Build />,
      title: 'Kalite',
      description: 'En kaliteli malzemeleri kullanarak, uzman ekibimizle her projede mükemmelliği hedefliyoruz.'
    },
    {
      icon: <Timeline />,
      title: 'Deneyim',
      description: '15 yıllık sektör deneyimimizle, her türlü inşaat projesinde uzmanlaşmış durumdayız.'
    },
    {
      icon: <HomeWork />,
      title: 'Yenilik',
      description: 'Modern teknolojileri takip ederek, projelerimizde çağdaş çözümler sunuyoruz.'
    }
  ];

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
      <TimelineSidebar>
        <Box>
          <SectionTitle style={{ textAlign: 'left', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', marginBottom: '30px' }}>
            Tarihçemiz
          </SectionTitle>
        </Box>
        
        <TimelineContainer>
          {timeline.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineDot />
              <TimelineContent>
                <TimelineTitle>{item.year}</TimelineTitle>
                <TimelineSubtitle>{item.title}</TimelineSubtitle>
                <TimelineDescription className="timeline-description">
                  {item.description}
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </TimelineSidebar>

      {/* Sağ İçerik Alanı */}
      <MainContent>
        {/* Hero Section */}
        <HeroSection>
          <HeroContent>
            <ImageSection>
              <ImageContainer>
                <PlaceholderImage>
                  <Construction sx={{ fontSize: 80, opacity: 0.8 }} />
                </PlaceholderImage>
              </ImageContainer>
              <SmallImageContainer>
                <PlaceholderImage>
                  <Architecture sx={{ fontSize: 60, opacity: 0.8 }} />
                </PlaceholderImage>
              </SmallImageContainer>
            </ImageSection>

            <TextSection>
              <TextContainer>
                <MainTitle>
                  Sedat Demir Yapı Hakkında
                </MainTitle>
                
                <SubTitle>
                  Güvenilir İnşaat Çözümleri ve Kaliteli Hizmet Anlayışı
                </SubTitle>

                <Description>
                  2009 yılında kurulan Sedat Demir Yapı, 15 yılı aşkın sektör deneyimi ile inşaat 
                  ve yapı sektöründe güvenilir bir marka haline gelmiştir. Modern teknoloji ve geleneksel 
                  ustalığı harmanlayarak, konut, ticari ve endüstriyel projelerde fark yaratan çözümler sunuyoruz.
                </Description>

                <Description>
                  Müşteri memnuniyeti odaklı yaklaşımımız, kaliteli malzeme kullanımı ve zamanında teslim 
                  ilkelerimizle, projelerinizi hayallerinizden daha güzel hale getiriyoruz. Uzman ekibimiz, 
                  her projede mükemmellik için çalışmakta ve sürekli gelişim göstermektedir.
                </Description>

                <StatsContainer>
                  {stats.map((stat, index) => (
                    <StatItem key={index}>
                      {stat.icon}
                      <Box>
                        <StatNumber>{stat.number}</StatNumber>
                        <StatLabel>{stat.label}</StatLabel>
                      </Box>
                    </StatItem>
                  ))}
                </StatsContainer>
              </TextContainer>
            </TextSection>
          </HeroContent>
        </HeroSection>

        {/* Değerlerimiz Section */}
        <ContentSection>
          <SectionTitle>Değerlerimiz</SectionTitle>
          <ValuesGrid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <ValueCard>
                  <ValueCardContent>
                    <ValueTopSection>
                      <ValueIcon>
                        {value.icon}
                      </ValueIcon>
                      <ValueTitle>{value.title}</ValueTitle>
                    </ValueTopSection>
                    <ValueBottomSection>
                      <ValueDescription>{value.description}</ValueDescription>
                    </ValueBottomSection>
                  </ValueCardContent>
                </ValueCard>
              </Grid>
            ))}
          </ValuesGrid>
        </ContentSection>

        {/* İletişim Section */}
        <ContentSection>
          <ContactSection>
            <SectionTitle style={{ marginBottom: '20px' }}>Bizimle İletişime Geçin</SectionTitle>
            <Description style={{ textAlign: 'center', marginBottom: '30px' }}>
              Projeleriniz için detaylı bilgi almak ve ücretsiz keşif randevusu ayarlamak için bizimle iletişime geçin.
            </Description>
            
            <ContactInfo>
              <ContactItem>
                <Phone />
                <span>+90 555 123 4567</span>
              </ContactItem>
              <ContactItem>
                <Email />
                <span>info@sedatdemiryapi.com</span>
              </ContactItem>
              <ContactItem>
                <LocationOn />
                <span>İstanbul, Türkiye</span>
              </ContactItem>
            </ContactInfo>

            <Box sx={{ mt: 4 }}>
              <CTAButton 
                endIcon={<ArrowForward />}
                onClick={() => window.location.href = '/iletisim'}
              >
                İletişime Geç
              </CTAButton>
            </Box>
          </ContactSection>
        </ContentSection>
      </MainContent>
    </MainContainer>
  );
};

export default AboutPage;