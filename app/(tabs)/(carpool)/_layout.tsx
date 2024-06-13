import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

// root stack layout with dark theme
export default function CarpoolLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" options={{headerShown:false}} />
        <Stack.Screen name="create" options={{headerShown:false}} />
        <Stack.Screen name="confirm" options={{headerShown:false}} />
        <Stack.Screen name="notifications" options={{headerShown:false}} />
      </Stack>
    </ThemeProvider>
  );
}
