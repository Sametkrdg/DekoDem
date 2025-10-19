import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDFClVaWEG32yw9JrUILVwAl9xFyrx4joQ",
  authDomain: "dekodem-a1ed2.firebaseapp.com",
  projectId: "dekodem-a1ed2",
  storageBucket: "dekodem-a1ed2.firebasestorage.app",
  messagingSenderId: "643497521463",
  appId: "1:643497521463:web:0d08d65ea8073d80abaab2",
  measurementId: "G-9JFMKKMRFK"
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