import { useEffect, useState } from "react";
import {
  DBChallenge,
  DBUser,
  DBGroup,
  DBChallengeDescription,
} from "@/src/models/firebase/TypeFirestoreCtrl";
import {
  getChallengeDescription,
  getChallengesByUserId,
  getGroupsByUserId,
  getImageUrl,
} from "@/src/models/firebase/GetFirestoreCtrl";

/**
 * View model for the home screen.
 * @param user : the user object
 * @returns : userIsGuest, challenges, groups, and titleChallenge
 */
export function useMemoriesViewModel(
  user: DBUser,
  navigation: any,
) {
  console.log("Found user from route: ", user)
  const userIsGuest = user.name === "Guest";
  const [challenges, setChallenges] = useState<DBChallenge[]>([]);
  const [icon, setIcon] = useState<string>("person-circle-outline");

  const navigateToFriends = () => {
    if (!userIsGuest) {
      navigation.navigate("Friends");
    }
  };

  const navigateToProfile = () => {
    if (!userIsGuest) {
      navigation.navigate("Profile");
    }
  };

  // Fetch the current challenge and the challenges
  useEffect(() => {
    // Fetch challenges
    const fetchChallenges = async () => {
      try {
        await getChallengesByUserId(user.uid).then(
          (challenge: DBChallenge[]) => {
            // Sort challenges by date
            const sortedChallenges = challenge.sort((a, b) =>
              a.date && b.date
                ? new Date(b.date).getTime() - new Date(a.date).getTime()
                : 0,
            );
            setChallenges(sortedChallenges);
          },
        );
      } catch (error) {
        console.error("Error fetching challenges: ", error);
      }
    };

    fetchChallenges()
  }, [user.uid]);

  useEffect(() => {
    const fetchImgUrl = async (img) => {
      return getImageUrl(img);
    };
    if (user.image_id !== undefined) {
      fetchImgUrl(user.image_id).then(setIcon);
    }
  }, [user]);

  // Filter challenges to only include those from friends
  const challengesFromFriends = challenges.filter((challenge) =>
    user.friends?.includes(challenge.uid),
  );

  return {
    userIsGuest,
    challenges,
    navigateToFriends,
    navigateToProfile,
    challengesFromFriends,
    icon,
  };
}
