import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';

import WelcomeIntroScreen from '../welcome/welcome_intro';
import WelcomeConceptScreen from '../welcome/welcome_concept';
import WelcomePersonalScreen from '../welcome/welcome_personal';
import WelcomeFinalScreen from '../welcome/welcome_final';

// Get the device's screen width
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function WelcomeScreens() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Handle the scroll event to update the active index
    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / SCREEN_WIDTH);
        setActiveIndex(index);
    };

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false} 
                style={styles.scrollView}
                onScroll={handleScroll}
            >
                <WelcomeIntroScreen />
                <WelcomeConceptScreen />
                <WelcomePersonalScreen />
                <WelcomeFinalScreen />
                
            </ScrollView>

            {/* Render the dots */}
            <View style={styles.dotContainer}> 
                {Array.from({ length: 4 }).map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            activeIndex === i ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    dotContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginHorizontal: 8,
        borderWidth: 2,
        borderColor: '#000',
    },
    activeDot: {
        backgroundColor: '#000',
    },
    inactiveDot: {
        backgroundColor: 'transparent',
    },
});
