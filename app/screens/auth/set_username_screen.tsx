import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/theme/ThemedView";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";

const { width, height } = Dimensions.get("window");

export default function SetUsername() {
  const [username, setUsername] = React.useState("");
  const router = useRouter();
  const uri = "@/assets/images/auth/SignUpScreen/"
  return (
    <ThemedView style={styles.bigContainer}>
      <Image source={require(`${uri}Ellipse 3.png`)} style={styles.ellipse} />

      <TopBar leftIcon="arrow-back" leftAction={() => router.back()} title="Set up your profile" />

      <ThemedView style={styles.container}>
        <ThemedTextInput
          placeholder="ex : sandraa"
          onChangeText={setUsername}
          value={username}
          style={styles.input}
        />
      </ThemedView>
      
      <BottomBar rightIcon="arrow-forward" rightAction={() => router.navigate("../home/home_screen")} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: width * 0.05,
  },

  ellipse: {
    position: "absolute",
    bottom: 0,
    left: 200,
    transform: [{ rotate: "180deg" }],
  },

  inputColumn: {
    width: "90%",
    height: "60%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: height * 0.001,
  },

  input: {
    borderRadius: 10,
    backgroundColor: "grey",
    borderColor: "white",
    borderWidth: 1,
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },

  backround: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },

  bigContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
