import { useState, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  TouchableOpacity,
} from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { Challenge } from "@/components/home/Challenge";
import { ChallengeDescription } from "@/components/home/Challenge_Description";
import { ThemedView } from "@/components/theme/ThemedView";
import { BottomBar } from "@/components/navigation/BottomBar";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTextButton } from "@/components/theme/ThemedTextButton";
import { useHomeScreenViewModel } from "@/src/viewmodels/home/HomeScreenViewModel";
import FirestoreCtrl, { DBUser } from "@/src/models/firebase/FirestoreCtrl";
import GroupIcon from "@/components/home/GroupIcon";

const { width, height } = Dimensions.get("window");

export default function HomeScreen({
  user,
  navigation,
  firestoreCtrl,
}: {
  readonly user: DBUser;
  readonly navigation: any;
  readonly firestoreCtrl: FirestoreCtrl;
}) {
  const {
    userIsGuest,
    challenges,
    groups,
    titleChallenge,
    challengesFromFriends,
    navigateToProfile,
    navigateToMap,
    navigateToCamera,
    navigateToFriends,
  } = useHomeScreenViewModel(user, firestoreCtrl, navigation);

  const [filterByFriends] = useState(false);
  const [showGuestPopup, setShowGuestPopup] = useState<string | null>(null);

  // Animation for hiding groups
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleThreshold = 100; // Distance to toggle the groups visibility

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const shouldCollapse = offsetY > toggleThreshold;

    if (shouldCollapse !== isCollapsed) {
      setIsCollapsed(shouldCollapse);
      Animated.timing(scrollY, {
        toValue: shouldCollapse ? 1 : 0,
        duration: 220, // Reduced animation duration for snappier transitions
        useNativeDriver: false,
      }).start();
    }
  };

  const groupOpacity = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const groupHeight = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.18, 0],
  });

  // Handle restricted navigation for guest users
  const handleRestrictedAccess = (screenName: string) => {
    if (userIsGuest) {
      setShowGuestPopup(screenName);
    } else {
      navigation.navigate(screenName);
    }
  };

  // Determine displayed challenges
  const displayedChallenges = filterByFriends
    ? challengesFromFriends
    : challenges;

  return (
    <ThemedView style={styles.bigContainer} testID="home-screen">
      <TopBar
        title="Strive"
        leftIcon="people-outline"
        leftAction={() => handleRestrictedAccess("Friends")}
        rightIcon={
          userIsGuest || !user.image_id
            ? "person-circle-outline"
            : user.image_id
        }
        rightAction={() => handleRestrictedAccess("Profile")}
        testID="top-bar"
      />

      {/* Groups with snapping animation */}
      <Animated.View
        style={[
          styles.groupsContainer,
          {
            opacity: groupOpacity,
            height: groupHeight,
          },
        ]}
      >
        <ThemedScrollView horizontal showsHorizontalScrollIndicator={false}>
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
              onPress={() =>
                userIsGuest
                  ? handleRestrictedAccess("CreateGroup")
                  : navigation.navigate("CreateGroup")
              }
              text="+"
              textStyle={styles.createGroupText}
              textColorType="textOverLight"
              colorType="backgroundSecondary"
            />
          </ThemedView>
        </ThemedScrollView>
      </Animated.View>

      {/* Challenges */}
      <Animated.FlatList
        testID="scroll-view"
        data={
          userIsGuest ? displayedChallenges.slice(0, 10) : displayedChallenges
        }
        onScrollEndDrag={handleScrollEnd}
        keyExtractor={(item, index) => `challenge-${index}`}
        renderItem={({ item, index }) => (
          <Challenge
            navigation={navigation}
            firestoreCtrl={firestoreCtrl}
            challengeDB={item}
            key={index}
            testID={`challenge-id-${index}`}
            currentUser={user}
            index={index}
          />
        )}
        ListHeaderComponent={
          <ChallengeDescription
            dBChallengeDescription={titleChallenge}
            onTimerFinished={() => console.info("Timer Finished")}
            testID={`description-id`}
          />
        }
        ListFooterComponent={
          userIsGuest && (
            <View style={styles.guestFooter}>
              <ThemedText style={styles.guestFooterText}>
                Create an account to see more challenges!
              </ThemedText>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => navigation.navigate("SignUp")}
              >
                <ThemedText style={styles.signUpButtonText}>Sign Up</ThemedText>
              </TouchableOpacity>
            </View>
          )
        }
        ListEmptyComponent={
          <ThemedText style={styles.noChallengesText}>
            No challenges to display
          </ThemedText>
        }
        contentContainerStyle={styles.contentContainer}
      />

      <BottomBar
        testID="bottom-bar"
        leftIcon="map-outline"
        centerIcon="camera-outline"
        rightIcon="trophy-outline"
        leftAction={() => handleRestrictedAccess("MapScreen")}
        centerAction={() => handleRestrictedAccess("Camera")}
      />

      {/* Guest User Pop-Up */}
      {showGuestPopup && (
        <Animated.View style={styles.guestPopup}>
          <ThemedText style={styles.popupText}>
            {showGuestPopup === "Profile"
              ? "Sign up to create your profile!"
              : showGuestPopup === "Friends"
                ? "Find and add friends with an account!"
                : "Access exclusive features with an account!"}
          </ThemedText>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.popupButton}
          >
            <ThemedText style={styles.popupButtonText}>Sign Up</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowGuestPopup(null)}
            style={styles.popupCloseButton}
          >
            <ThemedText style={styles.popupCloseText}>Close</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  groupsContainer: {
    overflow: "hidden",
    backgroundColor: "transparent",
    marginBottom: 10,
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
  contentContainer: {
    paddingBottom: 100,
  },
  noChallengesText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  guestFooter: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#111",
    borderRadius: 10,
    margin: 20,
  },
  guestFooterText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#00000044",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  signUpButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  guestPopup: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#222",
    padding: 20,
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "100%",
  },
  popupText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  popupButton: {
    backgroundColor: "#00000044",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  popupButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  popupCloseButton: {
    padding: 5,
  },
  popupCloseText: {
    color: "#aaa",
    textDecorationLine: "underline",
  },
});
