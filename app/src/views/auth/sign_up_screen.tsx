import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import useSignUpViewModel from "@/src/viewmodels/auth/SignUpViewModel";
import FirestoreCtrl from "@/src/models/firebase/FirestoreCtrl";

const { width, height } = Dimensions.get("window");

/**
 * Screen for signing up
 * @param navigation : navigation object
 * @param setUser : function to set the user object
 * @param firestoreCtrl : FirestoreCtrl object
 * @returns : a screen for signing up
 */
export default function SignUp({
  navigation,
  setUser,
  firestoreCtrl,
}: {
  navigation: any;
  setUser: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  const {
    name,
    surname,
    email,
    password,
    confirmPassword,
    setName,
    setSurname,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignUp,
    isEmailValid,
    isPasswordValid,
    isConfirmPasswordValid,
  } = useSignUpViewModel(navigation, setUser, firestoreCtrl);

  return (
    <ThemedView style={styles.signUpScreen} testID="sign-up-screen">
      <ThemedView style={styles.ovalShape} colorType="backgroundSecondary" />

      {/* Top bar */}
      <TopBar
        title="Set up your profile"
        leftIcon="arrow-back"
        leftAction={() => navigation.goBack()}
      />

      {/* Title */}
      <ThemedText style={styles.title} colorType="textPrimary" type="title">
        Tell us about you!
      </ThemedText>

      {/* Inputs */}
      <ThemedScrollView
        style={styles.inputColumn}
        automaticallyAdjustKeyboardInsets={true}
      >
        <ThemedTextInput
          testID="name-input"
          onChangeText={setName}
          style={styles.input}
          placeholder="Sarah"
          title="Name *"
        />
        <ThemedTextInput
          testID="surname-input"
          onChangeText={setSurname}
          style={styles.input}
          placeholder="Connor"
          title="Surname *"
        />
        <ThemedTextInput
          testID="email-input"
          onChangeText={setEmail}
          style={isEmailValid ? styles.input : styles.inputWrong}
          placeholder="sarah.connor@gmail.com"
          title="Email *"
        />
        <ThemedTextInput
          testID="password-input"
          onChangeText={setPassword}
          style={isPasswordValid ? styles.input : styles.inputWrong}
          placeholder="**********"
          title="Password *"
        />
        <ThemedTextInput
          testID="confirm-password-input"
          onChangeText={setConfirmPassword}
          style={isConfirmPasswordValid ? styles.input : styles.inputWrong}
          placeholder="**********"
          title="Confirm Password *"
        />
        <ThemedTextButton
          testID="sign-up-button"
          style={styles.buttonSignUp}
          onPress={handleSignUp}
          text="Join Us!"
          textStyle={{ fontWeight: "600" }}
          textColorType="textOverLight"
        />
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  signUpScreen: { flex: 1 },
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
