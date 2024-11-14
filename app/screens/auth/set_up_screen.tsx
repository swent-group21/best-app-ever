import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { ThemedView } from "@/components/theme/ThemedView";
import { TopBar } from "@/components/navigation/TopBar";
import { BottomBar } from "@/components/navigation/BottomBar";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import App from "@/app/App";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function SetUsername() {
  const [username, setUsername] = React.useState("");
  const router = App();
  return (
    <ThemedView style={styles.screenContainer}>
      {/* Background shape */}
      <ThemedView style={styles.ovalShapeOne} colorType="backgroundSecondary" />

      {/* Top bar */}
      <TopBar
        leftIcon="arrow-back"
        leftAction={() => router.back()}
        title="Set up your profile"
      />

      {/* Screen content */}
      <ThemedScrollView
        style={styles.mainContainer}
        automaticallyAdjustKeyboardInsets={true}
        colorType="transparent"
      >
        {/* Input fields */}
        <ThemedView style={styles.smallContainer} colorType="transparent">
          {/* Profile picture */}
          <ThemedIconButton
            name="person-circle-outline"
            size={300}
            colorType="textPrimary"
            onPress={() => router.push("../camera")}
          />

          {/* Username input */}
          <ThemedTextInput
            onChangeText={setUsername}
            value={username}
            style={styles.input}
            viewWidth="80%"
            placeholder="ex : sandraa"
          />
        </ThemedView>

        <ThemedText style={styles.title} type="subtitle">
          What will we see of you ?
        </ThemedText>
      </ThemedScrollView>

      {/* Bottom bar */}
      <BottomBar
        rightIcon="arrow-forward"
        rightAction={() => router.navigate("../home/home_screen")}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  ovalShapeOne: {
    position: "absolute",
    top: "79%",
    left: "20%",
    width: "130%",
    height: "70%",
    borderRadius: width * 0.7,
  },

  screenContainer: {
    flex: 1,
  },

  mainContainer: {
    flex: 1,
    width: "100%",
  },

  smallContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: height * 0.09,
  },

  title: {
    textAlign: "center",
  },

  input: {
    fontSize: 20,
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
  },
});
