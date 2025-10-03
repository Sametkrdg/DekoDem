// pages/Projects.js
import React from 'react';
import ProjectsHeader from '../components/ProjectsHeader';
import ProjectsGrid from '../components/ProjectsGrid';
import StatsSection from '../components/StatsSection';
import { SectionContainer } from '../styles/StyledComponents';

const Projects = () => {
  const projeler = [
    { 
      ad: "Modern Konutlar", 
      yer: "İstanbul", 
      yıl: 2023,
      durum: "Tamamlandı",
      aciklama: "Çağdaş mimarisi ve sürdürülebilir tasarımıyla öne çıkan lüks konut projesi. Akıllı ev teknolojileri ve enerji verimli sistemlerle donatılmış modern yaşam alanları.",
      icon: "🏠",
      alan: "15.000 m²"
    },
    { 
      ad: "Ofis Plaza", 
      yer: "Ankara", 
      yıl: 2022,
      durum: "Devam Ediyor",
      aciklama: "A sınıfı ofis binası olarak tasarlanan modern iş merkezi projesi. Çalışanlar için konforlu ve verimli çalışma ortamları sunan yenilikçi tasarım.",
      icon: "🏢",
      alan: "25.000 m²"
    },
    { 
      ad: "Villa Serisi", 
      yer: "İzmir", 
      yıl: 2021,
      durum: "Tamamlandı",
      aciklama: "Deniz manzaralı özel tasarım villa kompleksi projesi. Her villa kendine özel bahçe ve havuz alanlarıyla lüks yaşam sunan prestijli proje.",
      icon: "🏡",
      alan: "8.500 m²"
    },
    { 
      ad: "Endüstriyel Kompleks", 
      yer: "Bursa", 
      yıl: 2024,
      durum: "Planlama",
      aciklama: "Yenilikçi üretim tesisleri için tasarlanan endüstriyel proje. Modern teknoloji altyapısı ve çevre dostu üretim süreçlerini destekleyen tesis.",
      icon: "🏭",
      alan: "50.000 m²"
    },
    {
      ad: "Alışveriş Merkezi",
      yer: "Antalya",
      yıl: 2023,
      durum: "Tamamlandı",
      aciklama: "Modern mimarisi ve geniş açık alanlarıyla şehrin yeni buluşma noktası. Sürdürülebilir tasarım prensipleriyle inşa edilmiş çok amaçlı kompleks.",
      icon: "🛍️",
      alan: "30.000 m²"
    },
    {
      ad: "Rezidans Projesi",
      yer: "Bodrum",
      yıl: 2024,
      durum: "Devam Ediyor",
      aciklama: "Denize sıfır konumuyla öne çıkan lüks rezidans projesi. Panoramik Ege manzarası ve özel marina erişimiyle benzersiz yaşam deneyimi.",
      icon: "🏖️",
      alan: "12.000 m²"
    }
  ];

  return (
    <SectionContainer maxWidth="lg">
      <ProjectsHeader />
      <ProjectsGrid projeler={projeler} />
      <StatsSection />
    </SectionContainer>
  );
};

export default Projects;