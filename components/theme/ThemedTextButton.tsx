import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';

interface ThemedTextButtonProps {
    lightColor?: string;
    darkColor?: string;
    colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
    text: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    textColorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}

export function ThemedTextButton({ lightColor, darkColor, text, onPress, style, textStyle, colorType, textColorType = "backgroundPrimary"  }: ThemedTextButtonProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, colorType ?? "backgroundSecondary");

    return (
        <TouchableOpacity style={[style, {backgroundColor: color}]} onPress={onPress} >
            <ThemedText style={[textStyle]} colorType={textColorType} >{text}</ThemedText>
        </TouchableOpacity>
    );
};