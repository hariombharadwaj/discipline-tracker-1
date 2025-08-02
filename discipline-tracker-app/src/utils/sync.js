import { dbPromise } from '../db';
import { db as firestoreDb } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function addViolationWithSync(data) {
  const db = await dbPromise;
  const newData = { ...data, createdAt: Date.now() };
  await db.add('violations', newData);

  if (navigator.onLine) {
    try {
      await addDoc(collection(firestoreDb, 'violations'), {
        ...newData,
        syncedAt: serverTimestamp()
      });
      return true;
    } catch (e) {}
  }

  await db.add('syncQueue', newData);
  return false;
}

export async function syncQueuedViolations() {
  if (!navigator.onLine) return 0;

  const db = await dbPromise;
  const queue = await db.getAll('syncQueue');
  let synced = 0;

  for (let log of queue) {
    try {
      await addDoc(collection(firestoreDb, 'violations'), {
        ...log,
        syncedAt: serverTimestamp()
      });
      await db.delete('syncQueue', log.localId);
      synced++;
    } catch {}
  }

  return synced;
}
