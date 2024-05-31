import { getDatabase, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBATMoueZl_GVZPzppQs7PZG_EKKROciok",
  authDomain: "model-united-nations-4a5ad.firebaseapp.com",
  databaseURL: "https://model-united-nations-4a5ad-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "model-united-nations-4a5ad",
  storageBucket: "model-united-nations-4a5ad.appspot.com",
  messagingSenderId: "217871203338",
  appId: "1:217871203338:web:b3ac319df86235af8fb3f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const subjectsRef = ref(db, 'subjects')