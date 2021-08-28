import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyB87wTi3yVSRtP5zC_g4thQxhpNrNIF9pI",
  authDomain: "innovision-web.firebaseapp.com",
  projectId: "innovision-web",
  storageBucket: "innovision-web.appspot.com",
  messagingSenderId: "786073950405",
  appId: "1:786073950405:web:69491e30362876bc5ff8ac"
})

export const auth = app.auth()
export const db = firebase.firestore();
export var provider = new firebase.auth.GoogleAuthProvider();
export const firebasevalue = firebase.firestore.FieldValue;
export const storageRef = firebase.storage().ref();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp()
export default app