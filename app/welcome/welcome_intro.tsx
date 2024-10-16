import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function WelcomeIntroScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>welcome_intro.tsx</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
        width: Dimensions.get('window').width,
    },
    text: {
        fontSize: 20,
    },
});
