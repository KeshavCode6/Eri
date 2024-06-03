import CustomButton from "@/components/CustomButton";
import { Header1, Header2, Header3 } from '@/components/CustomUI';
import { router } from "expo-router";
import { Text, View } from "react-native";
import {loggedOutCheck} from "@/constants/firebase"
import { useEffect } from "react";
export default function Index() {
  // checking if user is logged out on mount
  useEffect(() => {
    loggedOutCheck();
  }, [router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header1>Welcome to Eri!</Header1>
      <Text style={{ color: "white", width: 300, textAlign: "center" }}>
        <Text>Get things done for you from the comfort of your home!</Text>
      </Text>

      <View style={{ gap: 2, marginTop: 20 }}>
        <CustomButton title="Login" press={() => { goToAuthScreen("login") }} />
        <CustomButton title="Create an account" press={() => { goToAuthScreen("signup") }} outline />
      </View>
    </View>
  );
}

function goToAuthScreen(screenString: string) {
  router.push({
    pathname: '/(auth)/authentication',
    params: {
      screenPage:screenString
    },
  })
}