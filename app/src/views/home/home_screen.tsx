import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Install: `expo install @expo/vector-icons`
import { TopBar } from "@/components/navigation/TopBar";
import { Challenge } from "@/components/home/Challenge";
import { ChallengeDescription } from "@/components/home/Challenge_Description";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedView } from "@/components/theme/ThemedView";
import { BottomBar } from "@/components/navigation/BottomBar";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { useHomeScreenViewModel } from "@/src/viewmodels/home/HomeScreenViewModel";
import { DBUser } from "@/src/models/firebase/FirestoreCtrl";
import FirestoreCtrl from "@/src/models/firebase/FirestoreCtrl";
import { ThemedText } from "@/components/theme/ThemedText";

const { width, height } = Dimensions.get("window");

export default function HomeScreen({
  user,
  navigation,
  firestoreCtrl,
}: {
  user: DBUser;
  navigation: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  const { userIsGuest, challenges, groups, titleChallenge, challengesFromFriends } =
    useHomeScreenViewModel(user, firestoreCtrl);

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterByFriends, setFilterByFriends] = useState(false);

  // Determine displayed challenges
  const displayedChallenges = filterByFriends ? challengesFromFriends : challenges;

  return (
    <ThemedView style={styles.bigContainer} testID="home-screen">
      <TopBar
        title="Strive"
        leftIcon="people-outline"
        leftAction={() => navigation.navigate("Friends")}
        rightIcon={
          userIsGuest || !user.image_id
            ? "person-circle-outline"
            : user.image_id
        }
        rightAction={() => navigation.navigate("Profile")}
        testID="top-bar"
      />

      {/* Filter Icon */}
      <ThemedView style={styles.filterIconContainer}>
        <Ionicons
          name="filter-outline"
          size={30}
          color="#fff"
          onPress={() => setShowFilterOptions(!showFilterOptions)}
          style={styles.filterIcon}
          testID="filter-icon"
        />
        {showFilterOptions && (
          <ThemedView style={styles.filterDropdown}>
            <ThemedTextButton
              text="Filter by Friends"
              onPress={() => {
                setFilterByFriends(!filterByFriends);
                setShowFilterOptions(false);
              }}
              style={styles.dropdownOption}
              textStyle={styles.dropdownText}
            />
          </ThemedView>
        )}
      </ThemedView>

      {/* Challenges */}
      <ThemedScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        colorType="transparent"
      >
        <ChallengeDescription
          dBChallengeDescription={titleChallenge}
          onTimerFinished={() => console.log("Timer Finished")}
          testID={`description-id`}
        />
        {displayedChallenges.length === 0 ? (
          <ThemedText>No challenges to display</ThemedText>
        ) : (
          displayedChallenges.map((challenge, index) => (
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
  filterIconContainer: {
    position: "absolute",
    top: height * 0.25,
    right: width * 0.05,
    zIndex: 10,
    backgroundColor: "transparent",
  },
  filterIcon: {
    padding: 5,
    backgroundColor: "#444",
    borderRadius: 15,
  },
  filterDropdown: {
    backgroundColor: "#333",
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    position: "absolute",
    top: 40,
    right: 0,
  },
  dropdownOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  dropdownText: {
    color: "#fff",
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
