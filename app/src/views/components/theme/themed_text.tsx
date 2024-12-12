import { Text, type TextProps } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { TextStyles } from "@/constants/Text";
import { useThemedTextViewModel } from "@/src/viewmodels/components/theme/ThemedTextViewModel";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  type?: keyof typeof TextStyles;
};

/**
 * The ThemedText display a component.
 * @param lightColor : the light color of the text
 * @param darkColor : the dark color of the text
 * @param colorType : the color type of the text
 * @returns : a component as a themed text view
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  colorType,
  ...rest
}: ThemedTextProps) {

  const {color} = useThemedTextViewModel({
    lightColor,
    darkColor,
    colorType,
  });
  return <Text style={[{ color }, TextStyles[type], style]} {...rest} testID="themed-text-id"/>;
}
