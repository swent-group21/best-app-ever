import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function WelcomeConceptScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.ovalShape} />
      <ThemedView style={styles.textContainer}>
        <ThemedText style={styles.title}>Compete{"\n"}yourself</ThemedText>
        <ThemedText style={styles.description}>Become the best version of yourself{"\n"}Interact with motivated people to reach your goals !</ThemedText>
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
  ovalShape: {
    position: "absolute",
    top: -height * 0.4,
    left: -width * 0.3,
    width: width * 1.3,
    height: height * 0.7,
    borderRadius: width * 0.7,
    backgroundColor: "#E6BC95",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 0,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 56,
    fontWeight: "900",
    lineHeight: 62,
    marginBottom: 20,
  },
  description: {
    paddingTop: 60,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
  },
});
