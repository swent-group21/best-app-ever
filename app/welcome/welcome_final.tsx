import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function WelcomeConceptScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.ovalShapeOne} />
            <View style={styles.ovalShapeTwo} />

            <Text style={styles.title}>Ready to{'\n'}Strive?</Text>
            
            
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
    title: {
        paddingTop: SCREEN_HEIGHT * 0.3,
        paddingLeft: SCREEN_WIDTH * 0.05,
        fontSize: 64,
        fontWeight: '900',
        color: '#000',
        lineHeight: 62,
        marginBottom: 0,
    }
});
