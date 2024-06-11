import React, { useEffect, useState } from 'react';
import {
  auth,
  db,
  protectedRoute,
} from '@/constants/firebase';
import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {
  router,
  useLocalSearchParams,
  useRootNavigationState,
} from 'expo-router';
import {
  CenteredView,
  Header1,
  Header2,
  LeftAlignedHeader2,
  ListView,
  WhiteText,
} from '@/components/CustomUI';
import Backbutton from '@/components/Backbutton';
import CustomButton from '@/components/CustomButton';
import COLORS from '@/constants/Colors';

interface CarpoolData {
  days: boolean[];
  title: string;
  destination: string;
  area: string;
  seats: number;
  time: string;
  author: string;
  members: any[];
}

export default function ConfirmCreateCarpool() {
  // making sure user is logged in
  useEffect(() => { protectedRoute(); }, [router])

  const { data } = useLocalSearchParams(); // getting data from the previous page
  const [error, setError] = useState<string>(''); // showing any errors in creating the request

  // trying to get data and making sure its in correct format
  let parsedData: CarpoolData | undefined;
  try {
    //@ts-ignore
    parsedData = JSON.parse(data) as CarpoolData;
  } catch (error) {
    console.error('Error parsing data:', error);
    parsedData = undefined;
  }

  // saving request in database
  const save = async () => {
    let error = await saveRequest(parsedData)
    if (typeof error == "string") {
      setError(error)
    }
  }
  return (
    <View style={{ flex: 1, paddingTop: 75, justifyContent: 'flex-start' }}>
      <Backbutton href="/(tabs)/(carpool)/create" />

      <Header1 customStyling={{ marginLeft: 10 }}>Confirmation</Header1>
      <WhiteText customStyling={{ marginLeft: 10, marginBottom: 10 }}>
        Before we make your request public, review the following similar rides
      </WhiteText>

      <ListView>
        <Text style={{ color: 'gray' }}>No similar rides found...</Text>
        <CustomButton
          title="Create"
          customStyling={{
            height: 40,
            marginTop: 15,
            backgroundColor: COLORS.accent,
          }}
          press={save}
        />
        <Text style={{ color: 'red', marginTop: 2.5, marginBottom: 2.5 }}>
          {error}
        </Text>
      </ListView>
    </View>
  );
}


const saveRequest = async (parsedData: CarpoolData | undefined) => {
  // data is undefined
  if (!parsedData) {
    console.error('Parsed data is undefined or null.');
    return;
  }

  // making sure data is valid, if not returning the error
  const message = validateData(parsedData);
  if (message !== true) {
    return (message);
  }
  parsedData.members = [auth.currentUser?.email]
  // adding the document to the database
  try {
    const docRef = await addDoc(collection(db, 'carpools'), parsedData);
    console.log('Document written with ID: ', docRef.id);

    // adding the carpool request into the users db page
    await updateUserCarpools(docRef.id);

    router.navigate('/(tabs)/(carpool)/home');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// adding carpool into users carpool list
async function updateUserCarpools(carpoolId: string) {
  const userRef = collection(db, 'users');
  const q = query(userRef, where('email', '==', auth.currentUser?.email));

  try {
    // finding users db page
    const qs = await getDocs(q);
    qs.forEach(async (doc) => {
      // editing the carpools field and appending the carpool id of the newly created one
      await updateDoc(doc.ref, {
        carpools: arrayUnion(carpoolId),
      });
    });
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}

// validating forum data
function validateData(data: CarpoolData): true | string {
  try {
    if (data.days.filter(Boolean).length === 0) {
      return 'Please select at least one day';
    }

    if (!data.title.trim()) {
      return 'Please enter a request title';
    }

    if (!data.destination.trim()) {
      return 'Please enter a destination';
    }

    if (!data.area.trim()) {
      return 'Please enter a general residential area';
    }

    if (data.seats <= 0) {
      return 'Please enter a proper seat number estimate';
    }

    if (data.days.length !== 7 || !data.days.every((day) => typeof day === 'boolean')) {
      return 'Something went wrong with day selection';
    }

    // making sure that at least one day is selected
    let count = 0
    //@ts-ignore
    data.days.forEach(element => {
      // we know none are selected if all days in the list are false
      if (!element) {
        if (count == 6) {
          return "Please select at least one day";
        }
        count += 1
      }
    });


    if (!data.time.trim()) {
      return 'Something went wrong with time selection';
    }

    if (!data.author.trim()) {
      return 'Something went wrong with author define';
    }

    return true;
  } catch (error) {
    console.error('Validation error:', error);
    return 'Something went wrong!';
  }
}
