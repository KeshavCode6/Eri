import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { auth, db, protectedRoute } from '@/constants/firebase';
import { router, useRootNavigationState } from 'expo-router';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Header1 } from '@/components/CustomUI';
import { IconButton } from '@/components/CustomButton';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MyCarpoolCard from '@/components/MyCarpoolCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import COLORS from '@/constants/Colors';
import CustomIndicator from '@/components/CustomIndicator';

export default function CarpoolHome() {
  const rootNavigationState = useRootNavigationState();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  if (!rootNavigationState?.key) return null;

  protectedRoute();

  const getCardsByAuthor = async () => {
    try {
      setLoading(true); // Set loading to true before starting the data fetch
      const cardsRef = collection(db, 'carpool-requests');
      const q = query(cardsRef, where('author', '==', auth.currentUser?.uid));
      const querySnapshot = await getDocs(q);
      const cardsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCards(cardsData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false); // Set loading to false after data fetch is complete
    }
  };

  useEffect(() => {
    getCardsByAuthor();
  }, [auth.currentUser]);

  if(loading){
    return <CustomIndicator/>
  }
  return (
    <View style={{ flex: 1, paddingTop: 100, justifyContent: "flex-start" }}>
      <View style={customStyles.container}>
        <IconButton size={28} icon={<FontAwesome5 name="plus" color={"white"} size={14} />} press={() => { router.navigate("/(tabs)/(carpool)/createcarpool") }} />
        <IconButton size={28} icon={<FontAwesome5 name="search" color={"white"} size={14} />} press={() => { router.navigate("/(tabs)/(carpool)/findcarpool") }} />
        <IconButton size={28} icon={<FontAwesome5 name="sync" color={"white"} size={14} />} press={() => { getCardsByAuthor(); }} />
      </View>
      <Header1 customStyling={{ marginLeft: 20, marginBottom: 10 }}>My Car Pools</Header1>
      <ScrollView style={{ flex: 1, height: 500 }} contentContainerStyle={{ alignItems: "center", gap: 2 }}>
          <>
            {cards.map(card => (
              <MyCarpoolCard
                id={card.id}
                key={card.id}
                title={card.title}
                departureTime={card.time}
                destination={card.destination}
                driver={"N/A"}
                car={"N/A"}
                people={"N/A"}
                imageUrl={"https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg"}
              />
            ))}
            {cards.length <= 0 && (
              <Text style={{ color: "gray", fontSize: 12, width: 300, textAlign: "center" }}>
                You have no carpools setup yet. Click the plus or search icon to add one. Use the refresh button to sync data.
              </Text>
            )}
          </>
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
    zIndex: 1000000,
  }
});
