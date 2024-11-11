import React from 'react';
import { ViewStyle, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon, IconProps } from 'react-native-elements';

interface ThemedIconButtonProps extends IconProps {
    //iconName: string;
    onPress: () => void;
    iconType?: string;
    //style: StyleProp<ViewStyle>;
    size?: number;
    color?: string;
}

export function ThemedIconButton({ onPress, iconType='ionicon', size, color, ...props }: ThemedIconButtonProps) {
    const { colors } = useTheme();

    return (
        <Icon color={color ? color : colors.text} type={iconType} onPress={onPress} size={size} {...props}/>
    );
};