import { FirebaseError, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleAuthProvider } from "firebase/auth";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyDN6by5r9F3ACbu9n_IRDbTErvNTPVqEnM",
  authDomain: "eriapp-44be1.firebaseapp.com",
  projectId: "eriapp-44be1",
  storageBucket: "eriapp-44be1.appspot.com",
  messagingSenderId: "353666583822",
  appId: "1:353666583822:web:aebd57b1e0e6d7260e1b5f",
  measurementId: "G-XGKMLQX8ZS"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export const handleAuthError = (error: FirebaseError) => {
  if (error instanceof FirebaseError) { // Type guard to confirm type
    console.log(error.code)
    switch (error.code) {
      case "auth/email-already-in-use":
        return ("This email is already in use!");
      case "auth/invalid-credential":
        return ("Invalid Credentials!")
      case "auth/invalid-email":
        return ("Invalid email format!");
      case "auth/missing-password":
        return ("Fill out the password field!");
      case "auth/missing-email":
          return ("Fill out the email field!");
      case "auth/weak-password":
        return ("Password should be at least 6 characters!");

      case "auth/too-many-requests":
        return ("Too many requests. Please try again later.");

      default:
        return ("Unexpected Error! Try again later.");
    }
  } else {
    console.error(error)
    return "Something went wrong";
  }
}