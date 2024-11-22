import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { isValidEmail, signUpWithEmail } from "@/types/Auth";

import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";

const { width, height } = Dimensions.get("window");

export default function SignUp({ navigation, firestoreCtrl }: any) {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const namePlaceholder = "Sarah";
  const surnamePlaceholder = "Connor";
  const emailPlaceholder = "sarah.connor@gmail.com";
  const passwordPlaceholder = "**********";

  return (
    <ThemedView style={styles.signUpScreen}>
      {/* Background oval shape */}
      <ThemedView style={styles.ovalShape} colorType="backgroundSecondary" />

      {/* Top bar */}
      <TopBar
        title="Set up your profile"
        leftIcon="arrow-back"
        leftAction={() => navigation.goBack()}
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
          testID="name-input"
          onChangeText={setName}
          style={styles.input}
          placeholder={namePlaceholder}
          title="Name *"
        />

        {/* Surname */}
        <ThemedTextInput
          testID="surname-input"
          onChangeText={setSurname}
          style={styles.input}
          placeholder={surnamePlaceholder}
          title="Surname *"
        />

        {/* Email */}
        <ThemedTextInput
          testID="email-input"
          onChangeText={setEmail}
          type="email"
          style={
            isValidEmail(email) || email.length == 0
              ? styles.input
              : styles.inputWrong
          }
          placeholder={emailPlaceholder}
          title="Email *"
        />

        {/* Password */}
        <ThemedTextInput
          testID="password-input"
          onChangeText={setPassword}
          type="password"
          style={
            password.length >= 8 || password.length == 0
              ? styles.input
              : styles.inputWrong
          }
          placeholder={passwordPlaceholder}
          title="Password *"
        />

        {/* Confirm Password */}
        <ThemedTextInput
          testID="confirm-password-input"
          onChangeText={setConfirmPassword}
          type="password"
          style={
            confirmPassword.length == 0 || password == confirmPassword
              ? styles.input
              : styles.inputWrong
          }
          placeholder={passwordPlaceholder}
          title="Confirm Password *"
        />

        <ThemedTextButton
          testID="sign-up-button"
          style={styles.buttonSignUp}
          onPress={() => {
            signUpWithEmail(
              name + surname,
              email,
              password,
              firestoreCtrl,
              navigation,
            )
          }}
          text="Join Us!"
          textStyle={{ fontWeight: "600" }}
          textColorType="textOverLight"
        />

      </ThemedScrollView>
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

  buttonSignUp: {
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    borderRadius: 15,
    padding: 8,
  },
});
