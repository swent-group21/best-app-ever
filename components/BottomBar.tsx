import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";

// Get screen width and height
const { width, height } = Dimensions.get("window");

interface BottomBarProps {
  leftIcon?: string;
  leftAction?: () => void;
  centerIcon?: string;
  centerAction?: () => void;
  rightIcon?: string;
  rightAction?: () => void;
}

export function BottomBar({
  leftIcon,
  leftAction,
  centerIcon,
  centerAction,
  rightIcon,
  rightAction,
}: BottomBarProps) {
  return (
    <View style={styles.container}>
      {leftIcon ? (
        <ThemedIconButton
          iconName={leftIcon}
          onPress={leftAction || (() => {})}
          size={30}
          color="white"
        />
      ) : (
        <View style={styles.placeholder} />
      )}
      {centerIcon ? (
        <ThemedIconButton
          iconName={centerIcon}
          onPress={centerAction || (() => {})}
          size={30}
          color="white"
        />
      ) : (
        <View style={styles.placeholder} />
      )}
      {rightIcon ? (
        <ThemedIconButton
          iconName={rightIcon}
          onPress={rightAction || (() => {})}
          size={30}
          color="white"
        />
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 10,
    height: height * 0.08,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "transparent",
  },
  placeholder: {
    width: 40, // Adjust based on the size of ThemedIconButton
  },
});
