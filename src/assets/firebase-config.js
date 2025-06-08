// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaUtX4YS_Kf2eLeEOVbsnLznwboFJPuSM",
  authDomain: "groupchat-bee44.firebaseapp.com",
  projectId: "groupchat-bee44",
  storageBucket: "groupchat-bee44.firebasestorage.app",
  messagingSenderId: "744096974749",
  appId: "1:744096974749:web:9113a92770759713f1d174",
  measurementId: "G-V8Y8EESXD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//是你與 Firebase 認證服務 的「連結」或「入口點」
export const auth = getAuth(app);
//provider 則是指定你想要透過哪個第三方服務（例如 Google、Facebook 等）來進行認證
export const provider = new GoogleAuthProvider();
//
export const db = getFirestore(app);