// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyBuD5I0z9IMtc5gQFDz7rjCm8uNMyW6k",
  authDomain: "dormie-fed45.firebaseapp.com",
  projectId: "dormie-fed45",
  storageBucket: "dormie-fed45.firebasestorage.app",
  messagingSenderId: "574890243390",
  appId: "1:574890243390:web:b167d15174e373fc60a86f",
  measurementId: "G-1Q37DMWLTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Auth instance
export const auth = getAuth(app);
