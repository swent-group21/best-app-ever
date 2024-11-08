import React from "react";
import {
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/theme/ThemedView";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { ThemedText } from "@/components/theme/ThemedText";

export default function SetUsername() {
  const [username, setUsername] = React.useState("");
  const router = useRouter();
  const uri = "@/assets/images/auth/SignUpScreen/"
  return (
    <ThemedView style={styles.screenContainer}>
      <Image source={require(`${uri}Ellipse 3.png`)} style={styles.background} />

      <TopBar leftIcon="arrow-back" leftAction={() => router.back()} title="Set up your profile" />

      <ThemedView style={styles.mainContainer}>
        <ThemedView style={styles.smallContainer}>
          <ThemedIconButton iconName="person-circle-outline" size={300} color="white" onPress={() => router.push("../camera")} />

          <ThemedTextInput onChangeText={setUsername} value={username} style={styles.input} viewWidth="80%" placeholder="ex : sandraa" />
        </ThemedView>

        <ThemedText style={styles.title}>What will we see of you ?</ThemedText>
      </ThemedView>
      
      <BottomBar rightIcon="arrow-forward" rightAction={() => router.navigate("../home/home_screen")} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
  },
  
  mainContainer: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
  },
  
  smallContainer: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },

  title: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },

  background: {
    position: "absolute",
    bottom: 0,
    left: 200,
    transform: [{ rotate: "180deg" }],
  },

  input: {
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
});
