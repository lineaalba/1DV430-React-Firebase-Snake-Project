import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD-rK1pLDNcb9fVc5noar25ekPu8-0yDMM",
    authDomain: "snake-1dv430.firebaseapp.com",
    databaseURL: "https://snake-1dv430.firebaseio.com",
    projectId: "snake-1dv430",
    storageBucket: "snake-1dv430.appspot.com",
    messagingSenderId: "796598873620",
    appId: "1:796598873620:web:8cf1c990e6d3bf19314101",
    measurementId: "G-PGBW0BCP7C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase
  