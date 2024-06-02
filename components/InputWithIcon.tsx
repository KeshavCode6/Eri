import { View, StyleSheet, TextInput, ColorValue, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from '@/constants/styles';

interface InputProps {
  icon:ReactNode;
  color?: ColorValue;
  placeHolder?: string;
  background?: ColorValue;
  input?:string;
  secure?:boolean;
  setInput?: (page: string) => void;
  customStyling?: ViewStyle; // Marked as optional
}

const InputWithIcon = ({ icon, color = 'white', input, placeHolder = 'Skibidi', secure, setInput, background = 'black', customStyling }: InputProps) => {
  return (
    <View style={[styles.input, customStyles.searchSection, { backgroundColor: background }, customStyling]}>
      {icon}
      <TextInput
        style={[styles.input,  { color: color, backgroundColor: background, borderColor:"rgba(0,0,0,0)", height:"90%" }]}
        placeholder={placeHolder}
        placeholderTextColor={color}
        onChangeText={setInput}
        value={input}
        secureTextEntry={secure}
      />
    </View>
  );
};

const customStyles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:10
  },
});

export default InputWithIcon;
