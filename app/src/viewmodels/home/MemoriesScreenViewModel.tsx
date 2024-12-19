import { useEffect, useState } from "react";
import {
  DBChallenge,
  DBUser,
} from "@/src/models/firebase/TypeFirestoreCtrl";
import {
  getChallengesByUserId,
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

  return {
    userIsGuest,
    challenges,
    icon,
  };
}
