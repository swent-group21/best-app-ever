import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { ThemedView } from "@/components/theme/ThemedView";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Dimensions,
} from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function WelcomeConceptScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.ovalShapeOne} colorType="backgroundSecondary" />
      <ThemedView style={styles.ovalShapeTwo} colorType="backgroundSecondary" />
      <ThemedText style={styles.title} colorType="textPrimary">Ready to{"\n"}Strive?</ThemedText>

      <ThemedView style={styles.buttonContainer}>
        <ThemedTextButton
          style={styles.buttonAccount}
          onPress={() => router.navigate("./screens/auth/sign_in_screen")}
          text="Login"
          textStyle={styles.buttonText}
          textColorType="textOverLight"
        />

        {/* The button to navigate to the sign up screen */}
        <ThemedTextButton 
          style={styles.buttonAccount} 
          onPress={() => router.navigate("./screens/auth/sign_up_screen")} 
          text="Sign Up" 
          textStyle={styles.buttonText} 
          textColorType="textOverLight"
        />

        <ThemedTextButton 
          onPress={() => {router.navigate("./screens/home/home_screen");}} 
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
    height: height,
  },
  ovalShapeOne: {
    position: "absolute",
    top: height * 0.8,
    left: -width * 0.3,
    width: width * 1.3,
    height: height * 0.7,
    borderRadius: width * 0.7,
  },
  ovalShapeTwo: {
    position: "absolute",
    top: -height * 0.4,
    left: width * 0.3,
    width: width * 1.3,
    height: height * 0.7,
    borderRadius: width * 0.7,
  },
  title: {
    paddingTop: height * 0.3,
    paddingLeft: width * 0.05,
    fontSize: 64,
    fontWeight: "900",
    lineHeight: 62,
    paddingBottom: height * 0.12,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 60,
    gap: 20,
    backgroundColor: "transparent",
  },
  buttonAccount: {
    width: "80%",
    height: height * 0.05,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
});
