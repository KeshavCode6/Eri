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

export default function CreateCarpool() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const { user } = useAuth();

  protectedRoute();


  return (
    <View style={{ flex: 1, paddingTop: 75, justifyContent: "flex-start" }}>
      <Header1 customStyling={{ marginLeft: 10, marginBottom: 10 }}>Create a car pool group</Header1>
      <Backbutton marginLeft={10} href="/(tabs)/(carpool)/carpoolscreen" />
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