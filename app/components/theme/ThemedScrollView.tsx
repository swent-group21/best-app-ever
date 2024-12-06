import { ScrollView, type ScrollViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import React from "react";

export type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.dark & keyof typeof Colors.light;
};

export function ThemedScrollView({
  style,
  lightColor,
  darkColor,
  colorType,
  ...otherProps
}: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType ?? "backgroundPrimary",
  );

  return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
