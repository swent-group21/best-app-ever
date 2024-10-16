// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
//@ts-ignore
import { getStorage } from "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  Firestore,
  onSnapshot,
} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey= process.env.EXPO_PUBLIC_FIREBASE_API_KEY
const authDomain= process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
const projectId= process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID
const storageBucket= process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
const messagingSenderId= process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const appId= process.env.EXPO_PUBLIC_FIREBASE_APP_ID

console.log("Environment variables:\n- FIREBASE_API_KEY: ", 
apiKey
  , "\n- FIREBASE_AUTH_DOMAIN: ", 
authDomain
  , "\n- FIREBASE_PROJECT_ID: ", 
projectId
  , "\n- FIREBASE_STORAGE_BUCKET: ", 
storageBucket
  , "\n- FIREBASE_MESSAGING_SENDER_ID: ", 
messagingSenderId
  , "\n- FIREBASE_WEB_APP_ID: ", 
appId
);


const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId:projectId,
  storageBucket:storageBucket,
  messagingSenderId:messagingSenderId,
  appId:appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);

export {
  firebaseConfig,
  app,
  auth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  firestore,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  Firestore,
  storage,
  onSnapshot,
};
