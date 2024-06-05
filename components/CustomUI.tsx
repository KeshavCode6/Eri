import { Text, ViewStyle, TextStyle, View } from 'react-native'
import React, { Children, ReactNode } from 'react'

// script with custom components with applied styling
// may be less efficient idk tbh, but it prevents having to specify style over and over again

interface HeaderProps {
  children?: ReactNode;
  customStyling?: ViewStyle; // optional extra styling
}

export const CenteredView = ({children, customStyling}:HeaderProps) =>{
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      {children}
    </View>
  );
}

export const Header1 = ({ children, customStyling }: HeaderProps) => {
  return (
    <Text
      style={[{
        fontSize: 25,
        fontWeight: 900,
        color: "white"
      }, customStyling]}
    >
      {children}
    </Text>
  )
}

export const Header2 = ({ children, customStyling }: HeaderProps) => {
  return (
    <Text
      style={[{
        fontSize: 20,
        fontWeight: 700,
        color: "white"
      }, customStyling]}
    >
      {children}
    </Text>
  )
}



export const Header3 = ({ children, customStyling }: HeaderProps) => {
  return (
    <Text
      style={[{
        fontSize: 15,
        fontWeight: 600,
        color: "white"
      }, customStyling]}
    >
      {children}
    </Text>
  )
}

interface TextProps {
    children?: ReactNode;
    customStyling?: TextStyle; // Marked as optional
  }

export const WhiteText = ({ children, customStyling }: TextProps) => {
    return (
      <Text
        style={[{
          color: "white"
        }, customStyling]}
      >
        {children}
      </Text>
    )
  }
