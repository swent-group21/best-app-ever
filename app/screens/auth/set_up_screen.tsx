import React from "react";
import {
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/theme/ThemedView";
import { TopBar } from "@/components/navigation/TopBar";
import { BottomBar } from "@/components/navigation/BottomBar";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function SetUsername() {
  const [username, setUsername] = React.useState("");
  const router = useRouter();
  const uri = "@/assets/images/auth/SignUpScreen/"
  return (
    <ThemedView style={styles.screenContainer}>
      <ThemedView style={styles.ovalShapeOne} colorType="backgroundSecondary" />

      <TopBar leftIcon="arrow-back" leftAction={() => router.back()} title="Set up your profile" />

      <ThemedScrollView style={styles.mainContainer} automaticallyAdjustKeyboardInsets={true}>
        <ThemedView style={styles.smallContainer}>
          <ThemedIconButton name="person-circle-outline" size={300} color="white" onPress={() => router.push("../camera")} />

          <ThemedTextInput onChangeText={setUsername} value={username} style={styles.input} viewWidth="80%" placeholder="ex : sandraa" />
        </ThemedView>

        <ThemedText style={styles.title}>What will we see of you ?</ThemedText>
      </ThemedScrollView>
      
      <BottomBar rightIcon="arrow-forward" rightAction={() => router.navigate("../home/home_screen")} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  ovalShapeOne: {
    position: "absolute",
    top: height * 0.79,
    left: width * 0.2,
    width: width * 1.3,
    height: height * 0.7,
    borderRadius: width * 0.7,
  },

  screenContainer: {
    flex: 1,
  },
  
  mainContainer: {
    width: "100%",
    backgroundColor: "transparent",
    flex: 1,
  },
  
  smallContainer: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    paddingBottom: 70,
  },

  title: {
    fontSize: 42,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 2,
    color: "white",
  },
});
