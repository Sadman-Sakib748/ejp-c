// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVGXbjKOu8j9MfNbbv9eTGWv-6ZesUUts",
  authDomain: "assignment-10-99f61.firebaseapp.com",
  projectId: "assignment-10-99f61",
  storageBucket: "assignment-10-99f61.firebasestorage.app",
  messagingSenderId: "1077495002059",
  appId: "1:1077495002059:web:22c684127e4d4c20367c4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export the app properly
export { app };