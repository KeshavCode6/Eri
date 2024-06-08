// app/index.js
import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { db, protectedRoute } from '@/constants/firebase';
import { router, useLocalSearchParams, useRootNavigationState } from 'expo-router';
import { Text, StyleSheet, View } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { CenteredView, Header1, Header2, LeftAlignedHeader2, ListView, WhiteText } from '@/components/CustomUI';
import Backbutton from '@/components/Backbutton';
import CustomButton from '@/components/CustomButton';
import COLORS from '@/constants/Colors';
import CarpoolCard from '@/components/CarpoolCard';

export function ConfirmCreateCarpool() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const { user } = useAuth();

  protectedRoute();

  const { data } = useLocalSearchParams(); // getting router params on page switch
  // @ts-ignore
  let parsedData = JSON.parse(data);

  const saveRequest = async () => {
    try {
      const docRef = await addDoc(collection(db, "carpool-requests"), parsedData
      );
      console.log("Document written with ID: ", docRef.id);
      router.navigate("/(tabs)/(carpool)/carpoolscreen")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <View style={{ flex: 1, paddingTop: 75, justifyContent: "flex-start" }}>
        <Backbutton href="/(tabs)/(carpool)/createcarpool" />

        <Header1 customStyling={{ marginLeft: 10 }}>Confirmation </Header1>
        <WhiteText customStyling={{ marginLeft: 10, marginBottom: 10 }}>
          Before we make your request public, review the following similar rides
        </WhiteText>

        <ListView>
          <CarpoolCard
            title="Carpool to Alliance"
            departureTime="8:00 AM"
            peopleCount="1/9"
            days="Saturday and Sunday"
            area="Lambert Area"
            imageUrl="https://images.squarespace-cdn.com/content/v1/5f9b75a7f63ff02eeba240e1/1608231099862-8IUC3Z8HD3RM74MZDBUB/the-alliance-logo-circle.png"
          />
          <CustomButton title="Confirm and Create" customStyling={{ height: 40, marginTop: 15, backgroundColor: COLORS.accent }} press={() => { saveRequest(); }} />
        </ListView>

      </View>
    </>

  );
};


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

export default ConfirmCreateCarpool;
