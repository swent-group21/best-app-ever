import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function WelcomePersonalScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>welcome_personal.tsx</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        width: Dimensions.get('window').width,
    },
    text: {
        fontSize: 20,
    },
});
