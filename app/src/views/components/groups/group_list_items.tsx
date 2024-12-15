import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/src/views/components/theme/themed_text";
import { ThemedView } from "@/src/views/components/theme/themed_view";
import { Colors } from "@/constants/Colors";
import { ThemedTextButton } from "@/src/views/components/theme/themed_text_button";

/**
 * Group list item component
 * @param name : name of the group
 * @returns GroupListItem Component
 */
export const GroupListItem = ({
  name,
  challengeTitle,
  isJoined,
  handleJoin,
}: {
  readonly name: string;
  readonly challengeTitle?: string;
  readonly isJoined: boolean;
  readonly handleJoin: () => void;
}) => {

  return (
    <ThemedView style={styles.listItem}>

      {/* Display the group as an icon with its name */}
      <ThemedView style={styles.groupIcon} testID={"group-icon"}>
        <ThemedTextButton
          style={styles.avatar}
          onPress={() => {}}
          text={name}
          textStyle={styles.titleText}
          textColorType="textOverLight"
          testID="group-pressable-button"
        ></ThemedTextButton>
      </ThemedView>

      {/* Display the group's challenge */}
      <ThemedView style={styles.textContainer}>
        <ThemedText style={styles.name}>{challengeTitle}</ThemedText>
      </ThemedView>

      {/* Display the join button */}
      {isJoined ? (
        <ThemedText style={styles.friendCheck}>✓</ThemedText>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleJoin}
          testID={`join-button-${name}`}
        >
          <ThemedText style={styles.addButtonText}>{"JOIN"}</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#333",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: "auto",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  friendCheck: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#000",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  avatarText: {
    color: Colors.light.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  defaultAvatar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.backgroundSecondary,
  },
  textContainer: {
    backgroundColor: "transparent",
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  groupIcon: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.dark.backgroundPrimary,
    borderRadius: 20,
    margin: 10,
    alignItems: "center",
  },

  titleText: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    textAlign: "right",
    textAlignVertical: "bottom",
    fontSize: 20,
    fontWeight: "bold",
  },
});
