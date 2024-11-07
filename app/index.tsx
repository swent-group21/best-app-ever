import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";

import WelcomeIntroScreen from "./screens/welcome/intro_screen";
import WelcomeConceptScreen from "./screens/welcome/concept_screen";
import WelcomePersonalScreen from "./screens/welcome/personal_screen";
import WelcomeFinalScreen from "./screens/welcome/final_screen";

// Get the device's screen width
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function WelcomeScreens() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle the scroll event to update the active index
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View className="flex[1]">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="flex[1]"
        onScroll={handleScroll}
      >
        <WelcomeIntroScreen />
        <WelcomeConceptScreen />
        <WelcomePersonalScreen />
        <WelcomeFinalScreen />
      </ScrollView>

      {/* Render the dots, only if not on the last screen */}
      {activeIndex < 3 && (
        <View className="absolute w-full justify-center items-center flex-row bottom-16">
          {[0, 1, 2, 4].map((i) => {
            const dotStyle =
              "w-5 h-5 rounded-xl mx-2 border border-black ".concat(
                i === activeIndex ? " bg-black" : " bg-transparent",
              );
            return <View key={i} className={dotStyle} />;
          })}
        </View>
      )}
    </View>
  );
}
