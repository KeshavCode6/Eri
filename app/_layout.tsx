import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// root stack layout with dark theme
export default function RootLayout() {
  return (
    <GestureHandlerRootView>

    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" options={{headerShown:false}} />
        <Stack.Screen name="(tabs)" options={{headerShown:false}} />
        <Stack.Screen name="(auth)" options={{headerShown:false}} />
      </Stack>
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}
