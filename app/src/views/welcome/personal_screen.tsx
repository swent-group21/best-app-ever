import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function WelcomeConceptScreen(){
  return (
      <ThemedView style={styles.container} testID="container">
      {/* Background shape */}
      <ThemedView style={styles.ovalShape} colorType="backgroundSecondary" testID="ovalShape" />

      {/* Screen content */}
      <ThemedText
        style={styles.title}
        colorType="backgroundPrimary"
        type="title"
        
      >
        Building up memories{" "}
      </ThemedText>
      <ThemedText
        style={styles.description}
        colorType="textPrimary"
        type="description"
      >
        Create and share your memories with your friends{"\n"}Get rewarded for
        your creativity
      </ThemedText>
      <Image
        source={require("../../../assets/images/challenge1.png")}
        style={styles.image}
        testID="challenge-image"
      />
    </ThemedView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },

  ovalShape: {
    position: "absolute",
    top: "-40%",
    left: "-30%",
    width: "130%",
    height: "70%",
    borderRadius: width * 0.7,
  },

  title: {
    width: "90%",
    alignSelf: "center",
    paddingTop: height * 0.05,
  },

  challengeContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: height * 0.08,
    paddingBottom: height * 0.025,
  },

  description: {
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
    paddingTop: height * 0.12,
    paddingBottom: height * 0.05,
  },

  image: {
    width: width * 0.9,
    height: height * 0.3,
    alignSelf: "center",
    borderRadius: 15,
  },
});
