import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Backbutton from '@/components/Backbutton';
import { Header1, Header2, WhiteText } from '@/components/CustomUI';
import InputWithIcon from '@/components/InputWithIcon';
import CustomButton from '@/components/CustomButton';
import COLORS from '@/constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import firebase from 'firebase/compat/app';
import { router } from 'expo-router';
import { handleAuthError } from '@/constants/firebase';

const forgotPass = () => {
  const [email, setEmail] = useState('');
  const [sentEmail, setSentEmail] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = (email: string) => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(function () {
        alert('Please check your email...');
        setSentEmail(true);
      }).catch(function (e) {
        setError(handleAuthError(e));
      });
  }
  if (sentEmail) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
         <FontAwesome5 name='envelope' color={COLORS.accent} size={60} />
        <Header1>Email sent!</Header1>
        <CustomButton title="Return to login" customStyling={{ height: 40, marginTop:50, backgroundColor: COLORS.accent }} press={() => { router.navigate("/(auth)/authentication") }} />
      </View>
    );
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      <Backbutton href="/(auth)/authentication" />
      <Header2>Forgot your password?</Header2>
      <WhiteText customStyling={{ width: 300, textAlign: 'center' }}>Enter your account's email below. A reset email will be sent</WhiteText>
      <InputWithIcon input={email} setInput={setEmail} customStyling={{ marginBottom: 5, marginTop: 10 }} placeHolder="Email" icon={<FontAwesome5 size={15} name="envelope" color={COLORS.accent} />} />
      <Text style={{color:"red", marginTop:2.5, marginBottom:2.5}}>{error}</Text>
      <CustomButton title="Send" customStyling={{ height: 40, marginTop:10, backgroundColor: COLORS.accent }} press={() => { sendEmail(email) }} />
    </View>
  );
}

export default forgotPass;
