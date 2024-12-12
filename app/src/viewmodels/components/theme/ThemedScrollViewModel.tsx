import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";


/**
 * The ThemedScrollView viewmodel helps display a component.
 * @param lightColor : the light color of the scroll
 * @param darkColor : the dark color of the scroll
 * @param colorType : the color type of the scroll
 * @returns : a viewmodel component for the themed scroll view
 */
export function useThemedScrollViewModel({
  lightColor,
  darkColor,
  colorType,
}: {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.dark & keyof typeof Colors.light;
}){

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType ?? "backgroundPrimary",
  );

  return {backgroundColor};
}
