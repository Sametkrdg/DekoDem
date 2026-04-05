import projects from "../data/projects";
import activities from "../data/activities";

export const DEFAULT_HOME_VIDEOS = [
  {
    title: "Proje Tanıtımı 1",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "İnşaat Süreci",
    url: "https://www.youtube.com/watch?v=L_jWHffIx5E",
  },
  {
    title: "Final Görünüm",
    url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
  {
    title: "Villa Projesi",
    url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
  },
  {
    title: "Modern Tasarım",
    url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
  },
  {
    title: "İç Mekan",
    url: "https://www.youtube.com/watch?v=uelHwf8o7_U",
  },
  {
    title: "Ofis Binası",
    url: "https://www.youtube.com/watch?v=hFZFjoX2cGg",
  },
  {
    title: "Dış Cephe",
    url: "https://www.youtube.com/watch?v=y6120QOlsfU",
  },
  {
    title: "Peyzaj Düzenlemesi",
    url: "https://www.youtube.com/watch?v=Ct6BUPvE2sM",
  },
];

export const DEFAULT_GALLERY_PHOTOS = [
  {
    id: "modern-konutlar",
    title: "Modern Konutlar",
    description: "Modern yaşam alanlarımızdan bir kare",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: "ofis-plaza",
    title: "Ofis Plaza",
    description: "Kurumsal projelerimizden detay",
    url: "https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1",
  },
  {
    id: "villa-serisi",
    title: "Villa Serisi",
    description: "Lüks villa tasarımlarımızdan bir görünüm",
    url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
];

const cloneProjects = () => projects.map((project) => ({ ...project }));

const cloneActivities = () => activities.map((activity) => ({ ...activity }));

const DEFAULT_SITE_CONFIG = {
  title: "DEKODEM",
  aboutTitle: "DEKODEM",
  aboutBody:
    "DEKODEM, Kocaeli / İzmit merkezli olarak faaliyet gösteren, dekorasyon ve anahtar teslim projelerde uzmanlaşmış bir uygulama firmasıdır. Fabrika, ofis, depo ve tüm ticari alanlarda A'dan Z'ye tüm uygulama süreçlerini profesyonel bir yaklaşımla yönetmekteyiz.",
  logoUrl: "",
  socials: {},
  videos: DEFAULT_HOME_VIDEOS.map((video) => video.url),
  updatedAt: null,
};

const defaultSiteContent = {
  homepageVideos: DEFAULT_HOME_VIDEOS.map((video) => ({ ...video })),
  galleryPhotos: DEFAULT_GALLERY_PHOTOS.map((photo) => ({ ...photo })),
  projects: cloneProjects(),
  activities: cloneActivities(),
  config: { ...DEFAULT_SITE_CONFIG },
  media: [],
};

export const createDefaultSiteContent = () => ({
  homepageVideos: DEFAULT_HOME_VIDEOS.map((video) => ({ ...video })),
  galleryPhotos: DEFAULT_GALLERY_PHOTOS.map((photo) => ({ ...photo })),
  projects: cloneProjects(),
  activities: cloneActivities(),
  config: { ...DEFAULT_SITE_CONFIG },
  media: [],
});

export default defaultSiteContent;
