// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 專案憑證
const firebaseConfig = {
  apiKey: "AIzaSyDaUtX4YS_Kf2eLeEOVbsnLznwboFJPuSM",
  authDomain: "groupchat-bee44.firebaseapp.com",
  projectId: "groupchat-bee44",
  storageBucket: "groupchat-bee44.firebasestorage.app",
  messagingSenderId: "744096974749",
  appId: "1:744096974749:web:9113a92770759713f1d174",
  measurementId: "G-V8Y8EESXD8"
};

// 憑證來啟動和設定您的 Firebase 應用程式，讓它能夠與雲端的 Firebase 服務進行通訊
const app = initializeApp(firebaseConfig);
//用來取得 Firebase 的「驗證功能」，可以使用 Firebase 提供的各種驗證相關功能
export const auth = getAuth(app);
//provider 則是指定你想要透過哪個第三方服務（例如 Google、Facebook 等）來進行認證
export const provider = new GoogleAuthProvider();
//用來取得 Firestore 雲端資料庫的實例，進行 CRUD 的操作
export const db = getFirestore(app);