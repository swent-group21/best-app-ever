import { useEffect, useState } from "react";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
  DBGroup,
  DBChallengeDescription,
} from "../../models/firebase/FirestoreCtrl";

export default function useGroupScreenViewModel(
  user: DBUser,
  firestoreCtrl: FirestoreCtrl,
  route: any,
) {
  const [groupChallenges, setGroupChallenges] = useState<DBChallenge[]>([]);
  const [otherGroups, setOtherGroups] = useState<DBGroup[]>([]);
  const group: DBGroup = route.params?.currentGroup;
  console.log("currentGroup in groupScreen: ", group);
  console.log("current route in groupScreen: ", route);

  const groupId = group.gid ?? "";

  useEffect(() => {
    if (user.uid) {
      const fetchGroupChallenges = async () => {
        try {
          const challengesData =
            await firestoreCtrl.getAllPostsOfGroup(groupId);
          setGroupChallenges(challengesData);
        } catch (error) {
          console.error("Error fetching challenges: ", error);
        }
      };
      fetchGroupChallenges();
    }
  }, [user.uid, firestoreCtrl, groupId]);

  useEffect(() => {
    if (user.uid) {
      const fetchGroups = async () => {
        try {
          const groupsData = (await firestoreCtrl.getGroupsByUserId(user.uid))
            .filter(
              (group) =>
                groupId !== group.gid && group.updateDate !== undefined,
            )
            .sort((a, b) => b.updateDate.toMillis() - a.updateDate.toMillis());
          setOtherGroups(groupsData);
        } catch (error) {
          console.error("Error fetching groups: ", error);
        }
      };
      fetchGroups();
    }
  }, [user.uid, firestoreCtrl, group]);

  const groupName = group.name ?? "";
  const groupChallengeTitle = group.challengeTitle ?? "";

  return {
    groupChallenges,
    otherGroups,
    groupName,
    groupChallengeTitle,
    groupId,
  };
}
