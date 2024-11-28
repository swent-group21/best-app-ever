import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { TopBar } from '@/components/navigation/TopBar';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedTextInput } from '@/components/theme/ThemedTextInput';
import { ThemedScrollView } from '@/components/theme/ThemedScrollView';
import { DBUser } from '@/firebase/FirestoreCtrl';


// Placeholders for users 
const PLACEHOLDER = [
    { id: '1', name: 'Leah', username: 'leah1', avatar: null },
    { id: '2', name: 'Lea Huet', username: 'leahuet', avatar: 'https://via.placeholder.com/150' },
    { id: '3', name: 'John Doe', username: 'johnd', avatar: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Jane Smith', username: 'janes', avatar: null },
    { id: '5', name: 'Emily Johnson', username: 'emilyj', avatar: null },
    { id: '6', name: 'Chris Lee', username: 'chrisl', avatar: 'https://via.placeholder.com/150' },
    { id: '7', name: 'Michael Brown', username: 'michaelb', avatar: null },
    { id: '8', name: 'Sarah Wilson', username: 'sarahw', avatar: 'https://via.placeholder.com/150' },
    { id: '9', name: 'David Miller', username: 'davidm', avatar: null },
    { id: '10', name: 'Sophia Garcia', username: 'sophiag', avatar: 'https://via.placeholder.com/150' },
    { id: '11', name: 'Daniel Martinez', username: 'danielm', avatar: null },
    { id: '12', name: 'Olivia Davis', username: 'oliviad', avatar: 'https://via.placeholder.com/150' },
    { id: '13', name: 'Lucas Hernandez', username: 'lucash', avatar: null },
    { id: '14', name: 'Mia Moore', username: 'miam', avatar: 'https://via.placeholder.com/150' },
    { id: '15', name: 'Ethan Hall', username: 'ethanh', avatar: null },
    { id: '16', name: 'Ava Martinez', username: 'avam', avatar: 'https://via.placeholder.com/150' },
    { id: '17', name: 'Isabella Clark', username: 'isabellac', avatar: null },
    { id: '18', name: 'James Walker', username: 'jamesw', avatar: 'https://via.placeholder.com/150' },
    { id: '19', name: 'Charlotte Lewis', username: 'charlottel', avatar: null },
    { id: '20', name: 'Liam Robinson', username: 'liamr', avatar: 'https://via.placeholder.com/150' },
    { id: '21', name: 'Amelia Young', username: 'ameliay', avatar: null },
    { id: '22', name: 'Noah King', username: 'noahk', avatar: 'https://via.placeholder.com/150' },
    { id: '23', name: 'Emma Wright', username: 'emmaw', avatar: null },
    { id: '24', name: 'Logan Lopez', username: 'loganl', avatar: 'https://via.placeholder.com/150' },
    { id: '25', name: 'Harper Scott', username: 'harpers', avatar: null },
    { id: '26', name: 'Mason Hill', username: 'masonh', avatar: 'https://via.placeholder.com/150' },
    { id: '27', name: 'Ella Green', username: 'ellag', avatar: null },
    { id: '28', name: 'Benjamin Adams', username: 'benjamina', avatar: 'https://via.placeholder.com/150' },
    { id: '29', name: 'Chloe Baker', username: 'chloeb', avatar: null },
    { id: '30', name: 'Zoe Carter', username: 'zoec', avatar: 'https://via.placeholder.com/150' },
    { id: '31', name: 'Jack Rivera', username: 'jackr', avatar: null },
    { id: '32', name: 'Lily Phillips', username: 'lilyp', avatar: 'https://via.placeholder.com/150' },
    { id: '33', name: 'Ryan Evans', username: 'ryane', avatar: null },
    { id: '34', name: 'Grace Campbell', username: 'gracec', avatar: 'https://via.placeholder.com/150' },
    { id: '35', name: 'Hannah Mitchell', username: 'hannahm', avatar: null },
    { id: '36', name: 'Henry Collins', username: 'henryc', avatar: 'https://via.placeholder.com/150' },
    { id: '37', name: 'Abigail Morris', username: 'abigailm', avatar: null },
    { id: '38', name: 'Victoria Perez', username: 'victoriap', avatar: 'https://via.placeholder.com/150' },
    { id: '39', name: 'Luna Murphy', username: 'lunam', avatar: null },
    { id: '40', name: 'Alexander Hughes', username: 'alexh', avatar: 'https://via.placeholder.com/150' },
  ];

  
  // Placeholder for friends
  const friends = [
    { id: '101', name: 'Anna Brown', avatar: 'https://via.placeholder.com/150' },
    { id: '102', name: 'Mark Taylor', avatar: null },
    { id: '103', name: 'Jessica White', avatar: 'https://via.placeholder.com/150' },
    { id: '104', name: 'Tom Hanks', avatar: null },
    { id: '32', name: 'Lily Phillips', username: 'lilyp', avatar: 'https://via.placeholder.com/150' },
    { id: '33', name: 'Ryan Evans', username: 'ryane', avatar: null },
    { id: '34', name: 'Grace Campbell', username: 'gracec', avatar: 'https://via.placeholder.com/150' },
    { id: '35', name: 'Hannah Mitchell', username: 'hannahm', avatar: null },
    { id: '36', name: 'Henry Collins', username: 'henryc', avatar: 'https://via.placeholder.com/150' },
    { id: '37', name: 'Abigail Morris', username: 'abigailm', avatar: null },
    { id: '38', name: 'Victoria Perez', username: 'victoriap', avatar: 'https://via.placeholder.com/150' },
  ];




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
      <ThemedText style={styles.username}>@{username}</ThemedText>
    </ThemedView>

    {/* Bouton Ajouter */}
    <TouchableOpacity style={styles.addButton} onPress={onAdd}>
      <ThemedText style={styles.addButtonText}>ADD</ThemedText>
    </TouchableOpacity>
  </ThemedView>
);


// Friends Screen
export default function FriendsScreen({ navigation, firestoreCtrl}: any) {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState<DBUser[]>([]);

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


  // Filter users in regard to the search text
  
    const filteredUsers = (searchText && users.length > 0)
    ? users.filter((user) => {
        return user.name && user.name.toLowerCase().includes(searchText.toLowerCase());
        })
    : [];


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
    
      const handleFriendPress = (friendId: string) => {
        console.log(`Navigate to friend ${friendId}'s profile`);
      };

  const handleAdd = (userId: string) => {
    console.log(`User ${userId} added`);
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
          renderItem={({ item }) => (
            <UserListItem
              name={item.name}
              avatar={item.image_id }
              onAdd={() => handleAdd(item.uid)}

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendListItem
            name={item.name}
            avatar={item.avatar}
            onPress={() => handleFriendPress(item.id)}
          />
        )}
        horizontal 
        showsHorizontalScrollIndicator={false}
      />
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
    flex: 1,
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
});

