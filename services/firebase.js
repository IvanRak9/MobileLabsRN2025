import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCHM6ZyYRvZn-KfWQ3UJimMBS5iI_WU5HI",
  authDomain: "fir-authapp-4b063.firebaseapp.com",
  projectId: "fir-authapp-4b063",
  storageBucket: "fir-authapp-4b063.firebasestorage.app",
  messagingSenderId: "192278654068",
  appId: "1:192278654068:web:d55d4fb296456f2f7f7521",
  measurementId: "G-YBL6ED97MT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
