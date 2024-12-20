import { useEffect, useState } from "react";
import { DBGroup } from "@/src/models/firebase/TypeFirestoreCtrl";
import {
  getGroupSuggestions,
  getAllGroups,
} from "@/src/models/firebase/GetFirestoreCtrl";

/**
 * View model for the Join Group screen.
 * @param uid : the user's ID
 * @returns : searchText, setSearchText, users, friends, requests, filteredUsers, handleFriendPress
 */
export function useJoinGroupViewModel(uid: string): {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  filteredGroups: DBGroup[];
  suggestions: DBGroup[];
} {
  const [searchText, setSearchText] = useState("");
  const [allGroups, setAllGroups] = useState<DBGroup[]>([]);
  const [suggestions, setSuggestions] = useState<DBGroup[]>([]);

  // Fetch groups suggestions based on the user's friends
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestions = await getGroupSuggestions(uid);
        setSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching groups suggestions: ", error);
      }
    };
    fetchSuggestions();
  }, [uid]);

  // Fetch all existing groups to filter the search in them
  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const allGroups = await getAllGroups();
        setAllGroups(allGroups);
      } catch (error) {
        console.error("Error fetching groups: ", error);
      }
    };
    fetchAllGroups();
  }, []);

  // Filter groups based on search text updated by the user
  const filteredGroups = searchText
    ? allGroups.filter(
        (group) =>
          group.gid &&
          (group.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            group.challengeTitle
              ?.toLowerCase()
              .includes(searchText.toLowerCase())),
      )
    : [];

  return {
    searchText,
    setSearchText,
    filteredGroups,
    suggestions,
  };
}
