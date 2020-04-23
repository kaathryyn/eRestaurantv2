import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAPoMi1FRmgKjbpIMBDb0nu7vvMNBqrvac",
  authDomain: "saporiunici-6cd34.firebaseapp.com",
  databaseURL: "https://saporiunici-6cd34.firebaseio.com",
  projectId: "saporiunici-6cd34",
  storageBucket: "saporiunici-6cd34.appspot.com",
  messagingSenderId: "1068860026410",
  appId: "1:1068860026410:web:22c4a3227a4c4d37f21d53",
  measurementId: "G-PYJR0C1HVX"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
