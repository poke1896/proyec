import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, getDocs, deleteDoc, updateDoc, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGVp1TW-8UB0glh2muX9AcLble_ermwoM",
  authDomain: "appfruit-29679.firebaseapp.com",
  projectId: "appfruit-29679",
  storageBucket: "appfruit-29679.appspot.com",
  messagingSenderId: "958916435378",
  appId: "1:958916435378:web:347282511ce1e0649018ab"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc, query, orderBy, getDocs, deleteDoc, updateDoc, doc, setDoc }