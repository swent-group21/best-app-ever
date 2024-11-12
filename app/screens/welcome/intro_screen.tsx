import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function WelcomeIntroScreen() {
  // Logo image uri
  const uri = "@/assets/images/"
  return (
    <ThemedView style={styles.container}>
      {/* Background shape */}
      <ThemedView style={styles.ovalShape} colorType="backgroundSecondary" />

      {/* Screen content */}
      <ThemedText style={styles.title} colorType="backgroundPrimary">So what is{"\n"}Strive{"\n"}about ?</ThemedText>
      <ThemedText style={styles.description} colorType="textPrimary">Participating in Weekly challenges !</ThemedText>
      <ThemedText style={styles.desc} colorType="textPrimary">Compete with your friends and people around you{"\n"}Become the goat and win prizes!</ThemedText>

      {/* Logo */}
      <ThemedView style={styles.imageContainer}>
        <Image style={styles.image} source={require(`${uri}high.png`)} />
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
    height: height * 1.40,
    borderRadius: width * 0.9,
    justifyContent: "center",
    paddingLeft: width * 0.3,
  },

  imageContainer: {
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
    flex: 4,
    paddingTop: 80,
    paddingLeft: width * 0.05,
    fontSize: 70,
    fontWeight: "900",
    lineHeight: 56,
  },

  description: {
    flex: 2,
    alignSelf: "center",
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
  },

  desc: {
    flex: 2,
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
  },
});
