import React from "react";
import { TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./themed_text";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { TextStyles } from "@/constants/Text";
import { useThemedTextButtonViewModel } from "@/src/viewmodels/components/theme/ThemedTextButtonViewModel";

interface ThemedTextButtonProps extends TouchableOpacityProps {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  textColorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  textType?: keyof typeof TextStyles;
  testID?: string;
}

/**
 * The ThemedTextButton display a component.
 * @param lightColor : the light color of the button
 * @param darkColor : the dark color of the button
 * @param colorType : the color type of the button
 * @returns : a component as a themed text button
 */
export function ThemedTextButton({
  lightColor,
  darkColor,
  text,
  onPress,
  style,
  textStyle,
  textType,
  colorType,
  textColorType = "backgroundPrimary",
  testID,
}: Readonly<ThemedTextButtonProps>) {

  const {color} = useThemedTextButtonViewModel({
    lightColor,
    darkColor,
    colorType,
  });

  return (
    <TouchableOpacity
      style={[style, { backgroundColor: color }]}
      onPress={onPress}
      {...(testID && { testID })}
    >
      <ThemedText style={[textStyle]} colorType={textColorType} type={textType}>
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}
