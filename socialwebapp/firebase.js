import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6QQch2ipj9IsXgO3CFU_aopTkND5Dg7U",
  authDomain: "socialmediawebapp-887e8.firebaseapp.com",
  projectId: "socialmediawebapp-887e8",
  storageBucket: "socialmediawebapp-887e8.appspot.com",
  messagingSenderId: "73989065148",
  appId: "1:73989065148:web:04aa7fbef8852d8e8883b9",
};

//check if we have already initialised to check if we have already rendered on the server, as we are doing server side rendering.

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
