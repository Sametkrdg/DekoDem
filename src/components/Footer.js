// Footer.js
import React from 'react';
import { Typography, Container, Button, Grid, Box } from "@mui/material";
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

// Ortak styled components'leri import et
import {
  FooterContainer,
  MainFooter,
  FooterSection,
  LogoContainer,
  LogoText,
  LogoSubtext,
  SectionTitle,
  SocialMediaContainer,
  SocialButton,
  ServiceItem,
  ContactItem,
  ContactText,
  CopyrightSection,
  CopyrightText
} from '../styles/StyledComponents';

function Footer({ settings }) {
  const siteTitle = settings?.title || 'Sedat Demir Yapı';
  const description = settings?.description || 'Güvenilir inşaat çözümleri ve kaliteli hizmet anlayışı ile 15 yıldır sektörde lider konumundayız.';

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
                    {siteTitle}
                  </LogoText>
                  <LogoSubtext>
                    {description}
                  </LogoSubtext>
                </LogoContainer>

                <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 2, color: '#ecf0f1' }}>
                  Bizi Takip Edin
                </Typography>

                <SocialMediaContainer>
                  {settings?.facebookUrl && (
                    <SocialButton 
                      component="a" 
                      href={settings.facebookUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Facebook"
                    >
                      <Facebook />
                    </SocialButton>
                  )}
                  {settings?.instagramUrl && (
                    <SocialButton 
                      component="a" 
                      href={settings.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Instagram"
                    >
                      <Instagram />
                    </SocialButton>
                  )}
                  {settings?.linkedinUrl && (
                    <SocialButton 
                      component="a" 
                      href={settings.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="LinkedIn"
                    >
                      <LinkedIn />
                    </SocialButton>
                  )}
                  {settings?.youtubeUrl && (
                    <SocialButton 
                      component="a" 
                      href={settings.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="YouTube"
                    >
                      <YouTube />
                    </SocialButton>
                  )}
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
                  to="/kategoriler"
                  variant="outlined"
                  sx={{ mt: 2 }}
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
                  <Phone color="primary" />
                  <Box>
                    <ContactText variant="body2">
                      +90 (555) 123 45 67
                    </ContactText>
                  </Box>
                </ContactItem>

                <ContactItem>
                  <Email color="primary" />
                  <ContactText variant="body2">
                    info@sedatdemiryapi.com
                  </ContactText>
                </ContactItem>

                <ContactItem>
                  <LocationOn color="primary" />
                  <ContactText variant="body2">
                    Çankaya Mahallesi, İnşaat Sokak No:15<br />
                    Ankara / TÜRKİYE
                  </ContactText>
                </ContactItem>

                <Button
                  component={Link}
                  to="/iletisim"
                  variant="contained"
                  sx={{ mt: 3 }}
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
            © {new Date().getFullYear()} {siteTitle}. Tüm hakları saklıdır. |
            Tasarım & Geliştirme: Web Ajansı
          </CopyrightText>
        </Container>
      </CopyrightSection>
    </FooterContainer>
  );
}

export default Footer;
