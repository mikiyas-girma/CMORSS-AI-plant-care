// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "agricare-ai-app.firebaseapp.com",
  projectId: "agricare-ai-app",
  storageBucket: "agricare-ai-app.appspot.com",
  messagingSenderId: "656517523081",
  appId: "1:656517523081:web:a45ff83ef059438b178858"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
