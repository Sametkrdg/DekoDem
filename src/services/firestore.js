/**
 * firestore.js — Centralised Firestore read layer.
 *
 * Schema (exact casing used in Firestore):
 *
 * Singleton documents
 *   Settings/main  → { Address, Email, Phone, InstaUrl, LogoUrl }
 *   About/main     → { AboutShort, AboutLong }
 *
 * Collections
 *   Activities     → { Id (int64), Name, Description, PhotoUrl }
 *   Blogs          → { Name, Content, CoverImg, Date (timestamp) }
 *   Career         → { Position, Department, IsActive (bool), Requirements (string[]) }
 *   Projects       → { Id, Name, Description, category, PhotoUrl, IsCompleted (bool) }
 *   References     → { BrandName, LogoUrl }
 *   Testimonials   → { clientName, Company, Comment }
 */

import { db, isFirebaseConfigured } from "../config/firebase";
import {
  collection, doc,
  getDoc, getDocs,
  query, orderBy,
} from "firebase/firestore";

// ── Collection / document name constants ─────────────────────────────────────
const COL = {
  activities:   "Activities",
  blogs:        "Blogs",
  career:       "Career",
  projects:     "Projects",
  references:   "References",
  testimonials: "Testimonials",
  // Legacy / non-schema collections kept for backward compat
  branches:     "branches",
  faq:          "faq",
};

const SINGLETON = {
  settings: ["Settings", "main"],
  about:    ["About",    "main"],
};

// ── Guard helper ──────────────────────────────────────────────────────────────
const dbReady = () => isFirebaseConfigured && !!db;

// ── Singleton document helpers ────────────────────────────────────────────────

/**
 * Fetch the Settings singleton document.
 * Fields: Address, Email, Phone, InstaUrl, LogoUrl
 * @returns {Promise<Object|null>}
 */
export const getSettings = async () => {
  if (!dbReady()) return null;
  try {
    const snap = await getDoc(doc(db, ...SINGLETON.settings));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error("getSettings:", err);
    return null;
  }
};

/**
 * Fetch the About singleton document.
 * Fields: AboutShort, AboutLong
 * @returns {Promise<Object|null>}
 */
export const getAbout = async () => {
  if (!dbReady()) return null;
  try {
    const snap = await getDoc(doc(db, ...SINGLETON.about));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error("getAbout:", err);
    return null;
  }
};

// ── Collection helpers ────────────────────────────────────────────────────────

/**
 * Fetch all Activities documents.
 * Fields: Id, Name, Description, PhotoUrl
 * @returns {Promise<Array>}
 */
export const getActivities = async () => {
  if (!dbReady()) return [];
  try {
    const snap = await getDocs(collection(db, COL.activities));
    return snap.docs
      .map((d) => ({ _docId: d.id, ...d.data() }))
      .sort((a, b) => (a.Id ?? 0) - (b.Id ?? 0));
  } catch (err) {
    console.error("getActivities:", err);
    return [];
  }
};

/**
 * Fetch all Blog documents ordered by Date descending.
 * Fields: Name, Content, CoverImg, Date
 * @returns {Promise<Array>}
 */
export const getBlogs = async () => {
  if (!dbReady()) return [];
  try {
    const q = query(collection(db, COL.blogs), orderBy("Date", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ _docId: d.id, ...d.data() }));
  } catch (err) {
    console.error("getBlogs:", err);
    return [];
  }
};

/**
 * Fetch all Career (job listing) documents.
 * Fields: Position, Department, IsActive, Requirements
 * @returns {Promise<Array>}
 */
export const getCareers = async () => {
  if (!dbReady()) return [];
  try {
    const snap = await getDocs(collection(db, COL.career));
    return snap.docs.map((d) => ({ _docId: d.id, ...d.data() }));
  } catch (err) {
    console.error("getCareers:", err);
    return [];
  }
};

/**
 * Fetch all Project documents.
 * Fields: Id, Name, Description, category, PhotoUrl, IsCompleted
 * @returns {Promise<Array>}
 */
export const getProjects = async () => {
  if (!dbReady()) return [];
  try {
    const snap = await getDocs(collection(db, COL.projects));
    return snap.docs.map((d) => ({ _docId: d.id, ...d.data() }));
  } catch (err) {
    console.error("getProjects:", err);
    return [];
  }
};

/**
 * Fetch all References (brand partners) documents.
 * Fields: BrandName, LogoUrl
 * @returns {Promise<Array>}
 */
export const getReferences = async () => {
  if (!dbReady()) return [];
  try {
    const snap = await getDocs(collection(db, COL.references));
    return snap.docs.map((d) => ({ _docId: d.id, ...d.data() }));
  } catch (err) {
    console.error("getReferences:", err);
    return [];
  }
};

/**
 * Fetch all Testimonials documents.
 * Fields: clientName, Company, Comment
 * @returns {Promise<Array>}
 */
export const getTestimonials = async () => {
  if (!dbReady()) return [];
  try {
    const snap = await getDocs(collection(db, COL.testimonials));
    return snap.docs.map((d) => ({ _docId: d.id, ...d.data() }));
  } catch (err) {
    console.error("getTestimonials:", err);
    return [];
  }
};

// ── Legacy helpers kept for backward compat ───────────────────────────────────

export const getBranches = async () => {
  if (!dbReady()) return [];
  try {
    const snap = await getDocs(collection(db, COL.branches));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("getBranches:", err);
    return [];
  }
};

export const getBranchById = async (id) => {
  if (!dbReady()) return null;
  try {
    const snap = await getDoc(doc(db, COL.branches, id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  } catch (err) {
    console.error("getBranchById:", err);
    return null;
  }
};
