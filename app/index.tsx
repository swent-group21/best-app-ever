<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { View, Text, Platform, Button } from 'react-native';
import { logInWithGoogle, signUpWithEmail } from "@/types/Auth";
import GoogleAuthConfig from "@/types/GoogleAuthConfig";
import { GoogleAuthProvider } from "@/firebase/Firebase";
import * as Google from "expo-auth-session/providers/google";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";

const firestoreCtrl = new FirestoreCtrl();

export default function HomeScreen( { navigation }: any) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");

  const config = Platform.select({
    web: GoogleAuthConfig.web,
    ios: GoogleAuthConfig.ios,
    android: GoogleAuthConfig.android,
  });

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      logInWithGoogle(credential, navigation, firestoreCtrl);
    }
  }, [response]);
||||||| parent of 889d1dd (refactor(app): changed default landing screen)
import { View, Text } from 'react-native';
=======
import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
>>>>>>> 889d1dd (refactor(app): changed default landing screen)

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD:app/(tabs)/index.tsx
<<<<<<< HEAD
  return (
    <View className="bg-cover bg-sky-500 ">
      <Text className="text-3xl"> 
        HELLO THIS IS THE HOME SCREEN
      </Text>
      <Text className="text-3xl"> 
        This is another DIV
      </Text>

      <Button
        onPress={() => promptAsync()}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
||||||| parent of 889d1dd (refactor(app): changed default landing screen)
export default function HomeScreen() {
  return (
    <View className="bg-cover bg-sky-500 ">
      <Text className="text-3xl"> 
        HELLO THIS IS THE HOME SCREEN
      </Text>
    </View>
  );
=======
import WelcomeIntroScreen from '../welcome/welcome_intro';
import WelcomeConceptScreen from '../welcome/welcome_concept';
import WelcomePersonalScreen from '../welcome/welcome_personal';
import WelcomeFinalScreen from '../welcome/welcome_final';
||||||| parent of f36538d (refactor(app): deleted bottom navbar):app/(tabs)/index.tsx
import WelcomeIntroScreen from '../welcome/welcome_intro';
import WelcomeConceptScreen from '../welcome/welcome_concept';
import WelcomePersonalScreen from '../welcome/welcome_personal';
import WelcomeFinalScreen from '../welcome/welcome_final';
=======
import WelcomeIntroScreen from './welcome/welcome_intro';
import WelcomeConceptScreen from './welcome/welcome_concept';
import WelcomePersonalScreen from './welcome/welcome_personal';
import WelcomeFinalScreen from './welcome/welcome_final';
>>>>>>> f36538d (refactor(app): deleted bottom navbar):app/index.tsx
||||||| parent of f44d84d (refactor(app): standardized screens' name)
import WelcomeIntroScreen from './welcome/welcome_intro';
import WelcomeConceptScreen from './welcome/welcome_concept';
import WelcomePersonalScreen from './welcome/welcome_personal';
import WelcomeFinalScreen from './welcome/welcome_final';
=======
import WelcomeIntroScreen from './welcome/intro_screen';
import WelcomeConceptScreen from './welcome/concept_screen';
import WelcomePersonalScreen from './welcome/personal_screen';
import WelcomeFinalScreen from './welcome/final_screen';
>>>>>>> f44d84d (refactor(app): standardized screens' name)
||||||| parent of bfdc1af (refactor(app): added screen/ folder)
import WelcomeIntroScreen from './welcome/intro_screen';
import WelcomeConceptScreen from './welcome/concept_screen';
import WelcomePersonalScreen from './welcome/personal_screen';
import WelcomeFinalScreen from './welcome/final_screen';
=======
import WelcomeIntroScreen from './screens/welcome/intro_screen';
import WelcomeConceptScreen from './screens/welcome/concept_screen';
import WelcomePersonalScreen from './screens/welcome/personal_screen';
import WelcomeFinalScreen from './screens/welcome/final_screen';
>>>>>>> bfdc1af (refactor(app): added screen/ folder)

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

            {/* Render the dots, only if not on the last screen */}
            {activeIndex < 3 && (
                <View style={styles.dotContainer}>
                    {[0, 1, 2, 4].map((i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                activeIndex === i ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
>>>>>>> 889d1dd (refactor(app): changed default landing screen)
}
<<<<<<< HEAD
||||||| parent of 889d1dd (refactor(app): changed default landing screen)

=======

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    dotContainer: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 18,
        height: 18,
        borderRadius: 9, 
        marginHorizontal: 6,
        borderWidth: 1,
        borderColor: '#000',
    },
    activeDot: {
        backgroundColor: '#000',
    },
    inactiveDot: {
        backgroundColor: 'transparent',
    },
});
>>>>>>> 889d1dd (refactor(app): changed default landing screen)
