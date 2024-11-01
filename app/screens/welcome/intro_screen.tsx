import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

// Get the screen dimensions
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function WelcomeIntroScreen() {
  return (
    <View className="h-screen w-screen">
      <View style={shape.oval} />
      <Text className="text-7xl font-black pt-20 pl-3">
        So what is{"\n"}Strive{"\n"}about ?
      </Text>
      <View className="flex-1 justify-end items-start">
        <Image
          className="w-28 h-28"
          source={require("../../../assets/images/goat.png")}
        />
      </View>
    </View>
  );
}

const shape = StyleSheet.create({
  oval: {
    position: "absolute",
    top: -SCREEN_HEIGHT * 0.95,
    left: -SCREEN_WIDTH * 0.8,
    width: SCREEN_WIDTH * 1.8,
    height: SCREEN_HEIGHT * 1.5,
    borderRadius: SCREEN_WIDTH * 0.9,
    backgroundColor: "#E6BC95",
    justifyContent: "center",
    paddingLeft: SCREEN_WIDTH * 0.3,
  },
});
