// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfSGEqZkHNQ4qme3LXZOXp8GGMFwI00nU",
  authDomain: "discipline-tracker-1.firebaseapp.com",
  databaseURL: "https://discipline-tracker-1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "discipline-tracker-1",
  storageBucket: "discipline-tracker-1.firebasestorage.app",
  messagingSenderId: "145989174688",
  appId: "1:145989174688:web:5c08cbc3f945de356550c5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch(console.warn);

export { db };
