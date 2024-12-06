import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
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
    <ThemedView style={styles.container} testID="container">
      <ThemedView
        style={styles.ovalShape}
        colorType="backgroundSecondary"
        testID="ovalShape"
      />
      <ThemedView
        style={styles.textContainer}
        colorType="transparent"
        testID="textContainer"
      >
        <ThemedText
          style={styles.title}
          colorType="textPrimary"
          type="title"
          testID="titleText"
        >
          Competing{"\n"}yourself
        </ThemedText>
        <ThemedText
          style={styles.description}
          colorType="textPrimary"
          type="description"
          testID="descriptionText"
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
