import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import React from "react";
import {
  StyleSheet,
  Dimensions,
} from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function WelcomeConceptScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.ovalShape} colorType="backgroundSecondary" />
      
      <ThemedView style={styles.textContainer}>
        <ThemedText style={styles.title} colorType="white">Competing{"\n"}yourself</ThemedText>
        <ThemedText style={styles.description} colorType="white">Become the best version of yourself{"\n"}Interact with motivated people to reach your goals !prizes!</ThemedText>
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
    top: height * 0.7,
    left: -width * 0.3,
    width: width * 1.2,
    height: height * 0.7,
    borderRadius: width * 0.6,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    padding: width * 0.05,
    paddingHorizontal: 20,
    paddingBottom: 80,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 56,
    fontWeight: "900",
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 25,
    fontWeight: "800",
  },
});
