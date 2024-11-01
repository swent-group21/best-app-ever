import React from 'react';
import { ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

interface ThemedIconButtonProps {
    iconName: string;
    onPress: () => void;
    iconType?: string;
    style?: ViewStyle;
    size?: number;
    color?: string;
}

export function ThemedIconButton({ iconName, onPress, iconType='ionicon', size, style, color}: ThemedIconButtonProps) {
    const { colors } = useTheme();

    return (
        <Icon name={iconName} color={color ? color : colors.text} type={iconType} onPress={onPress} size={size} containerStyle={style} />
    );
};