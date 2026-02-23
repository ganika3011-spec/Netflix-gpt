// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqn0Nc9PnY2BbkIA9rP5Zsd0w2LSkVn74",
  authDomain: "netflixgpt-f92ab.firebaseapp.com",
  projectId: "netflixgpt-f92ab",
  storageBucket: "netflixgpt-f92ab.firebasestorage.app",
  messagingSenderId: "506270782778",
  appId: "1:506270782778:web:5ea21582c7e07095c36c03",
  measurementId: "G-TTPMFKPGHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

