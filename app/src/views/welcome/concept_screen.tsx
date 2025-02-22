import { ThemedText } from "@/src/views/components/theme/themed_text";
import { ThemedView } from "@/src/views/components/theme/themed_view";
import React from "react";
import { StyleSheet, Dimensions } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

/**
 * Welcome screen concept
 * @returns : a screen with the concept of the app
 */
export default function WelcomeConceptScreen() {
  return (
    <ThemedView style={styles.container} testID="welcome-concept-screen">
      <ThemedView
        style={styles.ovalShape}
        colorType="backgroundSecondary"
        testID="background-image-1"
      />
      <ThemedView
        style={styles.textContainer}
        colorType="transparent"
        testID="text-container"
      >
        <ThemedText
          style={styles.title}
          colorType="textPrimary"
          type="title"
          testID="title-text"
        >
          Competing{"\n"}yourself
        </ThemedText>
        <ThemedText
          style={styles.description}
          colorType="textPrimary"
          type="description"
          testID="description-text"
        >
          Become the best version of yourself{"\n"}Interact with motivated
          people to reach your goals !prizes!
        </ThemedText>
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
  },

  description: {
    textAlign: "center",
  },
});
