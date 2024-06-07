// app/index.js
import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { protectedRoute } from '@/constants/firebase';
import { useRootNavigationState } from 'expo-router';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { ListView, Header1, LeftAlignedHeader2, Header3, WhiteText, CenteredView } from '@/components/CustomUI';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import COLORS from '@/constants/Colors';
import Backbutton from '@/components/Backbutton';
import InputWithIcon from '@/components/InputWithIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '@/components/CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';
import WeekdayTimePicker from '@/components/WeekdayTimePicker';

export default function CreateCarpool() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const { user } = useAuth();

  protectedRoute();

  const [date, setDate] = useState(new Date());

  return (
    <View style={{ flex: 1, paddingTop: 75, justifyContent: "flex-start" }}>
      <Backbutton marginLeft={10} href="/(tabs)/(carpool)/carpoolscreen" />
      <Header1 customStyling={{ marginLeft: 10 }}>Create a car pool group</Header1>
      <WhiteText customStyling={{ marginLeft: 10, marginBottom: 10 }}>Enter in the following information create a carpooling group request</WhiteText>

      <ListView customStyling={{ gap: 15, marginTop: 10, marginLeft: 10 }}>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Final Destination</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>Enter where you are carpooling to. Use an address or general name if applicable</WhiteText>
          <InputWithIcon customStyling={{ marginTop: 5, width: "95%" }} placeHolder="Destination" icon={<FontAwesome5 size={15} name="compass" color={COLORS.accent} />} />
        </View>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Residential area</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>Enter a community name or area defined by well known landmark (eg: Riverbrooke community)</WhiteText>
          <InputWithIcon customStyling={{ marginTop: 5, width: "95%" }} placeHolder="Area" icon={<FontAwesome5 size={15} name="compass" color={COLORS.accent} />} />
        </View>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Seat Availability</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>Enter how many passengers you are interested in carpooling with</WhiteText>
          <InputWithIcon customStyling={{ marginTop: 5, width: "95%" }} type="numeric" placeHolder="Seats" icon={<FontAwesome5 size={15} name="car" color={COLORS.accent} />} />
        </View>
        <View style={{ width: "100%"}}>
          <LeftAlignedHeader2>Timings</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>Edit all timing related information using the popup modal below</WhiteText>
          <WeekdayTimePicker />
        </View>
        <CustomButton icon={<FontAwesome5 size={15} name="arrow-right" color={"white"} />} press={() => { }} customStyling={{ width: 150, height: 40, marginTop:40}} />

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