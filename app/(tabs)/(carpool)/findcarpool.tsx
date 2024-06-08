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
import CarpoolCard from '@/components/CarpoolCard';

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
      <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
        <CarpoolCard
          title="Carpool to Alliance"
          departureTime="8:00 AM"
          peopleCount="1/9"
          days="Saturday and Sunday"
          area="Lambert Area"
          imageUrl="https://images.squarespace-cdn.com/content/v1/5f9b75a7f63ff02eeba240e1/1608231099862-8IUC3Z8HD3RM74MZDBUB/the-alliance-logo-circle.png"
        />
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