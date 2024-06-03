import { FirebaseError, initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { firebaseConfig } from "./firebaseConfig";


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


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


export const loggedOutCheck = () => {
  if (auth.currentUser) {
    router.navigate("/(tabs)/home");
  }
};
