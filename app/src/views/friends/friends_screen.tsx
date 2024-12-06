import React from "react";
import { Text, StyleSheet } from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { getAuth } from "firebase/auth";
import { SearchBar } from "@/components/friends/Search_Bar";
import ListOfFriends from "@/components/friends/ListOfFriends";
import RequestList from "@/components/friends/RequestList";
import ListOfFilteredUsers from "@/components/friends/ListOfFilteredUsers";
import {useFriendsScreenViewModel} from "@/src/viewmodels/friends/FriendsScreenViewModel";
import { useEffect } from "react";
import { useState } from "react";
import FirestoreCtrl, { DBUser } from "@/src/models/firebase/FirestoreCtrl";

export default function FriendsScreen({ navigation, firestoreCtrl }: { navigation: any; firestoreCtrl: FirestoreCtrl }) {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<DBUser[]>([]);
  const [friends, setFriends] = useState<DBUser[]>([]);
  const [requests, setRequests] = useState<DBUser[]>([]);

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

  const handleFriendPress = (friendId: string) => {
    console.log(`Navigate to friend ${friendId}'s profile`);
  };

  // const {
  //   searchText,
  //   setSearchText,
  //   friends,
  //   requests,
  //   filteredUsers,
  //   handleFriendPress,
  // } = useFriendsScreenViewModel(firestoreCtrl, uid);

  return (
    <ThemedView style={styles.container}>
      <TopBar
        title="Strive is better with friends"
        leftIcon="arrow-back"
        leftAction={navigation.goBack}
      />

      {/* Search Bar*/}
      <SearchBar onSearch={setSearchText} />

      {/* List of filtered users */}
      <ListOfFilteredUsers
        searchText={searchText}
        uid={uid}
        firestoreCtrl={firestoreCtrl}
        filteredUsers={filteredUsers}
      />

      {/* List of friends */}
      <Text style={styles.friendsTitle}>Your friends</Text>
      <ListOfFriends friends={friends} handleFriendPress={handleFriendPress} />

      {/* Friend Requests Section */}
      <ThemedView style={styles.requestsContainer}>
        <ThemedText style={styles.sectionTitle}>Requests</ThemedText>
        {requests.length > 0 ? (
          <RequestList  requests={requests} firestoreCtrl={firestoreCtrl} uid={uid} />
        ) : (
          <ThemedText style={styles.noRequests}>
            No friends request for now
          </ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  friendsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  noRequests: {
    color: "#aaa",
    textAlign: "center",
    marginVertical: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  requestsContainer: {
    flexShrink: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
});
