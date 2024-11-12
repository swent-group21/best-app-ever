import { Challenge } from "@/components/home/Challenge";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function WelcomeConceptScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Background shape */}
      <ThemedView style={styles.ovalShape} colorType="backgroundSecondary" />

      {/* Screen content */}
      <ThemedText style={styles.title} colorType="backgroundPrimary">Building up memories </ThemedText>
      <ThemedView style={styles.challengeContainer} colorType="transparent">
        <Challenge title=""/>
      </ThemedView>
      <ThemedText style={styles.description} colorType="textPrimary">Create and share your memories with your friends{"\n"}Get rewarded for your creativity</ThemedText>
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
    fontSize: 56, //TODO
    fontWeight: "900", //TODO
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
    fontSize: 25, //TODO
    fontWeight: "800", //TODO
  },
});
