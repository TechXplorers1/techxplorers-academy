// src/firebase.js

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // <-- ADD THIS

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCHIxBGDESKzjQh87TxuHThKrm0Fkr-zI",
  authDomain: "brave-project-bf8f5.firebaseapp.com",
  databaseURL: "https://brave-project-bf8f5-default-rtdb.firebaseio.com",
  projectId: "brave-project-bf8f5",
  storageBucket: "brave-project-bf8f5.appspot.com",
  messagingSenderId: "57808419475",
  appId: "1:57808419475:web:50ebd7dc7799b0f67c2b66",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app); // <-- ADD THIS

// Export all the services for use in your components
export { auth, db, storage, firebaseConfig };