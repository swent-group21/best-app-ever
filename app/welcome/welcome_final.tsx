import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function WelcomeConceptScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.ovalShapeOne} />
            <View style={styles.ovalShapeTwo} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Compete{'\n'}yourself</Text>
                <Text style={styles.description}>
                    Become the best version of yourself{'\n'} 
                    Interact with motivated people to reach your goals !
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
        height: SCREEN_HEIGHT,
    },
    ovalShapeOne: {
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.8,
        left: -SCREEN_WIDTH * 0.3,
        width: SCREEN_WIDTH * 1.3,
        height: SCREEN_HEIGHT * 0.7,
        borderRadius: SCREEN_WIDTH * 0.7,
        backgroundColor: '#E6BC95',
    },
    ovalShapeTwo: {
        position: 'absolute',
        top: -SCREEN_HEIGHT * 0.4,
        left: SCREEN_WIDTH * 0.3,
        width: SCREEN_WIDTH * 1.3,
        height: SCREEN_HEIGHT * 0.7,
        borderRadius: SCREEN_WIDTH * 0.7,
        backgroundColor: '#E6BC95',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
    title: {
        fontSize: 56,
        fontWeight: '900',
        color: '#000',
        lineHeight: 62,
        marginBottom: 20,
    },
    description: {
        paddingTop: 60,
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
        lineHeight: 26,
    },
});
