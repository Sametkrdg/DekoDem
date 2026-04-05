// React
import React from 'react';

// Third-party
import {
  Home as HomeIcon,
  Business,
  Engineering,
  Apartment,
  SquareFoot,
  Roofing,
  Plumbing,
  ElectricalServices,
} from '@mui/icons-material';

/**
 * Static activity-field definitions.
 * Each entry maps to a Firestore category document via `slug`.
 * The `icon` field is a MUI SvgIcon element — pass it directly to <SvgIcon />.
 */
const activityData = [
  {
    id: 'konut-insaati',
    title: 'Konut İnşaatı',
    slug: 'konut-insaati',
    icon: <HomeIcon />,
    description:
      'Anahtar teslim villa, müstakil ev ve çok katlı konut projeleri. Deprem yönetmeliğine tam uygunluk.',
  },
  {
    id: 'ticari-yapi',
    title: 'Ticari Yapılar',
    slug: 'ticari-yapi',
    icon: <Business />,
    description:
      'Ofis binaları, alışveriş merkezleri ve endüstriyel tesisler için anahtar teslim çözümler.',
  },
  {
    id: 'insaat-muhendisligi',
    title: 'İnşaat Mühendisliği',
    slug: 'insaat-muhendisligi',
    icon: <Engineering />,
    description:
      'Statik proje, zemin etüdü, yapı denetimi ve teknik danışmanlık hizmetleri.',
  },
  {
    id: 'yuksek-bina',
    title: 'Yüksek Yapılar',
    slug: 'yuksek-bina',
    icon: <Apartment />,
    description:
      'Modern mimari ile tasarlanmış çok katlı rezidans ve karma kullanımlı yapı projeleri.',
  },
  {
    id: 'mimari-tasarim',
    title: 'Mimari Tasarım',
    slug: 'mimari-tasarim',
    icon: <SquareFoot />,
    description:
      'Estetik ve işlevselliği bir arada sunan mimari proje tasarımı ve 3D görselleştirme.',
  },
  {
    id: 'cati-sistemleri',
    title: 'Çatı Sistemleri',
    slug: 'cati-sistemleri',
    icon: <Roofing />,
    description:
      'Düz çatı, eğimli çatı ve yeşil çatı sistemleri — montaj, yalıtım ve bakım.',
  },
  {
    id: 'tesisat',
    title: 'Sıhhi Tesisat',
    slug: 'tesisat',
    icon: <Plumbing />,
    description:
      'Su, atık su ve doğalgaz tesisat projelendirmesi ve uygulaması.',
  },
  {
    id: 'elektrik-tesisati',
    title: 'Elektrik Tesisatı',
    slug: 'elektrik-tesisati',
    icon: <ElectricalServices />,
    description:
      'Güçlü ve zayıf akım tesisatı, otomasyon sistemleri ve enerji verimliliği çözümleri.',
  },
];

export default activityData;
