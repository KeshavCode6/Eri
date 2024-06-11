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
import MemberCard from '@/components/memberCard';

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
  const [editing, setEditing] = useState(false);
  const { carpool } = useLocalSearchParams();
  const [members, setMembers] = useState(["nigger", "nigger", "nigger", "nigger"]);

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
        <Card height={90} customStyling={{ justifyContent: "flex-start", alignItems: "flex-start", paddingHorizontal: 20, paddingTop: 10, marginTop:5, position: 'relative' }}>
          <Header3>Next Trip details</Header3>
          <WhiteText>Driver: {area}</WhiteText>
          <WhiteText>Passengers: {days.join(", ")}</WhiteText>
          <View style={customStyles.container}>
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="check" color={"white"} size={14} />} press={() => { }} />
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="times" color={"white"} size={14} />} press={() => { }} />
          </View>
        </Card>
        <View style={customStyles.membersContainer}>
          <Header2 customStyling={{ alignSelf: "center", marginVertical: 10 }}>Members ({members.length}/{seats})</Header2>
          <ScrollView style={{ maxHeight: 230 }}>
            {members.map(function (data, index) {
              return (
                <MemberCard key={index} memberUsername={data} edit={editing} pfp={{ uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QAMRAAAgIAAwUGBQUBAQAAAAAAAAECAwQREiExQVFxBRMyUmGBFCKRobEzQmJy0ZIj/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAHFlka4uUmkgOyG3E1VbJS28ltZRxGNnZmq84R+7KoF2ztCTeVcElze0ryxV0t9j9thEAOnOb3zk/c81S5v6ngA7jdbHdOS9yaGNujval1RWAGlVj65bJpwf1LUZRks4tNc0YZ3VbOqWcJZc1wYG2CrhsZG1qM/ln9mWgAAAAAAAcWTjXByk8kgOcRdGmGqXsuZk3Wzunqm+i5C62V1jnL2XJHAAAAAAAAAAAAAAAL2Dxm1V2v0Uv9KIA3gUcBidSVVj25fK+ZeAAAAZfaF+uzRF/LF7fVl/FW91TKS37l1MYAAAAAAHqi5PJJt8kWMLhHctcnph03mlXVCuOUIpIDLjhL5L9Nrq8j14O9fsz6M1gBhzrnDxxa6o5N1pSWTWa5MpYnAppyoWT8oGeBxye8AAAATcWmtjTzNjDWq6pT47mjHLXZ9ui7S3sns9wNQAAZ3ac/mhXwSzZSJsbLViZv2IQAAAE+Do76zb4Y7X/hAa2Cr0YePOW1gTpZLJHoAAAAAABQ7Qo2d9FbV4igbslqTT3MxLId3ZKHJ5AcgAAexemSa3raeHgG7XLXCMlxWYIMBLVho+jaAGba87Zv+T/JwdWeOX9mcgAAB4zeikopLckYJuVTU64yXFZgdgAAAAAAAGRjllip+34Ncx8ZLVipvhnkBCAAAAAu4GbjU1/IHGDjnW/7ACHEx03zX8mRlntGGnEavMsysAAAA0uzrddXdvfD8Gad02SqsjKPD7oDbBHTbC2ClB7PwSAAAAAPG0lmwOLrFVW5vh+TFbzeb3ssYzE99PTF/JH7lcAAAAAA0uz4L4fN8ZME+GhoohH0AEPaFeqjVxht9jMN1pNNNZpmLfU6bXB8N3QDgAAADuFVlngg2AqtnVLVB5Mv04+uWSsWl8+BV+Cv8n3Q+CxHlX1QGnG2E1nGcX0Z65xW+UV1Zl/A3+VfVD4G/wAq+qAu2Y2mG6Wp8olDEYmd+zPTDkjr4LEeVfVD4G/yr6oCuCaWFvjvrfttIWmnk00+TAAAASYat23Rjls3voRmj2dTph3rW2W7oBdAAArY2jvq84r547vX0LIAwT2EJWSUYLNsvY7Cav8A0rW39yXH1JMBGtVZxac34vT0AYfBQgk7Mpy9dyLWWW49AAAAAAAAAAjtphbHKcVLqSADJxOElTnKLcofdFc3WZcsOrMS66HnHi8tiA5wlDusWfgW1s1kskjmmqNNahBbF9zsAAAAAAFW7DtT73DvTPiuEi0AK1OKjJ6Lfks4p8SyR3U13RynH34lfu8TR+lJWQ8st4FwFSONgnpujKuXqixC6ufhnF+4HYAAA8cox8TS6shsxdNe+afotoE5xZZGuOqbSRW7++79CrSvNM6hg05a75OyXruA4c7cW8q84VcZcWWqaoVQUYLJfk6SyPQAAAAAAAAAAAAADmUVJZSSa9SGWDol+zJ+jAAinhIRfyzmujPPhlu7yz/oACSOBp3vVLqyaFFVfggl7HgAkPQAAAAAAAAAP//Z" }} />
              )
            })}
          </ScrollView>
          <View style={customStyles.container}>
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="user-edit" color={"white"} size={14} />} press={() => { setEditing(!editing) }} />
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="user-plus" color={"white"} size={14} />} press={() => { }} />
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
