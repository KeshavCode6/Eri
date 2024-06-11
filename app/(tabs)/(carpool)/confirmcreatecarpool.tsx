import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { auth, db, protectedRoute } from '@/constants/firebase';
import { router, useLocalSearchParams, useRootNavigationState } from 'expo-router';
import { Text, StyleSheet, View } from 'react-native';
import { addDoc, arrayUnion, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { CenteredView, Header1, Header2, LeftAlignedHeader2, ListView, WhiteText } from '@/components/CustomUI';
import Backbutton from '@/components/Backbutton';
import CustomButton from '@/components/CustomButton';
import COLORS from '@/constants/Colors';
import CarpoolCard from '@/components/CarpoolCard';
import InputWithIcon from '@/components/InputWithIcon';
import { FontAwesome5 } from '@expo/vector-icons';


export function ConfirmCreateCarpool() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  protectedRoute();
  const { data } = useLocalSearchParams(); // getting router params on page switch
  const [error, setError] = useState(''); // showing any login errors

  // @ts-ignore
  let parsedData = JSON.parse(data);

  const saveRequest = async () => {
    let message = validateData(parsedData);
    if (message == true) {
      try {
        const docRef = await addDoc(collection(db, "carpools"), parsedData
        );
        console.log("Document written with ID: ", docRef.id);

        
      const userRef = collection(db, 'users');
      const q2 = query(userRef, where('uid', '==', auth.currentUser?.uid));

      try {
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            carpools: arrayUnion(docRef.id)
          });
        });
        console.log('Document updated successfully');
      } catch (error) {
        console.error("Error updating document: ", error);
      }
      
        router.navigate("/(tabs)/(carpool)/carpoolscreen")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    else {
      setError(message)
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
          <Text style={{ color: "gray" }}>No similar rides found...</Text>
          <CustomButton title="Create" customStyling={{ height: 40, marginTop: 15, backgroundColor: COLORS.accent }} press={() => { saveRequest(); }} />
          <Text style={{ color: "red", marginTop: 2.5, marginBottom: 2.5 }}>{error}</Text>
        </ListView>
      </View>
    </>

  );
};

function validateData(data: any) {
  try {
    let count = 0
    let invalidDay = false;
    //@ts-ignore
    data.days.forEach(element => {
      if (!element) {
        if (count == 6) {
          console.log(count)
          invalidDay = true;
        }
        count += 1
      }
    });

    if(invalidDay){
      return "Please select at least one day";
    }

    if (typeof data.title !== 'string' || data.title.length <= 0) {
      return "Please enter a request title";
    }

    if (typeof data.destination !== 'string' || data.destination.length <= 0) {
      return "Please enter a destination";
    }

    if (typeof data.area !== 'string' || data.area.length <= 0) {
      return "Please enter a general residential area";
    }

    if (typeof data.seats !== 'number' || data.seats < 0) {

      return "Please enter a proper seat number estimate";
    }

    if (!Array.isArray(data.days) || data.days.length !== 7) {
      return "Something went wrong with day selection";
    }

    if (typeof data.time !== 'string' || data.time.length <= 0) {
      return "Something went wrong with time selection";
    }

    if (typeof data.author !== 'string' || data.author.length <= 0) {
      return "Something went wrong with author define";
    }

    return true;
  } catch {
    return "Something went wrong!";
  }
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

export default ConfirmCreateCarpool;
