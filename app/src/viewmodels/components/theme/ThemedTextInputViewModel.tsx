import { TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

/**
 * The ThemedTextInput viewmodel helps display a component.
 * @param lightColor : the light color of the input
 * @param darkColor : the dark color of the input
 * @param colorType : the color type of the input
 * @returns : a viewmodel component for the themed text input
 */
export function useThemedTextInputViewModel({
  lightColor,
  darkColor,
  colorType,
  borderColorType,
}: {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  borderColorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType ?? "textPrimary",
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    borderColorType ?? "textPrimary",
  );
  const getInputProps = (
    type: "none" | "email" | "password",
  ): TextInputProps => {
    switch (type) {
      case "email":
        return {
          autoComplete: "email",
          inputMode: "email",
          keyboardType: "email-address",
          autoCapitalize: "none",
          placeholder: "example@your.domain",
        };
      case "password":
        return {
          autoComplete: "password",
          secureTextEntry: true,
          placeholder: "**********",
        };
      default:
        return {};
    }
  };

  return {
    color,
    borderColor,
    getInputProps,
  };
}
