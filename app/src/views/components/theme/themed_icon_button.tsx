import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon, IconProps } from "react-native-elements";
import { Colors } from "@/constants/Colors";
import { useThemedIconButtonViewModel } from "@/src/viewmodels/components/theme/ThemedIconButtonViewModel";

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

/**
 * The ThemedIconButton display a icon button.
 * @param lightColor : the light color of the button
 * @param darkColor : the dark color of the button
 * @param colorType : the color type of the button
 * @returns : a component as a themed icon button
 */
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
}: Readonly<ThemedIconButtonProps>) {
  const { color } = useThemedIconButtonViewModel({
    lightColor,
    darkColor,
    colorType,
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      {...(testID && { testID })}
    >
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
