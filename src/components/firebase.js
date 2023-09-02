import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getDatabase} from 'firebase/database';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFGYyozw6nMD5fK1UGFwTLx5IZ4ioNyIs",
    authDomain: "inotebook-8824.firebaseapp.com",
    projectId: "inotebook-8824",
    storageBucket: "inotebook-8824.appspot.com",
    messagingSenderId: "607479956328",
    appId: "1:607479956328:web:7c025fa050e6b3652a0cdd",
    measurementId: "G-E1GVNPM5M6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbFirestore = getFirestore(app);
const dbReal = getDatabase(app);
const storage = getStorage(app);

export {auth, dbFirestore, dbReal, storage};