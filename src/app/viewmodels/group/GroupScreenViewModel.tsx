import { useEffect, useState } from "react";
import FirestoreCtrl, { DBChallenge, DBUser, DBGroup, DBChallengeDescription } from "../../models/firebase/FirestoreCtrl";

export function useGroupScreenViewModel(user: DBUser, firestoreCtrl: FirestoreCtrl, group: DBGroup) {
  const userIsGuest = user.name === "Guest";

  const [groupChallenges, setGroupChallenges] = useState<DBChallenge[]>([]);
  const [otherGroups, setOtherGroups] = useState<DBGroup[]>([]);
  const [groupTitleChallenge, setGroupTitleChallenge] = useState<DBChallengeDescription>({
    title: "Challenge Title",
    description: "Challenge Description",
    endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
  });

  useEffect(() => {
    const fetchCurrentChallenge = async () => {
      try {
        const currentChallengeData = await firestoreCtrl.getChallengeByGroup(group.challenge_id);
        const formattedChallenge = {
          title: currentChallengeData.title,
          description: currentChallengeData.description,
          endDate: currentChallengeData.endDate, // Conversion Timestamp -> Date
        };
        setGroupTitleChallenge(formattedChallenge);
      } catch (error) {
        console.error("Error fetching current challenge: ", error);
      }
    };
    fetchCurrentChallenge();
  }, [firestoreCtrl]);

  useEffect(() => {
    if (user.uid) {
      const fetchGroupChallenges = async () => {
        try {
          const challengesData = await firestoreCtrl.getAllPostsOfGroup(group.gid);
          setGroupChallenges(challengesData);
        } catch (error) {
          console.error("Error fetching challenges: ", error);
        }
      };
      fetchGroupChallenges();
    }
  }, [user.uid, firestoreCtrl]);

  useEffect(() => {
    if (user.uid) {
      const fetchGroups = async () => {
        try {
          const groupsData = (await firestoreCtrl.getGroupsByUserId(user.uid))
            .filter((group) => group.gid !== group.gid)
            .sort((a, b) => b.updateDate.getDate() - a.updateDate.getDate());
          setOtherGroups(groupsData);
        } catch (error) {
          console.error("Error fetching groups: ", error);
        }
      };
      fetchGroups();
    }
  }, [user.uid, firestoreCtrl]);

  return {
    groupChallenges,
    otherGroups,
    groupTitleChallenge,
  };
}
