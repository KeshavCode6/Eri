import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

// stack layout, hiding headers  
export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme} >
      <Stack>
        <Stack.Screen name="authentication" options={{headerShown:false}} />
        <Stack.Screen name="forgotPass" options={{headerShown:false}} />
      </Stack>
    </ThemeProvider>

  );
}
