import React, { useState, useEffect } from "react";
import { View, Text, Platform, Button } from 'react-native';
import { logInWithGoogle, signUpWithEmail } from "@/types/Auth";
import GoogleAuthConfig from "@/types/GoogleAuthConfig";
import { GoogleAuthProvider } from "@/firebase/Firebase";
import * as Google from "expo-auth-session/providers/google";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

const firestoreCtrl = new FirestoreCtrl();

export default function HomeScreen( { navigation }: any) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");

  const config = Platform.select({
    web: GoogleAuthConfig.web,
    ios: GoogleAuthConfig.ios,
    android: GoogleAuthConfig.android,
  });

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      logInWithGoogle(credential, navigation, firestoreCtrl);
    }
  }, [response]);

  return (
    <View className="bg-cover bg-sky-500 ">
      <Text className="text-3xl"> 
        HELLO THIS IS THE HOME SCREEN
      </Text>
      <Text className="text-3xl"> 
        This is another DIV
      </Text>

      <Button
        onPress={() => promptAsync()}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
