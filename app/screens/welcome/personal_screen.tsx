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
      <ThemedView style={styles.ovalShape} colorType="backgroundSecondary" />

      <ThemedText style={styles.title} colorType="backgroundPrimary">Building up memories </ThemedText>
      <ThemedView style={styles.challengeContainer}>
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
    height: height,
  },
  ovalShape: {
    position: "absolute",
    top: -height * 0.4,
    left: -width * 0.3,
    width: width * 1.3,
    height: height * 0.7,
    borderRadius: width * 0.7,
  },
  challengeContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 56,
    paddingTop: 40,
    paddingHorizontal: 20,
    fontWeight: "900",
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 25,
    fontWeight: "800",
  },
});
