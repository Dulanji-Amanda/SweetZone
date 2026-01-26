// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore } from "firebase/firestore"
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyDIFN9DaosRY0smtOntsY8_t3CAX9se5GU",
  authDomain: "sweetzone-5d889.firebaseapp.com",
  projectId: "sweetzone-5d889",
  storageBucket: "sweetzone-5d889.firebasestorage.app",
  messagingSenderId: "463523814380",
  appId: "1:463523814380:web:7ee3610025c6c4c1513ec9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// for authenticate
// only need for before firebase 9v
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)