import React from "react";
import { FlatList } from "react-native";
import { FriendListItem } from "@/components/friends/FriendListItem";
import { ThemedText } from "@/components/theme/ThemedText";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

/**
 * List of friends component that displays the list of the current user's friends
 * @param friends : list of friends
 * @param handleFriendPress : function to handle the press on a friend item
 */
export default function ListOfFriends({ friends, handleFriendPress }: any) {
  return (
    <FlatList
      data={friends}
      keyExtractor={(item) => item.uid}
      style={{ padding: 10, maxHeight: height * 0.15 }}
      renderItem={({ item, index }) => (
        <FriendListItem
          key={index}
          name={item.name}
          avatar={item.image_id}
          onPress={() => handleFriendPress(item.uid)}
          testID={`friend-item-${item.name}`}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={
        <ThemedText style={styles.noFriends}>
          You don't have any friends yet
        </ThemedText>
      }
      testID="list-of-friends"
    />
  );
}

const styles = StyleSheet.create({
  noFriends: {
    color: "#aaa",
    textAlign: "center",
    marginVertical: 20,
    alignSelf: "center",
    marginLeft: width * 0.2,
  },
});