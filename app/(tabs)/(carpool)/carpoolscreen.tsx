// app/index.js
import React from 'react';
import useAuth from '@/hooks/useAuth';
import { protectedRoute } from '@/constants/firebase';
import { router, useRootNavigationState } from 'expo-router';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { TouchableCard } from '@/components/Card';
import { Header1, Header2, Header3, WhiteText } from '@/components/CustomUI';
import CustomButton, { IconButton } from '@/components/CustomButton';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import COLORS from '@/constants/Colors';

export default function CarpoolHome() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const { user } = useAuth();

  protectedRoute();


  return (
    <View style={{ flex: 1, paddingTop: 100, justifyContent: "flex-start" }}>
      <View style={customStyles.container}>
        <IconButton size={28} icon={<FontAwesome5 name="users" color={"white"} size={14} />} press={() => { router.navigate("/(tabs)/(carpool)/createcarpool") }} />
        <IconButton size={28} icon={<FontAwesome5 name="search" color={"white"} size={14} />} press={() => { router.navigate("/(tabs)/(carpool)/findcarpool") }} />
      </View>
      <Header1 customStyling={{ marginLeft: 20, marginBottom: 10 }}>My Car Pools</Header1>
      <ScrollView style={{ flex: 1, height: 500 }} contentContainerStyle={{ alignItems: "center", gap: 2 }}>
        <TouchableCard height={130} customStyling={{ backgroundColor: "#383838", shadowColor: "#383838" }}>
          <View style={{ width: "100%", height: "100%", paddingLeft: 10, paddingTop: 10, justifyContent: "flex-start" }}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ flex: 1, marginTop: 5, flexDirection: "column" }}>
                <Header2>Carpool to Alliance</Header2>
                <Text style={{ color: COLORS.accent }}>Departure: <Text style={{ color: "white" }}>8:00 AM</Text></Text>
                <Text style={{ color: COLORS.accent }}>Driver: <Text style={{ color: "white" }}>Mr. Johnson</Text></Text>
                <Text style={{ color: COLORS.accent }}>Car: <Text style={{ color: "white" }}>Nissan</Text></Text>
                <Text style={{ color: COLORS.accent }}>People: <Text style={{ color: "white" }}>Johnny, Bobby, Timmy</Text></Text>
                
              </View>
              <View style={{ alignItems: "center", width: 120, justifyContent: "center", height: "100%", flexDirection: "column" }}>
                <Image source={{ uri: "https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg" }} style={{ borderRadius: 10, width: 100, height: 100 }} />
              </View>
            </View>
          </View>
        </TouchableCard>
      </ScrollView>
    </View>
  );
}

const customStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    flexDirection: "row",
    gap: 5,
    paddingRight: 20,
    zIndex:1000000,
  }
});