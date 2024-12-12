import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * The bottom bar ViewModel helps displays the bottom bar component.
 * @param colorType : color type for the icons
 * @returns : a view model for the navigation bars
 */
export function useBottomBarViewModel({
  colorType = "white",
}: {
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}) {
  const color = useThemeColor({}, colorType);
  return { color };
}
