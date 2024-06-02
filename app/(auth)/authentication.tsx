import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth"
import { handleAuthError } from "@/constants/firebase"
import { FirebaseError } from 'firebase/app';
import useAuth from '@/hooks/useAuth';
import COLORS from '@/constants/Colors';
import styles from '@/constants/styles';
import { Header2, Header1 } from '@/components/CustomUI';
import InputWithIcon from '@/components/InputWithIcon';
import FontAwesome5 from '@expo/vector-icons/FontAwesome';
import firebase from 'firebase/compat/app';

interface PageProps {
  switchPage: (page: string) => void;
}

const AuthScreen = () => {
  const { screenPage } = useLocalSearchParams();
  const [page, setCurrentPage] = useState(screenPage || "login");

  const switchPage = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
      {page === "login" ? <Login switchPage={switchPage} /> : <Signup switchPage={switchPage} />}
    </View>);
};

function Login({ switchPage }: PageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  loggedOutCheck();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebase.auth(), email, password);
    } catch (error) {
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const [created, setCreated] = useState(false);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(firebase.auth(), email, password).then(()=>{
        firebase.auth().currentUser?.sendEmailVerification({
          handleCodeInApp:true,
          url:'https://eriapp-44be1.firebaseapp.com'
        }).then(()=>{
          setCreated(true);
        })
      })
      
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorText = handleAuthError(error);
        setError(errorText);
      }
    }
  };

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

const loggedOutCheck = () => {
  const { user } = useAuth();
  if (user) {
    router.push("/(tabs)/home");
  }
};



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
