import React, { useState, useEffect } from "react";
import { Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { logInWithGoogle } from "@/types/Auth";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

const firestoreCtrl = new FirestoreCtrl();

GoogleSignin.configure({
  scopes: ['profile', 'email'],
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  // Ensure these client IDs are stored securely and are correct for your config
  androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
});

export default function SignUp({ navigation }: any) {
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(userInfo.idToken);
      logInWithGoogle(credential, navigation, firestoreCtrl);
    } catch (error) {
      setError(error.message || "Google Sign-In failed.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white items-center justify-center px-8" testID="sign-up-screen">
        <Text className="text-4xl font-bold mb-16 text-center" testID="signup-title">
          Sign Up
        </Text>

        <Text
          onPress={handleGoogleLogin}
          testID="google-sign-up-button"
          style={{ color: 'blue', fontWeight: 'bold' }}
        >
          Continue with Google
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
