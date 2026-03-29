import { db } from "../config/firebase";
import { collection, doc, getDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";

// Collection References
const SETTINGS_COLLECTION = "settings";
const CATEGORIES_COLLECTION = "categories";
const CAMPAIGNS_COLLECTION = "campaigns";
const BRANCHES_COLLECTION = "branches";

/**
 * Fetch global site settings.
 * @returns {Promise<Object>} Settings object or null
 */
export const getSettings = async () => {
    try {
        const docRef = doc(db, SETTINGS_COLLECTION, "global");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.warn("Global settings not found in Firestore.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
};

/**
 * Fetch all active categories.
 * @returns {Promise<Array>} List of categories
 */
export const getCategories = async () => {
    try {
        const q = query(
            collection(db, CATEGORIES_COLLECTION),
            where("isActive", "==", true),
            orderBy("priority", "asc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

/**
 * Fetch a category by its slug.
 * @param {string} slug 
 * @returns {Promise<Object|null>} Category object or null
 */
export const getCategoryBySlug = async (slug) => {
    try {
        const q = query(
            collection(db, CATEGORIES_COLLECTION),
            where("slug", "==", slug),
            limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching category by slug:", error);
        return null;
    }
};

/**
 * Fetch active campaigns.
 * @returns {Promise<Array>} List of campaigns
 */
export const getActiveCampaigns = async () => {
    try {
        // Complex queries might require indexes. For now, we fetch basic active ones.
        const q = query(
            collection(db, CAMPAIGNS_COLLECTION),
            where("isActive", "==", true),
            orderBy("priority", "asc")
        );
        const querySnapshot = await getDocs(q);

        // Filter by date client-side if Firestore indexes are not set up for composite queries yet
        const campaigns = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // TODO: Add date filtering here if needed
        return campaigns;
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return [];
    }
};

/**
 * Fetch all branches.
 * @returns {Promise<Array>} List of branches
 */
export const getBranches = async () => {
    try {
        const q = query(
            collection(db, BRANCHES_COLLECTION),
            where("isActive", "==", true)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching branches:", error);
        return [];
    }
};

/**
 * Fetch a branch by ID.
 * @param {string} id 
 * @returns {Promise<Object|null>} Branch object
 */
export const getBranchById = async (id) => {
    try {
        const docRef = doc(db, BRANCHES_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching branch:", error);
        return null;
    }
};
