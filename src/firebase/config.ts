// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZCIeQPDlpsSRveCsVNdTaQPAYNd6uDkQ",
  authDomain: "like-fddf5.firebaseapp.com",
  projectId: "like-fddf5",
  storageBucket: "like-fddf5.appspot.com",
  messagingSenderId: "215037029095",
  appId: "1:215037029095:web:2ab9f3f5e1b94c9db21042",
  measurementId: "G-HC1TD2RHSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app)

// database
export const database = getDatabase(app)