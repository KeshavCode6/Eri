import { FirebaseError, initializeApp } from "firebase/app";
import { router } from "expo-router";
import { getReactNativePersistence, initializeAuth, onAuthStateChanged } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { firebaseConfig } from "./firebaseConfig";
import { useEffect } from "react";


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

// making sure user is not logged in
export const loggedOutCheck = () => {
  if (auth.currentUser) {
    router.navigate("/(tabs)/(home)/homescreen");
  }
};


// going back to auth page if not logged in
export function protectedRoute() {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (!user) {
      router.navigate("/(auth)/authentication");
    }
  });

  return () => unsubscribe(); 
}
