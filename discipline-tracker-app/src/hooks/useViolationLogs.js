import { useEffect, useState } from 'react';
import { dbPromise } from '../db';
import { db as firestoreDb } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export function useViolationLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(firestoreDb, 'violations'), async (snapshot) => {
      const cloudLogs = snapshot.docs.map(doc => doc.data());
      const db = await dbPromise;
      const localLogs = await db.getAll('violations');
      const all = [...cloudLogs, ...localLogs].sort((a, b) => b.createdAt - a.createdAt);
      setLogs(all);
    });

    return () => unsub();
  }, []);

  return { logs };
}
