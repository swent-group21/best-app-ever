import { useEffect, useState } from "react";
import FirestoreCtrl, { DBChallenge, DBUser, DBGroup, DBChallengeDescription } from "../../../firebase/FirestoreCtrl";

export function useHomeScreenViewModel(user: DBUser, firestoreCtrl: FirestoreCtrl) {
  const userIsGuest = user.name === "Guest";

  const [challenges, setChallenges] = useState<DBChallenge[]>([]);
  const [groups, setGroups] = useState<DBGroup[]>([]);
  const [titleChallenge, setTitleChallenge] = useState<DBChallengeDescription>({
    title: "Challenge Title",
    description: "Challenge Description",
    endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
  });

  useEffect(() => {
    const fetchCurrentChallenge = async () => {
      try {
        const currentChallengeData = await firestoreCtrl.getChallengeDescription();
        const formattedChallenge = {
          title: currentChallengeData.title,
          description: currentChallengeData.description,
          endDate: currentChallengeData.endDate, // Conversion Timestamp -> Date
        };
        setTitleChallenge(formattedChallenge);
      } catch (error) {
        console.error("Error fetching current challenge: ", error);
      }
    };
    fetchCurrentChallenge();
  }, [firestoreCtrl]);

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
