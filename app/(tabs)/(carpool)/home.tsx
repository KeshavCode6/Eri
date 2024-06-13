import React, { useEffect, useState } from 'react';
import { auth, db, protectedRoute } from '@/constants/firebase';
import { router } from 'expo-router';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Header1 } from '@/components/CustomUI';
import { IconButton } from '@/components/CustomButton';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MyCarpoolCard from '@/components/MyCarpoolCard';
import { collection, getDoc, getDocs, doc, query, updateDoc, where } from 'firebase/firestore';
import CustomIndicator from '@/components/CustomIndicator';

interface Carpool {
  id: string;
  title: string;
  time: string;
  author: string;
  days: boolean[];
  seats: number;
  destination: string;
}

export default function CarpoolHome() {
  // making sure user is logged in, and getting user data
  useEffect(() => {
    protectedRoute();
    getCarpoolsData();
  }, [router]);

  // all user carpools
  const [carpools, setCarpools] = useState<Carpool[]>([]);
  const [loading, setLoading] = useState(true); // whether loading or not

  // getting carpool data from db
  const getCarpoolsData = async () => {
    setLoading(true);
    try {
      const data = await getCarpools();
      setCarpools(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching carpools:", error);
      setLoading(false);
    }
  };


  return (
    <View style={{ flex: 1, paddingTop: 100, justifyContent: "flex-start" }}>
      <View style={customStyles.container}>
        <IconButton
          size={28}
          icon={<FontAwesome5 name="bell" outline={false} color={"white"} size={14} />}
          press={() => { router.navigate("/(tabs)/(carpool)/notifications") }}
        />
        <IconButton
          size={28}
          icon={<FontAwesome5 name="plus" color={"white"} size={14} />}
          press={() => { router.navigate("/(tabs)/(carpool)/create") }}
        />
        <IconButton
          size={28}
          icon={<FontAwesome5 name="sync" color={"white"} size={14} />}
          press={getCarpoolsData}
        />

      </View>
      <Header1 customStyling={{ marginLeft: 20, marginBottom: 10 }}>My Car Pools</Header1>
      {loading ? (
        <CustomIndicator />
      ) : (
        <ScrollView style={{ flex: 1, height: 500 }} contentContainerStyle={{ alignItems: "center", gap: 2 }}>
          {carpools.length > 0 ? (
            carpools.map(card => (
              <MyCarpoolCard
                key={card.id}
                id={card.id}
                title={card.title}
                departureTime={card.time}
                destination={card.destination}
                driver={"N/A"}
                car={"N/A"}
                people={"N/A"}
                imageUrl={"https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg"}
              />
            ))
          ) : (
            <Text style={{ color: "gray", fontSize: 12, width: 300, textAlign: "center" }}>
              You have no carpools set up yet. Click the plus or search icon to add one. Use the refresh button to sync data.
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}
const getCarpools = async (): Promise<Carpool[]> => {
  const data: Carpool[] = [];
  try {
    // finding what carpools the user is in from the database
    const userRef = collection(db, 'users');
    const userQuery = query(userRef, where('email', '==', auth.currentUser?.email));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      // Iterate through each user document
      for (const userDoc of userSnapshot.docs) {
        const carpools = userDoc.data().carpools;

        // Iterate through each carpool ID in the user's carpools array
        for (const id of carpools) {
          const carpoolRef = doc(db, 'carpools', id);
          const carpoolDoc = await getDoc(carpoolRef);

          if (carpoolDoc.exists()) {
            const carpoolData = carpoolDoc.data() as Carpool;
            carpoolData.id = id;
            data.push(carpoolData);
          } else {
            console.error(`Carpool document with ID ${id} does not exist`);
          }
        }
      }
    }

    return data;
  } catch (error) {
    console.error("Error fetching carpools:", error);
    throw new Error("An error occurred while fetching carpools.");
  }
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
    paddingRight: 20,
    zIndex: 1000000,
  }
});
