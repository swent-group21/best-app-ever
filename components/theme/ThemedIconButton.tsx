import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon, IconProps } from "react-native-elements";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

interface ThemedIconButtonProps extends IconProps {
  onPress: () => void;
  iconType?: string;
  size?: number;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  lightColor?: string;
  darkColor?: string;
  paddingLeft?: number;
  testID?: string;
}

export function ThemedIconButton({
  lightColor,
  darkColor,
  onPress,
  iconType = "ionicon",
  size,
  paddingLeft,
  colorType,
  testID,
  ...props
}: ThemedIconButtonProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType ?? "backgroundPrimary",
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} {...(testID && { testID })}>
      <Icon
        testID={testID}
        color={color}
        type={iconType}
        onPress={onPress}
        size={size}
        {...props}
      />
    </TouchableOpacity>
  );
}
