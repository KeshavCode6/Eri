import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Backbutton from '@/components/Backbutton';
import { CenteredView, Header1, Header2, WhiteText } from '@/components/CustomUI';
import InputWithIcon from '@/components/InputWithIcon';
import CustomButton from '@/components/CustomButton';
import COLORS from '@/constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import { auth, handleAuthError } from '@/constants/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const forgotPass = () => {
  const [email, setEmail] = useState(''); // email to reset
  const [sentEmail, setSentEmail] = useState(false); // checking where email has been sent or not
  const [error, setError] = useState(''); // setting errors

  const sendEmail = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSentEmail(true); // Assuming this is a state setter function to handle UI changes
      })
      .catch((error) => {
        setError(handleAuthError(error)); // Handle errors
      });
  };

  // if email has been sent
  if (sentEmail) {
    return (
      <CenteredView>
        <Backbutton href="/(auth)/authentication" />
        <Header1>Reset Email has been sent!</Header1>
        <CustomButton title="Go to login" customStyling={{ height: 40, marginTop: 15, backgroundColor: COLORS.accent }} press={() => { router.navigate("/(auth)/authentication") }} />
      </CenteredView>
    );
  }
  // otherwise
  return (
    <CenteredView>
    <Backbutton href="/(auth)/authentication" />
      <Header2>Forgot your password?</Header2>
      <WhiteText customStyling={{ width: 300, textAlign: 'center' }}>Enter your account's email below. A reset email will be sent</WhiteText>
      <InputWithIcon input={email} setInput={setEmail} customStyling={{ marginBottom: 5, marginTop: 10 }} placeHolder="Email" icon={<FontAwesome5 size={15} name="envelope" color={COLORS.accent} />} />
      <Text style={{ color: "red", marginTop: 2.5, marginBottom: 2.5 }}>{error}</Text>
      <CustomButton title="Send" customStyling={{ height: 40, marginTop: 10, backgroundColor: COLORS.accent }} press={() => { sendEmail(email) }} />
      </CenteredView>
  );
}

export default forgotPass;
