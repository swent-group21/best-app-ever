import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import WelcomeIntroScreen from '../welcome/welcome_intro';
import WelcomeConceptScreen from '../welcome/welcome_concept';
import WelcomePersonalScreen from '../welcome/welcome_personal';
import WelcomeFinalScreen from '../welcome/welcome_final';

export default function WelcomeScreens() {
    return (
        <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false} 
            style={styles.scrollView}
        >

            <WelcomeIntroScreen />
            <WelcomeConceptScreen />
            <WelcomePersonalScreen />
            <WelcomeFinalScreen />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    }
});
