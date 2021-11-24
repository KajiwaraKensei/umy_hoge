import firebase from "firebase/compat/app";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyCQFfjvNlY5HOQZDafHlTjVOuEmdiIIDW8",
  authDomain: "umyfoods-rac.firebaseapp.com",
  projectId: "umyfoods-rac",
  storageBucket: "umyfoods-rac.appspot.com",
  messagingSenderId: "427606584752",
  appId: "1:427606584752:web:bf08226a80970471557a75",
  measurementId: "G-VVMZ3WH8NT",
};

const firebaseApp =
  firebase.apps.length === 0 ? firebase.initializeApp(config) : firebase;

export const firestore = firebaseApp.firestore && firebaseApp.firestore();
