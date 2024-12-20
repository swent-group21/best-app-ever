import { useEffect, useState } from "react";
import { DBGroup } from "@/src/models/firebase/TypeFirestoreCtrl";
import { getGroup } from "@/src/models/firebase/GetFirestoreCtrl";
import {
  addGroupToUser,
  addMemberToGroup,
  updateGroup,
} from "@/src/models/firebase/SetFirestoreCtrl";
/**
 * List of filtered groups ViewModel helps display the component
 * @param filteredGroups : list of groups to display
 * @param firestoreCtrl : firestore controller
 * @param uid : user id of the current user
 * @returns ListOfFilteredGroups Component
 */
export function useListOfFilteredGroupsViewModel({
  filteredGroups = [],
  uid,
  navigation,
}: {
  readonly filteredGroups: DBGroup[];
  readonly uid: string;
  readonly navigation: any;
}) {
  const [groupStatuses, setGroupStatuses] = useState<{
    [key: string]: { isJoined: boolean };
  }>({});

  // Fetch group statuses with respect to the current user (joined or not)
  const fetchGroupStatuses = async () => {
    const statuses: {
      [key: string]: { isJoined: boolean };
    } = {};
    for (const group of filteredGroups) {
      const isJoined = group.members.includes(uid);
      statuses[group.gid] = { isJoined };
    }
    setGroupStatuses(statuses);
  };

  // Fetch group statuses when the filtered groups change
  // (i.e. when the user searches for a group or suggestions change)
  useEffect(() => {
    if (filteredGroups.length > 0) {
      fetchGroupStatuses();
    }
  }, [filteredGroups]);

  // Handle joining a group request
  const handleJoin = async (gid: string) => {
    try {
      const group: DBGroup = await getGroup(gid);
      await addGroupToUser(uid, group.name);
      await addMemberToGroup(gid, uid);

      const updateDate = new Date();

      await updateGroup(gid, updateDate);

      // Navigate to the group screen
      navigation.navigate("GroupScreen", { currentGroup: group });
    } catch (error) {
      alert("It seems you cannot join this group for now, try again later...");
      console.error("Error joining group:", error);
    }
  };

  return {
    groupStatuses,
    handleJoin,
  };
}
