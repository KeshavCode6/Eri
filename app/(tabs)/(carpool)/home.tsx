import React, { useEffect, useState } from 'react';
import { auth, db, protectedRoute } from '@/constants/firebase';
import { useRouter } from 'expo-router';
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

interface Userdoc {
  email: string;
  carpools: string[];
  invites: any[];
}

export default function CarpoolHome() {
  const [carpools, setCarpools] = useState<Carpool[]>([]);
  const [loading, setLoading] = useState(true);
  const [userdoc, setUserdoc] = useState<Userdoc | null>(null);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      await protectedRoute();
      const userDocData = await getUserDoc();
      if (userDocData) {
        setUserdoc(userDocData);
        await getCarpoolsData(userDocData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  useEffect(() => {
    refresh();
  }, [router]);

  const refresh = ()=>{
    fetchUserData();
    if(userdoc){
      getCarpoolsData(userdoc)
    }
  }

  const getCarpoolsData = async (userDoc: Userdoc) => {
    setLoading(true);
    try {
      const data = await getCarpools(userDoc);
      setCarpools(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching carpools:", error);
      setLoading(false);
    }
  };


  const handleNotificationPress = () => {
    if (typeof userdoc !== "undefined") {
      router.push({pathname:"/(tabs)/(carpool)/notifications", params:{ data:JSON.stringify(userdoc)} });
    }
  };


  return (
    <View style={{ flex: 1, paddingTop: 100, justifyContent: "flex-start" }}>
      <View style={styles.container}>
        <IconButton
          size={28}
          amt={userdoc?.invites.length}
          icon={<FontAwesome5 name="bell" color={"white"} size={14} />}
          press={handleNotificationPress}
        />
        <IconButton
          size={28}
          icon={<FontAwesome5 name="plus" color={"white"} size={14} />}
          press={() => router.push("/(tabs)/(carpool)/create")}
        />
        <IconButton
          size={28}
          icon={<FontAwesome5 name="sync" color={"white"} size={14} />}
          press={() => {refresh();}}
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

const getUserDoc = async (): Promise<Userdoc | null> => {
  try {
    const userRef = collection(db, 'users');
    const userQuery = query(userRef, where('email', '==', auth.currentUser?.email));
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      return userSnapshot.docs[0].data() as Userdoc;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
};

const getCarpools = async (userdoc: Userdoc): Promise<Carpool[]> => {
  const data: Carpool[] = [];
  try {
    const { carpools } = userdoc;

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
    return data;
  } catch (error) {
    console.error("Error fetching carpools:", error);
    throw new Error("An error occurred while fetching carpools.");
  }
};

const styles = StyleSheet.create({
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
