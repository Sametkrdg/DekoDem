/**
 * useFirestoreCollection — centralized Firestore CRUD hook.
 *
 * Eliminates the boilerplate that was duplicated across every admin panel
 * (ActivitiesPanel, ProjectsPanel, BlogPanel, PartnersPanel, …).
 *
 * Usage
 * ─────────────────────────────────────────────────────────────────────────────
 *   const { items, loading, error, refresh, save, remove } =
 *     useFirestoreCollection("Activities", {
 *       sort: (a, b) => (a.Id ?? 0) - (b.Id ?? 0),
 *     });
 *
 *   // Create
 *   await save(null, { Name: "New", ... });
 *
 *   // Update  (pass the Firestore document id, not the domain Id field)
 *   await save(item.id, { Name: "Updated", ... });
 *
 *   // Delete
 *   await remove(item.id);
 *
 * Parameters
 * ─────────────────────────────────────────────────────────────────────────────
 *   collectionName  {string}              Firestore collection name (exact casing)
 *   options         {object}
 *     .sort         {function}            Comparator for Array.sort()
 *     .transform    {function}            Map function applied to each document
 *
 * Returns
 * ─────────────────────────────────────────────────────────────────────────────
 *   items    {Array}     Current collection items (empty array while loading)
 *   loading  {boolean}   True during the initial fetch and every refresh
 *   error    {Error|null}
 *   refresh  {function}  Manually re-fetch the collection
 *   save     {function}  (docId | null, payload) → Promise<void>
 *   remove   {function}  (docId) → Promise<void>
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getCollectionItems,
  addCollectionItem,
  updateCollectionItem,
  deleteCollectionItem,
} from "../admin/adminFirestore";

export const useFirestoreCollection = (collectionName, options = {}) => {
  const { sort, transform } = options;

  // Keep sort/transform in a ref so changes don't re-trigger the refresh effect
  const optsRef = useRef({ sort, transform });
  useEffect(() => {
    optsRef.current = { sort, transform };
  }, [sort, transform]);

  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ── Fetch ───────────────────────────────────────────────────────────────────

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data = await getCollectionItems(collectionName);
      if (optsRef.current.sort)      data = [...data].sort(optsRef.current.sort);
      if (optsRef.current.transform) data = data.map(optsRef.current.transform);
      setItems(data);
    } catch (err) {
      console.error(`useFirestoreCollection(${collectionName}):`, err);
      setError(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [collectionName]); // intentionally excludes sort/transform (optsRef handles them)

  useEffect(() => { refresh(); }, [refresh]);

  // ── Write ───────────────────────────────────────────────────────────────────

  /**
   * Create or update a document.
   * @param {string|null} docId  Firestore document id — pass null to create
   * @param {object}      payload
   */
  const save = useCallback(async (docId, payload) => {
    if (docId) {
      await updateCollectionItem(collectionName, docId, payload);
    } else {
      await addCollectionItem(collectionName, payload);
    }
    await refresh();
  }, [collectionName, refresh]);

  // ── Delete ──────────────────────────────────────────────────────────────────

  /**
   * Delete a document by its Firestore id.
   * @param {string} docId
   */
  const remove = useCallback(async (docId) => {
    await deleteCollectionItem(collectionName, docId);
    await refresh();
  }, [collectionName, refresh]);

  return { items, loading, error, refresh, save, remove };
};
