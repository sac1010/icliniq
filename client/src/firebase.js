import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY,
  authDomain: "auth-middleware-80113.firebaseapp.com",
  projectId: "auth-middleware-80113",
  storageBucket: "auth-middleware-80113.appspot.com",
  messagingSenderId: "867555451203",
  appId: "1:867555451203:web:95ad193377f1efe0f20ff6",
  measurementId: "G-6T682YQXLV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
