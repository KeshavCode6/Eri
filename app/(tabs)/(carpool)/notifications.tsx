import React, { useEffect, useState } from 'react';
import { auth, db, protectedRoute } from '@/constants/firebase';
import { router } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ListView, Header1, LeftAlignedHeader2, WhiteText } from '@/components/CustomUI';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import COLORS from '@/constants/Colors';
import Backbutton from '@/components/Backbutton';
import CustomButton, { IconButton } from '@/components/CustomButton';
import TimingsPicker from '@/components/TimingsPicker';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import Card from '@/components/Card';
import CustomIndicator from '@/components/CustomIndicator';

interface Userdoc {
  email: string;
  carpools: string[];
  invites: any[];
}

export default function CreateCarpool() {
  const [userdoc, setUserDoc] = useState<Userdoc>();
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      await protectedRoute();
      const userDocData = await getUserDoc();
      if (userDocData) {
        setUserDoc(userDocData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    protectedRoute();
  }, [router]);

  const rejectInvite = async (id: string) => {
    setLoading(true);
    const result = await removeInvite(id);
    setLoading(!result);
    if (result) {
      fetchUserData();
    }
  };

  const acceptInvite = async (id: string, email: string) => {
    setLoading(true);
    const result = await acceptEmail(id, email);
    setLoading(!result);
    if (result) {
      fetchUserData();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <CustomIndicator />
      ) : (
        <ListView>
          <LeftAlignedHeader2 customStyling={{ marginLeft: 20, fontSize: 25, marginTop: 70 }}>Notifications</LeftAlignedHeader2>
          <ScrollView style={{ flex: 1, marginTop: 10, height: 500, width: "100%" }} contentContainerStyle={{ alignItems: "center", gap: 2 }}>
            {userdoc?.invites.map((data, index) => (
              <Card key={index} customStyling={{ width: "90%", height: 75, paddingHorizontal: 20, shadowColor: "#212121", backgroundColor: "#212121" }}>
                <WhiteText customStyling={{ fontSize: 11, maxWidth: "80%" }}>You were invited by {data.invitedBy} to join carpool {data.carpoolId}</WhiteText>
                <View style={{ position: "absolute", right: 15, top: "auto" }}>
                  <IconButton customStyling={{ backgroundColor: "green", shadowColor: "green" }} size={24} icon={<FontAwesome5 name="check" color={"white"} size={10} />} press={() => acceptInvite(data.carpoolId, data.invitedBy)} />
                  <IconButton customStyling={{ backgroundColor: "red", shadowColor: "red" }} size={24} icon={<FontAwesome5 name="times" color={"white"} size={10} />} press={() => rejectInvite(data.carpoolId)} />
                </View>
                <View style={{ position: "absolute", left: 15, top: "auto" }}>
                  <FontAwesome5 name="bell" color={"white"} size={20} />
                </View>
              </Card>
            ))}
          </ScrollView>
          <Backbutton marginLeft={20} href="/(tabs)/(carpool)/home" />
        </ListView>
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

const acceptEmail = async (id: string, email: string) => {
  try {
    const userRef = collection(db, 'users');
    const userQuery = query(userRef, where('email', '==', auth.currentUser?.email));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      for (const userDoc of userSnapshot.docs) {
        const carpoolsRef = doc(db, "carpools", id);

        await updateDoc(carpoolsRef, {
          invites: arrayRemove(auth.currentUser?.email),
          members: arrayUnion(auth.currentUser?.email),
        });
        await updateDoc(userDoc.ref, {
          invites: arrayRemove({ invitedBy: email, carpoolId: id }),
          carpools: arrayUnion(id),
        });

        console.log("Accepted");
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error accepting invite:", error);
    return false;
  }
};

const removeInvite = async (id: string) => {
  try {
    const userRef = collection(db, 'users');
    const userQuery = query(userRef, where('email', '==', auth.currentUser?.email));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      for (const userDoc of userSnapshot.docs) {
        const carpoolsRef = doc(db, "carpools", id);

        await updateDoc(carpoolsRef, {
          invites: arrayRemove(auth.currentUser?.email),
        });
        await updateDoc(userDoc.ref, {
          invites: arrayRemove({ invitedBy: auth.currentUser?.email, carpoolId: id }),
        });

        console.log("Rejected");
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error rejecting invite:", error);
    return false;
  }
};
