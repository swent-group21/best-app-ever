import React from "react";
import {
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  isValidEmail,
  signUpWithEmail,
} from "@/types/Auth";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

import { useRouter } from "expo-router";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { BottomBar } from "@/components/navigation/BottomBar";

const { width, height } = Dimensions.get("window");

/**
 * Sign Up screen
 * @returns - The Sign Up screen
 */
export default function SignUp() {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const router = useRouter();

  const firestoreCtrl = new FirestoreCtrl();

  return (
    <ThemedView style={styles.signUpScreen}>
      {/* Background oval shape */}
      <ThemedView style={styles.ovalShape} colorType="backgroundSecondary" />

      {/* Top bar */}
      <TopBar title="Set up your profile" leftIcon="arrow-back" leftAction={() => router.back()} />
  
      {/* Screen content */}
      <ThemedText style={styles.title} colorType="textPrimary">Tell us about you !</ThemedText>

      {/* Input fields */}
      <ThemedScrollView style={styles.inputColumn} automaticallyAdjustKeyboardInsets={true}>
        {/* Name */}
        <ThemedTextInput 
          onChangeText={setName} 
          style={styles.input}
          placeholder="Sarah" 
          title="Name *"
        /> 

        {/* Surname */}
        <ThemedTextInput 
          onChangeText={setSurname} 
          style={styles.input}
          placeholder="Connor" 
          title="Surname *"
        />

        {/* Email */}
        <ThemedTextInput 
          onChangeText={setEmail} 
          type="email" 
          style={ isValidEmail(email) || email.length == 0 ? styles.input : styles.inputWrong } 
          placeholder="sarah.connor@gmail.com" 
          title="Email *"
        />
        
        {/* Password */}
        <ThemedTextInput 
          onChangeText={setPassword} 
          type="password" 
          style={ password.length >= 8 || password.length == 0 ? styles.input : styles.inputWrong }
          placeholder="**********" 
          title="Password *" 
        />

        {/* Confirm Password */}
        <ThemedTextInput 
          onChangeText={setConfirmPassword} 
          type="password" 
          style={ confirmPassword.length == 0 || password == confirmPassword ? styles.input : styles.inputWrong } 
          placeholder="**********" 
          title="Confirm Password *" 
        />
      </ThemedScrollView>

      {/* Bottom bar */}
      <BottomBar rightIcon="arrow-forward" rightAction={() => signUpWithEmail(name+surname, email, password, firestoreCtrl, router)} />
    </ThemedView>
  );
}

/**
 * Styles for the components
 */
const styles = StyleSheet.create({
  signUpScreen: {
    flex: 1,
  },

  ovalShape: {
    position: "absolute",
    top: -height * 1.1,
    left: -width * 1,
    width: width * 1.8,
    height: height * 1.40,
    borderRadius: width * 0.9,
    justifyContent: "center",
    paddingLeft: width * 0.3,
  },

  inputColumn: {
    width: "90%",
    flexDirection: "column",
    alignSelf: "center",
  },

  title: {
    fontSize: 56,
    fontWeight: "bold",
    textAlign: "right",
    paddingHorizontal: width * 0.1,
    marginBottom: height * 0.05,
  },

  input: {
    height: height * 0.06,
    borderWidth: 2,
    borderRadius: 15,
    paddingLeft: 20,
    marginBottom: height * 0.02,
  },

  inputWrong: {
    width: "100%",
    height: height * 0.06,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "red",
    paddingLeft: 20,
    marginBottom: height * 0.02,
  },
});
