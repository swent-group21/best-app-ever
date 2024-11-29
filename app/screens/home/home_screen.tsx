import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { Challenge } from "@/components/home/Challenge";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedView } from "@/components/theme/ThemedView";
import { BottomBar } from "@/components/navigation/BottomBar";
import { ThemedText } from "@/components/theme/ThemedText";
import FirestoreCtrl, { DBChallenge, DBUser } from "@/firebase/FirestoreCtrl";
import { ChallengeDescription } from "@/components/home/Challenge_Description";
import { DBChallengeDescription } from "@/firebase/FirestoreCtrl";

const { height } = Dimensions.get("window");

{/*
  The HomeScreen component displays the current challenge description and the list of challenges.
  It fetches the current challenge description and the list of challenges from Firestore.
  The current challenge description is displayed at the top of the screen.
*/}
export default function HomeScreen({
  user,
  navigation,
  firestoreCtrl,
}: {
  user: DBUser;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  const [challenges, setChallenges] = useState<DBChallenge[]>([]);
  const [TitleChallenge, setTitleChallenge] = useState<DBChallengeDescription>({
    title: "Challenge Title",
    description: "Challenge Description",
    endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
  });

  // Fetch the current challenge description
  useEffect(() => {
    console.log("UID", user.uid);
    const fetchCurrentChallenge = async () => {
      try {
        const currentChallengeData =
          await firestoreCtrl.getChallengeDescription();

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

  // Fetch the list of challenges
  useEffect(() => {
    if (user.uid) {
      const fetchChallenges = async () => {
        try {
          const challengesData = await firestoreCtrl.getKChallenges(100);
          console.log("Challenges [" + user.uid + "]", challengesData);
          setChallenges(challengesData);
        } catch (error) {
          console.error("Error fetching challenges: ", error);
        }
      };

      fetchChallenges();
    }
  }, [user.uid, firestoreCtrl]);

  return (
    <ThemedView style={styles.bigContainer} testID="home-screen">
      <TopBar
        title="Strive"
        leftIcon="people-outline"
        rightIcon="person-circle-outline"
        rightAction={() => {
          navigation.navigate("Profile");
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
              testID={`challenge-id-${index}`}
              currentUser={user}
            />
          ))
        )}
      </ThemedScrollView>

      <BottomBar
        testID="bottom-bar"
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
