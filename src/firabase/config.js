import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
};

const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app = null;
let db = null;

if (isFirebaseConfigured) {
  const existingApp = getApps()[0];

  try {
    app = existingApp || initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase başlatılırken hata oluştu:", error);
  }
} else {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "Firebase yapılandırması eksik görünüyor. Admin panelinden içerik kaydetme işlemleri Firebase yapılandırması tamamlanana kadar devre dışı kalacaktır."
    );
  }
}

export { app, db, firebaseConfig, isFirebaseConfigured };