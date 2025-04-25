import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAIleK5yJhQnf2Y7jc9wjwvbLNtsWvhIqw",
  authDomain: "smart-agroconnect-3234c.firebaseapp.com",
  projectId: "smart-agroconnect-3234c",
  storageBucket: "smart-agroconnect-3234c.firebasestorage.app",
  messagingSenderId: "981202734422",
  appId: "1:981202734422:web:1f0a7a9e4559e6ba3c5af7",
  measurementId: "G-1PEGQKJEH7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
export const googleProvider = new GoogleAuthProvider();
