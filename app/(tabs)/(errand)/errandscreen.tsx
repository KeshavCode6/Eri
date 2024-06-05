// app/index.js
import React from 'react';
import useAuth from '@/hooks/useAuth';
import { protectedRoute } from '@/constants/firebase';
import { useRootNavigationState } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TouchableCard } from '@/components/Card';
import {Header1, WhiteText } from '@/components/CustomUI';
import CustomButton from '@/components/CustomButton';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Index() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const { user } = useAuth();

  protectedRoute();


  return (
    <View style={{ flex: 1, paddingTop: 100, justifyContent: "flex-start" }}>
      <View style={customStyles.container}>
        <CustomButton customStyling={{width:30, aspectRatio:"1/1", borderRadius:100}} icon={<FontAwesome5 name="cart-plus" color={"white"} size={14}/>} press={()=>{}}/>
        <CustomButton customStyling={{width:30, aspectRatio:"1/1", borderRadius:100}} icon={<FontAwesome5 name="cube" color={"white"} size={14}/>} press={()=>{}}/>
      </View>
      <Header1 customStyling={{ marginLeft: 20, marginBottom:10}}>My requests</Header1>
      <ScrollView style={{ flex: 1, height: 500} } contentContainerStyle={{alignItems:"center", gap:2}}>
        <TouchableCard height={80}>
          <WhiteText>
            Hi
          </WhiteText>
        </TouchableCard>
        <TouchableCard height={80}>
          <WhiteText>
            Hi
          </WhiteText>
        </TouchableCard>
        <TouchableCard height={80}>
          <WhiteText>
            Hi
          </WhiteText>
        </TouchableCard>
        <TouchableCard height={80}>
          <WhiteText>
            Hi
          </WhiteText>
        </TouchableCard>
      </ScrollView>
    </View>
  );
}

const customStyles = StyleSheet.create({
  container:{
      position:'absolute',
      top:100,
      justifyContent:"flex-end",
      alignItems:"flex-end",
      width:"100%",
      flexDirection:"row",
      gap:5,
      paddingRight:20
  }
});