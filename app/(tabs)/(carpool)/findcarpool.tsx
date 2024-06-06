// app/index.js
import React from 'react';
import useAuth from '@/hooks/useAuth';
import { protectedRoute } from '@/constants/firebase';
import { useRootNavigationState } from 'expo-router';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import Card, { TouchableCard } from '@/components/Card';
import { Header1, Header2, Header3, WhiteText } from '@/components/CustomUI';
import CustomButton from '@/components/CustomButton';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import COLORS from '@/constants/Colors';
import Backbutton from '@/components/Backbutton';
import InputWithIcon from '@/components/InputWithIcon';

export default function FindCarpool() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const { user } = useAuth();

  protectedRoute();


  return (
    <View style={{ flex: 1, paddingTop: 75, justifyContent: "flex-start" }}>
      <Header1 customStyling={{ marginLeft: 10, marginBottom: 10 }}>Find a car pool</Header1>
      <Backbutton marginLeft={10} href="/(tabs)/(carpool)/carpoolscreen" />
      <InputWithIcon customStyling={{ width: "95%", marginHorizontal: 10 }} icon={<FontAwesome5 name="search" color={"white"} size={14} />} />
      <View style={{ width: "100%", alignItems: "center", marginTop:10}}>
        <Card height={140} customStyling={{ backgroundColor: "#383838", shadowColor: "#383838" }}>
          <View style={{ width: "100%", height: "100%", paddingLeft: 10, paddingTop: 10, justifyContent: "flex-start" }}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ flex: 1, marginTop: 5, flexDirection: "column" }}>
                <Header2>Carpool to Alliance</Header2>
                <Text style={{ color: COLORS.accent }}>Departure: <Text style={{ color: "white" }}>8:00 AM</Text></Text>
                <Text style={{ color: COLORS.accent }}>People: <Text style={{ color: "white" }}>1/9</Text></Text>
                <Text style={{ color: COLORS.accent }}>Area: <Text style={{ color: "white" }}>Lambert Area</Text></Text>
                <CustomButton title="Join" customStyling={{width:175, height:35, marginTop:10}} press={()=>{}}/>
              </View>
              <View style={{ alignItems: "center", width: 120, justifyContent: "center", height: "100%", flexDirection: "column" }}>
                <Image source={{ uri: "https://images.squarespace-cdn.com/content/v1/5f9b75a7f63ff02eeba240e1/1608231099862-8IUC3Z8HD3RM74MZDBUB/the-alliance-logo-circle.png" }} style={{ borderRadius: 10, width: 100, height: 100 }} />
              </View>
            </View>
          </View>
        </Card>
      </View>
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
    paddingRight: 20
  }
});