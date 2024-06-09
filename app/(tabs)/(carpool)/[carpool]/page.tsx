import React, { useEffect, useState } from 'react';
import { auth, db, protectedRoute } from '@/constants/firebase';
import { router, useLocalSearchParams, useRootNavigationState } from 'expo-router';
import { View, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { CenteredView, Header1, Header2, Header3, LeftAlignedHeader2, WhiteText } from '@/components/CustomUI';
import Backbutton from '@/components/Backbutton';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import CustomIndicator from '@/components/CustomIndicator';
import { IconButton } from '@/components/CustomButton';
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '@/constants/Colors';
import Card from '@/components/Card';
import styles from '@/constants/styles';

export default function FindCarpool() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  protectedRoute();
  const [area, setArea] = useState("");
  const [author, setAuthor] = useState("");
  const [days, setDays] = useState([]);
  const [destination, setDestination] = useState("");
  const [seats, setSeats] = useState(8);
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const { carpool } = useLocalSearchParams();

  const getDocument = async () => {
    try {
      //@ts-ignore
      const docRef = doc(db, 'carpool-requests', carpool);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document loaded");
        const data = docSnap.data();
        //@ts-ignore
        setArea(data.area || "");
                //@ts-ignore
        setAuthor(data.author || "");

        //@ts-ignore
        let days = []
        let count = 0;
        let indexToDay = { 0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday" }
                //@ts-ignore
        data.days.forEach(element => {
          if (element) {
            //@ts-ignore
            days.push(indexToDay[count])
          }
          count += 1
        });
        //@ts-ignore
        setDays(days || []);
                //@ts-ignore
        setDestination(data.destination || "");
                //@ts-ignore
        setSeats(data.seats || 8);
                //@ts-ignore
        setTime(data.time || "");
                //@ts-ignore
        setTitle(data.title || "");
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  useEffect(() => {
    getDocument();
  }, [auth.currentUser]);

  if (loading) {
    return <CustomIndicator />
  }
  return (
    <View style={{ flex: 1, paddingTop: 55, justifyContent: "flex-start" }}>
      <Backbutton marginLeft={20} href="/(tabs)/carpoolscreen" />
      <Header1 customStyling={{ marginBottom: 10, alignSelf: "center" }}>{title}</Header1>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center", justifyContent: "flex-start", paddingBottom: 20 }}>
        <Card height={130} customStyling={{ justifyContent: "flex-start", alignItems: "flex-start", paddingHorizontal: 20, paddingTop: 10, position: 'relative' }}>
          <Header3>Carpool Details</Header3>
          <WhiteText>Area: {area}</WhiteText>
          <WhiteText>Days: {days.join(", ")}</WhiteText>
          <WhiteText>Destination: {destination}</WhiteText>
          <WhiteText>Seats: {seats}</WhiteText>
          <WhiteText>Time: {time}</WhiteText>
          <View style={customStyles.container}>
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="pen" color={"white"} size={14} />} press={() => { }} />
          </View>
        </Card>
        <TouchableOpacity
          style={[styles.input, { flexDirection: "row", backgroundColor: "black", height: 36, width: "90%", marginTop: 5, justifyContent: "flex-start", alignItems: "center" }]}
          onPress={() => { router.navigate(`/(tabs)/(carpool)/${carpool}/chat`) }}>
          <FontAwesome5 size={15} name="comment" color={COLORS.accent} style={{ marginRight: 10 }} />
          <WhiteText>Open Group Chat</WhiteText>
        </TouchableOpacity>

        <View style={customStyles.membersContainer}>
          <Header2 customStyling={{ alignSelf: "center", marginVertical: 10 }}>Members (1/{seats})</Header2>
          <ScrollView style={{maxHeight:230}}>
            <View style={[customStyles.slot, { borderTopWidth: 1 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Image source={{ uri: "https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg" }} style={{ borderRadius: 100, width: 30, aspectRatio: "1/1" }} />
                <WhiteText customStyling={{ fontSize: 13 }}>Slatty</WhiteText>
              </View>
              <View>
                <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="user-edit" color={"white"} size={14} />} press={() => { }} />
              </View>
            </View>
            <View style={[customStyles.slot, { borderTopWidth: 1 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Image source={{ uri: "https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg" }} style={{ borderRadius: 100, width: 30, aspectRatio: "1/1" }} />
                <WhiteText customStyling={{ fontSize: 13 }}>Slatty</WhiteText>
              </View>
              <View>
                <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="user-edit" color={"white"} size={14} />} press={() => { }} />
              </View>
            </View>
            <View style={[customStyles.slot, { borderTopWidth: 1 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Image source={{ uri: "https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg" }} style={{ borderRadius: 100, width: 30, aspectRatio: "1/1" }} />
                <WhiteText customStyling={{ fontSize: 13 }}>Slatty</WhiteText>
              </View>
              <View>
                <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="user-edit" color={"white"} size={14} />} press={() => { }} />
              </View>
            </View>
            <View style={[customStyles.slot, { borderTopWidth: 1 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Image source={{ uri: "https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg" }} style={{ borderRadius: 100, width: 30, aspectRatio: "1/1" }} />
                <WhiteText customStyling={{ fontSize: 13 }}>Slatty</WhiteText>
              </View>
              <View>
                <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="user-edit" color={"white"} size={14} />} press={() => { }} />
              </View>
            </View>
            <View style={[customStyles.slot, { borderTopWidth: 1 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Image source={{ uri: "https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg" }} style={{ borderRadius: 100, width: 30, aspectRatio: "1/1" }} />
                <WhiteText customStyling={{ fontSize: 13 }}>Slatty</WhiteText>
              </View>
              <View>
                <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="user-edit" color={"white"} size={14} />} press={() => { }} />
              </View>
            </View>
            
            <View style={[customStyles.slot, { borderTopWidth: 1 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Image source={{ uri: "https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg" }} style={{ borderRadius: 100, width: 30, aspectRatio: "1/1" }} />
                <WhiteText customStyling={{ fontSize: 13 }}>Slatty</WhiteText>
              </View>
              <View>
                <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="user-edit" color={"white"} size={14} />} press={() => { }} />
              </View>
            </View>
          </ScrollView>
          <View style={customStyles.container}>
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="share-alt" color={"white"} size={14} />} press={() => { }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const customStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
  },
  membersContainer: {
    borderColor: "#242424",
    borderWidth: 1,
    width: "90%",
    borderRadius: 20,
    marginTop: 5,
    backgroundColor: "#1c1c1c",
    flex: 1,
    paddingBottom: 50,
  },
  slot: {
    width: "100%",
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#242424",
    borderBottomWidth: 1,
    borderTopColor: "#242424",
  }
});
