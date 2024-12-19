import { useEffect, useState } from "react";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
  DBGroup,
  DBChallengeDescription,
} from "@/src/models/firebase/FirestoreCtrl";

/**
 * View model for the home screen.
 * @param user : the user object
 * @param firestoreCtrl : FirestoreCtrl object
 * @returns : userIsGuest, challenges, groups, and titleChallenge
 */
export function useHomeScreenViewModel(
  user: DBUser,
  firestoreCtrl: FirestoreCtrl,
  navigation: any,
) {
  const userIsGuest = user.name === "Guest";


  const [refreshing, setRefreshing] = useState(false);
  const [challenges, setChallenges] = useState<DBChallenge[]>([]);
  const [groups, setGroups] = useState<DBGroup[]>([]);
  const [titleChallenge, setTitleChallenge] = useState<DBChallengeDescription>({
    title: "Challenge Title",
    description: "Challenge Description",
    endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
  });
  const navigateToProfile = () => {
    if (!userIsGuest) {
      navigation.navigate("Profile");
    }
  };
  const navigateToMap = () => navigation.navigate("MapScreen");
  const navigateToCamera = () => {
    if (!userIsGuest) {
      navigation.navigate("Camera", { group_id: "home" });
    }
  };
  const navigateToFriends = () => {
    if (!userIsGuest) {
      navigation.navigate("Friends");
    }
  };
  const navigateToCreateGroups = () => {
    if (!userIsGuest) {
      navigation.navigate("CreateGroup");
    }
  };
  

  // Fetch challenges
  const fetchChallenges = async (challengeTitle: string) => {
    try {
      const fetchedChallenges = await firestoreCtrl.getPostsByChallengeTitle(
        challengeTitle,
      );
      const sortedChallenges = fetchedChallenges.sort((a, b) =>
        a.date && b.date
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : 0,
      );
      setChallenges(sortedChallenges);
    } catch (error) {
      console.error("Error fetching challenges: ", error);
    }
  };

  // Fetch groups
  const fetchGroups = async () => {
    if (user.uid) {
      try {
        const fetchedGroups = await firestoreCtrl.getGroupsByUserId(user.uid);
        const sortedGroups = fetchedGroups.sort((a, b) =>
          a.updateDate && b.updateDate
            ? new Date(b.updateDate).getTime() -
              new Date(a.updateDate).getTime()
            : 0,
        );
        setGroups(sortedGroups);
      } catch (error) {
        console.error("Error fetching groups: ", error);
      }
    }
  };

  // Refresh function
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const currentChallengeData =
        await firestoreCtrl.getChallengeDescription();
      setTitleChallenge(currentChallengeData);
      await fetchChallenges(currentChallengeData.title);
      await fetchGroups();
    } catch (error) {
      console.error("Error during refresh: ", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Initialize data
  useEffect(() => {
    const initialize = async () => {
      const currentChallengeData = await firestoreCtrl.getChallengeDescription();
      setTitleChallenge(currentChallengeData);
      await fetchChallenges(currentChallengeData.title);
      await fetchGroups();
    };
    initialize();
  });

  const challengesFromFriends = challenges.filter((challenge) =>
    user.friends?.includes(challenge.uid),
  );

  return {
    userIsGuest,
    challenges,
    groups,
    titleChallenge,
    navigateToProfile,
    navigateToMap,
    navigateToCamera,
    navigateToFriends,
    navigateToCreateGroups,
    challengesFromFriends,
    refreshing, 
    onRefresh
  };
}
