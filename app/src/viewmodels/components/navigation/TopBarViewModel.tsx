import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * The top bar ViewModel helps displays the top bar component.
 * @param colorType : color type for the icons
 * @returns : a view model for the navigation bars
 */
export function useTopBarViewModel({
    leftIcon,
    rightIcon,
    colorType = "white",
}: {
  leftIcon?: string;
  rightIcon?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}
) {

  const color = useThemeColor({}, colorType);

  const isLeftPP = (icon?: string) =>
    leftIcon?.startsWith("http://") || leftIcon?.startsWith("https://");

  const isRightPP = (icon?: string) =>
    rightIcon?.startsWith("http://") || rightIcon?.startsWith("https://");


  return {
    color,
    isLeftPP,
    isRightPP
  }
}