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
) {
  const userIsGuest = user.name === "Guest";

  const [challenges, setChallenges] = useState<DBChallenge[]>([]);
  const [groups, setGroups] = useState<DBGroup[]>([]);
  const [titleChallenge, setTitleChallenge] = useState<DBChallengeDescription>({
    title: "Challenge Title",
    description: "Challenge Description",
    endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
  });

  // Fetch the current challenge
  useEffect(() => {
    const fetchCurrentChallenge = async () => {
      try {
        const currentChallengeData =
          await firestoreCtrl.getChallengeDescription();
        const formattedChallenge = {
          title: currentChallengeData.Title,
          description: currentChallengeData.Description,
          title: currentChallengeData.Title,
          description: currentChallengeData.Description,
          endDate: currentChallengeData.endDate, // Conversion Timestamp -> Date
        };
        setTitleChallenge(formattedChallenge);
        return formattedChallenge.title;
      } catch (error) {
        console.error("Error fetching current challenge: ", error);
      }
    };

    const fetchChallenges = async (challengeTitle: string) => {
      try {
        await firestoreCtrl
          .getPostsByChallengeTitle(challengeTitle)
          .then((challenge: DBChallenge[]) => {
            // Sort challenges by date
            const sortedChallenges = challenge.sort((a, b) =>
              a.date && b.date ? b.date.seconds - a.date.seconds : 0,
            );
            setChallenges(sortedChallenges);
          });
      } catch (error) {
        console.error("Error fetching challenges: ", error);
      }
    };

    fetchCurrentChallenge().then((challengeTitle) => {
      console.log("Current challenge fetched : ", challengeTitle);
      if (user.uid) fetchChallenges(challengeTitle);
    });
  }, [user.uid, firestoreCtrl]);

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

  return {
    userIsGuest,
    challenges,
    groups,
    titleChallenge,
  };
}
