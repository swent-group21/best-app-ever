import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
  DBComment,
} from "@/src/models/firebase/FirestoreCtrl";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { ThemedView } from "@/components/theme/ThemedView";

const { width, height } = Dimensions.get("window");

export function Challenge({
  challengeDB,
  index,
  firestoreCtrl,
  navigation,
  testID,
  currentUser,
}: {
  challengeDB: DBChallenge;
  index: number;
  firestoreCtrl: FirestoreCtrl;
  navigation: any;
  testID: string;
  currentUser: DBUser;
}) {
  const [user, setUser] = useState<DBUser | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<string[]>([]);
  const [comments, setComments] = useState<DBComment[]>([]);

  // Double-tap logic
  const [lastTap, setLastTap] = useState<number | null>(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await firestoreCtrl.getUser(challengeDB.uid);
        setUser(userData || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (challengeDB.uid) {
      fetchUser();
    }
  }, [challengeDB.uid, firestoreCtrl]);

  // Fetch likes
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const fetchedLikes = await firestoreCtrl.getLikesOf(
          challengeDB.challenge_id ?? ""
        );
        setIsLiked(fetchedLikes.includes(currentUser.uid));
        setLikes(fetchedLikes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [challengeDB.challenge_id, currentUser.uid, firestoreCtrl]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await firestoreCtrl.getCommentsOf(
          challengeDB.challenge_id ?? ""
        );
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [challengeDB.challenge_id, firestoreCtrl]);

  const handleLikePress = async () => {
    try {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);

      const newLikeList = newIsLiked
        ? [...likes, currentUser.uid]
        : likes.filter((userId) => userId !== currentUser.uid);

      setLikes(newLikeList);
      await firestoreCtrl.updateLikesOf(
        challengeDB.challenge_id ?? "",
        newLikeList
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      // Double tap detected
      handleLikePress();
    }
    setLastTap(now);
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={styles.challengeContainer} testID={testID}>
        {/* User Info */}
        <View style={styles.userInfo}>
          {user?.image_id ? (
            <Image
              source={{ uri: user.image_id }}
              style={styles.userAvatar}
            />
          ) : (
            <View style={styles.defaultAvatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </Text>
            </View>
          )}
          <Text style={styles.userName}>{user?.name || "Anonymous"}</Text>
        </View>

        {/* Challenge Image */}
        <Image
          source={{
            uri: challengeDB.image_id || "https://via.placeholder.com/300",
          }}
          style={styles.challengeImage}
        />

        {/* Challenge Description */}
        {challengeDB.description && (
          <Text style={styles.challengeDescription}>
            {challengeDB.description}
          </Text>
        )}

        {/* First Comment */}
        {comments.length > 0 && (
          <Text style={styles.comment}>
            {comments[0].user_name}: {comments[0].comment_text}
          </Text>
        )}

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          {/* Like Button */}
          <TouchableWithoutFeedback onPress={handleLikePress}>
            <Text style={[styles.likeText, isLiked && styles.likedText]}>
              {isLiked ? "♥" : "♡"} {likes.length}
            </Text>
          </TouchableWithoutFeedback>

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
            <Text style={styles.commentText}>Add a comment...</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
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
