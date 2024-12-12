import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

/**
 * The ThemedText viewmodel helps display a component.
 * @param lightColor : the light color of the text
 * @param darkColor : the dark color of the text
 * @param colorType : the color type of the text
 * @returns : a viewmodel component for the themed text view
 */
export function useThemedTextViewModel({
  lightColor,
  darkColor,
  colorType,
}: {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}){
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType ?? "textPrimary",
  );

  return color;
}
