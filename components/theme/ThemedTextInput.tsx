import React from 'react';
import { TextInput, TextInputProps, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface ThemedTextInputProps extends TextInputProps {
    style?: ViewStyle;
}

export function ThemedTextInput({ style, ...props }: ThemedTextInputProps) {
    const { colors } = useTheme();

    return (
        <TextInput
            style={[{ color: colors.text, borderColor: colors.border }, style]}
            placeholderTextColor={colors.border}
            {...props}
        />
    );
}
