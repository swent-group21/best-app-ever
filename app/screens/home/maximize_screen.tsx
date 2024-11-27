import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { SingleComment, CommentType } from "@/components/posts/Comment";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import FirestoreCtrl, { DBChallenge, DBUser } from "@/firebase/FirestoreCtrl";
import { auth } from "@/firebase/Firebase";

const { width, height } = Dimensions.get("window");

export default function MaximizeScreen({ route }: any) {
  // Get screen parameters
  const {
    navigation,
    firestoreCtrl,
    challenge,
  }: { navigation: any; firestoreCtrl: FirestoreCtrl; challenge: DBChallenge } =
    route.params;

  console.log("-> Maximized challenge: ", { challenge });

  const [commentText, setCommentText] = React.useState("");
  const [commentList, setCommentList] = React.useState<CommentType[]>([]);
  const [postUser, setPostUser] = React.useState<DBUser>();
  const [isLiked, setIsLiked] = React.useState(false);
  const [currentUserName, setCurrentUserName] = React.useState<
    string | undefined
  >(undefined);

  // Fetch post user data
  const posterId = challenge.uid;
  firestoreCtrl.getUser(posterId).then((user: any) => {
    setPostUser(user);
  });

  // Fetch current user name
  const currentUserId = auth.currentUser?.uid ?? "";
  firestoreCtrl.getName(currentUserId).then((name) => setCurrentUserName(name));

  // Set post data
  const postUserName = postUser?.name ?? undefined;
  const postLocation = challenge.location ?? undefined;
  const postDate = challenge.date ? challenge.date.toDate() : new Date();
  const postTitle =
    challenge.challenge_name == ""
      ? "Secret Challenge"
      : challenge.challenge_name;
  const postImage = challenge.image_id ?? "";

  return (
    <ThemedView style={styles.bigContainer}>
      <TopBar
        title={postTitle}
        leftIcon="arrow-back-outline"
        leftAction={navigation.goBack}
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
                {postUserName}
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
          <ThemedView style={styles.container} colorType="transparent">
            <Image source={{ uri: postImage }} style={styles.image} />
          </ThemedView>
        ) : (
          <ThemedText>No image to display</ThemedText>
        )}

        {/* Location */}

        {/* Like button */}
        <ThemedView>
          <ThemedIconButton
            name="heart"
            onPress={() => {
              setIsLiked(!isLiked);
            }}
            size={60}
            color={isLiked ? "red" : "white"}
          />
        </ThemedView>

        {/* Comment input */}
        <ThemedView style={styles.row} colorType="transparent">
          <ThemedTextInput
            style={styles.commentInput}
            value={commentText}
            onChangeText={(text) => {
              setCommentText(text);
            }}
          />
          <ThemedIconButton
            name="send"
            size={25}
            colorType="white"
            onPress={() => {
              commentText.length > 0 &&
                setCommentList([
                  ...commentList,
                  {
                    comment: commentText,
                    user: currentUserName ?? "Anonymous",
                    date: new Date(),
                  } as CommentType,
                ]);
              setCommentText("");
            }}
          />
        </ThemedView>

        {/* Comment section */}
        <ThemedView style={styles.commentColumn} colorType="transparent">
          {commentList.length === 0 ? (
            <ThemedText>No comment to display</ThemedText>
          ) : (
            commentList.map((eachComment, i) => (
              <SingleComment
                comment={eachComment.comment}
                user={eachComment.user}
                createdAt={new Date().toLocaleString()}
                key={i}
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

  commentInput: {
    height: height * 0.05,
    width: width * 0.85,
    padding: 8,
    borderWidth: 2,
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

  commentColumn: {
    width: "95%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
