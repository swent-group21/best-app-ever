import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function WelcomeConceptScreen() {
  return (
    <View className="flex-1 w-screen">
      <View style={shape.oval} />
      <View className="flex-1 justify-center pl-3">
        <Text className="text-6xl font-black mb-5 pt-2">
          Compete{"\n"}yourself
        </Text>
        <Text className="text-xl font-extrabold pt-12">
          Become the best version of yourself{"\n"}
          Interact with motivated people to reach your goals !
        </Text>
      </View>
    </View>
  );
}

const shape = StyleSheet.create({
  oval: {
    position: "absolute",
    top: -SCREEN_HEIGHT * 0.4,
    left: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 1.3,
    height: SCREEN_HEIGHT * 0.7,
    borderRadius: SCREEN_WIDTH * 0.7,
    backgroundColor: "#E6BC95",
  },
});
