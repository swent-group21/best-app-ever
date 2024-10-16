import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

// Get the screen dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function WelcomeIntroScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.topHalfCircle}>
                <Text style={styles.title}>So what is{'\n'}Strive{'\n'}about?</Text>
            </View>
            <View style={styles.bottomContainer}>
                {/* Placeholder for the image */}
                <Image
                    style={styles.image}
                    source={{ uri: 'https://via.placeholder.com/100' }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topHalfCircle: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.5, // 40% of the screen height
        borderBottomLeftRadius: SCREEN_WIDTH * 0.4,
        borderBottomRightRadius: SCREEN_WIDTH * 0.6,
        backgroundColor: '#E6BC95', // Beige color similar to the screenshot
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 25,
        paddingBottom: 0,
    },
    title: {
        fontSize: 56, // Large font size for bold effect
        fontWeight: '900',
        color: '#000', // Black color
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: 30,
        paddingLeft: 20,
    },
    image: {
        width: 80,
        height: 80,
    },
});
