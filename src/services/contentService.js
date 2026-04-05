import { db, isFirebaseConfigured } from "../config/firebase";
import {
  createDefaultSiteContent,
    DEFAULT_HOME_VIDEOS,
} from "../constants/defaultSiteContent";
import defaultActivities from "../data/activities";
import defaultProjects from "../data/projects";
import { doc, getDoc, getDocs, collection, setDoc } from "firebase/firestore";

const COLLECTIONS = {
  config: "config",
  activities: "activities",
  projects: "projects",
  media: "media",
};

const CONFIG_DOCUMENT_ID = "site";

const slugify = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const convertTimestamp = (value) => {
  if (!value) {
    return null;
  }

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const createSummary = (text = "", limit = 160) => {
  if (!text) {
    return "";
  }

  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit - 1)}…`;
};

const mapActivity = (docSnapshot, fallback) => {
  if (!docSnapshot?.exists?.()) {
    return null;
  }

  const data = docSnapshot.data();
  const order = typeof data?.order === "number" ? data.order : Number.MAX_SAFE_INTEGER;
  const title = data?.title || "Faaliyet";
  const slug = data?.slug || docSnapshot.id || slugify(title);
  const body = data?.body || "";

  return {
    slug,
    title,
    heroImage: data?.imageUrl || fallback?.heroImage || "",
    summary: data?.summary || createSummary(body),
    description: body,
    body,
    highlights: data?.highlights || fallback?.highlights || [],
    createdAt: convertTimestamp(data?.createdAt),
    isPublished: data?.isPublished ?? true,
    order,
  };
};

const mapActivityFromObject = (activity, index) => {
  if (!activity) {
    return null;
  }

  const fallback = defaultActivities[index] || defaultActivities[0];

  return mapActivity(
    {
      exists: () => true,
      id: activity.slug || activity.id || `activity-${index + 1}`,
      data: () => activity,
    },
    fallback
  );
};

const mapProject = (docSnapshot, fallback) => {
  if (!docSnapshot?.exists?.()) {
    return null;
  }

  const data = docSnapshot.data();
  const title = data?.title || fallback?.ad || "Proje";
  const slug = data?.slug || docSnapshot.id || slugify(title);
  const summary = data?.summary || createSummary(data?.body || fallback?.aciklama || "");

  return {
    slug,
    ad: title,
    aciklama: summary,
    summary,
    yer: data?.location || fallback?.yer || "Belirtilmedi",
    yıl: data?.year || fallback?.yıl || "",
    durum: data?.status || fallback?.durum || "Devam Ediyor",
    alan: data?.area || fallback?.alan || "",
    icon: data?.icon || fallback?.icon || "🏗️",
    imageUrl: data?.imageUrl || fallback?.imageUrl || fallback?.heroImage || "",
    createdAt: convertTimestamp(data?.createdAt),
    isPublished: data?.isPublished ?? true,
    order: typeof data?.order === "number" ? data.order : Number.MAX_SAFE_INTEGER,
    services: data?.services || fallback?.services || [],
    highlights: data?.highlights || fallback?.highlights || [],
  };
};

const mapProjectFromObject = (project, index) => {
  if (!project) {
    return null;
  }

  const fallback = defaultProjects[index] || defaultProjects[0];

  return mapProject(
    {
      exists: () => true,
      id: project.slug || project.id || `project-${index + 1}`,
      data: () => project,
    },
    fallback
  );
};

const mapMedia = (docSnapshot) => {
  if (!docSnapshot?.exists?.()) {
    return null;
  }

  const data = docSnapshot.data();
  const order = typeof data?.order === "number" ? data.order : Number.MAX_SAFE_INTEGER;

  return {
    id: docSnapshot.id,
    title: data?.title || data?.alt || "Medya",
    description: data?.alt || "",
    url: data?.url || "",
    alt: data?.alt || "",
    tags: Array.isArray(data?.tags) ? data.tags : [],
    isPublished: data?.isPublished ?? true,
    order,
  };
};

const normalizeVideos = (videos) => {
  if (!Array.isArray(videos) || !videos.length) {
    return DEFAULT_HOME_VIDEOS.map((video) => ({ ...video }));
  }

  return videos
    .map((video, index) => {
      if (typeof video === "string") {
        return {
          title: `Video ${index + 1}`,
          url: video,
        };
      }

      if (video && typeof video === "object") {
        const { url, title } = video;

        if (!url) {
          return null;
        }

        return {
          title: title || `Video ${index + 1}`,
          url,
        };
      }

      return null;
    })
    .filter(Boolean);
};

const buildContentFromSnapshots = async () => {
  const fallback = createDefaultSiteContent();

  if (!isFirebaseConfigured || !db) {
    return fallback;
  }



  try {
    const configRef = doc(db, COLLECTIONS.config, CONFIG_DOCUMENT_ID);
    const activitiesRef = collection(db, COLLECTIONS.activities);
    const projectsRef = collection(db, COLLECTIONS.projects);
    const mediaRef = collection(db, COLLECTIONS.media);

    const [configSnapshot, activitiesSnapshot, projectsSnapshot, mediaSnapshot] = await Promise.all([
      getDoc(configRef),
      getDocs(activitiesRef),
      getDocs(projectsRef),
      getDocs(mediaRef),
    ]);

    const configData = configSnapshot.exists() ? configSnapshot.data() : {};

    const activities = activitiesSnapshot.docs
      .map((activityDoc, index) =>
        mapActivity(activityDoc, defaultActivities[index] || defaultActivities[0])
      )
      .filter((activity) => activity && activity.isPublished)
      .sort((a, b) => a.order - b.order);

    const projectEntries = projectsSnapshot.docs
      .map((projectDoc, index) =>
        mapProject(projectDoc, defaultProjects[index] || defaultProjects[0])
      )
      .filter((project) => project && project.isPublished)
      .sort((a, b) => a.order - b.order);

    const media = mediaSnapshot.docs
      .map((mediaDoc) => mapMedia(mediaDoc))
      .filter((item) => item && item.isPublished)
      .sort((a, b) => a.order - b.order);

    const configProjects = Array.isArray(configData?.projects)
      ? configData.projects
          .map((project, index) => mapProjectFromObject(project, index))
          .filter((project) => project && (project.isPublished ?? true))
      : [];

    const configGalleryPhotos = Array.isArray(configData?.galleryPhotos)
      ? configData.galleryPhotos
      : [];

    const configActivities = Array.isArray(configData?.activities)
      ? configData.activities
          .map((activity, index) => mapActivityFromObject(activity, index))
          .filter((activity) => activity && (activity.isPublished ?? true))
      : [];

    const homepageVideos = normalizeVideos(configData?.videos || configData?.homepageVideos);

    const galleryPhotos = media.length
      ? media.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          url: item.url,
        }))
      : configGalleryPhotos.length
      ? configGalleryPhotos.map((item, index) => ({
          id: item.id || `media-${index + 1}`,
          title:
            item.title ||
            item.alt ||
            fallback.galleryPhotos[index]?.title ||
            "Medya",
          description:
            item.description ||
            item.alt ||
            fallback.galleryPhotos[index]?.description ||
            "",
          url: item.url || fallback.galleryPhotos[index]?.url || "",
        }))
      : fallback.galleryPhotos;

    const selectedActivities = activities.length
      ? activities
      : configActivities.length
      ? configActivities
      : fallback.activities;

    const selectedProjects = projectEntries.length
      ? projectEntries
      : configProjects.length
      ? configProjects
      : fallback.projects;

    const content = {
      ...fallback,
      homepageVideos: homepageVideos.length ? homepageVideos : fallback.homepageVideos,
      galleryPhotos,
      projects: selectedProjects,
      activities: selectedActivities,
      config: {
        ...fallback.config,
        title: configData?.title || fallback.config.title,
        aboutTitle: configData?.aboutTitle || fallback.config.aboutTitle,
        aboutBody: configData?.aboutBody || fallback.config.aboutBody,
        logoUrl: configData?.logoUrl || fallback.config.logoUrl,
        socials: configData?.socials || fallback.config.socials,
        videos: Array.isArray(configData?.videos)
          ? [...configData.videos]
          : [...fallback.config.videos],
        updatedAt: convertTimestamp(configData?.updatedAt) || fallback.config.updatedAt,
      },
      media,
    };

    
    return content;
  } catch (error) {
    console.error("Firebase içeriği alınırken hata oluştu:", error);
    return fallback;
  }
};

export const fetchSiteContent = async () => buildContentFromSnapshots();

export const saveSiteContent = async (content) => {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      "Firebase yapılandırması tamamlanmadığı için içerik kaydedilemiyor. Lütfen Firebase bilgilerini ekleyin."
    );
  }

  const contentRef = doc(db, COLLECTIONS.config, CONFIG_DOCUMENT_ID);

  const payload = { updatedAt: new Date() };

  if (Array.isArray(content?.homepageVideos)) {
    payload.videos = content.homepageVideos
      .map((video) => {
        if (!video) {
          return null;
        }

        if (typeof video === "string") {
          return video;
        }

        return video.url || null;
      })
      .filter(Boolean);
  }

  if (Array.isArray(content?.galleryPhotos)) {
    payload.galleryPhotos = content.galleryPhotos.map((photo, index) => ({
      id: photo?.id || `photo-${index + 1}`,
      title: photo?.title || photo?.description || `Fotoğraf ${index + 1}`,
      description: photo?.description || "",
      url: photo?.url || "",
      alt: photo?.alt || photo?.title || "",
    }));
  }

  if (Array.isArray(content?.projects)) {
    payload.projects = content.projects.map((project, index) => ({
      ...project,
      slug: project?.slug || `project-${index + 1}`,
    }));
  }

  if (Array.isArray(content?.activities)) {
    payload.activities = content.activities.map((activity, index) => ({
      ...activity,
      slug: activity?.slug || `activity-${index + 1}`,
    }));
  }

  if (content?.config && typeof content.config === "object") {
    Object.assign(payload, content.config);
  }

  await setDoc(contentRef, payload, { merge: true });
};