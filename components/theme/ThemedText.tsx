import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { TextStyles } from "@/constants/Text";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  type?: keyof typeof TextStyles;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  colorType,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType ?? "textPrimary",
  );

  return (
    <Text
      style={[
        { color },
        TextStyles[type],
        style,
      ]}
      {...rest}
    />
  );
}
