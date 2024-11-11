import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ThemedIconButton } from '@/components/theme/ThemedIconButton';

// Get screen width and height
const { width, height } = Dimensions.get("window");

interface TopbarProps {
    leftIcon?: string;
    leftAction?: () => void;
    rightIcon?: string;
    rightAction?: () => void;
    title?: string;
}

export function TopBar({ leftIcon, leftAction, rightIcon, rightAction, title }: TopbarProps) {
    return (
        <View style={styles.container}>
            {leftIcon ? <ThemedIconButton name={leftIcon} onPress={leftAction || (() => {})} size={30} color='white' /> : <View style={styles.placeholder} />}
            {title && <Text style={styles.title}>{title}</Text>}
            {rightIcon ? <ThemedIconButton name={rightIcon} onPress={rightAction || (() => {})} size={30} color='white' /> : <View style={styles.placeholder} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width - 10,
        height: height * 0.08,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    placeholder: {
        width: 30, 
    },
});