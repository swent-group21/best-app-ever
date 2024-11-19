import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

// Get screen width and height
const { width, height } = Dimensions.get("window");

interface BottomBarProps {
  leftIcon?: string;
  leftAction?: () => void;
  centerIcon?: string;
  centerAction?: () => void;
  rightIcon?: string;
  rightAction?: () => void;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  testID?: string;
}

export function BottomBar({
  leftIcon,
  leftAction = () => {},
  centerIcon,
  centerAction = () => {},
  rightIcon,
  rightAction = () => {},
  colorType = "white",
}: BottomBarProps) {
  const color = useThemeColor({}, colorType);
  return (
    <View style={styles.container} testID="bottomBar">
      {leftIcon ? (
        <ThemedIconButton
          name={leftIcon}
          onPress={leftAction}
          size={30}
          color={color}
          testID={`bottomLeftIcon-${leftIcon}`}
        />
      ) : (
        <View style={styles.placeholder} />
      )}
      {centerIcon ? (
        <ThemedIconButton
          name={centerIcon}
          onPress={centerAction}
          size={30}
          color={color}
          testID={`bottomCenterIcon-${centerIcon}`}
        />
      ) : (
        <View style={styles.placeholder} />
      )}
      {rightIcon ? (
        <ThemedIconButton
          name={rightIcon}
          onPress={rightAction}
          size={30}
          color={color}
          testID={`bottomRightIcon-${rightIcon}`}
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
    width: 30,
  },
});
