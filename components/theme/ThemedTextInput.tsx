import React from 'react';
import { TextInput, TextInputProps, TextStyle, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemedText } from './ThemedText';

interface ThemedTextInputProps extends TextInputProps {
    title?: string;
    titleStyle?: TextStyle;
    viewWidth?: any;
    type?: "none" | "email" | "password";
}

export function ThemedTextInput({ style, title, titleStyle, viewWidth = "100%", type="none", ...props }: ThemedTextInputProps) {
    const { colors } = useTheme();
    const getInputProps = (type: "none" | "email" | "password"): TextInputProps => {
        switch (type) {
            case "email":
                return {
                    autoComplete: "email",
                    inputMode: "email",
                    keyboardType: "email-address",
                    autoCapitalize: "none",
                    placeholder: "example@your.domain",
                };
            case "password":
                return {
                    autoComplete: "password",
                    secureTextEntry: true,
                    placeholder: "**********",
                };
            default:
                return {};
        }
    };

    return (
        <View style={{ gap: 5, width: viewWidth }}>
            {title && <ThemedText style={titleStyle} type={'defaultSemiBold'}>{title}</ThemedText>}
            <TextInput 
                style={[{ color: colors.text, borderColor: colors.border}, style]}
                placeholderTextColor={colors.border}
                {...getInputProps(type)}
                {...props}
            />
        </View>    
    );
}


