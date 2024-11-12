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
      {/* Background shape */}
      <ThemedView style={styles.ovalShape} colorType="backgroundSecondary" />
      
      {/* Screen content */}
      <ThemedView style={styles.textContainer} colorType="transparent">
        <ThemedText style={styles.title} colorType="textPrimary">Competing{"\n"}yourself</ThemedText>
        <ThemedText style={styles.description} colorType="textPrimary">Become the best version of yourself{"\n"}Interact with motivated people to reach your goals !prizes!</ThemedText>
      </ThemedView>
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
    top: "70%",
    left: "-30%",
    width: "120%",
    height: "70%",
    borderRadius: width * 0.6,
  },

  textContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    paddingBottom: height * 0.095,
  },

  title: {
    marginBottom: height * 0.05,
    fontSize: 56, // TODO
    fontWeight: "900", // TODO
  },

  description: {
    textAlign: "center",
    fontSize: 25, // TODO
    fontWeight: "800", // TODO
  },
});
