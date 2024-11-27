import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { Challenge } from "@/components/home/Challenge";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedView } from "@/components/theme/ThemedView";
import { BottomBar } from "@/components/navigation/BottomBar";
import { DBChallenge } from "@/firebase/FirestoreCtrl";
import { getAuth } from "firebase/auth";
import { ThemedText } from "@/components/theme/ThemedText";
import { ChallengeDescription } from "@/components/home/Challenge_Description";
import { DBChallengeDescription } from "@/firebase/FirestoreCtrl";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

export default function HomeScreen({ user, navigation, firestoreCtrl }: any) {
  const [challenges, setChallenges] = useState<DBChallenge[]>([]);
  const [TitleChallenge, setTitleChallenge] = useState<DBChallengeDescription>({
    title: "Challenge Title",
    description: "Challenge Description",
    endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
  });

  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    console.log("UID", uid);
    const fetchCurrentChallenge = async () => {
      try {
        const currentChallengeData =
          await firestoreCtrl.getChallengeDescription();

        // Transformation des données
        const formattedChallenge = {
          title: currentChallengeData.Title,
          description: currentChallengeData.Description,
          endDate: new Date(currentChallengeData.Date.seconds * 1000), // Conversion Timestamp -> Date
        };

        setTitleChallenge(formattedChallenge);
      } catch (error) {
        console.error("Error fetching current challenge: ", error);
      }
    };
    fetchCurrentChallenge();
  });

  useEffect(() => {
    console.log("UID", uid);
    if (uid) {
      const fetchChallenges = async () => {
        try {
          const challengesData = await firestoreCtrl.getChallengesByUserId(uid);
          console.log("Challenges [" + uid + "]", challengesData);
          setChallenges(challengesData);
        } catch (error) {
          console.error("Error fetching challenges: ", error);
        }
      };

      fetchChallenges();
    }
  }, [uid]);

  return (
    <ThemedView style={styles.bigContainer}>
      <TopBar
        title="Strive"
        leftIcon="people-outline"
        rightIcon="person-circle-outline"
        rightAction={() => {
          navigation.navigate("Profile");
          console.log(auth.currentUser);
        }}
      />

      {/* Challenges */}
      <ThemedScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        colorType="transparent"
      >
        {/* Current Challenge Description  */}
        <ChallengeDescription
          dBChallengeDescription={TitleChallenge}
          onTimerFinished={() => console.log("Timer Finished")}
        />
        {challenges.length === 0 ? (
          <ThemedText>No challenge to display</ThemedText>
        ) : (
          challenges.map((challenge, index) => (
            <Challenge
              navigation={navigation}
              firestoreCtrl={firestoreCtrl}
              key={index}
              challengeDB={challenge}
              // Include other props as needed
            />
          ))
        )}
      </ThemedScrollView>

      <BottomBar
        leftIcon="map-outline"
        centerIcon="camera-outline"
        rightIcon="trophy-outline"
        leftAction={() => navigation.navigate("MapScreen")}
        centerAction={() => navigation.navigate("Camera")}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "100%",
    height: "100%",
  },

  contentContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: height * 0.04,
  },
});
