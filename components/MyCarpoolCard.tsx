import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {TouchableCard} from './Card'; // Adjust the import based on your file structure
import COLORS from '@/constants/Colors';
import { router } from 'expo-router';

interface CarpoolCardProps {
  title: string;
  departureTime: string;
  driver: string;
  car: string;
  people: string;
  destination: string;
  imageUrl: string;
  cardHeight?: number;
  id:string;
  customStyling?: {
    backgroundColor?: string;
    shadowColor?: string;
  };
}

const MyCarpoolCard: React.FC<CarpoolCardProps> = ({  
  title, 
  departureTime, 
  driver, 
  car, 
  id,
  people, 
  imageUrl, 
  destination,
  cardHeight = 130, 
  customStyling = { backgroundColor: "#383838", shadowColor: "#383838" } 
}) => {
  return (
    <TouchableCard press={()=>{router.push(`/(tabs)/(carpool)/${id}/page`)}}  customStyling={customStyling}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.header}>{title}</Text>
          <Text style={styles.label}>Next Departure: <Text style={styles.value}>{departureTime}</Text></Text>
          <Text style={styles.label}>Driver: <Text style={styles.value}>{driver}</Text></Text>
          <Text style={styles.label}>Car: <Text style={styles.value}>{car}</Text></Text>
          <Text style={styles.label}>People: <Text style={styles.value}>{people}</Text></Text>
          <Text style={styles.label}>Destination: <Text style={styles.value}>{destination}</Text></Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      </View>
    </TouchableCard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom:5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'column',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    color: COLORS.accent, 
  },
  value: {
    color: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    width: 120,
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
  },
  image: {
    borderRadius: 10,
    width: 100,
    height: 100,
  },
});

export default MyCarpoolCard;
