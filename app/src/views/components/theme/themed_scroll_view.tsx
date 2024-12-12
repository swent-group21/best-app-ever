import { ScrollView, type ScrollViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import React from "react";
import { useThemedScrollViewModel } from "@/src/viewmodels/components/theme/ThemedScrollViewModel";

export type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.dark & keyof typeof Colors.light;
};

/**
 * The ThemedScrollView display a scroll.
 * @param lightColor : the light color of the scroll
 * @param darkColor : the dark color of the scroll
 * @param colorType : the color type of the scroll
 * @returns : a component as a scroll view
 */
export function ThemedScrollView({
  style,
  lightColor,
  darkColor,
  colorType,
  ...otherProps
}: ThemedScrollViewProps) {
  const backgroundColor = useThemedScrollViewModel({
    lightColor: lightColor,
    darkColor: darkColor,
    colorType: colorType,
  });

  return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
