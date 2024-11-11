import React from 'react';
import { Icon, IconProps } from 'react-native-elements';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

interface ThemedIconButtonProps extends IconProps {
    //iconName: string;
    onPress: () => void;
    iconType?: string;
    //style: StyleProp<ViewStyle>;
    size?: number;
    colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
    lightColor?: string;
    darkColor?: string;
}

export function ThemedIconButton({ lightColor, darkColor, onPress, iconType='ionicon', size, colorType, ...props }: ThemedIconButtonProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, colorType ?? "backgroundPrimary");

    return (
        <Icon color={color} type={iconType} onPress={onPress} size={size} {...props}/>
    );
};