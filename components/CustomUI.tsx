import { View, Text, ViewStyle, TextStyle } from 'react-native'
import React, { ReactNode } from 'react'

interface HeaderProps {
  children?: ReactNode;
  customStyling?: ViewStyle; // Marked as optional
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
