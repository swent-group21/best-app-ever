import { useEffect, useState } from "react";
import FirestoreCtrl, { DBChallenge, DBComment, DBUser } from "../../models/firebase/FirestoreCtrl";
import { Timestamp } from "firebase/firestore";

export function useMaximizeScreenViewModel(
  user: DBUser,
  challenge: DBChallenge,
  firestoreCtrl: FirestoreCtrl,
) {
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState<DBComment[]>([]);
  const [postUser, setPostUser] = useState<DBUser>();
  const [likeList, setLikeList] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  const currentUserId = user.uid;
  const currentUserName = user.name;

  useEffect(() => {
    // Fetch post user data
    const postUid = challenge.uid;
    firestoreCtrl.getUser(postUid).then((user) => {
      setPostUser(user);
    });

    // Fetch comments
    firestoreCtrl.getCommentsOf(challenge.challenge_id ?? "").then((comments) => {
      const sortedComments = comments.sort(
        (a, b) => a.created_at.toMillis() - b.created_at.toMillis(),
      );
      setCommentList(sortedComments);
    });

    // Fetch likes
    firestoreCtrl.getLikesOf(challenge.challenge_id ?? "").then((likes) => {
      setLikeList(likes);
      setIsLiked(likes.includes(currentUserId));
    });
  }, [challenge, firestoreCtrl, currentUserId]);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    const updatedLikeList = isLiked
      ? likeList.filter((userId) => userId !== currentUserId)
      : [...likeList, currentUserId];

    setLikeList(updatedLikeList);
    firestoreCtrl.updateLikesOf(challenge.challenge_id ?? "", updatedLikeList);
  };

  const addComment = async () => {
    if (commentText.length > 0) {
      const newComment: DBComment = {
        comment_text: commentText,
        user_name: currentUserName ?? "",
        created_at: Timestamp.now(),
        post_id: challenge.challenge_id ?? "",
      };
      await firestoreCtrl.addComment(newComment);
      setCommentList([...commentList, newComment]);
      setCommentText("");
    }
  };

  const postDate: Date = challenge.date ? challenge.date.toDate() : new Date();
  const postTitle = challenge.challenge_name || "Secret Challenge";
  const postImage = challenge.image_id ?? "";
  const postDescription = challenge.description ?? "";

  return {
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
  };
}
