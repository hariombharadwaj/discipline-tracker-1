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
