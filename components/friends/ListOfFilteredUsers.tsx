import React from 'react';
import { FlatList } from 'react-native';
import { ThemedText } from '@/components/theme/ThemedText';
import {UserListItem} from '@/components/friends/UserListItems';
import { ThemedView } from '@/components/theme/ThemedView';

export default function ListOfFilteredUsers({ users, handleAddFriend, filteredUsers, handleAdd, searchText}: any) {
 return (
    <ThemedView style={{padding: 10, backgroundColor : 'transparent'}}>
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
        </ThemedView>

 )
}


const styles = {
    noResults: {
        color: '#aaa',
        textAlign: 'center',
        marginVertical: 20,
      },
}
