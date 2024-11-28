import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

// Données des utilisateurs
const users = [
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
  

// Barre de recherche
const SearchBar = ({ onSearch }: { onSearch: (text: string) => void }) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search for a user..."
      placeholderTextColor="#aaa"
      onChangeText={onSearch}
    />
  </View>
);

// Composant pour chaque utilisateur dans la liste
const UserListItem = ({ name, username, avatar, onAdd }: any) => (
  <View style={styles.listItem}>
    {/* Avatar */}
    {avatar ? (
      <Image source={{ uri: avatar }} style={styles.avatar} />
    ) : (
      <View style={[styles.avatar, styles.defaultAvatar]}>
        <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
      </View>
    )}

    {/* Nom et identifiant */}
    <View style={styles.textContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.username}>@{username}</Text>
    </View>

    {/* Bouton Ajouter */}
    <TouchableOpacity style={styles.addButton} onPress={onAdd}>
      <Text style={styles.addButtonText}>ADD</Text>
    </TouchableOpacity>
  </View>
);

// Écran principal
const App = () => {
  const [searchText, setSearchText] = useState('');

  // Fonction de filtrage
  const filteredUsers = searchText
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.username.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const handleAdd = (userId: string) => {
    console.log(`User ${userId} added`);
  };

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <SearchBar onSearch={(text) => setSearchText(text)} />

      {/* Liste des utilisateurs */}
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserListItem
              name={item.name}
              username={item.username}
              avatar={item.avatar}
              onAdd={() => handleAdd(item.id)}
            />
          )}
        />
      ) : (
        searchText.length > 0 && (
          <Text style={styles.noResults}>Aucun utilisateur trouvé</Text>
        )
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fond noir
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#111', // Gris foncé pour le fond
  },
  searchInput: {
    backgroundColor: '#222', // Fond du champ de recherche
    color: '#fff', // Couleur du texte
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
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Cercle parfait
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  defaultAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#800080', // Couleur par défaut pour les avatars
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
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
    backgroundColor: '#333', // Gris foncé
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
});

export default App;
