import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Header2 } from '@/components/CustomUI';
import Card from './Card';
import CustomButton from './CustomButton';
import COLORS from '@/constants/Colors';

interface CarpoolCardProps {
  title: string;
  departureTime: string;
  peopleCount: string;
  days: string;
  area: string;
  imageUrl: string;
}

const CarpoolCard: React.FC<CarpoolCardProps> = ({ title, departureTime, peopleCount, days, area, imageUrl }) => {
  return (
    <Card height={160} customStyling={{ backgroundColor: "#383838", shadowColor: "#383838" }}>
      <View style={styles.cardContent}>
        <View style={styles.row}>
          <View style={styles.leftContent}>
            <Header2>{title}</Header2>
            <Text style={styles.text}>
              Departure: <Text style={styles.whiteText}>{departureTime}</Text>
            </Text>
            <Text style={styles.text}>
              People: <Text style={styles.whiteText}>{peopleCount}</Text>
            </Text>
            <Text style={styles.text}>
              Days: <Text style={styles.whiteText}>{days}</Text>
            </Text>
            <Text style={styles.text}>
              Area: <Text style={styles.whiteText}>{area}</Text>
            </Text>
            <CustomButton
              title="Join"
              customStyling={styles.button}
              press={() => { console.log("Joining carpool:, ", title) }}
            />
          </View>
          <View style={styles.rightContent}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    paddingTop: 10,
    justifyContent: "flex-start",
  },
  row: {
    width: "100%",
    flexDirection: "row",
  },
  leftContent: {
    flex: 1,
    marginTop: 5,
    flexDirection: "column",
  },
  rightContent: {
    alignItems: "center",
    width: 120,
    justifyContent: "center",
    height: "100%",
    flexDirection: "column",
  },
  text: {
    color: COLORS.accent,
    marginBottom: 5,
  },
  whiteText: {
    color: "white",
  },
  button: {
    width: 175,
    height: 25,
    marginTop: 5,
  },
  image: {
    borderRadius: 10,
    width: 100,
    height: 100,
  },
});

export default CarpoolCard;
