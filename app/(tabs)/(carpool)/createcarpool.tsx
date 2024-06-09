// app/index.js
import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { auth, db, protectedRoute } from '@/constants/firebase';
import { router, useRootNavigationState } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { ListView, Header1, LeftAlignedHeader2, WhiteText } from '@/components/CustomUI';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import COLORS from '@/constants/Colors';
import Backbutton from '@/components/Backbutton';
import InputWithIcon from '@/components/InputWithIcon';
import CustomButton from '@/components/CustomButton';
import TimingsPicker from '@/components/TimingsPicker';
import { addDoc, collection } from 'firebase/firestore';

export function CreateCarpool() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const { user } = useAuth();

  protectedRoute();

  const [destination, setDestination] = useState('');
  const [area, setArea] = useState('');
  const [seats, setSeats] = useState('');
  const [timings, setTimings] = useState({ days: [false, false, false, false, false, false, false], time: '' });
  const [title, setTitle] = useState("");

  const saveRequest = async () => {
    let seatCount = 0;
    try{
      seatCount = parseInt(seats)
    } catch{
      seatCount=-1;
    }
    let data = {
      //@ts-ignore
      area: area,
      seats: seatCount,
      destination: destination,
      //@ts-ignore
      days: timings.days,
      time: timings.time,
      author:auth.currentUser?.uid,
      title:title
    }
    router.push({
      pathname: '/(tabs)/(carpool)/confirmcreatecarpool',
      params: {
        data:JSON.stringify(data)
      },
    })
  }

  return (
    <View style={{ flex: 1, paddingTop: 75, justifyContent: "flex-start" }}>
      <Backbutton marginLeft={10} href="/(tabs)/(carpool)/carpoolscreen" />
      <Header1 customStyling={{ marginLeft: 10 }}>Create a car pool group</Header1>
      <WhiteText customStyling={{ marginLeft: 10, marginBottom: 10 }}>
        Enter in the following information to create a carpooling group request. All information can be edited later!
      </WhiteText>

      <ListView customStyling={{ gap: 15, marginTop: 5, marginLeft: 10 }}>
      <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Description</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>
            Enter a fitting title for your request so others can find it
          </WhiteText>
          <InputWithIcon
            customStyling={{ marginTop: 5, width: "95%" }}
            placeHolder="Title"
            icon={<FontAwesome5 size={15} name="map" color={COLORS.accent} />}
            input={title}
            setInput={setTitle}
          />
        </View>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Final Destination</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>
            Enter where you are carpooling to. Use an address or general name if applicable
          </WhiteText>
          <InputWithIcon
            customStyling={{ marginTop: 5, width: "95%" }}
            placeHolder="Destination"
            icon={<FontAwesome5 size={15} name="compass" color={COLORS.accent} />}
            input={destination}
            setInput={setDestination}
          />
        </View>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Residential area</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>
            Enter a community name or area defined by well known landmark (eg: Riverbrooke community)
          </WhiteText>
          <InputWithIcon
            customStyling={{ marginTop: 5, width: "95%" }}
            placeHolder="Area"
            icon={<FontAwesome5 size={15} name="compass" color={COLORS.accent} />}
            input={area}
            setInput={setArea}
          />
        </View>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Seat Availability</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>
            Enter how many passengers you are interested in carpooling with
          </WhiteText>
          <InputWithIcon
            customStyling={{ marginTop: 5, width: "95%" }}
            type="numeric"
            placeHolder="Seats"
            icon={<FontAwesome5 size={15} name="car" color={COLORS.accent} />}
            input={seats}
            setInput={setSeats}
          />
        </View>
        <View style={{ width: "100%" }}>
          <LeftAlignedHeader2>Timings</LeftAlignedHeader2>
          <WhiteText customStyling={{ fontSize: 9, maxWidth: "80%", marginTop: 3 }}>
            Edit all timing related information using the popup modal below
          </WhiteText>
          <TimingsPicker onChange={setTimings} />
        </View>
        <CustomButton
          icon={<FontAwesome5 size={15} name="arrow-right" color={"white"} />}
          press={() => { saveRequest() }}
          customStyling={{ width: 150, height: 40 }}
        />
      </ListView>
    </View>
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

export default CreateCarpool;
