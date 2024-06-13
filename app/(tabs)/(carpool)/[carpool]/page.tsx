import React, { useEffect, useMemo, useRef, useState } from 'react';
import { auth, db, protectedRoute } from '@/constants/firebase';
import { router, useLocalSearchParams, useRootNavigationState } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header1, Header2, Header3, ListView, WhiteText } from '@/components/CustomUI';
import Backbutton from '@/components/Backbutton';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import CustomIndicator from '@/components/CustomIndicator';
import { IconButton } from '@/components/CustomButton';
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '@/constants/Colors';
import Card from '@/components/Card';
import styles from '@/constants/styles';
import MemberCard, { MemberCardInvited } from '@/components/memberCard';
import BottomSheet from "@gorhom/bottom-sheet";
import { InputWithIconAndButton } from '@/components/InputWithIcon';

interface CarpoolData {
  area: string;
  author: string;
  days: string[];
  destination: string;
  members: string[];
  invites: string[];
  seats: number;
  time: string;
  title: string;
}

export default function CarpoolPage() {
  const { carpool } = useLocalSearchParams();

  const [carpoolData, setCarpoolData] = useState<CarpoolData>({
    area: "",
    author: "",
    days: [],
    destination: "",
    seats: 8,
    time: "",
    title: "",
    members: [],
    invites: []
  });
  const [loading, setLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const [error, setError] = useState(''); // showing any login errors

  useEffect(() => {
    protectedRoute();
    getDocument();
  }, [router]);

  const getDocument = async () => {
    try {
      let carpoolID = carpool;
      if (typeof carpoolID === "string") {
        const docRef = doc(db, 'carpools', carpoolID);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document loaded");
          const data = docSnap.data() as CarpoolData;

          let days: string[] = [];
          let count = 0;
          let indexToDay = { 0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday" };
          data.days.forEach(element => {
            if (element) {
              //@ts-ignore
              days.push(indexToDay[count])
            }
            count += 1;
          });

          setCarpoolData({
            area: data.area || "",
            author: data.author || "",
            days: days || [],
            destination: data.destination || "",
            seats: data.seats || 8,
            time: data.time || "",
            title: data.title || "",
            members: data.members,
            invites: data.invites,
          });
          setLoading(false);
        } else {
          console.log("No such document!");
        }
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  const search = async () => {
    let carpoolID = carpool;
    setInviteLoading(true);
    if (typeof carpoolID === "string") {
      let result = await inviteEmail(searchEmail, carpoolID, carpoolData.invites);
      if (result == true) {
        getDocument();
        setError("")
        setInviteLoading(false);
      } else if (typeof result == "string") {
        setError(result)
        setInviteLoading(false);
      }
    }
  };

  //@ts-ignore
  const remove = async (data) => {
    setInviteLoading(true);
    //@ts-ignore
    let result = await removeInviteEmail(data, carpool, carpoolData.invites)
    if (result == true) { getDocument();     setInviteLoading(false);    }
  }

  // If loading, render CustomIndicator
  if (loading) {
    return <CustomIndicator />;
  }

  return (
    <View style={{ flex: 1, paddingTop: 55, justifyContent: "flex-start" }}>
      <Backbutton marginLeft={20} href="/(tabs)/(carpool)/home" />
      <Header1 customStyling={{ marginBottom: 10, alignSelf: "center" }}>{carpoolData.title}</Header1>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center", justifyContent: "flex-start", paddingBottom: 20 }}>
        <Card height={130} customStyling={{ justifyContent: "flex-start", alignItems: "flex-start", paddingHorizontal: 20, paddingTop: 10, position: 'relative' }}>
          <Header3>Carpool Details</Header3>
          <WhiteText>Area: {carpoolData.area}</WhiteText>
          <WhiteText>Days: {carpoolData.days.join(", ")}</WhiteText>
          <WhiteText>Destination: {carpoolData.destination}</WhiteText>
          <WhiteText>Seats: {carpoolData.seats}</WhiteText>
          <WhiteText>Time: {carpoolData.time}</WhiteText>
          <View style={customStyles.container}>
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="cog" color={"white"} size={14} />} press={() => { }} />
          </View>
        </Card>
        <TouchableOpacity
          style={[styles.input, { flexDirection: "row", backgroundColor: "black", height: 36, width: "90%", marginTop: 5, justifyContent: "flex-start", alignItems: "center" }]}
          onPress={() => { router.navigate(`/(tabs)/(carpool)/${carpool}/chat`) }}>
          <FontAwesome5 size={15} name="comment" color={COLORS.accent} style={{ marginRight: 10 }} />
          <WhiteText>Open Group Chat</WhiteText>
        </TouchableOpacity>
        <Card height={110} customStyling={{ justifyContent: "flex-start", alignItems: "flex-start", paddingHorizontal: 20, paddingTop: 10, marginTop: 5, position: 'relative' }}>
          <Header3>Next Trip details</Header3>
          <WhiteText>Date: {carpoolData.days.join(", ")}</WhiteText>
          <WhiteText>Driver: {carpoolData.area}</WhiteText>
          <WhiteText>Passengers: {carpoolData.days.join(", ")}</WhiteText>
          <View style={customStyles.container}>
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="check" color={"white"} size={14} />} press={() => { }} />
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="times" color={"white"} size={14} />} press={() => { }} />
          </View>
        </Card>
        <View style={customStyles.membersContainer}>
          <Header2 customStyling={{ alignSelf: "center", marginVertical: 10 }}>Members ({carpoolData.members.length}/{carpoolData.seats})</Header2>
          <ScrollView style={{ maxHeight: 230 }}>
            {carpoolData.members.map(function (data, index) {
              return (
                <MemberCard key={index} memberUsername={data} edit={editing} pfp={{ uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QAMRAAAgIAAwUGBQUBAQAAAAAAAAECAwQREiExQVFxBRMyUmGBFCKRobEzQmJy0ZIj/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAHFlka4uUmkgOyG3E1VbJS28ltZRxGNnZmq84R+7KoF2ztCTeVcElze0ryxV0t9j9thEAOnOb3zk/c81S5v6ngA7jdbHdOS9yaGNujval1RWAGlVj65bJpwf1LUZRks4tNc0YZ3VbOqWcJZc1wYG2CrhsZG1qM/ln9mWgAAAAAAAcWTjXByk8kgOcRdGmGqXsuZk3Wzunqm+i5C62V1jnL2XJHAAAAAAAAAAAAAAAL2Dxm1V2v0Uv9KIA3gUcBidSVVj25fK+ZeAAAAZfaF+uzRF/LF7fVl/FW91TKS37l1MYAAAAAAHqi5PJJt8kWMLhHctcnph03mlXVCuOUIpIDLjhL5L9Nrq8j14O9fsz6M1gBhzrnDxxa6o5N1pSWTWa5MpYnAppyoWT8oGeBxye8AAAATcWmtjTzNjDWq6pT47mjHLXZ9ui7S3sns9wNQAAZ3ac/mhXwSzZSJsbLViZv2IQAAAE+Do76zb4Y7X/hAa2Cr0YePOW1gTpZLJHoAAAAAABQ7Qo2d9FbV4igbslqTT3MxLId3ZKHJ5AcgAAexemSa3raeHgG7XLXCMlxWYIMBLVho+jaAGba87Zv+T/JwdWeOX9mcgAAB4zeikopLckYJuVTU64yXFZgdgAAAAAAAGRjllip+34Ncx8ZLVipvhnkBCAAAAAu4GbjU1/IHGDjnW/7ACHEx03zX8mRlntGGnEavMsysAAAA0uzrddXdvfD8Gad02SqsjKPD7oDbBHTbC2ClB7PwSAAAAAPG0lmwOLrFVW5vh+TFbzeb3ssYzE99PTF/JH7lcAAAAAA0uz4L4fN8ZME+GhoohH0AEPaFeqjVxht9jMN1pNNNZpmLfU6bXB8N3QDgAAADuFVlngg2AqtnVLVB5Mv04+uWSsWl8+BV+Cv8n3Q+CxHlX1QGnG2E1nGcX0Z65xW+UV1Zl/A3+VfVD4G/wAq+qAu2Y2mG6Wp8olDEYmd+zPTDkjr4LEeVfVD4G/yr6oCuCaWFvjvrfttIWmnk00+TAAAASYat23Rjls3voRmj2dTph3rW2W7oBdAAArY2jvq84r547vX0LIAwT2EJWSUYLNsvY7Cav8A0rW39yXH1JMBGtVZxac34vT0AYfBQgk7Mpy9dyLWWW49AAAAAAAAAAjtphbHKcVLqSADJxOElTnKLcofdFc3WZcsOrMS66HnHi8tiA5wlDusWfgW1s1kskjmmqNNahBbF9zsAAAAAAFW7DtT73DvTPiuEi0AK1OKjJ6Lfks4p8SyR3U13RynH34lfu8TR+lJWQ8st4FwFSONgnpujKuXqixC6ufhnF+4HYAAA8cox8TS6shsxdNe+afotoE5xZZGuOqbSRW7++79CrSvNM6hg05a75OyXruA4c7cW8q84VcZcWWqaoVQUYLJfk6SyPQAAAAAAAAAAAAADmUVJZSSa9SGWDol+zJ+jAAinhIRfyzmujPPhlu7yz/oACSOBp3vVLqyaFFVfggl7HgAkPQAAAAAAAAAP//Z" }} />
              )
            })}
          </ScrollView>
          <View style={customStyles.container}>
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="user-edit" color={"white"} size={14} />} press={() => { setEditing(!editing) }} />
            <IconButton customStyling={{ backgroundColor: "black", shadowColor: "black" }} size={28} icon={<FontAwesome5 name="user-plus" color={"white"} size={14} />} press={() => { bottomSheetRef.current?.expand() }} />
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "rgba(15,15,15,0.99)" }}
        handleIndicatorStyle={{ backgroundColor: "gray" }}
      >
        {!inviteLoading ? (
        <ListView customStyling={{ paddingTop: 5 }}>
          <Header3 customStyling={{ marginBottom: 10 }}>Invite Members</Header3>
          <InputWithIconAndButton buttonPressed={search} buttonIcon={<FontAwesome5 name="search-plus" color={"white"} size={14} />} input={searchEmail} setInput={setSearchEmail} placeHolder="Email" icon={<FontAwesome5 name="envelope" color={"white"} size={14} />} />
          <Text style={{ color: "red", fontSize: 10, marginTop: 2.5, marginBottom: 2.5 }}>{error}</Text>

          <ScrollView style={{ paddingHorizontal: 5, marginTop: 5, width: "80%" }}>
            {carpoolData.invites.map(function (data, index) {
              return (
                <MemberCardInvited onClick={() => {remove(data)}} key={index} memberUsername={data} edit={editing} pfp={{ uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QAMRAAAgIAAwUGBQUBAQAAAAAAAAECAwQREiExQVFxBRMyUmGBFCKRobEzQmJy0ZIj/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAHFlka4uUmkgOyG3E1VbJS28ltZRxGNnZmq84R+7KoF2ztCTeVcElze0ryxV0t9j9thEAOnOb3zk/c81S5v6ngA7jdbHdOS9yaGNujval1RWAGlVj65bJpwf1LUZRks4tNc0YZ3VbOqWcJZc1wYG2CrhsZG1qM/ln9mWgAAAAAAAcWTjXByk8kgOcRdGmGqXsuZk3Wzunqm+i5C62V1jnL2XJHAAAAAAAAAAAAAAAL2Dxm1V2v0Uv9KIA3gUcBidSVVj25fK+ZeAAAAZfaF+uzRF/LF7fVl/FW91TKS37l1MYAAAAAAHqi5PJJt8kWMLhHctcnph03mlXVCuOUIpIDLjhL5L9Nrq8j14O9fsz6M1gBhzrnDxxa6o5N1pSWTWa5MpYnAppyoWT8oGeBxye8AAAATcWmtjTzNjDWq6pT47mjHLXZ9ui7S3sns9wNQAAZ3ac/mhXwSzZSJsbLViZv2IQAAAE+Do76zb4Y7X/hAa2Cr0YePOW1gTpZLJHoAAAAAABQ7Qo2d9FbV4igbslqTT3MxLId3ZKHJ5AcgAAexemSa3raeHgG7XLXCMlxWYIMBLVho+jaAGba87Zv+T/JwdWeOX9mcgAAB4zeikopLckYJuVTU64yXFZgdgAAAAAAAGRjllip+34Ncx8ZLVipvhnkBCAAAAAu4GbjU1/IHGDjnW/7ACHEx03zX8mRlntGGnEavMsysAAAA0uzrddXdvfD8Gad02SqsjKPD7oDbBHTbC2ClB7PwSAAAAAPG0lmwOLrFVW5vh+TFbzeb3ssYzE99PTF/JH7lcAAAAAA0uz4L4fN8ZME+GhoohH0AEPaFeqjVxht9jMN1pNNNZpmLfU6bXB8N3QDgAAADuFVlngg2AqtnVLVB5Mv04+uWSsWl8+BV+Cv8n3Q+CxHlX1QGnG2E1nGcX0Z65xW+UV1Zl/A3+VfVD4G/wAq+qAu2Y2mG6Wp8olDEYmd+zPTDkjr4LEeVfVD4G/yr6oCuCaWFvjvrfttIWmnk00+TAAAASYat23Rjls3voRmj2dTph3rW2W7oBdAAArY2jvq84r547vX0LIAwT2EJWSUYLNsvY7Cav8A0rW39yXH1JMBGtVZxac34vT0AYfBQgk7Mpy9dyLWWW49AAAAAAAAAAjtphbHKcVLqSADJxOElTnKLcofdFc3WZcsOrMS66HnHi8tiA5wlDusWfgW1s1kskjmmqNNahBbF9zsAAAAAAFW7DtT73DvTPiuEi0AK1OKjJ6Lfks4p8SyR3U13RynH34lfu8TR+lJWQ8st4FwFSONgnpujKuXqixC6ufhnF+4HYAAA8cox8TS6shsxdNe+afotoE5xZZGuOqbSRW7++79CrSvNM6hg05a75OyXruA4c7cW8q84VcZcWWqaoVQUYLJfk6SyPQAAAAAAAAAAAAADmUVJZSSa9SGWDol+zJ+jAAinhIRfyzmujPPhlu7yz/oACSOBp3vVLqyaFFVfggl7HgAkPQAAAAAAAAAP//Z" }} />
              )
            })}
          </ScrollView>
        </ListView>
        ) : (<CustomIndicator/>)}
      </BottomSheet>
    </View>
  );
}

const removeInviteEmail = async (email: string, id: string, invites: string[]) => {
  const userRef = collection(db, 'users');
  const userQuery = query(userRef, where('email', '==', email.toLowerCase()));
  const userSnapshot = await getDocs(userQuery);

  console.log(email, invites)
  if (!invites.includes(email)) { return false }
  if (!userSnapshot.empty) {
    // Iterate through each user document
    for (const userDoc of userSnapshot.docs) {
      const carpoolsRef = doc(db, "carpools", id);

      // Append email to the invites array
      await updateDoc(carpoolsRef, {
        invites: arrayRemove(email.toLowerCase())
      });
      await updateDoc(userDoc.ref, {
        invites: arrayRemove({ invitedBy: auth.currentUser?.email, carpoolId: id })
      });

      console.log("User invite removed")
      return true;
    }
  } else {
    return false;
  }
}

const inviteEmail = async (email: string, id: string, invites: string[]) => {
  if (email.length <= 0) { return "Fill out the email field" }
  // if(email==auth.currentUser?.email){return "You can't invite yourself!"}

  const userRef = collection(db, 'users');
  const userQuery = query(userRef, where('email', '==', email.toLowerCase()));
  const userSnapshot = await getDocs(userQuery);

  if (invites.includes(email)) { return "User has been invited already!" }
  if (!userSnapshot.empty) {
    // Iterate through each user document
    for (const userDoc of userSnapshot.docs) {
      const carpoolsRef = doc(db, "carpools", id);

      // Append email to the invites array
      await updateDoc(carpoolsRef, {
        invites: arrayUnion(email.toLowerCase())
      });
      await updateDoc(userDoc.ref, {
        invites: arrayUnion({ invitedBy: auth.currentUser?.email, carpoolId: id })
      });

      return true;
    }
  } else {
    return "The email does not have an account"
  }
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
