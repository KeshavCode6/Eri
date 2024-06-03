import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

// root stack layout with dark theme
export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" options={{headerShown:false}} />
      </Stack>
    </ThemeProvider>

  );
}
