import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../theme/ThemedText";

// Get screen width and height
const { width, height } = Dimensions.get("window");

interface TopbarProps {
  leftIcon?: string;
  leftAction?: () => void;
  rightIcon?: string;
  rightAction?: () => void;
  title?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}

export function TopBar({
  leftIcon,
  leftAction = () => {},
  rightIcon,
  rightAction = () => {},
  title,
  colorType = "white",
}: TopbarProps) {
  const color = useThemeColor({}, colorType);

  const isImageUrl = (icon?: string) =>
    icon?.startsWith("http://") || icon?.startsWith("https://");

  return (
    <View style={styles.container} testID="topBar">
      {leftIcon ? (
        isImageUrl(leftIcon) ? (
          <TouchableOpacity onPress={leftAction}>
            <Image
              source={{ uri: leftIcon }}
              style={styles.iconImage}
              testID={`topLeftImage-${leftIcon}`}
            />
          </TouchableOpacity>
        ) : (
          <ThemedIconButton
            name={leftIcon}
            onPress={leftAction}
            size={30}
            color={color}
            testID={`topLeftIcon-${leftIcon}`}
          />
        )
      ) : (
        <View style={styles.placeholder} />
      )}
      {title && (
        <ThemedText
          style={styles.title}
          colorType={colorType}
          testID={`topTitle-${title}`}
        >
          {title}
        </ThemedText>
      )}
      {rightIcon ? (
        isImageUrl(rightIcon) ? (
          <TouchableOpacity onPress={rightAction}>
            <Image
              source={{ uri: rightIcon }}
              style={styles.iconImage}
              testID={`topRightImage-${rightIcon}`}
            />
          </TouchableOpacity>
        ) : (
          <ThemedIconButton
            name={rightIcon}
            onPress={rightAction}
            size={30}
            color={color}
            testID={`topRightIcon-${rightIcon}`}
          />
        )
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 30,
  },
  iconImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
