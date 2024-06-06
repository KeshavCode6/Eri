// app/index.js
import React from 'react';
import useAuth from '@/hooks/useAuth';
import { protectedRoute } from '@/constants/firebase';
import { useRootNavigationState } from 'expo-router';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { ListView, Header1, LeftAlignedHeader2, Header3, WhiteText, CenteredView } from '@/components/CustomUI';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import COLORS from '@/constants/Colors';
import Backbutton from '@/components/Backbutton';
import InputWithIcon from '@/components/InputWithIcon';
import NumericInput from 'react-native-numeric-input'
import CustomButton from '@/components/CustomButton';

export default function CreateCarpool() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const { user } = useAuth();

  protectedRoute();


  return (
    <View style={{ flex: 1, paddingTop: 75, justifyContent: "flex-start" }}>
      <Backbutton marginLeft={10} href="/(tabs)/(carpool)/carpoolscreen" />
      <Header1 customStyling={{ marginLeft: 10 }}>Create a car pool group</Header1>
      <WhiteText customStyling={{ marginLeft: 10, marginBottom: 10 }}>Enter in the following information create a carpooling group request</WhiteText>

      <ListView customStyling={{ gap: 15, marginTop: 10, marginLeft: 10 }}>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Final Destination</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>Enter where you are carpooling to. Use an address or general name if applicable</WhiteText>
          <InputWithIcon customStyling={{ marginTop: 5, width:"95%"}} placeHolder="Destination" icon={<FontAwesome5 size={15} name="compass" color={COLORS.accent} />} />
        </View>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Residential area</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>Enter a community name or area defined by well known landmark (eg: Riverbrooke community)</WhiteText>
          <InputWithIcon customStyling={{ marginTop: 5, width:"95%"}} placeHolder="Area" icon={<FontAwesome5 size={15} name="compass" color={COLORS.accent} />} />
        </View>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Seat Availability</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>Enter how many passengers you are interested in carpooling with</WhiteText>
          <InputWithIcon customStyling={{ marginTop: 5, width:"95%"}} type="numeric" placeHolder="Seats" icon={<FontAwesome5 size={15} name="car" color={COLORS.accent} />} />
        </View>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Timing</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>Enter what days and times you want to go</WhiteText>
          <InputWithIcon customStyling={{ marginTop: 5, width:"95%"}} placeHolder="Time" icon={<FontAwesome5 size={15} name="clock" color={COLORS.accent} />} />
          <InputWithIcon customStyling={{ marginTop: 5, width:"95%"}} placeHolder="Days" icon={<FontAwesome5 size={15} name="calendar" color={COLORS.accent} />} />
        </View>
        <CustomButton icon={<FontAwesome5 size={15} name="arrow-right" color={"white"} />} press={()=>{}} customStyling={{width:150, height:30}}/>
      </ListView>

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