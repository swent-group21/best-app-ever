import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function WelcomeConceptScreen() {
  return (
    <View className="h-screen w-screen">
      <View style={shape.oval} />
      <View className="flex-1 justify-center pl-3 pb-16">
        <Text className="text-6xl font-black mb-5 pt-2">
          Participate{"\n"}in Weekly{"\n"}challenges
        </Text>
        <Text className="text-xl font-extrabold pt-16">
          Compete with your friends and people around you{"\n"}
          Become the goat and win prizes!
        </Text>
      </View>
    </View>
  );
}

const shape = StyleSheet.create({
  oval: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.75,
    left: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 1.2,
    height: SCREEN_HEIGHT * 0.7,
    borderRadius: SCREEN_WIDTH * 0.6,
    backgroundColor: "#E6BC95",
  },
});
