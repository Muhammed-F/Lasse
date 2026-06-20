import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvNtxyoqkhuUPQPEJybV9N6wqibpQvEMY",
  authDomain: "karri-58409.firebaseapp.com",
  projectId: "karri-58409",
  storageBucket: "karri-58409.firebasestorage.app",
  messagingSenderId: "306471982182",
  appId: "1:306471982182:web:f9fca9b18b5cbba07fc9a7",
  measurementId: "G-GZW90TLG5R",
  firestoreDatabaseId: "ai-studio-f92c4208-7bc0-4e43-908c-4ddc018ec70a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firestore utilizing the correct custom applet database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
