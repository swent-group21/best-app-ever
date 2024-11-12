import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

interface ThemedTextButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function ThemedTextButton({
  text,
  onPress,
  style,
  textStyle,
}: ThemedTextButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={[{ color: colors.background }, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}
