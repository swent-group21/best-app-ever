import { useEffect, useState } from "react";
import FirestoreCtrl, { DBChallenge, DBUser, DBGroup, DBChallengeDescription } from "../../models/firebase/FirestoreCtrl";

export function useGroupScreenViewModel(user: DBUser, firestoreCtrl: FirestoreCtrl, currentGroup: DBGroup) {

  const [groupChallenges, setGroupChallenges] = useState<DBChallenge[]>([]);
  const [otherGroups, setOtherGroups] = useState<DBGroup[]>([]);
  const groupId = currentGroup.gid ?? "";

  useEffect(() => {
    if (user.uid) {
      const fetchGroupChallenges = async () => {
        try {
          const challengesData = await firestoreCtrl.getAllPostsOfGroup(groupId);
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
            .filter((group) => (groupId !== group.gid && group.updateDate !== undefined))
            .sort((a, b) => b.updateDate.toMillis() - a.updateDate.toMillis());
          setOtherGroups(groupsData);
        } catch (error) {
          console.error("Error fetching groups: ", error);
        }
      };
      fetchGroups();
    }
  }, [user.uid, firestoreCtrl, currentGroup]);


  const groupName = currentGroup.name ?? "";
  const groupChallengeTitle = currentGroup.challengeTitle ?? "";

  return {
    groupChallenges,
    otherGroups,
    groupName,
    groupChallengeTitle,
    groupId,
  };
}
