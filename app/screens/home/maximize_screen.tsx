import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { TopBar } from "@/components/navigation/TopBar";
import { ThemedView } from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";
import { SingleComment, CommentType } from "@/components/posts/Comment";
import { ThemedScrollView } from "@/components/theme/ThemedScrollView";
import { getAuth } from "firebase/auth";
import FirestoreCtrl from "@/firebase/FirestoreCtrl";
import { ThemedTextInput } from "@/components/theme/ThemedTextInput";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function MaximizeScreen() {
  const router = useRouter();
  const [commentText, setCommentText] = React.useState("");
  const [commentList, setCommentList] = React.useState<CommentType[]>([]);
  const [isLiked, setIsLiked] = React.useState(false);

  const userName = "Sandraa"; // derived from the name of the user
  const userLocation = "Plage de Vidy"; // derived from the location of the user
  const userTime = "18:26"; // derived from the time the user posted the challenge

  const firestoreCtrl = new FirestoreCtrl();
  const auth = getAuth();
  const user = auth.currentUser?.uid;
  const infoUser = firestoreCtrl.getUser(user ?? "");

  return (
    <ThemedView style={styles.bigContainer}>
      <TopBar
        title="Commute by foot"
        leftIcon="arrow-back-outline"
        leftAction={router.back}
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
                {"in " + userLocation + " at " + userTime}
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
          {commentList.length > 0 &&
            commentList.map((eachComment, i) => (
              <SingleComment
                comment={eachComment.comment}
                user={"tristan"}
                createdAt={new Date().toLocaleString()}
                key={i}
              />
            ))}
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
