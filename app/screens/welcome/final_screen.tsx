import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function WelcomeConceptScreen() {
  const router = useRouter();
  return (
    <View className="h-screen w-screen">
      <View style={shape.ovalOne} />
      <View style={shape.ovalTwo} />
      <Text className="text-7xl font-black pl-3 pt-72">
        Ready to{"\n"}Strive?
      </Text>

      <View className="items-center pt-14">
        <TouchableOpacity
          className="w-80 h-11 bg-black rounded-lg justify-center items-center"
          onPress={() => router.push("/screens/auth/sign_in_screen")}
        >
          <Text className="color-white font-semibold">Login</Text>
        </TouchableOpacity>
        {/* Add some space between the buttons */}
        <Text />
        <TouchableOpacity
          className="w-80 h-11 bg-black rounded-lg justify-center items-center"
          onPress={() => router.push("/screens/auth/sign_up_screen")}
        >
          <Text className="color-white font-semibold">Sign Up</Text>
        </TouchableOpacity>
        {/* Add some space between the buttons */}
        <Text />
        <TouchableOpacity
          onPress={() => {
            alert("Spooky user!");
            router.navigate("/screens/home/PLACEHOLDER_home_screen");
          }}
        >
          <Text>Continue as guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const shape = StyleSheet.create({
  ovalOne: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.8,
    left: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 1.3,
    height: SCREEN_HEIGHT * 0.7,
    borderRadius: SCREEN_WIDTH * 0.7,
    backgroundColor: "#E6BC95",
  },
  ovalTwo: {
    position: "absolute",
    top: -SCREEN_HEIGHT * 0.4,
    left: SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 1.3,
    height: SCREEN_HEIGHT * 0.7,
    borderRadius: SCREEN_WIDTH * 0.7,
    backgroundColor: "#E6BC95",
  },
});
