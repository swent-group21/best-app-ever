import React, { useEffect } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { SingleComment } from "@/components/posts/Comment";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import FirestoreCtrl, {
  DBChallenge,
  DBComment,
  DBUser,
} from "@/firebase/FirestoreCtrl";
import { auth } from "@/firebase/Firebase";
import { Timestamp } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

export default function MaximizeScreen({ route }: any) {
  // Get screen parameters
  const {
    navigation,
    firestoreCtrl,
    challenge,
    user,
  }: {
    navigation: any;
    firestoreCtrl: FirestoreCtrl;
    challenge: DBChallenge;
    user: DBUser;
  } = route.params;

  const [commentText, setCommentText] = React.useState("");
  const [commentList, setCommentList] = React.useState<DBComment[]>([]);
  const [postUser, setPostUser] = React.useState<DBUser>();
  const [likeList, setLikeList] = React.useState<string[]>([]);
  const [isLiked, setIsLiked] = React.useState(false);
  const [currentUserName, setCurrentUserName] = React.useState<
    string | undefined
  >(undefined);
  const [currentUserId, setCurrentUserId] = React.useState<string>("");

  useEffect(() => {
    // Fetch current user name and ID
    setCurrentUserId(user.uid);
    setCurrentUserName(user.name);

    // Fetch post user data
    const postUid = challenge.uid;
    firestoreCtrl.getUser(postUid).then((user: any) => {
      setPostUser(user);
    });

    // Fetch comments
    firestoreCtrl
      .getCommentsOf(challenge.challenge_id ?? "")
      .then((comments: DBComment[]) => {
        // Sort comments by date
        const sortedComments = comments.sort(
          (a, b) => a.created_at.toMillis() - b.created_at.toMillis(),
        );
        setCommentList(sortedComments);
      });

    // Fetch likes
    firestoreCtrl
      .getLikesOf(challenge.challenge_id ?? "")
      .then((likes: string[]) => {
        setLikeList(likes);
        setIsLiked(likes.includes(user.uid));
      });

    console.log("-> Maximized challenge: ", { challenge });
  }, [challenge, firestoreCtrl]);

  // @ts-ignore - date is not of the correct type
  const postDate = challenge.date ? challenge.date.toDate() : new Date();
  const postTitle =
    challenge.challenge_name == ""
      ? "Secret Challenge"
      : challenge.challenge_name;
  const postImage = challenge.image_id ?? "";
  const postDescription = challenge.description ?? "";

  return (
    <ThemedView style={styles.bigContainer}>
      <TopBar
        title={postTitle}
        leftIcon="arrow-back-outline"
        leftAction={() => navigation.goBack()}
      />

      <ThemedScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        automaticallyAdjustKeyboardInsets={true}
        colorType="transparent"
      >
        {/* User information */}
        <ThemedView
          style={[styles.user, { justifyContent: "center" }]}
          colorType="transparent"
        >
          {/* User column */}
          <ThemedView style={styles.user} colorType="transparent">
            {/* User icon */}
            <ThemedIconButton
              name="person-circle-outline"
              onPress={() => {
                /* user button */
              }}
              size={45}
              colorType="white"
            />

            {/* User name and location */}
            <ThemedView style={styles.userInfo} colorType="transparent">
              <ThemedText colorType="white" type="smallSemiBold">
                {postUser?.name}
              </ThemedText>
              <ThemedText colorType="white" type="small">
                {"on " +
                  postDate.toLocaleDateString() +
                  ", at " +
                  postDate.toLocaleTimeString()}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Location button */}
          <ThemedIconButton
            name="location-outline"
            onPress={() => {
              /* location button */
            }}
            size={25}
            colorType="white"
          />
        </ThemedView>

        {/* Image */}
        {postImage != "" ? (
          <ThemedView
            style={styles.container}
            colorType="transparent"
            testID="challenge-image"
          >
            <Image source={{ uri: postImage }} style={styles.image} />
          </ThemedView>
        ) : (
          <ThemedText>No image to display</ThemedText>
        )}

        {/* Like section */}
        <ThemedView style={styles.likeSection} colorType="transparent">
          {/* Like button and count */}
          <ThemedView
            style={styles.likeButtonContainer}
            colorType="transparent"
          >
            <ThemedIconButton
              testID="like-button"
              name={isLiked ? "heart" : "heart-outline"}
              onPress={() => {
                setIsLiked(!isLiked);
                // Add or remove user id from like list
                if (isLiked) {
                  const newLikeList = likeList.filter(
                    (userId) => userId !== currentUserId,
                  );
                  setLikeList(newLikeList);
                  firestoreCtrl.updateLikesOf(
                    challenge.challenge_id ?? "",
                    newLikeList,
                  );
                } else {
                  const newLikeList = [...likeList, currentUserId];
                  setLikeList(newLikeList);
                  firestoreCtrl.updateLikesOf(
                    challenge.challenge_id ?? "",
                    newLikeList,
                  );
                }
              }}
              size={35}
              color={isLiked ? "red" : "white"}
            />
            <ThemedText
              colorType="white"
              style={styles.likeCountText}
              testID="like-count"
            >
              {likeList.length} {likeList.length <= 1 ? "like" : "likes"}
            </ThemedText>
          </ThemedView>
          {/* Description */}
          <ThemedView
            style={styles.descriptionContainer}
            colorType="transparent"
          >
            <ThemedText style={styles.descriptionText} colorType="white">
              {postDescription}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Comment input */}
        <ThemedView style={styles.row} colorType="transparent">
          <ThemedTextInput
            testID="comment-input"
            style={styles.commentInput}
            value={commentText}
            onChangeText={(text) => {
              setCommentText(text);
            }}
          />
          <ThemedIconButton
            testID="send-button"
            name="send"
            size={25}
            colorType="white"
            onPress={() => {
              if (commentText.length > 0) {
                const newComment: DBComment = {
                  comment_text: commentText,
                  user_name: currentUserName ?? "",
                  created_at: Timestamp.now(),
                  post_id: challenge.challenge_id ?? "",
                };
                firestoreCtrl
                  .addComment(newComment)
                  .then(() => {
                    setCommentList([...commentList, newComment]);
                    console.log("Comment added");
                  })
                  .catch((error) =>
                    console.error("Error adding comment: ", error),
                  );
              }
              setCommentText("");
            }}
          />
        </ThemedView>

        {/* Comment section */}
        <ThemedView
          style={styles.commentColumn}
          colorType="transparent"
          testID="comments-section"
        >
          {commentList.length === 0 ? (
            <ThemedText>No comment to display</ThemedText>
          ) : (
            commentList.map((eachComment, i) => (
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
