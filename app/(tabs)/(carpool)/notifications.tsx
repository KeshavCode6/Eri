import React, { useEffect, useState } from 'react';
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
    <ListView>
      <Backbutton marginLeft={10} href="/(tabs)/(carpool)/home" />
      <Header1 customStyling={{marginLeft:20, marginTop:70}}>Notifications</Header1>
    </ListView>
  );
}



// custom styles
const styles = StyleSheet.create({

});
