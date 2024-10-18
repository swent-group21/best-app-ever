<<<<<<< HEAD
import { GoogleAuthProvider } from "../../firebase/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../firebase/Firebase";
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import GoogleAuthConfig from "../../firebase/GoogleAuthConfig";
||||||| parent of b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)
import { GoogleAuthProvider } from "../../firebase/Firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../firebase/Firebase";
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import GoogleAuthConfig from "../../firebase/GoogleAuthConfig";
=======
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
>>>>>>> b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)
import * as Google from "expo-auth-session/providers/google";
<<<<<<< HEAD
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
||||||| parent of b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
// import AsyncStorage from "@react-native-async-storage/async-storage";
=======
import GoogleAuthConfig from "@/types/GoogleAuthConfig";
import { logInWithGoogle, signUpWithEmail } from "@/types/Auth";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
>>>>>>> b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)

const firestoreCtrl = new FirestoreCtrl();

export default function SignUp({ navigation }: any) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");

<<<<<<< HEAD

export default function SignUpScreen() { 
    const config = Platform.select({
||||||| parent of b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)
export default function SignUpScreen() { 
  const config = Platform.select({
=======
  const config = Platform.select({
>>>>>>> b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)
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
<<<<<<< HEAD
  
  return ( 
    <View style={styles.centered}> 
      <Text style={styles.title}>Sign up</Text> 
      <Text style={styles.subtitle}>Using Flexbox</Text> 
      <Button title="Sign up with email" onPress={() => promptAsync()} />
    </View> 
  ); 
} 
  
const styles = StyleSheet.create({ 
  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  }, 
  title: { 
    fontSize: 18, 
    marginVertical: 2, 
  }, 
  subtitle: { 
    fontSize: 14, 
    color: "#888", 
  }, 
});
||||||| parent of b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)

  return ( 
    <View style={styles.centered}> 
      <Text style={styles.title}>Sign up</Text> 
      <Button title="Sign up with Google" onPress={() => promptAsync()} />
    </View> 
  ); 
}
  
const styles = StyleSheet.create({ 
  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  }, 
  title: { 
    fontSize: 18, 
    marginVertical: 2, 
  }, 
  subtitle: { 
    fontSize: 14, 
    color: "#888", 
  }, 
});
=======

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
>>>>>>> b621b31 (fix(api): Firebase db setup, unfinished GoogleAuth)
