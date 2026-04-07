import { db, isFirebaseConfigured } from "../config/firebase";
import {
  createDefaultSiteContent,
  DEFAULT_HOME_VIDEOS,
} from "../constants/defaultSiteContent";
import defaultActivities from "../data/activities";
import { doc, getDoc, getDocs, collection, setDoc } from "firebase/firestore";

const COLLECTIONS = {
  config:     "config",
  activities: "activities",
  media:      "media",
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
  if (!value) return null;
  if (typeof value?.toDate === "function") return value.toDate();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const createSummary = (text = "", limit = 160) => {
  if (!text) return "";
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1)}…`;
};

// ── Activities ───────────────────────────────────────────────────────────────

const mapActivity = (docSnapshot, fallback) => {
  if (!docSnapshot?.exists?.()) return null;

  const data  = docSnapshot.data();
  const order = typeof data?.order === "number" ? data.order : Number.MAX_SAFE_INTEGER;
  const title = data?.title || "Faaliyet";
  const slug  = data?.slug || docSnapshot.id || slugify(title);
  const body  = data?.body || "";

  return {
    slug,
    title,
    heroImage:   data?.imageUrl || fallback?.heroImage || "",
    summary:     data?.summary  || createSummary(body),
    description: body,
    body,
    highlights:  data?.highlights || fallback?.highlights || [],
    createdAt:   convertTimestamp(data?.createdAt),
    isPublished: data?.isPublished ?? true,
    order,
  };
};

const mapActivityFromObject = (activity, index) => {
  if (!activity) return null;
  const fallback = defaultActivities[index] || defaultActivities[0];
  return mapActivity(
    {
      exists: () => true,
      id:     activity.slug || activity.id || `activity-${index + 1}`,
      data:   () => activity,
    },
    fallback
  );
};

// ── Media ────────────────────────────────────────────────────────────────────

const mapMedia = (docSnapshot) => {
  if (!docSnapshot?.exists?.()) return null;

  const data  = docSnapshot.data();
  const order = typeof data?.order === "number" ? data.order : Number.MAX_SAFE_INTEGER;

  return {
    id:          docSnapshot.id,
    title:       data?.title || data?.alt || "Medya",
    description: data?.alt   || "",
    url:         data?.url   || "",
    alt:         data?.alt   || "",
    tags:        Array.isArray(data?.tags) ? data.tags : [],
    isPublished: data?.isPublished ?? true,
    order,
  };
};

// ── Video normalisation ──────────────────────────────────────────────────────

const normalizeVideos = (videos) => {
  if (!Array.isArray(videos) || !videos.length) {
    return DEFAULT_HOME_VIDEOS.map((v) => ({ ...v }));
  }
  return videos
    .map((video, index) => {
      if (typeof video === "string") return { title: `Video ${index + 1}`, url: video };
      if (video && typeof video === "object") {
        const { url, title } = video;
        if (!url) return null;
        return { title: title || `Video ${index + 1}`, url };
      }
      return null;
    })
    .filter(Boolean);
};

// ── Main builder ─────────────────────────────────────────────────────────────

const buildContentFromSnapshots = async () => {
  const fallback = createDefaultSiteContent();

  if (!isFirebaseConfigured || !db) return fallback;

  try {
    const configRef    = doc(db, COLLECTIONS.config, CONFIG_DOCUMENT_ID);
    const activitiesRef = collection(db, COLLECTIONS.activities);
    const mediaRef     = collection(db, COLLECTIONS.media);

    const [configSnapshot, activitiesSnapshot, mediaSnapshot] = await Promise.all([
      getDoc(configRef),
      getDocs(activitiesRef),
      getDocs(mediaRef),
    ]);

    const configData = configSnapshot.exists() ? configSnapshot.data() : {};

    const activities = activitiesSnapshot.docs
      .map((d, i) => mapActivity(d, defaultActivities[i] || defaultActivities[0]))
      .filter((a) => a && a.isPublished)
      .sort((a, b) => a.order - b.order);

    const media = mediaSnapshot.docs
      .map((d) => mapMedia(d))
      .filter((m) => m && m.isPublished)
      .sort((a, b) => a.order - b.order);

    const configActivities = Array.isArray(configData?.activities)
      ? configData.activities
          .map((a, i) => mapActivityFromObject(a, i))
          .filter((a) => a && (a.isPublished ?? true))
      : [];

    const configGalleryPhotos = Array.isArray(configData?.galleryPhotos)
      ? configData.galleryPhotos
      : [];

    const homepageVideos = normalizeVideos(configData?.videos || configData?.homepageVideos);

    const galleryPhotos = media.length
      ? media.map((item) => ({
          id:          item.id,
          title:       item.title,
          description: item.description,
          url:         item.url,
        }))
      : configGalleryPhotos.length
      ? configGalleryPhotos.map((item, index) => ({
          id:          item.id || `media-${index + 1}`,
          title:       item.title || item.alt || fallback.galleryPhotos[index]?.title || "Medya",
          description: item.description || item.alt || fallback.galleryPhotos[index]?.description || "",
          url:         item.url || fallback.galleryPhotos[index]?.url || "",
        }))
      : fallback.galleryPhotos;

    const selectedActivities = activities.length
      ? activities
      : configActivities.length
      ? configActivities
      : fallback.activities;

    return {
      ...fallback,
      homepageVideos: homepageVideos.length ? homepageVideos : fallback.homepageVideos,
      galleryPhotos,
      projects:   [],           // Projects are now Firestore-only (Projects.js / ProjectDetailPage.js)
      activities: selectedActivities,
      config: {
        ...fallback.config,
        title:      configData?.title      || fallback.config.title,
        aboutTitle: configData?.aboutTitle || fallback.config.aboutTitle,
        aboutBody:  configData?.aboutBody  || fallback.config.aboutBody,
        logoUrl:    configData?.logoUrl    || fallback.config.logoUrl,
        socials:    configData?.socials    || fallback.config.socials,
        videos: Array.isArray(configData?.videos)
          ? [...configData.videos]
          : [...fallback.config.videos],
        updatedAt: convertTimestamp(configData?.updatedAt) || fallback.config.updatedAt,
      },
      media,
    };
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
  const payload    = { updatedAt: new Date() };

  if (Array.isArray(content?.homepageVideos)) {
    payload.videos = content.homepageVideos
      .map((v) => {
        if (!v) return null;
        if (typeof v === "string") return v;
        return v.url || null;
      })
      .filter(Boolean);
  }

  if (Array.isArray(content?.galleryPhotos)) {
    payload.galleryPhotos = content.galleryPhotos.map((photo, index) => ({
      id:          photo?.id          || `photo-${index + 1}`,
      title:       photo?.title       || photo?.description || `Fotoğraf ${index + 1}`,
      description: photo?.description || "",
      url:         photo?.url         || "",
      alt:         photo?.alt         || photo?.title || "",
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
