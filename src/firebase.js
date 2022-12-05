// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyADfHkjnkbkbkbbjkjbkjbkjb6MxGkAyAntDIUfvUIZFAQ9s",
    authDomain: "challenir,,njjnjnebaseapp.com",
    projectId: "challenge-c8815",
    storageBucket: "challenge-c8815.appspot.com",
    messagingSenderId: "850697687675765",
    appId: "1:87686867:web:6bf8768686868c9",
    measurementId: "G-VGQM5jhckjcjgcbjgjC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig) // initialization
  const db = firebaseApp.firestore();
  const auth = firebase.auth(); // it gives us a variable that will be used for signing in and all that

  export {db, auth};
