import { db } from "../config/firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Fetch all documents from a Firestore collection.
 * @param {string} collectionName
 * @returns {Promise<Array>}
 */
export const getCollectionItems = async (collectionName) => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error(`getCollectionItems(${collectionName}):`, err);
    return [];
  }
};

/**
 * Add a new document to a collection.
 * @param {string} collectionName
 * @param {Object} data
 * @returns {Promise<string>} The new document ID
 */
export const addCollectionItem = async (collectionName, data) => {
  const ref = collection(db, collectionName);
  const docRef = await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

/**
 * Update an existing document.
 * @param {string} collectionName
 * @param {string} id
 * @param {Object} data
 */
export const updateCollectionItem = async (collectionName, id, data) => {
  const ref = doc(db, collectionName, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
};

/**
 * Delete a document.
 * @param {string} collectionName
 * @param {string} id
 */
export const deleteCollectionItem = async (collectionName, id) => {
  const ref = doc(db, collectionName, id);
  await deleteDoc(ref);
};

/**
 * Fetch a single (singleton) document by collection + document ID.
 * Used for Settings/main and About/main.
 * @param {string} collectionName
 * @param {string} docId
 * @returns {Promise<Object|null>}
 */
export const getDocument = async (collectionName, docId) => {
  try {
    const snap = await getDoc(doc(db, collectionName, docId));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error(`getDocument(${collectionName}/${docId}):`, err);
    return null;
  }
};

/**
 * Write (merge) a singleton document.
 * Used for Settings/main and About/main.
 * @param {string} collectionName
 * @param {string} docId
 * @param {Object} data
 */
export const setDocument = async (collectionName, docId, data) => {
  const ref = doc(db, collectionName, docId);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
};

/**
 * Fetch document counts for the admin dashboard.
 * Uses the exact schema collection names.
 * @returns {Promise<Object>} Map of collection name → count
 */
export const getDashboardStats = async () => {
  const cols = [
    { key: "projects",     col: "Projects"     },
    { key: "blogs",        col: "Blogs"        },
    { key: "activities",   col: "Activities"   },
    { key: "testimonials", col: "Testimonials" },
    { key: "references",   col: "References"   },
    { key: "careers",      col: "Career"       },
    { key: "branches",     col: "branches"     },
  ];
  const results = await Promise.allSettled(
    cols.map(async ({ key, col }) => {
      const snapshot = await getDocs(collection(db, col));
      return { key, count: snapshot.size };
    })
  );
  return Object.fromEntries(
    results
      .filter((r) => r.status === "fulfilled")
      .map((r) => [r.value.key, r.value.count])
  );
};
