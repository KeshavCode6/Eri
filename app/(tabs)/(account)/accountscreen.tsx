import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import useAuth from '@/hooks/useAuth';
import {protectedRoute} from '@/constants/firebase';
import { signOut } from 'firebase/auth';
import { auth } from '@/constants/firebase';
import COLORS from '@/constants/Colors';
import styles from '@/constants/styles';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import { useRootNavigationState } from 'expo-router';

export default function Index() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const { user } = useAuth();
  protectedRoute();

  return (
    <View style={{ justifyContent: "flex-start", alignItems:"center", paddingTop: 75, height:"100%", width:"100%" }}>
      <View style={customStyles.centeredContainer}>
        <TouchableOpacity onPress={() => { }} style={customStyles.pfpButton}>
          <ImageBackground
            source={require('@/assets/images/react-logo.png')}
            style={customStyles.pfpBackground}
            imageStyle={customStyles.pfpImage}>
            <FontAwesome5 name="camera" size={24} color={COLORS.accent} />
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={[customStyles.slot, { marginTop: 30 }]}>
        <Text style={customStyles.text}>Name</Text>
        <View style={customStyles.area}>
          <TextInput
            style={customStyles.textInput}
            placeholderTextColor={COLORS.accent}
            placeholder={user?.displayName || user?.email || ""}
          />
          <TouchableOpacity>
            <FontAwesome5 name="undo" size={15} color={COLORS.accent} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[customStyles.slot, { marginTop: 30 }]}>
        <Text style={customStyles.text}>Email</Text>
        <View style={customStyles.area}>
          <TextInput
            style={customStyles.textInput}
            placeholderTextColor={COLORS.accent}
            placeholder={user?.email || ""}
          />
          <TouchableOpacity>
            <FontAwesome5 name="lock" size={15} color={COLORS.accent} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[customStyles.slot, { marginTop: 30 }]}>
        <Text style={customStyles.text}>Password</Text>
        <TouchableOpacity>
          <Text style={customStyles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={customStyles.buttons}>
        <CustomButton title="Save" customStyling={{ backgroundColor: COLORS.accent, width: 300, height: 50 }} press={() => { }} />
      </View>
    </View>
  );
}

const customStyles = StyleSheet.create({
  centeredContainer: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center"
  },
  buttons: {
    position: "absolute",
    bottom: 50,
    gap: 3
  },
  slot: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#242323",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 15,
  },
  textInput: {
    color: COLORS.accent
  },
  pfpButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pfpBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pfpImage: {
    borderRadius: 50,
  },
  userName: {
    color: "white",
    fontSize: 25,
    marginTop: 10,
  },
  userEmail: {
    color: COLORS.accent,
    fontSize: 15,
    marginTop: 5,
  },
  resetText: {
    color: COLORS.accent,
  },
  area: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10
  }
});

