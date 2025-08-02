import { openDB } from 'idb';

export const dbPromise = openDB('discipline-db', 1, {
  upgrade(db) {
    db.createObjectStore('violations', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('syncQueue', { keyPath: 'localId', autoIncrement: true });
  }
});
