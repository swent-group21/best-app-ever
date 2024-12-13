import React from "react";
import { TextInput, TextInputProps, TextStyle, View } from "react-native";
import { ThemedText } from "./themed_text";
import { Colors } from "@/constants/Colors";
import { useThemedTextInputViewModel } from "@/src/viewmodels/components/theme/ThemedTextInputViewModel";

interface ThemedTextInputProps extends TextInputProps {
  title?: string;
  titleStyle?: TextStyle;
  viewWidth?: any;
  type?: "none" | "email" | "password";
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  borderColorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  testID?: string;
}

/**
 * ThemedTextInput component which wraps the TextInput component from react-native with an optional title
 * @param lightColor : light color for the text input
 * @param darkColor : dark color for the text input
 * @param colorType : color type for the text input
 * @param borderColorType : border color type for the text input
 * @param title : title for the text input
 * @param titleStyle : style for the title
 * @param viewWidth : width for the view
 * @param type : type of the text input
 * @param testID : testID for the component
 * @returns ThemedTextInput Component
 */
export function ThemedTextInput({
  lightColor,
  darkColor,
  colorType,
  borderColorType,
  style,
  title,
  titleStyle,
  viewWidth = "100%",
  type = "none",
  testID,
  ...props
}: Readonly<ThemedTextInputProps>) {
  const { color, borderColor, getInputProps } = useThemedTextInputViewModel({
    lightColor,
    darkColor,
    colorType,
    borderColorType,
  });

  return (
    <View testID={testID} style={{ gap: 5, width: viewWidth }}>
      {Boolean(title) && (
        <ThemedText style={titleStyle} type={"defaultSemiBold"}>
          {title}
        </ThemedText>
      )}
      <TextInput
        style={[{ color: color, borderColor: borderColor }, style]}
        placeholderTextColor={borderColor}
        {...getInputProps(type)}
        {...props}
      />
    </View>
  );
}
