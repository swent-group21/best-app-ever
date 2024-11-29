import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TopBar } from '@/components/navigation/TopBar';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import { DBUser } from '@/firebase/FirestoreCtrl';
import { getAuth } from 'firebase/auth';
import { SearchBar } from '@/components/friends/SearchBar';
import ListOfFriends from '@/components/friends/ListOfFriends';
import RequestList from '@/components/friends/RequestsList';
import ListOfFilteredUsers from '@/components/friends/ListOfFilteredUsers';
  
/**
 * Screen that allowos the user to search for friends, add them and manage friend requests
 * @param navigation
 * @param firestoreCtrl
 * 
 * @returns Friends Screen Component
 */
export default function FriendsScreen({ navigation, firestoreCtrl}: any) {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState<DBUser[]>([]);
  const [requests, setRequests] = useState<DBUser[]>([]);
  const [friends, setFriends] =useState<DBUser[]>([]);
 

  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  // Fetch users
  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const users = await firestoreCtrl.getAllUsers();
              setUsers(users);
          } catch (error) {
              console.error('Error fetching users: ', error);
          }
          };
          fetchUsers();
    });

  // Fetch friends
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friends = await firestoreCtrl.getFriends(uid);
        setFriends(friends);
      } catch (error) {
        console.error('Error fetching friends: ', error);
      }
    };
      fetchFriends();
    });

  // Fetch requests
    useEffect(() => {
      const fetchRequests = async () => {
        try {
          const request = await firestoreCtrl.getFriendRequests(uid);
          setRequests(request);
        } catch (error) {
          console.error('Error fetching requests: ', error);
        }
      };
      fetchRequests();
    });

    const filteredUsers = (searchText && users.length > 0)
    ? users.filter((user) => {
        return user.uid && user.uid != uid && user.name && user.name.toLowerCase().includes(searchText.toLowerCase());
        })
    : [];

    // Handle Add, Accept and Decline
    const handleFriendPress = (friendId: string) => {
      console.log(`Navigate to friend ${friendId}'s profile`);
    };


  return (
    <ThemedView style={styles.container}>
        <TopBar title="Strive is better with friends" leftIcon='arrow-back' leftAction={navigation.goBack}/>

      {/* Search Bar*/}
      <SearchBar onSearch={(text) => setSearchText(text)} />

      {/* List of filtered users */}
      <ListOfFilteredUsers searchText={searchText} uid = {uid} firestoreCtrl= {firestoreCtrl} filteredUsers = {filteredUsers} />

      {/* List of friends */}
      <Text style={styles.friendsTitle}> Your friends </Text>
      <ListOfFriends friends={friends} handleFriendPress={handleFriendPress} />

      {/* Friend Requests Section */}
      <ThemedView style={styles.requestsContainer}></ThemedView>

      {/* Line for seperation */}
      <ThemedView style= {styles.container}>

      {/* Requests */}
      <ThemedText style={styles.sectionTitle}>Requests</ThemedText>
      {requests.length > 0 ? (
         RequestList(requests, firestoreCtrl, uid)
      ) : (
        <ThemedText style={styles.noRequests}>No friends request for now</ThemedText>
      )}
    </ThemedView>
    </ThemedView>
    
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
  
  noResults: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 20,
  },
  friendsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  
  noRequests: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 20,
  },
 
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  requestsContainer: {
    flexShrink: 0, 
    marginBottom: 20,
    borderBottomWidth: 1, 
    borderBottomColor: '#333',
    
  },
});

