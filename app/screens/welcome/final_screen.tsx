import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { ThemedView } from "@/components/theme/ThemedView";
import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { signInAsGuest } from "@/types/Auth";
import FirestoreCtrl, { DBUser } from "@/firebase/FirestoreCtrl";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function WelcomeFinalScreen({
  setUser,
  navigation,
  firestoreCtrl,
}: {
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  return (
    <ThemedView style={styles.container} testID="welcome-final-screen">
      {/* Background shapes */}
      <ThemedView style={styles.ovalShapeOne} colorType="backgroundSecondary" />
      <ThemedView style={styles.ovalShapeTwo} colorType="backgroundSecondary" />

      {/* Screen content */}
      <ThemedText
        style={styles.title}
        colorType="textPrimary"
        type="superTitle"
      >
        Ready to{"\n"}Strive?
      </ThemedText>

      {/* Buttons */}
      <ThemedView style={styles.buttonContainer} colorType="transparent">
        {/* Sign in button */}
        <ThemedTextButton
          style={styles.buttonAccount}
          onPress={() => navigation.navigate("SignIn")}
          text="Sign In"
          textStyle={styles.buttonText}
          textColorType="textOverLight"
          testID="sign-in-button"
        />

        {/* Sign up button */}
        <ThemedTextButton
          style={styles.buttonAccount}
          onPress={() => navigation.navigate("SignUp")}
          text="Sign Up"
          textStyle={styles.buttonText}
          textColorType="textOverLight"
          testID="sign-up-button"
        />

        {/* Continue as guest button */}
        <ThemedTextButton
          onPress={() => signInAsGuest(firestoreCtrl, navigation, setUser)}
          text="Continue as guest"
          colorType="transparent"
          textColorType="textPrimary"
          testID="continue-as-guest-button"
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },

  ovalShapeOne: {
    position: "absolute",
    top: "80%",
    left: "-30%",
    width: "130%",
    height: "70%",
    borderRadius: width * 0.7,
  },

  ovalShapeTwo: {
    position: "absolute",
    top: "-40%",
    left: "30%",
    width: "130%",
    height: "70%",
    borderRadius: width * 0.7,
  },

  title: {
    width: "80%",
    alignSelf: "center",
    paddingTop: height * 0.3,
    paddingBottom: height * 0.12,
  },

  buttonContainer: {
    alignItems: "center",
    gap: height * 0.027,
  },

  buttonAccount: {
    width: "80%",
    height: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  buttonText: {
    fontWeight: "bold",
  },
});
