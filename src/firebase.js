// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCGi2bl9yAPB_vfcgrWx2j7qme54CudcnQ",
  authDomain: "madical-c6fba.firebaseapp.com",
  projectId: "madical-c6fba",
  storageBucket: "madical-c6fba.firebasestorage.app",
  messagingSenderId: "914321237715",
  appId: "1:914321237715:web:3d571947b8383f42f15626",
  measurementId: "G-LK6K6BKW8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
const db = getFirestore(app);
export { db };
export default app;
