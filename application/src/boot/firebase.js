import { boot } from "quasar/wrappers";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/functions";
import "firebase/compat/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDzSP6Ss3ZxKV1DyUxqYvlDo4wC8xhP8Io",
  authDomain: "surveirams.firebaseapp.com",
  databaseURL:
    "https://surveirams-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "surveirams",
  storageBucket: "surveirams.appspot.com",
  messagingSenderId: "1014666116613",
  appId: "1:1014666116613:web:680381b3543cbb235b266c",
  measurementId: "G-FCR5GHY8GQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const projectFirestore = firebase.firestore();
export const projectAuth = firebase.auth();
export const projectFunctions = firebase.functions();
export const projectStorage = firebase.storage();
export const projectDb = firebase.database();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
