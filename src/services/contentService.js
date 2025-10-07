import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  db,
  isFirebaseConfigured,
} from "../firebase/config";
import {
  createDefaultSiteContent,
} from "../constants/defaultSiteContent";

const CONTENT_COLLECTION = "siteContent";
const CONTENT_DOCUMENT = "global";

const createContentReference = () => {
  if (!db) {
    return null;
  }

  return doc(db, CONTENT_COLLECTION, CONTENT_DOCUMENT);
};

export const fetchSiteContent = async () => {
  const fallback = createDefaultSiteContent();

  if (!isFirebaseConfigured || !db) {
    return fallback;
  }

  const contentRef = createContentReference();

  try {
    const snapshot = await getDoc(contentRef);

    if (!snapshot.exists()) {
      await setDoc(contentRef, fallback, { merge: true });
      return fallback;
    }

    const remoteData = snapshot.data();

    return {
      ...fallback,
      ...remoteData,
      homepageVideos: remoteData.homepageVideos || fallback.homepageVideos,
      galleryPhotos: remoteData.galleryPhotos || fallback.galleryPhotos,
      projects: remoteData.projects || fallback.projects,
    };
  } catch (error) {
    console.error("Firebase içeriği alınırken hata oluştu:", error);
    return fallback;
  }
};

export const saveSiteContent = async (content) => {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      "Firebase yapılandırması tamamlanmadığı için içerik kaydedilemiyor. Lütfen Firebase bilgilerini ekleyin."
    );
  }

  const contentRef = createContentReference();

  const payload = {
    ...content,
    updatedAt: new Date().toISOString(),
  };

  await setDoc(contentRef, payload, { merge: true });
};