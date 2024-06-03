import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth, handleAuthError, loggedOutCheck } from "@/constants/firebase"
import { FirebaseError } from 'firebase/app';
import COLORS from '@/constants/Colors';
import styles from '@/constants/styles';
import { Header2, Header1 } from '@/components/CustomUI';
import InputWithIcon from '@/components/InputWithIcon';
import FontAwesome5 from '@expo/vector-icons/FontAwesome';

interface PageProps {
  switchPage: (page: string) => void; // setter function to switch from login to signup
}

const AuthScreen = () => {
  const { screenPage } = useLocalSearchParams(); // getting router params on page switch
  const [page, setCurrentPage] = useState(screenPage || "login"); // using page provided, defaulting to login

  // making sure user is logged out on mount
  useEffect(() => {
    loggedOutCheck();
  }, [router]);
  

  // switching active page (login or signup)
  const switchPage = (page: string) => {
    setCurrentPage(page);
  };

  // conditionally rendering page depending on active UI. Default container for both
  return (
    <View style={{ justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
      {page === "login" ? <Login switchPage={switchPage} /> : <Signup switchPage={switchPage} />}
    </View>);
};

function Login({ switchPage }: PageProps) {
  const [email, setEmail] = useState(''); // users email
  const [password, setPassword] = useState(''); // users password
  const [error, setError] = useState(''); // showing any login errors


  const handleLogin = async () => {
    console.log("Log in Attempted")
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.navigate("/(tabs)/home")
      console.log("Logged in Successfully")
    } catch (error) {
      console.error("Login Error:", error)
      if (error instanceof FirebaseError) {
        let errorText = handleAuthError(error);
        setError(errorText);
      }
    }
  };

  return (
    <>
      <Header1>Login</Header1>
      <InputWithIcon input={email} setInput={setEmail} customStyling={{marginBottom:5, marginTop:10}} placeHolder="Email" icon={<FontAwesome5 size={15} name="envelope" color={COLORS.accent} />}/>
      <InputWithIcon input={password} setInput={setPassword} customStyling={{marginBottom:5}} secure={true} placeHolder="Password" icon={<FontAwesome5 size={15} name="lock" color={COLORS.accent} />}/>

      <View style={[styles.rightAligned, { width: "80%" }]}>
        <Link href="/(auth)/forgotPass" style={customStyles.forgetPassText}><Text>Forgot Password?</Text></Link>
      </View>
      <Text style={{color:"red", marginTop:2.5, marginBottom:2.5}}>{error}</Text>

      <CustomButton title="Log in" customStyling={{ height: 40, backgroundColor: COLORS.accent }} press={handleLogin} />
      
      <Text style={customStyles.switchPageText}>Don't have an account? <Text style={customStyles.switchPageLink} onPress={() => switchPage("signup")}>Sign up</Text></Text>

    </>
  );
}


function Signup({ switchPage }: PageProps) {
  const [email, setEmail] = useState(''); // user email
  const [password, setPassword] = useState(''); // user password
  const [confPassword, setConfPassword] = useState(''); // confirming users password
  const [error, setError] = useState(''); // showing signup email
  const [created, setCreated] = useState(false); // whether or not the user has been made or not

  const handleSignup = async () => {
    try {
      // making sure passwords match
      if(!(confPassword==password)){
        setError("Passwords do not match!")
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      
      // Check if the currentUser object exists and is not null
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser, {
          handleCodeInApp: true,
          url: 'https://eriapp-44be1.firebaseapp.com'
        });
        console.log('Verification email sent.');
        setCreated(true)
        // Set created to true or handle accordingly
      } else {
        console.error('Signup Error, No user is currently signed in.');
      }
    } catch (error) {
      console.error("Signup Error:", error)
      if (error instanceof FirebaseError) {
        let errorText = handleAuthError(error);
        setError(errorText);
      }
    }
  };

  // if user has been created, show the screen asking them to verify email
  if(created){
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      <FontAwesome5 name='envelope' color={COLORS.accent} size={40} />
     <Header2>Verification Email sent!</Header2>
     <CustomButton title="Go to login" customStyling={{ height: 40, marginTop:50, backgroundColor: COLORS.accent }} press={() => { router.navigate("/(auth)/authentication") }} />
   </View>
    );
  }


  return (
    <>
      <Header1>Signup</Header1>
      <InputWithIcon input={email} setInput={setEmail} customStyling={{marginBottom:5, marginTop:10}} placeHolder="Email" icon={<FontAwesome5 size={15} name="envelope" color={COLORS.accent} />}/>
      <InputWithIcon input={password} setInput={setPassword} customStyling={{marginBottom:5}} secure={true} placeHolder="Password" icon={<FontAwesome5 size={15} name="lock" color={COLORS.accent} />}/>
      <InputWithIcon input={confPassword} setInput={setConfPassword} customStyling={{marginBottom:30}} secure={true} placeHolder="Confirm Password" icon={<FontAwesome5 size={15} name="lock" color={COLORS.accent} />}/>
      <Text style={{color:"red", marginTop:2.5, marginBottom:2.5}}>{error}</Text>
      <CustomButton title="Sign up" customStyling={{ height: 40, backgroundColor: COLORS.accent }} press={handleSignup} />
      <Text style={customStyles.switchPageText}>Have an account? <Text style={customStyles.switchPageLink} onPress={() => switchPage("login")}>Login</Text></Text>
    </>
  );
}


var customStyles = StyleSheet.create({
  forgetPassText: {
    color: COLORS.accent
  },
  forgotPass: {
    width: "80%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 20
  },
  loginHeaderContainer: {
    width: "80%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 5,
    marginTop: 20
  },
  signupHeaderContainer: {
    width: "80%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 5
  },
  switchPageText: {
    color: "white",
    textAlign: "center",
    marginTop: 20
  },
  switchPageLink: {
    color: COLORS.accent,
    fontWeight: "bold"
  }
});

export default AuthScreen;

