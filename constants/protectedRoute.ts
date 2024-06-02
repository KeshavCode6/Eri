import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { router } from "expo-router";

const auth = getAuth();

function protectedRoute() {
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/(auth)/authentication")
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);
}

export default protectedRoute;