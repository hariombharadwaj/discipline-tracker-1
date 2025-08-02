// src/db.js
import { openDB } from 'idb';

export const dbPromise = openDB('discipline-db', 1, {
  upgrade(db) {
    db.createObjectStore('rules', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('violations', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('settings', { keyPath: 'key' });
  }
});

export async function addViolation(data) {
  const db = await dbPromise;
  await db.add('violations', data);
}

// ...similar for rules, settings
