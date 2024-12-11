import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  View,
  Text,
} from "react-native";
import FirestoreCtrl, {
  DBChallenge,
  DBUser,
  DBComment,
} from "@/src/models/firebase/FirestoreCtrl";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";

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
  const [comment, setComment] = useState<DBComment | null>(null);

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

  // Fetch the first comment of the challenge
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const comments = await firestoreCtrl.getCommentsOf(
          challengeDB.challenge_id ?? ""
        );
        if (comments.length > 0) {
          setComment(comments[0]); // Display the most recent comment
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComment();
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

  // Handle no challenge case
  if (!challengeDB) {
    return <Text>Loading Challenge...</Text>;
  }

  return (
    <View style={styles.challengeContainer} testID={testID}>
      {/* User Info */}
      <View style={styles.userInfo}>
        {user?.image_id ? (
          <Image
            source={{ uri: user.image_id }}
            style={styles.userAvatar}
          />
        ) : (
          <ThemedView style={styles.defaultAvatar}>
            <ThemedText style={styles.avatarText}>
              {user?.name?.[0]?.toUpperCase() || "A"}
            </ThemedText>
          </ThemedView>
        )}
        <Text style={styles.userName}>{user?.name || "Anonymous"}</Text>

        {/* Location Button */}
        {challengeDB.location && (
          <ThemedIconButton
            testID="location-button"
            name="location-outline"
            size={24}
            color="white"
            style={styles.locationButton}
            onPress={() =>
              navigation.navigate("MapScreen", {
                navigation,
                firestoreCtrl,
                user: currentUser,
                location: challengeDB.location,
              })
            }
          />
        )}
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

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Like Button */}
        <View style={styles.likesContainer}>
          <ThemedIconButton
            testID="like-button"
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "red" : "white"}
            onPress={handleLikePress}
          />
          <Text style={styles.likeCount}>{likes.length} likes</Text>
        </View>

        {/* Comment Section */}
        {comment && (
          <View style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{comment.user_name}:</Text>
            <Text style={styles.commentText}>{comment.comment_text}</Text>
          </View>
        )}

        {/* Add a Comment */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Maximize", {
              navigation,
              firestoreCtrl,
              challenge: challengeDB,
              user: currentUser,
            })
          }
          style={styles.commentButton}
        >
          <Text style={styles.addCommentText}>Add a comment...</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: "flex-start",
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
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#555",
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  locationButton: {
    marginLeft: "auto",
  },
  challengeImage: {
    width: "100%",
    height: height * 0.4,
    borderRadius: 10,
    marginBottom: 10,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  bottomSection: {
    marginTop: 10,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  likeCount: {
    color: "#aaa",
    fontSize: 14,
    marginLeft: 10,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  commentAuthor: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
  },
  commentText: {
    color: "#aaa",
  },
  commentButton: {
    marginTop: 5,
  },
  addCommentText: {
    color: "white",
    fontSize: 14,
  },
});
