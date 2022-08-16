// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrZZ61ktxDaKoYJh3yXuJg3rLVEg6wCQE",
  authDomain: "cc-headstarter.firebaseapp.com",
  projectId: "cc-headstarter",
  storageBucket: "cc-headstarter.appspot.com",
  messagingSenderId: "570725808725",
  appId: "1:570725808725:web:cce22fca16732fecc872dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
