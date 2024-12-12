import { View, type ViewProps } from "react-native";
import { Colors } from "@/constants/Colors";
import React from "react";
import { useThemedViewModel } from "@/src/viewmodels/components/theme/ThemedViewModel";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  colorType,

  ...otherProps
}: ThemedViewProps) {

  const {backgroundColor} = useThemedViewModel({
    lightColor,
    darkColor,
    colorType,
  })

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
