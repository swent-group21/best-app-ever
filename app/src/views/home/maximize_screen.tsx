import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { SingleComment } from "@/components/posts/Comment";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { useMaximizeScreenViewModel } from "@/src/viewmodels/home/MaximizeScreenViewModel";

const { width, height } = Dimensions.get("window");

export default function MaximizeScreen({
  user,
  navigation,
  route,
  firestoreCtrl,
}: {
  readonly user: any;
  readonly navigation: any;
  readonly route: any;
  readonly firestoreCtrl: any;
}) {
  const challenge = route.params?.challenge;
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
    postTitle,
    postImage,
    postDescription,
    navigateGoBack,
  } = useMaximizeScreenViewModel(user, challenge, firestoreCtrl, navigation);

  const [lastTap, setLastTap] = useState<number | null>(null);
  const [showGuestPopup, setShowGuestPopup] = useState<string | null>(null);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      if (user.name === "Guest") {
        setShowGuestPopup("like");
      } else {
        toggleLike();
      }
    }
    setLastTap(now);
  };

  const handleComment = () => {
    if (user.name === "Guest") {
      setShowGuestPopup("comment");
    } else {
      addComment();
    }
  };

  return (
    <ThemedView style={styles.bigContainer}>
      <TopBar
        title={postTitle}
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
        {Boolean(postDescription) && (
          <ThemedText style={styles.postDescription} colorType="white">
            {postDescription}
          </ThemedText>
        )}

        {/* Like Section */}
        <ThemedView style={styles.likeSection}>
          <ThemedIconButton
            name={isLiked ? "heart" : "heart-outline"}
            testID="like-button"
            onPress={() => {
              if (user.name === "Guest") {
                setShowGuestPopup("like");
              } else {
                toggleLike();
              }
            }}
            size={30}
            color={isLiked ? "red" : "white"}
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
            onPress={handleComment}
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

      {/* Guest Pop-Up */}
      {showGuestPopup && (
        <View style={styles.guestPopup}>
          <Text style={styles.popupText}>
            {showGuestPopup === "like"
              ? "Sign up to like this post!"
              : "Sign up to comment on this post!"}
          </Text>
          <TouchableOpacity
            style={styles.popupButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.popupButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.popupCloseButton}
            onPress={() => setShowGuestPopup(null)}
          >
            <Text style={styles.popupCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
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
  guestPopup: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00000077",
    padding: 20,
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  popupText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  popupButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  popupButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  popupCloseButton: {
    padding: 5,
  },
  popupCloseText: {
    color: "#aaa",
    textDecorationLine: "underline",
  },
});
