import { View, StyleSheet, TextInput, ColorValue, KeyboardTypeOptions , ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import styles from '@/constants/styles';
import { IconButton } from './CustomButton';
import { FontAwesome5 } from '@expo/vector-icons';

interface InputProps {
  icon?:ReactNode; // icon of input (FontAwesome5)
  buttonIcon?:ReactNode;
  color?: ColorValue; // color of text
  placeHolder?: string; // placeholder text
  background?: ColorValue; // background color
  input?:string; // state value
  setInput?: (page: string) => void; // use state setter
  endEdit?: () => void; // use state setter
  secure?:boolean; // should text input be secure
  customStyling?: ViewStyle; // Marked as optional
  type?:KeyboardTypeOptions;
}

const InputWithIcon = ({ icon, color = 'white', input, placeHolder = 'Skibidi', secure, setInput, background = 'black', customStyling, type="default", endEdit}: InputProps) => {
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
        keyboardType={type}
        onEndEditing={endEdit}
      />
    </View>
  );
};

interface InputButtonProps {
  icon?:ReactNode; // icon of input (FontAwesome5)
  buttonIcon?:ReactNode;
  color?: ColorValue; // color of text
  placeHolder?: string; // placeholder text
  background?: ColorValue; // background color
  input?:string; // state value
  setInput?: (page: string) => void; // use state setter
  endEdit?: () => void; // use state setter
  buttonPressed: () => void; // use state setter
  secure?:boolean; // should text input be secure
  customStyling?: ViewStyle; // Marked as optional
  type?:KeyboardTypeOptions;
}
export const InputWithIconAndButton = ({ icon, color = 'white', input, placeHolder = 'Skibidi', secure, setInput, background = 'black', customStyling, type = "default", buttonIcon, endEdit, buttonPressed  }: InputButtonProps) => {
  return (
    <View style={[styles.input, customStyles.searchSection, { backgroundColor: background }, customStyling]}>
      {icon}
      <TextInput
        style={[styles.input, {flex:1, color: color, backgroundColor: background, borderColor: "rgba(0,0,0,0)", height: "90%" }]}
        placeholder={placeHolder}
        placeholderTextColor={color}
        onChangeText={setInput}
        value={input}
        secureTextEntry={secure}
        keyboardType={type}
        onEndEditing={endEdit}
      />
      <IconButton customStyling={{ borderRadius: 5}} size={40} icon={buttonIcon} press={() => {buttonPressed();}} />
    </View>
  );
};

const customStyles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:10,

  },
});

export default InputWithIcon;
