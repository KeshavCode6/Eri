// app/index.js
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import { signOut } from 'firebase/auth';
import { auth } from '@/constants/firebase';
import {protectedRoute} from '@/constants/firebase';
import { useRootNavigationState } from 'expo-router';
import { WhiteText } from '@/components/CustomUI';

export default function Index() {

  protectedRoute();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <SafeAreaView>
      <CustomButton title="Sign out" press={handleSignOut} />
    </SafeAreaView>
  );
}
