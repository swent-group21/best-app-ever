import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function WelcomeIntroScreen() {
  const uri = "@/assets/images/"
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.ovalShape} />
      <ThemedText style={styles.title}>So what is{"\n"}Strive{"\n"}about ?</ThemedText>

      <ThemedView style={styles.imageContainer}>
        <Image style={styles.image} source={require(`${uri}goat.png`)} />
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
    top: -height * 0.95,
    left: -width * 0.8,
    width: width * 1.8,
    height: height * 1.5,
    borderRadius: width * 0.9,
    backgroundColor: "#E6BC95",
    justifyContent: "center",
    paddingLeft: width * 0.3,
  },

  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 30,
    paddingLeft: 20,
    backgroundColor: "transparent",
  },

  image: {
    width: 100,
    height: 100,
  },
  
  title: {
    paddingTop: height * 0.2,
    paddingLeft: width * 0.05,
    fontSize: 70,
    fontWeight: "900",
    lineHeight: 56,
  },
});
