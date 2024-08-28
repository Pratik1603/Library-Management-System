// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1Sv5f0tL4GJBztHmfdDU7EuU9XW4atOk",
  authDomain: "librarymanagementsystem-cd929.firebaseapp.com",
  projectId: "librarymanagementsystem-cd929",
  storageBucket: "librarymanagementsystem-cd929.appspot.com",
  messagingSenderId: "929892313640",
  appId: "1:929892313640:web:6636114c54320636d7631d",
  measurementId: "G-0KLGC9GZ7Y"
};
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);