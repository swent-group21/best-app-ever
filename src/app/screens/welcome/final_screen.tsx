import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { ThemedView } from "../../../components/theme/ThemedView";
import { ThemedText } from "../../../components/theme/ThemedText";
import { ThemedTextButton } from "../../../components/theme/ThemedTextButton";
import FirestoreCtrl, { DBUser } from "../../models/firebase/FirestoreCtrl";
import WelcomeFinalViewModel from "../../../app/viewmodels/welcome/FinalScreenViewModel";

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
  const { navigateToSignIn, navigateToSignUp, continueAsGuest } =
    WelcomeFinalViewModel({ firestoreCtrl, navigation, setUser });

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
        <ThemedTextButton
          style={styles.buttonAccount}
          onPress={navigateToSignIn}
          text="Sign In"
          textStyle={styles.buttonText}
          textColorType="textOverLight"
        />
        <ThemedTextButton
          style={styles.buttonAccount}
          onPress={navigateToSignUp}
          text="Sign Up"
          textStyle={styles.buttonText}
          textColorType="textOverLight"
        />
        <ThemedTextButton
          onPress={continueAsGuest}
          text="Continue as guest"
          colorType="transparent"
          textColorType="textPrimary"
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
