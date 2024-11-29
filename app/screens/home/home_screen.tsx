import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { Challenge } from "@/components/home/Challenge";
import { Group } from "@/components/home/Group";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedView } from "@/components/theme/ThemedView";
import { BottomBar } from "@/components/navigation/BottomBar";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { Colors } from "@/constants/Colors";
import { color } from "react-native-elements/dist/helpers";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
  DBGroup,
} from "@/firebase/FirestoreCtrl";
import { ChallengeDescription } from "@/components/home/Challenge_Description";
import { DBChallengeDescription } from "@/firebase/FirestoreCtrl";

const { width, height } = Dimensions.get("window");

{
  /*
  The HomeScreen component displays the current challenge description and the list of challenges.
  It fetches the current challenge description and the list of challenges from Firestore.
  The current challenge description is displayed at the top of the screen.
*/
}
export default function HomeScreen({
  user,
  navigation,
  firestoreCtrl,
}: {
  user: DBUser;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  const userIsGuest = user.name === "Guest";

  const [challenges, setChallenges] = useState<DBChallenge[]>([]);
  const [groups, setGroups] = useState<DBGroup[]>([]);
  const [TitleChallenge, setTitleChallenge] = useState<DBChallengeDescription>({
    title: "Challenge Title",
    description: "Challenge Description",
    endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
  });

  // Fetch the current challenge description
  useEffect(() => {
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
          const challengesData = await firestoreCtrl.getChallengesByUserId(
            user.uid,
          );
          setChallenges(challengesData);
        } catch (error) {
          console.error("Error fetching challenges: ", error);
        }
      };

      fetchChallenges();
    }
  }, [user.uid]);

  useEffect(() => {
    if (user.uid) {
      const fetchGroups = async () => {
        try {
          const groupsData = await firestoreCtrl.getGroupsByUserId(user.uid);
          console.log("Groups [" + user.uid + "]", groupsData);
          setGroups(groupsData);
        } catch (error) {
          console.error("Error fetching groups: ", error);
        }
      };

      fetchGroups();
    }
  }, [user.uid]);

  return (
    <ThemedView style={styles.bigContainer} testID="home-screen">
      <TopBar
        title="Strive"
        leftIcon="people-outline"
        rightIcon={
          userIsGuest || !user.image_id
            ? "person-circle-outline"
            : user.image_id
        }
        rightAction={() => {
          navigation.navigate("Profile");
        }}
      />

      {/* Groups */}
      <ThemedScrollView
        style={styles.groupsContainer}
        //colorType="transparent"
        horizontal
      >
        {groups.map((group, index) => (
          <Group
            groupDB={group}
            navigation={navigation}
            firestoreCtrl={firestoreCtrl}
            key={index}
            testID={`group-id-${index}`}
            // Include other props as needed
          />
        ))}

        <ThemedView
          style={styles.createGroupContainer}
          testID="create-group-button"
        >
          <ThemedTextButton
            style={styles.createGroupButton}
            onPress={() => {}}
            text="+"
            textStyle={styles.createGroupText}
            textColorType="textOverLight"
            colorType="backgroundSecondary"
          ></ThemedTextButton>
        </ThemedView>
      </ThemedScrollView>

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
          testID={`description-id`}
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

  input: {
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    borderRadius: 20,
    padding: 20,
  },

  groupsContainer: {
    width: width - 20,
    height: 0.18 * height,
    borderRadius: 15,
    backgroundColor: "transparent",
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

  createGroupContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    width: width * 0.23,
    height: width * 0.2,
    borderRadius: 20,
    margin: 10,
    alignItems: "center",
  },

  createGroupButton: {
    width: "95%",
    height: "95%",
    borderRadius: 60,
  },

  createGroupText: {
    flex: 1,
    textAlign: "center",
    fontSize: 60,
  },
});
