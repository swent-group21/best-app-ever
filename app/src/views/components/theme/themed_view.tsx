import { View, type ViewProps } from "react-native";
import { Colors } from "@/constants/Colors";
import React from "react";
import { useThemedViewModel } from "@/src/viewmodels/components/theme/ThemedViewModel";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

/**
 * ThemedView component which wraps the View component from react-native
 * @param lightColor : light color for the View
 * @param darkColor : dark color for the View
 * @param colorType : color type for the View
 * @returns ThemedView Component
 */
export function ThemedView({
  style,
  lightColor,
  darkColor,
  colorType,
  ...otherProps
}: ThemedViewProps) {
  const { backgroundColor } = useThemedViewModel({
    lightColor,
    darkColor,
    colorType,
  });

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
