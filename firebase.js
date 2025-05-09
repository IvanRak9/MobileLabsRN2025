import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA9uk1oRCio07Uv9lWKWXGALvlusLFa0yM",
  authDomain: "lab4-8b985.firebaseapp.com",
  projectId: "lab4-8b985",
  storageBucket: "lab4-8b985.firebasestorage.app",
  messagingSenderId: "205007317630",
  appId: "1:205007317630:web:5f27655a0e2412bbdfc62f",
  measurementId: "G-W8Z486WT40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);