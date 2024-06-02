import CustomButton from "@/components/CustomButton";
import protectedRoute from "@/constants/protectedRoute";
import { signOut } from "firebase/auth";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from 'firebase/compat/app';
import useAuth from "@/hooks/useAuth";
import { WhiteText } from "@/components/CustomUI";

export default function Index() {
  protectedRoute();
  const { user } = useAuth();

  if (!user?.emailVerified) {
    return (
      <>
        <WhiteText>Your account's email has not been verified and will be deleted in 5 mins unless done so</WhiteText>
        <CustomButton title="Send Verification Email" press={() => {
          firebase.auth().currentUser?.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://eriapp-44be1.firebaseapp.com'
          }).then(()=>{
            alert("Email sent")
            
          })
        }} />
      </>
    )
  }
  return (
    <SafeAreaView>
      <CustomButton title="Sign out" press={() => { signOut(firebase.auth()) }} />
    </SafeAreaView>
  );
}
