import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

// Get the screen dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function WelcomeConceptScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.ovalShape} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Participate{'\n'}in Weekly{'\n'}challenges</Text>
                <Text style={styles.description}>
                    Compete with your{'\n'}
                    friends and people{'\n'}
                    around you{'\n'}
                    Become the goat and win{'\n'}
                    prizes!
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: SCREEN_WIDTH,
    },
    ovalShape: {
        position: 'absolute',
        bottom: 0, // Position it at the bottom of the screen
        left: SCREEN_WIDTH * 0.1, // Offset slightly from the left
        width: SCREEN_WIDTH * 1.2, // Make the oval wider than the screen
        height: SCREEN_HEIGHT * 0.6, // Set a height that fits the screen
        borderRadius: SCREEN_WIDTH * 0.6, // Large borderRadius for the oval effect
        backgroundColor: '#E6BC95', // Beige color
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20, // Padding for text alignment
    },
    title: {
        fontSize: 48,
        fontWeight: '900',
        color: '#000',
        lineHeight: 52,
        marginBottom: 20,
    },
    description: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        lineHeight: 26,
    },
});
