import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function SetProfilePicture() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-start bg-transparent">
      <Image
        source={require("@/assets/images/auth/SignUpScreen/Ellipse 3.png")}
        style={styles.ellipse}
      />
      <View className="mt-10 items-center">
        {/* Title of the screen */}
        <Text className="text-4xl font-bold text-black text-right pt-12 pb-5">
          Set up your profile picture
        </Text>

        {/* Go back button */}
        <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* The profile picture */}
        <TouchableOpacity
          className="justify-center items-center w-4/5 h-4/5"
          onPress={() => router.push("../camera")}
        >
          <Image
            source={require("@/assets/images/auth/SignUpScreen/Profile-PNG-File.png")}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
      </View>

      {/* Go further button */}
      <TouchableOpacity
        className="absolute bg-black justify-center items-center rounded-full w-11/12 h-10 top-4/5 left-2"
        onPress={() => alert("Go further")}
      >
        <Text className="text-white font-bold text-base"> Maybe Later </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  goBack: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: "black",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  ellipse: {
    position: "absolute",
    top: -100,
    left: width * 0.6,
    transform: [{ rotate: "90deg" }],
  },
  profilePicture: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 10,
  },
});
