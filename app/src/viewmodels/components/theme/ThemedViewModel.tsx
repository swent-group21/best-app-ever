import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

/**
 * The ThemedView viewmodel helps display a component.
 * @param lightColor : the light color of the view
 * @param darkColor : the dark color of the view
 * @param colorType : the color type of the view
 * @returns : a viewmodel component for the themed view
 */
export function useThemedViewModel({
  lightColor,
  darkColor,
  colorType,
}: {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}) {

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType ?? "backgroundPrimary",
  );

  return backgroundColor;
}
