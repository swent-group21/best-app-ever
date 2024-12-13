import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/src/views/components/theme/themed_text";
import { ThemedView } from "@/src/views/components/theme/themed_view";
import { Colors } from "@/constants/Colors";
import { useFriendIconViewModel } from "@/src/viewmodels/components/friends/FriendIconViewModel";

/**
 * Friend List Item component
 * @param name : name of the friend
 * @param avatar : avatar of the friend
 * @param onPress : function to call when the user presses the friend item
 * @returns FriendListItem Component
 */
export function FriendListItem({ name, avatar, onPress }: any) {
  const { firstLetter } = useFriendIconViewModel({ name });

  return (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={onPress}
      testID={`friend-item-${name}`}
    >
      {avatar ? (
        <Image
          source={{ uri: avatar }}
          style={styles.friendAvatar}
          testID="friend-avatar-image"
        />
      ) : (
        <ThemedView
          style={[styles.friendAvatar, styles.defaultAvatar]}
          testID="friend-default-avatar"
        >
          {/* Display the first letter of the friend's name */}
          <ThemedText style={styles.avatarText} testID="friend-avatar-text">
            {firstLetter}
          </ThemedText>
        </ThemedView>
      )}
      <ThemedText style={styles.friendName} testID="friend-name">
        {name}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  friendItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  friendAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
  },
  friendName: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  defaultAvatar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.backgroundSecondary,
  },
  avatarText: {
    color: Colors.light.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
});
