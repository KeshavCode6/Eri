import COLORS from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.accent, headerShown: false, tabBarStyle: { backgroundColor: "rgba(17, 17, 17,0.95)", borderTopColor: 'black', paddingVertical: 10 } }}>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 size={25} name="home" color={color} />,
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="(route)"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 size={25} name="map-marker-alt" color={color} />,
          tabBarLabel: "Maps",
        }}
      />
      <Tabs.Screen
        name="(carpool)"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 size={25} name="car" color={color} />,
          tabBarLabel: "Car Pool",
        }}
      />
        <Tabs.Screen
        name="(account)"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 size={25} name="user-alt" color={color}/>,
          tabBarLabel: "Account",
        }}
      />
    </Tabs>
  );
}
