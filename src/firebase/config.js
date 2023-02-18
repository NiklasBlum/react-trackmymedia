// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const app = initializeApp({
    apiKey: "AIzaSyDuZMGMlJ4Fh40aBN1uJ5EwOOQ9Kql5Vso",
    authDomain: "track-my-media.firebaseapp.com",
    databaseURL: "https://track-my-media.firebaseio.com",
    projectId: "track-my-media",
    storageBucket: "track-my-media.appspot.com",
    messagingSenderId: "799543490503",
    appId: "1:799543490503:web:69c502330782ad48",
    measurementId: "G-H328B3KFFN"
});

const db = getFirestore(app);
const auth = getAuth(app)
export { db, auth }