// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pawpaws-9c223.firebaseapp.com",
  projectId: "pawpaws-9c223",
  storageBucket: "pawpaws-9c223.appspot.com",
  messagingSenderId: "152731885438",
  appId: "1:152731885438:web:bd376edff1155423c45d2f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);