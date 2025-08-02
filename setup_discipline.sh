#!/data/data/com.termux/files/usr/bin/bash

echo "➡ Setting up Iron Discipline Tracker with Vite + Firebase + IndexedDB"
APP_DIR=discipline-tracker-app
mkdir -p $APP_DIR
cd $APP_DIR

echo "✅ Initializing Vite + React..."
npm create vite@latest . -- --template react
npm install

echo "📦 Installing dependencies: Firebase, idb"
npm install firebase idb

echo "📁 Creating folders..."
mkdir -p src/components
mkdir -p src/hooks
mkdir -p src/utils

echo "📝 Writing indexedDB setup (src/db.js)..."
cat > src/db.js << 'EOF'
import { openDB } from 'idb';

export const dbPromise = openDB('discipline-db', 1, {
  upgrade(db) {
    db.createObjectStore('violations', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('syncQueue', { keyPath: 'localId', autoIncrement: true });
  }
});
EOF

echo "📝 Writing firebase setup (src/firebase.js)..."
cat > src/firebase.js << 'EOF'
import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "discipline-tracker-1.firebaseapp.com",
  projectId: "discipline-tracker-1",
  storageBucket: "discipline-tracker-1.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch(console.warn);

export { db };
EOF

echo "📝 Writing sync utility (src/utils/sync.js)..."
cat > src/utils/sync.js << 'EOF'
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
EOF

echo "📝 Writing unified log hook (src/hooks/useViolationLogs.js)..."
cat > src/hooks/useViolationLogs.js << 'EOF'
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
EOF

echo "📝 Writing Snackbar (src/components/Snackbar.jsx)..."
cat > src/components/Snackbar.jsx << 'EOF'
import React, { useEffect, useState } from 'react';

export default function Snackbar({ message = '', duration = 3000 }) {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  return (
    <div style={styles.snackbar}>{message}</div>
  );
}

const styles = {
  snackbar: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#333',
    color: '#fff',
    borderRadius: '6px',
    padding: '10px 20px',
    zIndex: 999
  }
};
EOF

echo "📝 Writing App.jsx"
cat > src/App.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
import Snackbar from './components/Snackbar';
import { useViolationLogs } from './hooks/useViolationLogs';
import { addViolationWithSync, syncQueuedViolations } from './utils/sync';

export default function App() {
  const { logs } = useViolationLogs();
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const triggerSync = async () => {
      const synced = await syncQueuedViolations();
      if (synced > 0) setMsg(\`✅ Synced \${synced} queued log(s)\`);
    };
    window.addEventListener('online', triggerSync);
    return () => window.removeEventListener('online', triggerSync);
  }, []);

  const handleAdd = async () => {
    const success = await addViolationWithSync({ text: "Meditated" });
    setMsg(success ? "✅ Log synced!" : "📂 Log saved offline");
  };

  return (
    <div>
      <h1>Discipline Logs</h1>
      <button onClick={handleAdd}>➕ Add Log</button>
      <ul>
        {logs.map((log, i) => <li key={i}>{log.text}</li>)}
      </ul>
      <Snackbar message={msg} />
    </div>
  );
}
EOF

echo "📝 Writing index.html"
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8"><title>Iron Discipline</title></head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

echo "🧠 Almost done. Next → Replace your Firebase keys in src/firebase.js."
echo "✅ Now run: npm run dev (for dev preview) or npm run build + firebase deploy"
