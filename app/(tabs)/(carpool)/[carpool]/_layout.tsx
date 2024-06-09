import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";

// root stack layout with dark theme
export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="chat" options={{headerShown:false}} />
        <Stack.Screen name="page" options={{headerShown:false}} />
      </Stack>
    </ThemeProvider>
  );
}
