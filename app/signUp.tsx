import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// ------------- FIREBASE IMPORTS ----------------
import {
  GoogleAuthProvider,
} from "@/firebase/Firebase";
// -----------------------------------------------
import * as Google from "expo-auth-session/providers/google";
import GoogleAuthConfig from "@/types/GoogleAuthConfig";
import { logInWithGoogle, signUpWithEmail } from "@/types/Auth";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

const firestoreCtrl = new FirestoreCtrl();

export default function SignUp({ navigation }: any) {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className="flex-1 bg-white items-center justify-center px-8"
        testID="sign-up-screen"
      >
        <Text
          className="text-4xl font-bold mb-16 text-center"
          testID="signup-title"
        >
          SignUp
        </Text>

        <View className="flex flex-col gap-3">
          <Text
            value={userName}
            onChangeText={setUserName}
            type="text"
            testID="username-input"
            maxLength={40}
          />

          <Text
            value={email}
            onChangeText={setEmail}
            type="email"
            testID="email-input"
            maxLength={30}
          />

          <Text
            value={password}
            onChangeText={setPassword}
            type="password"
            testID="password-input"
            maxLength={50}
          />
        </View>

        <Text
          onPress={() =>
            signUpWithEmail(
              userName,
              email,
              password,
              firestoreCtrl,
              navigation,
              setError
            )
          }
          testID="sign-up-button"
        >
          Click Here For Google Sign Up!
        </Text>

      </View>
    </TouchableWithoutFeedback>
  );
}
