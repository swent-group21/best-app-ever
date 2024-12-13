import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedText } from "@/src/views/components/theme/themed_text";
import { ThemedView } from "@/src/views/components/theme/themed_view";
import { ThemedIconButton } from "@/src/views/components/theme/themed_icon_button";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
} from "@/src/models/firebase/FirestoreCtrl";
import { useChallengeViewModel } from "@/src/viewmodels/components/posts/ChallengeViewModel";

const { width, height } = Dimensions.get("window");

export function Challenge({
  challengeDB,
  index,
  firestoreCtrl,
  navigation,
  testID,
  currentUser,
}: {
  readonly challengeDB: DBChallenge;
  readonly index: number;
  readonly firestoreCtrl: FirestoreCtrl;
  readonly navigation: any;
  readonly testID: string;
  readonly currentUser: DBUser;
}) {
  const {
    isLiked,
    user,
    comments,
    handleDoubleTap,
    handleLikePress,
    placeholderImage,
  } = useChallengeViewModel({ challengeDB, firestoreCtrl, currentUser });

  return (
    <TouchableWithoutFeedback
      onPress={handleDoubleTap}
      testID={`challenge-id-${index}`}
    >
      <ThemedView style={styles.challengeContainer} testID={testID}>
        {/* User Info */}
        <ThemedView style={styles.userInfo}>
          {user?.image_id ? (
            <Image source={{ uri: user.image_id }} style={styles.userAvatar} />
          ) : (
            <ThemedView style={styles.defaultAvatar}>
              <ThemedText style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </ThemedText>
            </ThemedView>
          )}
          <ThemedText style={styles.userName}>
            {user?.name || "Anonymous"}
          </ThemedText>
        </ThemedView>

        {/* Challenge Image */}
        <Image
          source={{
            uri: challengeDB.image_id || placeholderImage,
          }}
          style={styles.challengeImage}
        />

        {/* Challenge Description */}
        {Boolean(challengeDB.description) && (
          <ThemedText style={styles.challengeDescription}>
            {challengeDB.description}
          </ThemedText>
        )}

        {/* First Comment */}
        {comments.length > 0 && (
          <ThemedText style={styles.comment} testID="firstComment">
            {comments[0].user_name}: {comments[0].comment_text}
          </ThemedText>
        )}

        {/* Bottom Bar */}
        <ThemedView style={styles.bottomBar}>
          {/* Like Button */}
          <ThemedIconButton
            name={isLiked ? "heart" : "heart-outline"}
            onPress={handleLikePress}
            size={30}
            testID="like-button"
            color={isLiked ? "red" : "white"}
          />

          {/* Comment Button */}
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("Maximize", {
                navigation,
                firestoreCtrl,
                challenge: challengeDB,
                user: currentUser,
              })
            }
          >
            <ThemedText style={styles.commentText} testID="add-a-comment">
              Add a comment...
            </ThemedText>
          </TouchableWithoutFeedback>
        </ThemedView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  challengeContainer: {
    marginBottom: 20,
    backgroundColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    width: width,
    alignSelf: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  defaultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  likeCount: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  challengeImage: {
    width: "100%",
    height: height * 0.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  comment: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
    fontStyle: "italic",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  likeText: {
    fontSize: 16,
    color: "#fff",
  },
  likedText: {
    color: "red",
  },
  commentText: {
    fontSize: 16,
    color: "#aaa",
  },
});
