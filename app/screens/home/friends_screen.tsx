import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { TopBar } from '@/components/navigation/TopBar';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedTextInput } from '@/components/theme/ThemedTextInput';
import { ThemedScrollView } from '@/components/theme/ThemedScrollView';
import { DBUser } from '@/firebase/FirestoreCtrl';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';
import { getAuth } from 'firebase/auth';
import { firestore } from '@/firebase/Firebase';
import { documentId } from 'firebase/firestore';

  
const { width, height } = Dimensions.get('window');

// Search Bar 
const SearchBar = ({ onSearch }: { onSearch: (text: string) => void }) => (
  <ThemedView style={styles.searchContainer}>
    <ThemedTextInput
      style={styles.searchInput}
      placeholder="Search for a user..."
      placeholderTextColor="#aaa"
      onChangeText={onSearch}
    />
  </ThemedView>
);

// User List Item
const UserListItem = ({ name, username, avatar, onAdd }: any) => (
  <ThemedView style={styles.listItem}>
    {/* Avatar */}
    {avatar ? (
      <Image source={{ uri: avatar }} style={styles.avatar} />
    ) : (
      <ThemedView style={[styles.avatar, styles.defaultAvatar]}>
        <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
      </ThemedView>
    )}

    {/* Nom et identifiant */}
    <ThemedView style={styles.textContainer}>
      <ThemedText style={styles.name}>{name}</ThemedText>
    </ThemedView>

    {/* Bouton Ajouter */}
    <TouchableOpacity style={styles.addButton} onPress={onAdd}>
      <ThemedText style={styles.addButtonText}>ADD</ThemedText>
    </TouchableOpacity>
  </ThemedView>
);


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
  const [filteredRequests, setFilteredRequests] = useState<DBUser[]>([]);
  const [requests, setRequests] = useState<DBUser[]>([]);
  const [friends, setFriends] =useState<DBUser[]>([]);
 

  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  // Fetch users, friends and requests
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


  // Filter users in regard to the search text
  
    const filteredUsers = (searchText && users.length > 0)
    ? users.filter((user) => {
        return user.uid && user.uid != uid && user.name && user.name.toLowerCase().includes(searchText.toLowerCase());
        })
    : [];


    // Filter requests in regard to the search text
    const FriendListItem = ({ name, avatar, onPress }: any) => (
        <TouchableOpacity style={styles.friendItem} onPress={onPress}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.friendAvatar} />
          ) : (
            <ThemedView style={[styles.friendAvatar, styles.defaultAvatar]}>
              <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
            </ThemedView>
          )}
          <ThemedText style={styles.friendName}>{name}</ThemedText>
        </TouchableOpacity>
      );


      // Friend Request Item
      const FriendRequestItem = ({ name, avatar, onAccept, onDecline }: any) => (
        <ThemedView style={styles.requestItem}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <ThemedView style={[styles.avatar, styles.defaultAvatar]}>
              <ThemedText style={styles.avatarText}>{name.charAt(0).toUpperCase()}</ThemedText>
            </ThemedView>
          )}
          <ThemedText style={styles.name}>{name}</ThemedText>
          <View style={styles.requestButtons}>

          {/* Accept Button with Icon */}
          <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
            <Icon name="check" size={30} color="#fff" />
          </TouchableOpacity>
    
          {/* Decline Button with Icon */}
          <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          </View>
        </ThemedView>
      );

    
  // Handle Add, Accept and Decline
  const handleFriendPress = (friendId: string) => {
     console.log(`Navigate to friend ${friendId}'s profile`);
  };

  const handleAdd = (userId: string) => {
    console.log(`Add user ${userId} as friend`);
    console.log('other UID', userId);

    firestoreCtrl.addFriend(uid, userId);
  };

  const handleAccept = (requestId: string) => {
    console.log(`Friend request ${requestId} accepted`);
    firestoreCtrl.acceptFriend(uid, requestId);
    };

  const handleDecline = (requestId: string) => {
    console.log(`Friend request ${requestId} declined`);
    firestoreCtrl.rejectFriend(uid, requestId);
  };

  return (
    <ThemedView style={styles.container}>
        <TopBar title="Strive is better with friends" leftIcon='arrow-back' leftAction={navigation.goBack}/>

      {/* Search Bar*/}
      <SearchBar onSearch={(text) => setSearchText(text)} />

      {/* List of filtered users */}
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.uid}
          renderItem={({ item, index }) => (
            <UserListItem
              name={item.name}
              key= {index}
              avatar={item.image_id }
              onAdd={() => {
                console.log('Add user', item.uid); 
                handleAdd(item.uid)} }

            />
          )}
        />
      ) : (
        searchText.length > 0 && (
          <ThemedText style={styles.noResults}>No user found</ThemedText>
        )
      )}

      {/* List of friends */}
      <Text style={styles.friendsTitle}> Your friends </Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.uid}
        style = {{padding: 10, maxHeight: height * 0.15}}
        renderItem={({ item, index}) => (
          <FriendListItem
            key={index}
            name={item.name}
            avatar={item.image_id}
            onPress={() => handleFriendPress(item.uid)}
          />
        )}
        horizontal 
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedText style={styles.noFriends}>You don't have any friends yet</ThemedText>
        }
      />

      {/* Friend Requests Section */}
      <ThemedView style={styles.requestsContainer}></ThemedView>
      <ThemedView style= {styles.container}>
      <ThemedText style={styles.sectionTitle}>Requests</ThemedText>
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.uid}
          style = {{position: 'relative'}}
          renderItem={({ item, index }) => (
            <FriendRequestItem
              name={item.name}
              key={index}
              avatar={item.image_id} 
              onAccept={() => handleAccept(item.uid)}
              onDecline={() => handleDecline(item.uid)}
              
            />
          )}
          
        />
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
  searchContainer: {
    padding: 10,
    backgroundColor: 'transparent', 
  
  },
  searchInput: {
    backgroundColor: '#222', 
    color: '#fff', 
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#000',
    
    
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, 
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  defaultAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#800080',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    
    backgroundColor: 'transparent',
    
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    color: '#aaa',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
  friendItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  friendAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  friendName: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },

  acceptButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    height : 50,
    width : 50,

    
  },
  declineButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    height : 50,
    width : 50,
   
  },

  requestButtons: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    marginLeft: 'auto',

  },

  noRequests: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 20,
  },
  noFriends: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    marginLeft : width * 0.2,
  },

  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: 'transparent',
    
    
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
    flexShrink: 0, // Prevent this container from resizing
    marginBottom: 20, // Add space below the section
    borderBottomWidth: 1, // Optional: Divider
    borderBottomColor: '#333',
    
  },
});

