import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { router } from "expo-router";

const auth = getAuth();

function protectedRoute() {
  // Sending the user back to the home page if they are not authenticated
  useEffect(() => {
    // unsubbing after because thats better somehow
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.navigate("/(auth)/authentication")
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);
}

export default protectedRoute;