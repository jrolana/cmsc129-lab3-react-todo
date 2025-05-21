import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxN8uqQaiSAxSKakKBxqY6dinW_-ZEDA4",
  authDomain: "should-do-efebe.firebaseapp.com",
  projectId: "should-do-efebe",
  storageBucket: "should-do-efebe.firebasestorage.app",
  messagingSenderId: "359225693043",
  appId: "1:359225693043:web:2f0c7f86453b8a7c306b06",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
