// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage, gitStorage} from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdhUnyLBh4nUqa6uYZ9xJoyMT-PdDl5fo",
  authDomain: "fullgamehub-3f283.firebaseapp.com",
  projectId: "fullgamehub-3f283",
  storageBucket: "fullgamehub-3f283.appspot.com",
  messagingSenderId: "1089987728891",
  appId: "1:1089987728891:web:0360116ed4e095ee60a75e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const database=getFirestore(app);
export const storage = getStorage(app);