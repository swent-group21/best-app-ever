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
      navigation.navigate("Camera");
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
  }

  const blurredChallenges = userIsGuest
    ? challenges.map((challenge, index) => ({
        ...challenge,
        isBlurred: index >= 10,
      }))
    : challenges;
  // Fetch the current challenge
  useEffect(() => {
    const fetchCurrentChallenge = async () => {
      try {
        const currentChallengeData =
          await firestoreCtrl.getChallengeDescription();
        setTitleChallenge(currentChallengeData);
      } catch (error) {
        console.error("Error fetching current challenge: ", error);
      }
    };

    fetchCurrentChallenge();
  }, [firestoreCtrl]);

  // Fetch the challenges
  useEffect(() => {
    if (user.uid) {
      const fetchChallenges = async () => {
        try {
          const challengesData = await firestoreCtrl.getKChallenges(100);
          setChallenges(challengesData);
        } catch (error) {
          console.error("Error fetching challenges: ", error);
        }
      };
      fetchChallenges();
    }
  }, [firestoreCtrl]);

  // Fetch the groups
  useEffect(() => {
    if (user.uid) {
      const fetchGroups = async () => {
        try {
          const groupsData = await firestoreCtrl.getGroupsByUserId(user.uid);
          setGroups(groupsData);
        } catch (error) {
          console.error("Error fetching groups: ", error);
        }
      };
      fetchGroups();
    }
  }, [user.uid, firestoreCtrl]);

  // Filter challenges to only include those from friends
  const challengesFromFriends = challenges.filter((challenge) =>
    user.friends?.includes(challenge.uid),
  );

  return {
    userIsGuest,
    challenges : blurredChallenges,
    groups,
    titleChallenge,
    navigateToProfile,
    navigateToMap,
    navigateToCamera,
    navigateToFriends,
    navigateToCreateGroups,
    challengesFromFriends,
    
  };
}
