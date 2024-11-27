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

const { width, height } = Dimensions.get("window");

export default function MaximizeScreen({ route }: any) {
  const [commentText, setCommentText] = React.useState("");
  const [commentList, setCommentList] = React.useState<CommentType[]>([]);
  const [postUser, setPostUser] = React.useState<DBUser>();
  const [isLiked, setIsLiked] = React.useState(false);

  const {
    navigation,
    firestoreCtrl,
    challenge,
  }: { navigation: any; firestoreCtrl: FirestoreCtrl; challenge: DBChallenge } =
    route.params;

  console.log("-> Challenge", { challenge });
  const posterId = challenge.uid;
  firestoreCtrl.getUser(posterId).then((user: any) => {
    setPostUser(user);
  });

  const userName = postUser?.name ?? undefined;
  const userLocation = challenge.location ?? undefined;
  const userTime = new Date(challenge.date).toLocaleString() ?? undefined;
  console.log(challenge.date);

  return (
    <ThemedView style={styles.bigContainer}>
      <TopBar
        title="Commute by foot"
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
                {userName}
              </ThemedText>
              <ThemedText colorType="white" type="small">
                {"at " + userTime}
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
        <ThemedView style={styles.container} colorType="transparent">
          <Image
            source={require("@/assets/images/challenge2.png")}
            style={styles.image}
          />
        </ThemedView>

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
                    user: "tristan",
                    date: userTime,
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
                user={"tristan"}
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
