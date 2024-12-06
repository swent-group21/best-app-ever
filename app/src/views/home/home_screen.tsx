import React from "react";
import { Dimensions, StyleSheet } from "react-native";
<<<<<<< HEAD:src/app/views/home/home_screen.tsx
import { TopBar } from "../../../components/navigation/TopBar";
import { Challenge } from "../../../components/home/Challenge";
import { GroupIcon } from "../../../components/home/GroupIcon";
import { ThemedScrollView } from "../../../components/theme/ThemedScrollView";
import { ThemedView } from "../../../components/theme/ThemedView";
import { BottomBar } from "../../../components/navigation/BottomBar";
import { ThemedText } from "../../../components/theme/ThemedText";
import { ThemedTextButton } from "../../../components/theme/ThemedTextButton";
import { ChallengeDescription } from "../../../components/home/Challenge_Description";
import { useHomeScreenViewModel } from "../../viewmodels/home/HomeScreenViewModel";
import { DBUser } from "../../models/firebase/FirestoreCtrl";
import FirestoreCtrl from "../../models/firebase/FirestoreCtrl";
=======
import { TopBar } from "@/components/navigation/TopBar";
import { Challenge } from "@/components/home/Challenge";
import { Group } from "@/components/home/Group";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedView } from "@/components/theme/ThemedView";
import { BottomBar } from "@/components/navigation/BottomBar";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { ChallengeDescription } from "@/components/home/Challenge_Description";
import { useHomeScreenViewModel } from "@/src/viewmodels/home/HomeScreenViewModel";
import FirestoreCtrl, { DBUser } from "@/src/models/firebase/FirestoreCtrl";
>>>>>>> master:app/src/views/home/home_screen.tsx

const { width, height } = Dimensions.get("window");

/**
 * Home screen
 * @param user : user object
 * @param navigation : navigation object
 * @param firestoreCtrl : FirestoreCtrl object
 * @returns : a screen for the home
 */
export default function HomeScreen({
  user,
  navigation,
  firestoreCtrl,
}: {
  user: DBUser;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
}) {
<<<<<<< HEAD:src/app/views/home/home_screen.tsx
  const { userIsGuest, challenges, groups, titleChallenge } =
    useHomeScreenViewModel(user, firestoreCtrl);
=======
  const {
    userIsGuest,
    challenges,
    groups,
    titleChallenge,
    navigateToProfile,
    navigateToMap,
    navigateToCamera,
    navigateToFriends,
  } = useHomeScreenViewModel(user, firestoreCtrl, navigation);
>>>>>>> master:app/src/views/home/home_screen.tsx

  return (
    <ThemedView style={styles.bigContainer} testID="home-screen">
      <TopBar
        title="Strive"
        leftIcon="people-outline"
        leftAction={() => navigateToFriends()}
        rightIcon={
          userIsGuest || !user.image_id
            ? "person-circle-outline"
            : user.image_id
        }
        rightAction={() => navigateToProfile()}
        testID="top-bar"
      />

      {/* Groups */}
      <ThemedScrollView style={styles.groupsContainer} horizontal>
        {groups.map((group, index) => (
          <GroupIcon
            groupDB={group}
            navigation={navigation}
            firestoreCtrl={firestoreCtrl}
            key={index}
            testID={`group-id-${index}`}
          />
        ))}

        <ThemedView
          style={styles.createGroupContainer}
          testID="create-group-button"
        >
          <ThemedTextButton
            style={styles.createGroupButton}
            onPress={() => navigation.navigate("CreateGroup")}
            text="+"
            textStyle={styles.createGroupText}
            textColorType="textOverLight"
            colorType="backgroundSecondary"
          />
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
          dBChallengeDescription={titleChallenge}
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
              currentUser={user}
              index={index}
            />
          ))
        )}
      </ThemedScrollView>

      <BottomBar
        testID="bottom-bar"
        leftIcon="map-outline"
        centerIcon="camera-outline"
        rightIcon="trophy-outline"
<<<<<<< HEAD:src/app/views/home/home_screen.tsx
        leftAction={() => navigation.navigate("MapScreen")}
        centerAction={() => navigation.navigate("Camera", { group_id: "home" })}
=======
        leftAction={() => navigateToMap()}
        centerAction={() => navigateToCamera()}
>>>>>>> master:app/src/views/home/home_screen.tsx
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
