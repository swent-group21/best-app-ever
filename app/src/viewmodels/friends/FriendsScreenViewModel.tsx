import { useEffect, useState } from "react";
import FirestoreCtrl, { DBUser } from "@/src/models/firebase/FirestoreCtrl";

/**
 * View model for the Friends screen.
 * @param firestoreCtrl : FirestoreCtrl object
 * @param uid : the user's ID
 * @returns : searchText, setSearchText, users, friends, requests, filteredUsers, handleFriendPress
 */
export function useFriendsScreenViewModel(
  firestoreCtrl: FirestoreCtrl,
  uid: string,
): {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  users: DBUser[];
  friends: DBUser[];
  requests: DBUser[];
  filteredUsers: DBUser[];
  handleFriendPress: (friendId: string) => void;
} {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<DBUser[]>([]);
  const [friends, setFriends] = useState<DBUser[]>([]);
  const [requests, setRequests] = useState<DBUser[]>([]);

  const [suggestions, setSuggestions] = useState<DBUser[]>([]);

  // Fetch friend suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestions = await firestoreCtrl.getFriendSuggestions(uid);
        setSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching friend suggestions: ", error);
      }
    };
    fetchSuggestions();
  }, [firestoreCtrl, uid]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await firestoreCtrl.getAllUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, [firestoreCtrl]);

  // Fetch friends
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friends = await firestoreCtrl.getFriends(uid);
        setFriends(friends);
      } catch (error) {
        console.error("Error fetching friends: ", error);
      }
    };
    fetchFriends();
  }, [firestoreCtrl, uid]);

  // Fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await firestoreCtrl.getFriendRequests(uid);
        setRequests(requests);
      } catch (error) {
        console.error("Error fetching requests: ", error);
      }
    };
    fetchRequests();
  }, [firestoreCtrl, uid]);

  const filteredUsers = searchText
    ? users.filter(
        (user) =>
          user.uid &&
          user.uid !== uid &&
          user.name?.toLowerCase().includes(searchText.toLowerCase()),
      )
    : [];

  const handleFriendPress = (friend: DBUser) => {
    console.log("Friend pressed: ", friend);
  };

  return {
    searchText,
    setSearchText,
    users,
    friends,
    requests,
    filteredUsers,
    handleFriendPress,
    suggestions,
  };
}
