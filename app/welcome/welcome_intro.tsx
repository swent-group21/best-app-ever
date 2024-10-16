import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

// Get screen width to ensure the layout matches the device's width
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function WelcomeIntroScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.topHalfCircle}>
                <Text style={styles.title}>So what is{'\n'}Strive about?</Text>
            </View>
            <View style={styles.bottomContainer}>
                {/* Placeholder for the image, can be replaced with actual source */}
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
        width: SCREEN_WIDTH,
    },
    topHalfCircle: {
        width: SCREEN_WIDTH * 2,
        height: SCREEN_WIDTH * 2,
        borderRadius: SCREEN_WIDTH,
        backgroundColor: '#D2A679', 
        position: 'absolute',
        top: -SCREEN_WIDTH,
        left: -SCREEN_WIDTH / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: SCREEN_WIDTH / 2, 
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: 60, 
        paddingLeft: 20,
    },
    image: {
        width: 60,
        height: 60,
    },
});
