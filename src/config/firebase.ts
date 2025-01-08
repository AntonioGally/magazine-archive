import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "gally-portfolio.firebaseapp.com",
    projectId: "gally-portfolio",
    storageBucket: "gally-portfolio.firebasestorage.app",
    messagingSenderId: "846871656154",
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: "G-ZPXBMX5697",
    databaseId: "magazine-archive"
  };

const app = initializeApp(firebaseConfig, "magazine-archive");

export const analytics = getAnalytics(app);
export const db = initializeFirestore(app, {}, "magazine-archive");
export const auth = getAuth(app)

export default app;
