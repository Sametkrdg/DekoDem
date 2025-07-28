import React from 'react';
import { Box, Typography, Container, Button, Grid, IconButton, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  LinkedIn, 
  YouTube,
  Phone,
  Email,
  LocationOn,
  Construction,
  Home,
  Business,
  Engineering
} from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  color: '#fff',
  marginTop: 'auto',
}));

const MainFooter = styled(Box)(({ theme }) => ({
  padding: '60px 0 40px 0',
  [theme.breakpoints.down('md')]: {
    padding: '40px 0 30px 0',
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  height: '100%',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  marginBottom: '20px',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '10px',
}));

const LogoSubtext = styled(Typography)(({ theme }) => ({
  color: '#bdc3c7',
  fontSize: '0.9rem',
  marginBottom: '25px',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: '600',
  marginBottom: '25px',
  color: '#ecf0f1',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '40px',
    height: '3px',
    background: 'linear-gradient(90deg, #3498db, #2ecc71)',
    borderRadius: '2px',
  },
}));

const SocialMediaContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  marginTop: '20px',
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255,255,255,0.1)',
  color: '#ecf0f1',
  width: '45px',
  height: '45px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    background: 'linear-gradient(135deg, #3498db, #2ecc71)',
    boxShadow: '0 8px 20px rgba(52, 152, 219, 0.4)',
  },
}));

const ServiceItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '15px',
  color: '#bdc3c7',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    color: '#3498db',
    transform: 'translateX(5px)',
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '15px',
  color: '#bdc3c7',
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.5,
}));

const CopyrightSection = styled(Box)(({ theme }) => ({
  background: 'rgba(0,0,0,0.2)',
  padding: '20px 0',
  borderTop: '1px solid rgba(255,255,255,0.1)',
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: '#95a5a6',
  fontSize: '0.9rem',
  textAlign: 'center',
}));

function Footer() {
  const services = [
    { name: 'Konut İnşaatı', icon: <Home sx={{ fontSize: 18 }} /> },
    { name: 'Ticari Yapılar', icon: <Business sx={{ fontSize: 18 }} /> },
    { name: 'Tadilat & Renovasyon', icon: <Construction sx={{ fontSize: 18 }} /> },
    { name: 'Proje Yönetimi', icon: <Engineering sx={{ fontSize: 18 }} /> },
  ];

  return (
    <FooterContainer component="footer">
      <MainFooter>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Sol Kısım - Logo ve Sosyal Medya */}
            <Grid item xs={12} md={4}>
              <FooterSection>
                <LogoContainer>
                  <LogoText>
                    Sedat Demir Yapı
                  </LogoText>
                  <LogoSubtext>
                    Güvenilir inşaat çözümleri ve kaliteli hizmet anlayışı ile 15 yıldır sektörde lider konumundayız.
                  </LogoSubtext>
                </LogoContainer>

                <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 2, color: '#ecf0f1' }}>
                  Bizi Takip Edin
                </Typography>
                
                <SocialMediaContainer>
                  <SocialButton aria-label="Facebook">
                    <Facebook />
                  </SocialButton>
                  <SocialButton aria-label="Instagram">
                    <Instagram />
                  </SocialButton>
                  <SocialButton aria-label="LinkedIn">
                    <LinkedIn />
                  </SocialButton>
                  <SocialButton aria-label="YouTube">
                    <YouTube />
                  </SocialButton>
                </SocialMediaContainer>
              </FooterSection>
            </Grid>

            {/* Orta Kısım - Faaliyetlerimiz */}
            <Grid item xs={12} md={4}>
              <FooterSection>
                <SectionTitle>
                  Faaliyetlerimiz
                </SectionTitle>
                
                {services.map((service, index) => (
                  <ServiceItem key={index}>
                    {service.icon}
                    <Typography variant="body2">
                      {service.name}
                    </Typography>
                  </ServiceItem>
                ))}
                
                <Button 
                  component={Link} 
                  to="/faaliyet-alanlari"
                  variant="outlined"
                  sx={{ 
                    mt: 2,
                    color: '#3498db',
                    borderColor: '#3498db',
                    '&:hover': {
                      borderColor: '#2ecc71',
                      color: '#2ecc71',
                      background: 'rgba(46, 204, 113, 0.1)',
                    }
                  }}
                >
                  Tümünü Gör
                </Button>
              </FooterSection>
            </Grid>

            {/* Sağ Kısım - İletişim */}
            <Grid item xs={12} md={4}>
              <FooterSection>
                <SectionTitle>
                  İletişim
                </SectionTitle>
                
                <ContactItem>
                  <Phone sx={{ color: '#3498db' }} />
                  <Box>
                    <ContactText variant="body2">
                      +90 (555) 123 45 67
                    </ContactText>
                    <ContactText variant="body2">
                      +90 (555) 765 43 21
                    </ContactText>
                  </Box>
                </ContactItem>

                <ContactItem>
                  <Email sx={{ color: '#3498db' }} />
                  <ContactText variant="body2">
                    info@sedatdemiryapi.com
                  </ContactText>
                </ContactItem>

                <ContactItem>
                  <LocationOn sx={{ color: '#3498db' }} />
                  <ContactText variant="body2">
                    Çankaya Mahallesi, İnşaat Sokak No:15<br />
                    Ankara / TÜRKİYE
                  </ContactText>
                </ContactItem>

                <Button 
                  component={Link} 
                  to="/iletisim"
                  variant="contained"
                  sx={{ 
                    mt: 3,
                    background: 'linear-gradient(135deg, #3498db, #2ecc71)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2980b9, #27ae60)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(52, 152, 219, 0.4)',
                    }
                  }}
                >
                  İletişime Geç
                </Button>
              </FooterSection>
            </Grid>
          </Grid>
        </Container>
      </MainFooter>

      {/* Copyright Bölümü */}
      <CopyrightSection>
        <Container maxWidth="lg">
          <CopyrightText>
            © {new Date().getFullYear()} Sedat Demir Yapı. Tüm hakları saklıdır. | 
            Tasarım & Geliştirme: Web Ajansı
          </CopyrightText>
        </Container>
      </CopyrightSection>
    </FooterContainer>
  );
}

export default Footer;