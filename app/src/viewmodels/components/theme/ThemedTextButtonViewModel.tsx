import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";


/**
 * The ThemedTextButton viewmodel helps display a component.
 * @param lightColor : the light color of the button
 * @param darkColor : the dark color of the button
 * @param colorType : the color type of the button
 * @returns : a viewmodel component for the themed text button
 */
export function useThemedTextButtonViewModel({
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
    colorType ?? "backgroundSecondary",
  );

  return color;
}
