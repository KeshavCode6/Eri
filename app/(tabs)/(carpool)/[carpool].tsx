// app/index.js
import React from 'react';
import { protectedRoute } from '@/constants/firebase';
import { useLocalSearchParams, useRootNavigationState } from 'expo-router';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { CenteredView, Header1, Header2, Header3, WhiteText } from '@/components/CustomUI';
import Backbutton from '@/components/Backbutton';
export default function FindCarpool() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  protectedRoute();
  const { carpool } = useLocalSearchParams();
  return (
  <CenteredView>
    <Backbutton href="/(tabs)/(carpool)/carpoolscreen" />
    <WhiteText>Request: {carpool}</WhiteText>
  </CenteredView>
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