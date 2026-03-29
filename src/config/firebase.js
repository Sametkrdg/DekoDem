import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDFClVaWEG32yw9JrUILVwAl9xFyrx4joQ",
    authDomain: "dekodem-a1ed2.firebaseapp.com",
    projectId: "dekodem-a1ed2",
    storageBucket: "dekodem-a1ed2.firebasestorage.app",
    messagingSenderId: "643497521463",
    appId: "1:643497521463:web:0d08d65ea8073d80abaab2",
    measurementId: "G-9JFMKKMRFK",
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
