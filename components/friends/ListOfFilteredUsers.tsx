import React from 'react';
import { FlatList } from 'react-native';
import { ThemedText } from '@/components/theme/ThemedText';
import {UserListItem} from '@/components/friends/UserListItems';
import { ThemedView } from '@/components/theme/ThemedView';

export default function ListOfFilteredUsers({filteredUsers, searchText, firestoreCtrl, uid}: any) {
  const handleAdd = (userId : string) => {
        console.log(`Add user ${userId} as friend`);
        console.log('other UID', userId);
    
        firestoreCtrl.addFriend(uid, userId);
      };
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
