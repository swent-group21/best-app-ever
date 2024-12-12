import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon, IconProps } from "react-native-elements";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

/**
 * The ThemedIconButton viewmodel helps display a component.
 * @param lightColor : the light color of the button
 * @param darkColor : the dark color of the button
 * @param colorType : the color type of the button
 * @returns : a viewmodel component for the themed icon button
 */
export function useThemedIconButtonViewModel({
  lightColor,
  darkColor,
  colorType,
}:{
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}){
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType ?? "backgroundPrimary",
  );

  return {color};
}
