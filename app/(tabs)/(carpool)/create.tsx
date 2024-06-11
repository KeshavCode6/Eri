import React, { useEffect, useState } from 'react';
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


// carpool data in db
interface CarpoolData {
  area: string;
  seats: number;
  destination: string;
  days: boolean[];
  time: string;
  author: string | undefined;
  title: string;
}

export default function CreateCarpool() {
  // making sure user is logged in
  useEffect(() => {
    protectedRoute();
  }, [router]);

  // forum parameters
  const [destination, setDestination] = useState('');
  const [area, setArea] = useState('');
  const [seats, setSeats] = useState('');
  const [timings, setTimings] = useState<{ days: boolean[]; time: string }>({ days: [false, false, false, false, false, false, false], time: '' });
  const [title, setTitle] = useState('');

  return (
    <View style={styles.container}>
      <Backbutton marginLeft={10} href="/(tabs)/(carpool)/home" />
      <Header1 customStyling={styles.header}>Create a Carpool Group</Header1>
      <WhiteText customStyling={styles.description}>
        Enter the following information to create a carpooling group request. All information can be edited later!
      </WhiteText>

      <ListView customStyling={styles.listView}>
        <View style={styles.inputContainer}>
          <LeftAlignedHeader2>Description</LeftAlignedHeader2>
          <WhiteText customStyling={styles.inputDescription}>
            Enter a fitting title for your request so others can find it
          </WhiteText>
          <InputWithIcon
            customStyling={styles.inputWithIcon}
            placeHolder="Title"
            icon={<FontAwesome5 size={15} name="map" color={COLORS.accent} />}
            input={title}
            setInput={setTitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <LeftAlignedHeader2>Final Destination</LeftAlignedHeader2>
          <WhiteText customStyling={styles.inputDescription}>
            Enter where you are carpooling to. Use an address or general name if applicable
          </WhiteText>
          <InputWithIcon
            customStyling={styles.inputWithIcon}
            placeHolder="Destination"
            icon={<FontAwesome5 size={15} name="compass" color={COLORS.accent} />}
            input={destination}
            setInput={setDestination}
          />
        </View>
        <View style={styles.inputContainer}>
          <LeftAlignedHeader2>Residential Area</LeftAlignedHeader2>
          <WhiteText customStyling={styles.inputDescription}>
            Enter a community name or area defined by a well-known landmark (e.g., Riverbrooke community)
          </WhiteText>
          <InputWithIcon
            customStyling={styles.inputWithIcon}
            placeHolder="Area"
            icon={<FontAwesome5 size={15} name="compass" color={COLORS.accent} />}
            input={area}
            setInput={setArea}
          />
        </View>
        <View style={styles.inputContainer}>
          <LeftAlignedHeader2>Seat Availability</LeftAlignedHeader2>
          <WhiteText customStyling={styles.inputDescription}>
            Enter how many passengers you are interested in carpooling with
          </WhiteText>
          <InputWithIcon
            customStyling={styles.inputWithIcon}
            type="numeric"
            placeHolder="Seats"
            icon={<FontAwesome5 size={15} name="car" color={COLORS.accent} />}
            input={seats}
            setInput={setSeats}
          />
        </View>
        <View style={styles.inputContainer}>
          <LeftAlignedHeader2>Timings</LeftAlignedHeader2>
          <WhiteText customStyling={styles.inputDescription}>
            Edit all timing-related information using the popup modal below
          </WhiteText>
          <TimingsPicker onChange={setTimings} />
        </View>
        <CustomButton
          icon={<FontAwesome5 size={15} name="arrow-right" color={'white'} />}
          press={()=>{saveRequest(area, seats, destination, timings.days, timings.time, title)}}
          customStyling={styles.button}
        />
      </ListView>
    </View>
  );
}


// saving forum data as json
const saveRequest = async (area:string, seats:string, destination:string, days:boolean[], time:string, title:string) => {
  // converting seats into a number
  let seatCount = 0;
  try {
    seatCount = parseInt(seats);
  } catch {
    // if seats can not be a number, assign -1 which will be handled later on
    seatCount = -1; 
  }

  // data json
  const data: CarpoolData = {
    area: area.trim(),
    seats: seatCount,
    destination: destination.trim(),
    days: days,
    time: time,
    author: auth.currentUser?.uid,
    title: title.trim(),
  };

  // sending data to confirmation screen
  router.push({
    pathname: '/(tabs)/(carpool)/confirm',
    params: {
      data: JSON.stringify(data),
    },
  });
};

// custom styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    justifyContent: 'flex-start',
  },
  header: {
    marginLeft: 10,
  },
  description: {
    marginLeft: 10,
    marginBottom: 10,
  },
  listView: {
    gap: 15,
    marginTop: 5,
    marginLeft: 10,
  },
  inputContainer: {
    width: '100%',
  },
  inputDescription: {
    fontSize: 9,
    maxWidth: '80%',
    marginTop: 3,
  },
  inputWithIcon: {
    marginTop: 5,
    width: '95%',
  },
  button: {
    width: 150,
    height: 40,
  },
});
