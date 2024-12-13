import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { SingleComment } from "@/components/posts/Comment";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { useMaximizeScreenViewModel } from "@/src/viewmodels/home/MaximizeScreenViewModel";
import FirestoreCtrl, {
  DBUser,
  DBChallenge,
} from "@/src/models/firebase/FirestoreCtrl";

const { width, height } = Dimensions.get("window");

export default function MaximizeScreen({
  user,
  navigation,
  route,
  firestoreCtrl,
}: {
  readonly user: DBUser;
  readonly navigation: any;
  readonly route: any;
  readonly firestoreCtrl: FirestoreCtrl;
}) {
  const challenge: DBChallenge = route.params?.challenge;
  const noImage = "@/assets/images/no-image.svg";

  const {
    commentText,
    setCommentText,
    commentList,
    postUser,
    likeList,
    isLiked,
    toggleLike,
    addComment,
    postDate,
    postImage,
    postCaption,
    navigateGoBack,
  } = useMaximizeScreenViewModel(user, challenge, firestoreCtrl, navigation);

  const [lastTap, setLastTap] = useState<number | null>(null);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      // Double-tap detected
      toggleLike();
    }
    setLastTap(now);
  };

  return (
    <ThemedView style={styles.bigContainer}>
      <TopBar
        title=""
        leftIcon="arrow-back-outline"
        leftAction={navigateGoBack}
      />

      <ThemedScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        automaticallyAdjustKeyboardInsets={true}
        colorType="transparent"
      >
        <ThemedView
          style={{ width: width, flexDirection: "row", height: height * 0.1 }}
          colorType="transparent"
        >
          {/* User Info */}
          <ThemedView style={styles.userInfo}>
            {postUser?.image_id ? (
              <Image
                source={{ uri: postUser.image_id }}
                style={styles.userAvatar}
              />
            ) : (
              <ThemedView style={styles.defaultAvatar}>
                <Text style={styles.avatarText}>
                  {postUser?.name?.charAt(0).toUpperCase() || "A"}
                </Text>
              </ThemedView>
            )}
            <ThemedView style={styles.userDetails}>
              <ThemedText style={styles.userName}>
                {postUser?.name || "Anonymous"}
              </ThemedText>
              <ThemedText style={styles.postDate}>
                {postDate.toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView
            style={{ position: "absolute", right: 15, top: 30 }}
            colorType="transparent"
          >
            {challenge.location && (
              <ThemedIconButton
                name="location-outline"
                testID="location-button"
                onPress={() => {
                  navigation.navigate("MapScreen", {
                    navigation: navigation,
                    user: user,
                    firestoreCtrl: firestoreCtrl,
                    location: challenge.location,
                  });
                }}
                size={30}
                style={styles.locationButton}
                colorType="white"
              />
            )}
          </ThemedView>
        </ThemedView>

        {/* Post Image with Double Tap */}
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <ThemedView style={styles.imageContainer}>
            <Image
              testID="post-image"
              source={postImage ? { uri: postImage } : require(noImage)}
              style={styles.postImage}
            />
          </ThemedView>
        </TouchableWithoutFeedback>

        {/* Post Description */}
        {Boolean(postCaption) && (
          <ThemedText style={styles.postDescription} colorType="white">
            {postCaption}
          </ThemedText>
        )}

        {/* Like Section */}
        <ThemedView style={styles.likeSection}>
          <ThemedIconButton
            name={isLiked ? "heart" : "heart-outline"}
            onPress={toggleLike}
            size={30}
            color={isLiked ? "red" : "white"}
            testID="like-button"
          />
          <ThemedText style={styles.likeCount}>
            {likeList.length} {likeList.length <= 1 ? "Like" : "Likes"}
          </ThemedText>
        </ThemedView>

        {/* Comment Input */}
        <ThemedView style={styles.commentInputSection}>
          <ThemedTextInput
            style={styles.commentInput}
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Add a comment..."
            testID="comment-input"
          />
          <ThemedIconButton
            name="send"
            size={25}
            onPress={addComment}
            colorType="white"
            testID="send-comment-button"
          />
        </ThemedView>

        {/* Comment List */}
        <ThemedView style={styles.commentList} colorType="transparent">
          {commentList.length === 0 ? (
            <ThemedText>No comments yet</ThemedText>
          ) : (
            commentList.map((comment, index) => (
              <SingleComment
                key={comment.created_at.getTime().toPrecision(21)}
                comment={comment} // Add the 'comment' property
                firestoreCtrl={firestoreCtrl} // Add the 'firestoreCtrl' property
              />
            ))
          )}
        </ThemedView>
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: width * 0.9,
    marginLeft: 10,
  },

  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  defaultAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  userDetails: {
    flexDirection: "column",
  },
  userName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  postDate: {
    fontSize: 12,
    color: "#aaa",
  },
  imageContainer: {
    width: "100%",
    height: height * 0.5,
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  locationButton: {
    position: "relative",
  },
  postDescription: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  likeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  likeCount: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
  commentInputSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 7,
  },
  commentInput: {
    flex: 1,
    height: height * 0.05,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingHorizontal: 10,
    color: "#fff",
    width: width * 0.85,
  },
  commentList: {
    width: width * 0.9,
    marginRight: width * 0.1,
  },

  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
