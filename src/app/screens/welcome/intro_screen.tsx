import { ThemedText } from "../../../components/theme/ThemedText";
import { ThemedView } from "../../../components/theme/ThemedView";
import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function WelcomeIntroScreen() {
  // Logo image uri
  const uri = "../../../assets/images/";
  return (
    <ThemedView style={styles.container}>
      {/* Background shape */}
      <ThemedView style={styles.ovalShape} colorType="backgroundSecondary" />

      {/* Screen content */}
      <ThemedText
        style={styles.title}
        colorType="backgroundPrimary"
        type="superTitle"
      >
        So what is{"\n"}Strive{"\n"}about ?
      </ThemedText>
      <ThemedText
        style={styles.smallTitle}
        colorType="textPrimary"
        type="title"
      >
        Participating in Weekly challenges !
      </ThemedText>
      <ThemedText
        style={styles.description}
        colorType="textPrimary"
        type="description"
      >
        Compete with your friends and people around you{"\n"}Become the goat and
        win prizes!
      </ThemedText>

      {/* Logo */}
      <ThemedView testID="test-image" style={styles.imageContainer}>
        <Image style={styles.image} source={require(`${uri}icon_trans.png`)} />
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
    top: "-95%",
    left: "-80%",
    width: "180%",
    height: "140%",
    borderRadius: width * 0.9,
    justifyContent: "center",
    paddingLeft: width * 0.3,
  },

  imageContainer: {
    width: "95%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    alignSelf: "center",
    paddingBottom: height * 0.04,
    backgroundColor: "transparent",
  },

  image: {
    width: 100,
    height: 100,
  },

  title: {
    flex: 4,
    paddingTop: height * 0.1,
    paddingLeft: width * 0.05,
  },

  smallTitle: {
    flex: 2,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 36,
  },

  description: {
    flex: 2,
    textAlign: "center",
  },
});
