import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { ThemedView } from "@/components/theme/ThemedView";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Dimensions } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function WelcomeConceptScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
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
          onPress={() => router.navigate("./screens/auth/sign_in_screen")}
          text="Login"
          textStyle={styles.buttonText}
          textColorType="textOverLight"
        />

        {/* Sign up button */}
        <ThemedTextButton
          style={styles.buttonAccount}
          onPress={() => router.navigate("./screens/auth/sign_up_screen")}
          text="Sign Up"
          textStyle={styles.buttonText}
          textColorType="textOverLight"
        />

        {/* Continue as guest button */}
        <ThemedTextButton
          onPress={() => {
            router.navigate("./screens/home/home_screen");
          }}
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
