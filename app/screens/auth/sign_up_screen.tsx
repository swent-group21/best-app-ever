import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { isValidEmail, signUpWithEmail } from "@/types/Auth";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

import { useRouter } from "expo-router";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { BottomBar } from "@/components/navigation/BottomBar";

const { width, height } = Dimensions.get("window");

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
      <TopBar
        title="Set up your profile"
        leftIcon="arrow-back"
        leftAction={() => router.back()}
      />

      {/* Screen content */}
      <ThemedText style={styles.title} colorType="textPrimary" type="title">
        Tell us about you !
      </ThemedText>

      {/* Input fields */}
      <ThemedScrollView
        style={styles.inputColumn}
        automaticallyAdjustKeyboardInsets={true}
      >
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
          style={
            isValidEmail(email) || email.length == 0
              ? styles.input
              : styles.inputWrong
          }
          placeholder="sarah.connor@gmail.com"
          title="Email *"
        />

        {/* Password */}
        <ThemedTextInput
          onChangeText={setPassword}
          type="password"
          style={
            password.length >= 8 || password.length == 0
              ? styles.input
              : styles.inputWrong
          }
          placeholder="**********"
          title="Password *"
        />

        {/* Confirm Password */}
        <ThemedTextInput
          onChangeText={setConfirmPassword}
          type="password"
          style={
            confirmPassword.length == 0 || password == confirmPassword
              ? styles.input
              : styles.inputWrong
          }
          placeholder="**********"
          title="Confirm Password *"
        />
      </ThemedScrollView>

      {/* Bottom bar */}
      <BottomBar
        rightIcon="arrow-forward"
        rightAction={() =>
          signUpWithEmail(
            name + surname,
            email,
            password,
            firestoreCtrl,
            router,
          )
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  signUpScreen: {
    flex: 1,
  },

  ovalShape: {
    position: "absolute",
    top: "-110%",
    left: "-100%",
    width: "180%",
    height: "140%",
    borderRadius: width * 0.9,
  },
  inputColumn: {
    width: "90%",
    flexDirection: "column",
    alignSelf: "center",
  },

  title: {
    textAlign: "right",
    paddingHorizontal: width * 0.1,
    marginBottom: height * 0.05,
  },

  input: {
    height: height * 0.06,
    marginBottom: height * 0.02,
    paddingLeft: width * 0.05,
    borderWidth: 2,
    borderRadius: 15,
  },
  inputWrong: {
    height: height * 0.06,
    marginBottom: height * 0.02,
    paddingLeft: width * 0.05,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "red",
  },
});
