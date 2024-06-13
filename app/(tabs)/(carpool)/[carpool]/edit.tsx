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

export default function EditCarpool() {
  useEffect(() => {
    protectedRoute();
  }, [router]);

  const [loading, setLoading] = useState(false);
  const { carpool } = useLocalSearchParams();

  if (loading) {
    return <CustomIndicator />
  }
  return (
    <View style={{ flex: 1, paddingTop: 75, justifyContent: "flex-start" }}>
      <Backbutton marginLeft={20} href={`/(tabs)/(carpool)/${carpool}/page`} />
      <Header1 customStyling={{marginLeft:20}}>Edit - {carpool}</Header1>
    </View>
  );
}

const customStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
  }
});