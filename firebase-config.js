import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCG2x9RNJGDgGf4RMKIHMqv5BpXnxuc_2s",
  authDomain: "cocopure-nagi.firebaseapp.com",
  databaseURL: "https://cocopure-nagi.firebaseio.com",
  projectId: "cocopure-nagi",
  storageBucket: "cocopure-nagi.appspot.com",
  messagingSenderId: "38957158257",
  appId: "1:38957158257:web:56933c5b05d7765310b0d0",
  measurementId: "G-PZ864SKXM8",
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export default firebase
