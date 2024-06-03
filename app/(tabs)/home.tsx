import CustomButton from "@/components/CustomButton";
import protectedRoute from "@/constants/protectedRoute";
import { sendEmailVerification, signOut } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "@/hooks/useAuth";
import { WhiteText } from "@/components/CustomUI";
import { auth } from "@/constants/firebase";

export default function Index() {
  // making sure user is logged in
  protectedRoute();
  const { user } = useAuth();

  const handleSendVerificationEmail = () => {
    // sending verification email. Ignoring typescript error because we know user is logged in from protected route function
    //@ts-ignore
    sendEmailVerification(auth.currentUser, {
      handleCodeInApp: true,
      url: 'https://eriapp-44be1.firebaseapp.com'
    })
      .then(() => {
        alert("Verification email sent");
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
      });
  };


  // signing out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };


  // making user verify if not 
  // TODO: Delete user account using cloud functions if they dont verify, or something else
  if (!user?.emailVerified) {
    return (
      <>
        <WhiteText>Your account's email has not been verified and will be deleted in 5 mins unless done so</WhiteText>
        <CustomButton title="Send Verification Email" press={handleSendVerificationEmail} />
      </>
    );
  }

  return (
    <SafeAreaView>
      <CustomButton title="Sign out" press={handleSignOut} />
    </SafeAreaView>
  );
}
