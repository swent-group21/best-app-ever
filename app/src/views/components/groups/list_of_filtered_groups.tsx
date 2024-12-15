import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedText } from "@/src/views/components/theme/themed_text";
import { UserListItem } from "@/src/views/components/friends/user_list_items";
import { ThemedView } from "@/src/views/components/theme/themed_view";
import { useListOfFilteredGroupsViewModel } from "@/src/viewmodels/components/groups/ListOfFilteredGroupsViewModel";

/**
 * List of filtered groups component
 * @param filteredGroups : list of groups to display
 * @param searchText : text to search for
 * @param firestoreCtrl : firestore controller
 * @param uid : user id of the current user
 * @returns ListOfFilteredGroups Component
 */
export default function ListOfFilteredGroups({
  filteredGroups = [],
  searchText,
  firestoreCtrl,
  uid,
  navigation,
}: any) {
  const { groupStatuses, handleJoin } =
    useListOfFilteredGroupsViewModel({ filteredGroups, firestoreCtrl, uid, navigation });

  return (
    <ThemedView style={{ padding: 10, backgroundColor: "transparent" }}>
      {filteredGroups.length > 0 ? (
        <FlatList
          data={filteredGroups}
          keyExtractor={(item) => item.uid || Math.random().toString()}
          renderItem={({ item }) => {
            const isJoined = groupStatuses[item.uid] || { isJoined: false};

            return (
              <UserListItem
                name={item.name}
                key={item.uid}
                avatar={item.image_id}
                isFriend={isFriend}
                isRequested={isRequested}
                onAdd={() => handleAdd(item.uid)}
                onCancelRequest={() => handleRemove(item.uid)}
              />
            );
          }}
        />
      ) : (
        searchText.length > 0 && (
          <ThemedText style={styles.noResults}>No group found</ThemedText>
        )
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  noResults: {
    color: "#aaa",
    textAlign: "center",
    marginVertical: 20,
  },
});
