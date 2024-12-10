import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
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

/**
 * Screen for maximizing a post
 * @param user : user object
 * @param navigation : navigation object
 * @param route : route object
 * @param firestoreCtrl : FirestoreCtrl object
 * @returns : a screen for maximizing a post
 */
export default function MaximizeScreen({
  user,
  navigation,
  route,
  firestoreCtrl,
}: {
  user: DBUser;
  navigation: any;
  route: any;
  firestoreCtrl: FirestoreCtrl;
}) {
  const challenge: DBChallenge = route.params?.challenge;

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

  const noImageUri = require("@/assets/images/no-image.svg");

  return (
    <ThemedView style={styles.bigContainer}>
      <TopBar
        title={postTitle}
        leftIcon="arrow-back-outline"
        leftAction={() => navigateGoBack()}
      />

      <ThemedScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        automaticallyAdjustKeyboardInsets={true}
        colorType="transparent"
      >
        <ThemedView style={styles.user} colorType="transparent">
          <ThemedIconButton
            name="person-circle-outline"
            onPress={() => {}}
            size={45}
            colorType="white"
          />
          <ThemedView style={styles.userInfo} colorType="transparent">
            <ThemedText colorType="white">{postUser?.name}</ThemedText>
            <ThemedText colorType="white">
              {"on " + postDate.toUTCString()}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {challenge.location && (
          <ThemedIconButton
            name="location-outline"
            onPress={() => {
              navigation.navigate("MapScreen", {
                navigation: navigation,
                user: user,
                firestoreCtrl: firestoreCtrl,
                location: challenge.location,
              });
            }}
            size={25}
            colorType="white"
          />
        )}

        <ThemedView style={styles.container} colorType="transparent">
          <Image
            source={postImage ? { uri: postImage } : noImageUri}
            style={styles.image}
          />
        </ThemedView>

        <ThemedView style={styles.likeSection} colorType="transparent">
          <ThemedIconButton
            name={isLiked ? "heart" : "heart-outline"}
            onPress={toggleLike}
            size={35}
            color={isLiked ? "red" : "white"}
            testID="like-button"
          />
          <ThemedText style={styles.likeCountText} colorType="white">
            {likeList.length} {likeList.length === 1 ? "like" : "likes"}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.descriptionContainer} colorType="transparent">
          <ThemedText colorType="white">{postDescription}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.row} colorType="transparent">
          <ThemedTextInput
            style={styles.commentInput}
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Add a comment"
            testID="comment-input"
          />
          <ThemedIconButton
            name="send"
            size={25}
            colorType="white"
            onPress={addComment}
            testID="send-comment-button"
          />
        </ThemedView>

        <ThemedView style={styles.commentColumn} colorType="transparent">
          {commentList.length === 0 ? (
            <ThemedText>No comment to display</ThemedText>
          ) : (
            commentList.map((eachComment: any, i: any) => (
              <SingleComment key={i} {...eachComment} />
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
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    height: height * 0.4,
    width: width * 0.9,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "white",
  },

  contentContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
    paddingBottom: 10,
  },

  user: {
    width: width * 0.8,
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.01,
    padding: width * 0.01,
  },

  userInfo: {
    flexDirection: "column",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },

  scroll: {
    height: "100%",
    width: "100%",
  },

  row: {
    width: "90%",
    minHeight: height * 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  commentInput: {
    height: height * 0.05,
    width: width * 0.85,
    padding: 8,
    borderWidth: 2,
    borderRadius: 15,
  },

  commentColumn: {
    width: "95%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  likeSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  likeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },

  likeCountText: {
    marginLeft: 5,
  },

  descriptionContainer: {
    flex: 1,
  },

  descriptionText: {
    flexShrink: 1,
    flexWrap: "wrap",
  },

  spacer: {
    width: width * 0.5,
  },
});
