import {
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
import { useState, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";


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

  const [filterByFriends, setFilterByFriends] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false); // État pour le menu

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

  // Determine displayed challenges
  const displayedChallenges = filterByFriends
    ? challengesFromFriends || []
    : challenges || [];

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
        {/* Current Challenge Description  */}
        <ChallengeDescription
          dBChallengeDescription={titleChallenge}
          onTimerFinished={() => console.info("Timer Finished")}
          testID={`description-id`}
        />

        {/* Filter by Friends */}
        <ThemedIconButton
          name="filter"
          onPress={() => setShowFilterMenu(true)}
          style={styles.filterIcon}
          colorType="backgroundSecondary"
          testID="filter-icon"
        />
        <Modal
          visible={showFilterMenu}
          testID="filter-modal"
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowFilterMenu(false)}
        >
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalContent}>
              <TouchableOpacity
                style={styles.optionButton}
                testID="filter-by-friends-option"
                onPress={() => {
                  setFilterByFriends(true);
                  setShowFilterMenu(false);
                }}
              >
                <Text style={styles.optionText}>Filter by Friends</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                testID="see-all-challenges-option"
                onPress={() => {
                  setFilterByFriends(false);
                  setShowFilterMenu(false);
                }}
              >
                <Text style={styles.optionText}>See All Posts</Text>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </Modal>

        {displayedChallenges.length === 0 ? (
          <ThemedText>No challenges to display</ThemedText>
        ) : (
          displayedChallenges.map((challenge, index) => (
            <Challenge
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
              onPress={() => navigation.navigate("CreateGroup")}
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
        data={displayedChallenges}
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
        leftAction={() => navigateToMap()}
        centerAction={() => navigateToCamera()}
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
  filterIcon: {
    padding: 5,
    backgroundColor: "#444",
    borderRadius: 15,
    position: "relative",
    right: 0,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#444",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
      },
  contentContainer: {
    paddingBottom: 100,
  },
  noChallengesText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});
